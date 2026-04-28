/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { 
  Github, 
  Linkedin, 
  Mail, 
  FileDown, 
  ExternalLink, 
  Briefcase, 
  Code2, 
  Cpu, 
  Globe,
  MessageSquare,
  ChevronRight,
  Sparkles,
  X,
  ClipboardCopy,
  Check,
  Send,
  Loader2,
  Sun,
  Moon
} from 'lucide-react';
import { projects, experience, skills } from './data';
import { Language, Project } from './types';
import { analyzeJobMatch, fetchMarketInsights } from './services/geminiService';
import AIChatBot from './components/AIChatBot';
import Contact from './components/Contact';
import { Linkedin as LinkedinIcon, Github as GithubIcon, Mail as MailIcon, MessageCircle } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('de');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  const [filter, setFilter] = useState<'All' | 'commercial' | 'pet' | 'cms'>('All');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [showAILab, setShowAILab] = useState(false);
  const [activeAITab, setActiveAITab] = useState<'chat' | 'match' | 'market'>('chat');

  // AI Match state
  const [jobInput, setJobInput] = useState('');
  const [isMatching, setIsMatching] = useState(false);
  const [matchResult, setMatchResult] = useState<string | null>(null);
  const [showJobInput, setShowJobInput] = useState(false);

  // Market Insights state
  const [marketInsights, setMarketInsights] = useState<string | null>(null);
  const [isLoadingMarket, setIsLoadingMarket] = useState(false);

  useEffect(() => {
    const loadMarketInsights = async () => {
      const cached = localStorage.getItem(`market_insights_${lang}`);
      const cacheTime = localStorage.getItem(`market_insights_time_${lang}`);
      const now = Date.now();
      
      if (cached && cacheTime && (now - parseInt(cacheTime)) < 86400000) {
        setMarketInsights(cached);
        return;
      }

      setIsLoadingMarket(true);
      const data = await fetchMarketInsights(lang);
      setMarketInsights(data);
      localStorage.setItem(`market_insights_${lang}`, data);
      localStorage.setItem(`market_insights_time_${lang}`, now.toString());
      setIsLoadingMarket(false);
    };

    loadMarketInsights();
  }, [lang]);

  const allProjectSkills = Array.from(new Set(projects.flatMap(p => p.stack))).sort();

  const handleJobMatch = async () => {
    if (!jobInput.trim()) return;
    setIsMatching(true);
    const result = await analyzeJobMatch(jobInput, lang);
    setMatchResult(result);
    setIsMatching(false);
  };

  const handleCopyATS = (expId: string) => {
    const exp = experience.find(e => e.id === expId);
    if (!exp) return;

    const text = `
COMPANY: ${exp.company}
ROLE: ${exp.role[lang]}
PERIOD: ${exp.period}
DESCRIPTION: ${exp.description[lang]}
ACHIEVEMENTS:
${exp.achievements.map(a => `- ${a[lang]}`).join('\n')}
STACK: ${exp.stack.join(', ')}
    `.trim();

    navigator.clipboard.writeText(text).then(() => {
      setToast("Text copied for your database!");
      setTimeout(() => setToast(null), 3000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const filteredProjects = projects.filter(p => {
    const categoryMatch = filter === 'All' || p.type === filter;
    const skillsMatch = selectedSkills.length === 0 || selectedSkills.every(s => p.stack.includes(s));
    return categoryMatch && skillsMatch;
  });

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleDownloadCV = () => {
    // In a real app, the file would be in /public/
    const url = '/CV_Bilai_Serhii_FullStack.pdf';
    const link = document.createElement('a');
    link.href = url;
    link.download = 'CV_Bilai_Serhii_FullStack.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setToast(lang === 'en' ? 'Starting CV Download...' : 'Lebenslauf-Download startet...');
    setTimeout(() => setToast(null), 3000);
  };

  const t = {
    hero: {
      greeting: lang === 'en' ? 'Hello, I\'m' : 'Hallo, ich bin',
      name: 'Serhii Bilai',
      tagline: lang === 'en' ? 'Full Stack Developer' : 'Full Stack Entwickler',
      description: lang === 'en' 
        ? 'Building robust, scalable applications with PHP/Laravel and React.' 
        : 'Entwicklung robuster, skalierbarer Anwendungen mit PHP/Laravel und React.',
      cv: lang === 'en' ? 'Download CV' : 'Lebenslauf herunterladen',
      projects: lang === 'en' ? 'View Projects' : 'Projekte ansehen'
    },
    sections: {
      projects: lang === 'en' ? 'Featured Projects' : 'Ausgewählte Projekte',
      skills: lang === 'en' ? 'Expertise' : 'Kompetenzen',
      experience: lang === 'en' ? 'Experience' : 'Erfahrung',
      contact: lang === 'en' ? 'Get In Touch' : 'Kontakt'
    },
    filters: {
      All: lang === 'en' ? 'All' : 'Alle',
      commercial: lang === 'en' ? 'Commercial' : 'Kommerziell',
      pet: lang === 'en' ? 'Pet Projects' : 'Pet Projects',
      cms: lang === 'en' ? 'CMS' : 'CMS'
    },
    modal: {
      role: lang === 'en' ? 'Role & Project Description' : 'Rolle & Projektbeschreibung',
      challenges: lang === 'en' ? 'Challenges & Solutions' : 'Herausforderungen & Lösungen',
      aiAssisted: lang === 'en' ? 'Created with AI Assistance (Cursor/Claude)' : 'Erstellt mit KI-Unterstützung (Cursor/Claude)'
    },
    aiMatch: {
      button: lang === 'en' ? 'Match with Job Description' : 'Mit Stellenbeschreibung abgleichen',
      placeholder: lang === 'en' ? 'Paste job description here...' : 'Stellenbeschreibung hier einfügen...',
      cta: lang === 'en' ? 'Analyze Match' : 'Abgleich analysieren',
      title: lang === 'en' ? 'AI Matching Analysis' : 'KI-Matching Analyse',
      reset: lang === 'en' ? 'Reset' : 'Zurücksetzen'
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-4 md:py-8">
        <nav className="sleek-nav flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl text-white">DP</div>
            <div>
              <h1 className="text-lg font-bold leading-none">{lang === 'en' ? 'Dev Portfolio' : 'Entwickler Portfolio'}</h1>
              <p className="text-xs text-indigo-400 font-mono mt-1">{t.hero.tagline}</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm font-medium text-slate-400">
            <a href="#projects" className="hover:text-indigo-400 transition-colors uppercase tracking-wider text-[10px]">{t.sections.projects}</a>
            <a href="#experience" className="hover:text-indigo-400 transition-colors uppercase tracking-wider text-[10px]">{t.sections.experience}</a>
            <button 
              onClick={() => setLang(lang === 'en' ? 'de' : 'en')}
              className="p-1.5 bg-slate-200 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700/50 rounded-lg hover:border-indigo-500/50 transition-all flex items-center justify-center grayscale hover:grayscale-0"
              title={lang === 'en' ? 'Switch to German' : 'Auf Englisch umstellen'}
            >
              <span className="text-lg leading-none filter drop-shadow-sm">
                {lang === 'en' ? '🇺🇸' : '🇩🇪'}
              </span>
            </button>
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 bg-slate-200 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700/50 rounded-lg hover:text-indigo-400 transition-all flex items-center justify-center text-slate-500"
              title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button 
              onClick={() => setShowAILab(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <Sparkles size={14} className="animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">AI Lab</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse border-2 border-slate-900 shadow"></span>
            </button>
          </div>
          <div className="flex w-full md:w-auto gap-3 justify-center">
            <button 
              onClick={handleDownloadCV}
              className="flex-1 md:flex-none px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg text-[10px] uppercase font-bold transition-colors"
            >
              {t.hero.cv}
            </button>
            <a 
              href="#contact"
              className="flex-1 md:flex-none px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-[10px] uppercase font-bold text-white transition-colors shadow-lg shadow-indigo-600/20 text-center flex items-center justify-center"
            >
              {lang === 'en' ? 'Hire Me' : 'Kontakt'}
            </a>
          </div>
        </nav>
      </div>

      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-12 gap-6">
          
          {/* Left Column: About & Skills */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            {/* About Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sleek-card"
            >
              <h2 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-4">{lang === 'en' ? 'About' : 'Über mich'}</h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                {t.hero.description} {lang === 'en' ? 'Based in Germany, open to remote and hybrid roles.' : 'Ansässig in Deutschland, offen für Remote- und Hybrid-Rollen.'}
              </p>
              
              {/* AI Efficiency Plaque */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-4 flex items-center gap-4 cursor-default group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
                <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                  <Sparkles size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-0.5">AI-Efficiency</p>
                  <p className="text-xs text-slate-300 font-medium">2x faster delivery using Vibe Coding workflows</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Skills Matrix */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="sleek-card flex-1 flex flex-col"
            >
              <h2 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-6">{t.sections.skills}</h2>
              <div className="space-y-8 flex-1">
                <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                  <div>
                    <p className="text-[10px] text-slate-500 mb-3 font-mono uppercase tracking-widest">Core Tech</p>
                    <div className="flex flex-wrap gap-2">
                      {skills.filter(s => s.category === 'backend' || s.category === 'frontend').map(s => (
                        <span key={s.name} className="sleek-badge badge-indigo">{s.name}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 mb-3 font-mono uppercase tracking-widest">Infra & DB</p>
                    <div className="flex flex-wrap gap-2">
                      {skills.filter(s => s.category === 'devops' || s.category === 'database' || s.category === 'cloud').map(s => (
                        <span key={s.name} className="sleek-badge badge-slate">{s.name}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 mb-3 font-mono uppercase tracking-widest">API & QA</p>
                    <div className="flex flex-wrap gap-2">
                      {skills.filter(s => s.category === 'api' || s.category === 'testing').map(s => (
                        <span key={s.name} className="sleek-badge border border-slate-300 dark:border-slate-800 text-slate-500">{s.name}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800">
                  <p className="text-[10px] text-cyan-400/70 mb-4 font-mono uppercase tracking-widest flex items-center gap-2">
                    <Cpu size={12} /> AI-Driven Development
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {skills.filter(s => s.category === 'ai').map((s, idx) => (
                      <motion.span 
                        key={s.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        whileHover={{ y: -2, scale: 1.05 }}
                        className="sleek-badge badge-ai py-1.5 px-3 flex items-center gap-2 group cursor-default"
                      >
                        <span className="w-1 h-1 rounded-full bg-cyan-400 group-hover:animate-pulse"></span>
                        {s.name}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Projects & Experience */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            {/* Projects Section */}
            <div id="projects" className="flex flex-col gap-6">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <h2 className="text-xs uppercase tracking-widest text-slate-500 font-bold">{t.sections.projects}</h2>
                  <div className="flex flex-wrap gap-2 bg-slate-200/50 dark:bg-slate-900/50 p-1 rounded-lg border border-slate-300 dark:border-slate-800">
                    {(['All', 'commercial', 'pet', 'cms'] as const).map(tab => (
                      <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`px-3 py-1.5 rounded-md text-[10px] uppercase font-bold tracking-wider transition-all ${
                          filter === tab 
                          ? 'bg-indigo-600 text-white shadow-lg' 
                          : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {t.filters[tab]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Skills Multi-filter */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {allProjectSkills.map(skill => (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`px-3 py-1 rounded-full text-[9px] uppercase font-bold tracking-tighter border transition-all ${
                          selectedSkills.includes(skill)
                          ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400'
                          : 'bg-transparent border-slate-300 dark:border-slate-800 text-slate-500 hover:border-slate-400'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                    {(selectedSkills.length > 0 || filter !== 'All') && (
                      <button 
                        onClick={() => {
                          setSelectedSkills([]);
                          setFilter('All');
                        }}
                        className="px-3 py-1 rounded-full text-[9px] uppercase font-bold tracking-tighter text-red-500 hover:text-red-400 flex items-center gap-1 transition-colors bg-red-500/5 border border-red-500/20"
                      >
                        <X size={10} /> {lang === 'en' ? 'Reset All Filters' : 'Alle Filter zurücksetzen'}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[400px]">
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, idx) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="sleek-card !p-0 group relative overflow-hidden flex flex-col cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="h-40 bg-gradient-to-br from-indigo-900/40 to-slate-800 relative overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-all duration-700 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="text-indigo-400 opacity-50 font-mono text-xl tracking-tighter uppercase">{project.title}</div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-bold text-slate-100">{project.title}</h3>
                          <span className={`sleek-badge ${
                            project.type === 'commercial' ? 'badge-indigo' : 
                            project.type === 'cms' ? 'badge-slate' : 'badge-cyan'
                          }`}>
                            {project.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mb-6 leading-relaxed line-clamp-2">
                          {project.description[lang]}
                        </p>
                        <div className="flex justify-between items-center mt-auto">
                          <div className="flex gap-2">
                            {project.stack.slice(0, 3).map(s => (
                              <span key={s} className="tech-tag">{s}</span>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Details +</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Experience Timeline */}
            <motion.div 
              id="experience"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="sleek-card"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xs uppercase tracking-widest text-slate-500 font-bold">{t.sections.experience}</h2>
                <button 
                  onClick={() => { setShowAILab(true); setActiveAITab('match'); }}
                  className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-2"
                >
                  {t.aiMatch.button} <ChevronRight size={14} />
                </button>
              </div>
              <div className="space-y-8 relative">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-800"></div>
                
                {experience.map((exp, idx) => (
                  <div key={exp.id} className="relative pl-8 group">
                    <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-4 border-slate-950 transition-colors ${idx === 0 ? 'bg-indigo-600' : 'bg-slate-700 group-hover:bg-indigo-600'}`}></div>
                    <div className="flex justify-between items-start select-text">
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-100 flex items-center gap-3">
                          {exp.role[lang]}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyATS(exp.id);
                            }}
                            className="p-1.5 text-slate-500 hover:text-indigo-400 transition-colors bg-slate-800/50 rounded-lg flex items-center gap-1.5 group/ats border border-slate-700/50"
                            title="Copy for ATS"
                          >
                            <ClipboardCopy size={12} />
                            <span className="text-[8px] uppercase tracking-tighter opacity-0 group-hover/ats:opacity-100 transition-opacity">ATS</span>
                          </button>
                        </h4>
                        <p className="text-xs text-indigo-400">
                          {exp.companyUrl ? (
                            <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-indigo-300 transition-colors">
                              {exp.company}
                            </a>
                          ) : (
                            exp.company
                          )} • {exp.location}
                        </p>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono flex-shrink-0">{exp.period}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-3 leading-relaxed select-text">
                      {exp.description[lang]}
                    </p>
                    <ul className="mt-3 space-y-1 select-text">
                      {exp.achievements.map((a, i) => (
                        <li key={i} className="text-[11px] text-slate-500 flex gap-2">
                          <span className="text-indigo-500/50">•</span> {a[lang]}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-3 opacity-60">
                      {exp.stack.map(s => (
                        <span key={s} className="tech-tag text-[9px]">#{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

            <Contact lang={lang} />

            {/* Compact Footer / Contact Bar */}
            <footer className="mt-12 flex flex-col md:flex-row justify-between items-center sleek-card !p-4">
          <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
            <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              {lang === 'en' ? 'Available for Work' : 'Verfügbar'}
            </div>
            <span className="text-slate-700 hidden md:block">|</span>
            <span className="text-[10px] text-slate-400 font-mono">sergej.belaj.kr@gmail.com</span>
          </div>
          <div className="flex gap-6">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[10px] text-slate-500 hover:text-indigo-400 uppercase font-bold tracking-widest transition-colors">LinkedIn</a>
            <a href="https://github.com/krivbass3D" target="_blank" rel="noopener noreferrer" className="text-[10px] text-slate-500 hover:text-indigo-400 uppercase font-bold tracking-widest transition-colors">GitHub</a>
            <a href="https://wa.me/4915124113693" target="_blank" rel="noopener noreferrer" className="text-[10px] text-slate-500 hover:text-indigo-400 uppercase font-bold tracking-widest transition-colors">WhatsApp</a>
          </div>
        </footer>
      </main>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="sleek-card w-full max-w-4xl relative z-10 max-h-[90vh] overflow-y-auto !p-0 shadow-2xl"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-slate-200/50 dark:bg-slate-900/50 rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-300 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-200"
              >
                <X size={20} />
              </button>

              <div className="h-64 md:h-80 relative overflow-hidden">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-900 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-8">
                  <span className={`sleek-badge mb-3 inline-block ${
                    selectedProject.type === 'commercial' ? 'badge-indigo' : 
                    selectedProject.type === 'cms' ? 'badge-slate' : 'badge-cyan'
                  }`}>
                    {selectedProject.type}
                  </span>
                  <h2 className="text-3xl md:text-4xl text-white">{selectedProject.title}</h2>
                </div>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-8">
                  <section>
                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 mb-4">{t.modal.role}</h4>
                    <p className="text-slate-300 leading-relaxed italic border-l-2 border-indigo-600 pl-4">
                      {selectedProject.fullDescription[lang]}
                    </p>
                  </section>

                  {(selectedProject.challenges || selectedProject.solutions) && (
                    <section>
                      <h4 className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 mb-6">{t.modal.challenges}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                          <p className="text-[10px] font-mono uppercase text-slate-500 mb-3 tracking-widest">Challenges</p>
                          <ul className="space-y-3">
                            {selectedProject.challenges?.map((c, i) => (
                              <li key={i} className="text-xs text-slate-400 flex gap-2">
                                <span className="text-red-400/50">—</span> {c[lang]}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-[10px] font-mono uppercase text-slate-500 mb-3 tracking-widest">Solutions</p>
                          <ul className="space-y-3">
                            {selectedProject.solutions?.map((s, i) => (
                              <li key={i} className="text-xs text-slate-400 flex gap-2">
                                <span className="text-green-400/50">✓</span> {s[lang]}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </section>
                  )}
                </div>

                <div className="space-y-8">
                  <section>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-4">Tech Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.stack.map(s => (
                        <span key={s} className="sleek-badge badge-slate">{s}</span>
                      ))}
                    </div>
                  </section>

                  {selectedProject.aiAssisted && (
                    <section className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl flex items-start gap-4">
                      <Sparkles size={16} className="text-cyan-400 mt-1 flex-shrink-0" />
                      <p className="text-[10px] text-cyan-300 font-medium leading-relaxed italic">
                        {selectedProject.aiDescription ? selectedProject.aiDescription[lang] : t.modal.aiAssisted}
                      </p>
                    </section>
                  )}

                  <section className="flex flex-col gap-3">
                    {selectedProject.links.github && (
                      <a href={selectedProject.links.github} className="flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold transition-all uppercase tracking-widest">
                        <Github size={16} /> Repository
                      </a>
                    )}
                    {selectedProject.links.demo && (
                      <a href={selectedProject.links.demo} className="flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold text-white transition-all uppercase tracking-widest">
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    )}
                  </section>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAILab && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAILab(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Lab Header */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
                    <Sparkles size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest">AI Control Center</h3>
                    <p className="text-[10px] text-slate-500 font-mono">POWERED BY GEMINI 1.5 FLASH</p>
                  </div>
                </div>
                <button onClick={() => setShowAILab(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex p-2 bg-slate-100 dark:bg-slate-950/50 gap-1">
                {[
                  { id: 'chat', icon: MessageSquare, label: lang === 'en' ? 'Ask Twin' : 'AI Twin' },
                  { id: 'match', icon: ClipboardCopy, label: lang === 'en' ? 'Job Match' : 'Stellen' },
                  { id: 'market', icon: Globe, label: lang === 'en' ? 'Market' : 'Markt' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveAITab(tab.id as any)}
                    className={`flex-1 py-3 px-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                      activeAITab === tab.id 
                        ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    <tab.icon size={14} />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  {activeAITab === 'chat' && (
                    <motion.div 
                      key="chat" 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: 10 }}
                      className="h-full"
                    >
                      <AIChatBot lang={lang} isEmbed />
                    </motion.div>
                  )}
                  {activeAITab === 'match' && (
                    <motion.div 
                      key="match" 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: 10 }}
                      className="p-6 h-full overflow-y-auto"
                    >
                      <div className="space-y-6">
                        <div className="bg-indigo-600/5 rounded-2xl p-4 border border-indigo-500/10">
                          <p className="text-xs text-indigo-600 dark:text-indigo-400 leading-relaxed font-medium">
                            {lang === 'en' 
                              ? "Paste any job description to see how Sergej fits the role. Our AI analyzes his full stack skills and German market experience."
                              : "Fügen Sie eine Stellenbeschreibung ein, um zu sehen, wie Sergej auf die Rolle passt. Unsere KI analysiert seine Fähigkeiten."}
                          </p>
                        </div>
                        {!matchResult ? (
                          <div className="relative">
                            <textarea 
                              value={jobInput}
                              onChange={(e) => setJobInput(e.target.value)}
                              placeholder={t.aiMatch.placeholder}
                              className="w-full h-48 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:border-indigo-600 transition-colors resize-none"
                            />
                            <button 
                              disabled={isMatching || !jobInput.trim()}
                              onClick={handleJobMatch}
                              className="absolute bottom-4 right-4 bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-500 disabled:opacity-50 transition-all font-bold text-[10px] uppercase tracking-widest flex items-center gap-2"
                            >
                              {isMatching ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                              {t.aiMatch.cta}
                            </button>
                          </div>
                        ) : (
                          <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6 relative">
                            <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed prose dark:prose-invert max-w-none">
                              <ReactMarkdown>
                                {matchResult}
                              </ReactMarkdown>
                            </div>
                            <button 
                              onClick={() => { setMatchResult(null); setJobInput(''); }}
                              className="mt-6 text-[10px] uppercase font-bold tracking-widest text-slate-500 hover:text-slate-300 transition-colors"
                            >
                              {t.aiMatch.reset}
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                  {activeAITab === 'market' && (
                    <motion.div 
                      key="market" 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: 10 }}
                      className="p-6 h-full overflow-y-auto"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h4 className="text-[10px] uppercase font-bold tracking-widest text-emerald-500">Live Germany Trends</h4>
                        <span className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-[8px] font-bold border border-emerald-500/20">AUTO-UPDATED</span>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-950/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                        {isLoadingMarket ? (
                          <div className="flex flex-col items-center justify-center py-12 gap-4 text-slate-500">
                            <Loader2 size={24} className="animate-spin text-indigo-500" />
                            <p className="text-xs uppercase tracking-widest font-bold">Scanning IT Market...</p>
                          </div>
                        ) : (
                          <div className="prose dark:prose-invert prose-sm max-w-none">
                            <ReactMarkdown>{marketInsights || ""}</ReactMarkdown>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-[200] px-6 py-3 bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-2xl flex items-center gap-3 border border-indigo-400/30"
          >
            <Check size={16} />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-12 text-center text-slate-500 text-[10px] tracking-widest uppercase font-mono">
        &copy; {new Date().getFullYear()} — Serhii Bilai Engineering Portfolio
      </footer>

      <AIChatBot lang={lang} />
    </div>
  );
}

