import { Project, Experience, Skill } from './types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Enterprise ERP System',
    type: 'commercial',
    description: {
      en: 'Internal ERP for a German logistics company.',
      de: 'Internes ERP-System für ein deutsches Logistikunternehmen.'
    },
    fullDescription: {
      en: 'Developed a custom ERP solution to manage supply chain operations, integrating real-time tracking and automated reporting.',
      de: 'Entwicklung einer maßgeschneiderten ERP-Lösung zur Verwaltung von Lieferkettenabläufen, mit Echtzeit-Tracking und automatisiertem Berichtswesen.'
    },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    tags: ['Commercial', 'Logistics'],
    stack: ['PHP 8', 'Laravel 10', 'MySQL', 'React', 'Docker'],
    links: {
      demo: 'https://example.com'
    },
    challenges: [
      { en: 'Optimizing DB queries for 1M+ records', de: 'Optimierung von DB-Abfragen für über 1 Mio. Datensätze' },
      { en: 'Legacy system data migration', de: 'Datenmigration aus Altsystemen' }
    ],
    solutions: [
      { en: 'Implemented indexing and caching layer', de: 'Indexierung und Caching-Layer implementiert' },
      { en: 'Created custom ETL scripts for clean migration', de: 'Eigene ETL-Skripte für eine saubere Migration erstellt' }
    ]
  },
  {
    id: '2',
    title: 'PhotoQuest: The Lost Expedition',
    type: 'pet',
    description: {
      en: 'Innovative urban exploration game converting photography into a 1930s expedition.',
      de: 'Ein innovatives Stadt-Erkundungsspiel, das urbane Fotografie in eine narrative Expedition der 1930er Jahre verwandelt.'
    },
    fullDescription: {
      en: 'Full Stack Developer & Product Designer. The system uses OpenAI to generate dynamic quests based on real OpenStreetMap data worldwide.',
      de: 'Full Stack Developer & Product Designer. Das System nutzt OpenAI, um dynamische Quests basierend auf echten OpenStreetMap-Daten weltweit zu generieren.'
    },
    image: '/regenerated_image_1777395203382.png',
    tags: ['AI EXPERIMENT', 'Adventure'],
    stack: ['Vue 3', 'TypeScript', 'Supabase', 'OpenAI API', 'Tailwind CSS', 'OpenSTREETMAP'],
    links: {
      github: 'https://github.com/krivbass3D/photo_quest',
      demo: 'https://photo-quest-kappa.vercel.app/'
    },
    aiAssisted: true,
    aiDescription: {
      en: 'Developed with AI support (Cursor/Claude). AI was used for quest prompt engineering and rapid prototyping of the vintage design.',
      de: 'Entwickelt mit KI-Unterstützung (Cursor/Claude). KI wurde für das Prompt-Engineering der Quests und die schnelle Prototypisierung des Vintage-Designs eingesetzt.'
    },
    challenges: [
      { 
        en: 'Data Synchronicity: Connecting global POI data (Overpass API) with AI models for logical routes.',
        de: 'Daten-Synchronität: Verbindung von globalen POI-Daten (Overpass API) mit KI-Modellen zur Erstellung logischer Routen.' 
      },
      { 
        en: 'UX/UI Immersion: Developing a complex vintage UI with Vue 3 feeling like a physical journal.',
        de: 'UX/UI Immersion: Entwicklung eines komplexen Vintage-UIs mit Vue 3, das sich wie ein physisches Journal anfühlt.' 
      }
    ],
    solutions: [
      { 
        en: 'Supabase Edge Functions: Implemented server-side logic for secure OpenAI communication and OSM data filtering.',
        de: 'Supabase Edge Functions: Implementierung einer serverseitigen Logik zur sicheren Kommunikation mit der OpenAI API и фильтрации данных OpenStreetMap.' 
      },
      { 
        en: 'Modular Vintage UI Kit: Erstellung wiederverwendbarer Vue-Komponenten für Retro-Elemente (Stempel, Briefumschläge) unter Nutzung von Tailwind CSS Transitions.',
        de: 'Modularer Vintage-UI-Kit: Erstellung wiederverwendbarer Vue-Komponenten für Retro-Elemente (Stempel, Briefumschläge) unter Nutzung von Tailwind CSS Transitions.' 
      }
    ]
  },
  {
    id: '3',
    title: 'Modern PrestaShop Store',
    type: 'cms',
    description: {
      en: 'High-performance e-commerce for luxury brand.',
      de: 'Hochleistungs-E-Commerce für eine Luxusmarke.'
    },
    fullDescription: {
      en: 'Customized PrestaShop core for unique business logic and headless frontend integration.',
      de: 'Anpassung des PrestaShop-Kerns für spezifische Geschäftslogik und Headless-Frontend-Integration.'
    },
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800',
    tags: ['CMS', 'PrestaShop'],
    stack: ['PHP', 'PrestaShop', 'Smarty', 'MySQL'],
    links: {
      demo: 'https://example.com'
    },
    challenges: [
      { en: 'Checkout optimization for high conversion', de: 'Checkout-Optimierung für hohe Conversion' }
    ],
    solutions: [
      { en: 'Built one-page checkout module', de: 'One-Page-Checkout-Modul entwickelt' }
    ]
  },
  {
    id: '4',
    title: 'DeutschMeister',
    type: 'pet',
    description: {
      en: 'AI-powered language tutor and interactive vocabulary training platform.',
      de: 'KI-gestützter Sprachlehrer und interaktives Vokabeltraining.'
    },
    fullDescription: {
      en: 'Full Stack Developer & Product Designer. Built with React 19 and Gemini API, DeutschMeister features spaced repetition, real-time AI grammar checking, and persistent progress tracking via LocalStorage.',
      de: 'Full Stack Developer & Product Designer. Entwickelt mit React 19 und der Gemini-API. DeutschMeister bietet Intervall-Wiederholung (Spaced Repetition), KI-Grammatikprüfung in Echtzeit und Fortschrittsspeicherung via LocalStorage.'
    },
    image: '/regenerated_image_1777396829055.png',
    tags: ['Pet Project', 'AI Learning', 'Language'],
    stack: ['React 19', 'TypeScript', 'Google Gemini API', 'Tailwind CSS', 'Vite', 'LocalStorage'],
    links: {
      github: 'https://github.com/krivbass3D/deutsch-meister',
      demo: 'https://deutschaitutor.vercel.app/'
    },
    aiAssisted: true,
    aiDescription: {
      en: 'Extensive use of Cursor and Claude for writing tests and documentation, allowing the implementation of 9 core functions in a remarkably short timeframe (Vibe Coding).',
      de: 'Aktive Nutzung von Cursor und Claude für Tests und Dokumentation. Dies ermöglichte die Umsetzung von 9 Kernfunktionen in kürzester Zeit (Vibe Coding).'
    },
    challenges: [
      { 
        en: 'LLM Integration: Validating short answers accurately without excessive AI verbosity.',
        de: 'LLM-Integration: Korrekte Überprüfung kurzer Antworten (Short Answer Validation), um unnötige KI-Ausgaben bei korrekten Antworten zu vermeiden.' 
      },
      { 
        en: 'State Persistence: Managing lesson state and progress without a backend database.',
        de: 'Zustandsverwaltung: Management von Lektionsstatus und Lernfortschritt ohne serverseitige Datenbank.' 
      }
    ],
    solutions: [
      { 
        en: 'System Prompt Engineering: Configured Gemini responses for strict feedback mapping and minimized latency.',
        de: 'System Prompt Engineering: Konfiguration der Gemini-Antworten und präzises Mapping für minimalen Latenzaufwand.' 
      },
      { 
        en: 'Reliable LocalStorage Logic: Implemented robust JSON-based persistence for tracking user progress.',
        de: 'Zuverlässige LocalStorage-Logik: Implementierung einer robusten JSON-basierten Persistenz zur Verfolgung des Nutzerfortschritts.' 
      }
    ]
  }
];

export const experience: Experience[] = [
  {
    id: 'exp1',
    company: 'Silbersaiten',
    companyUrl: 'https://www.silbersaiten.de/de/',
    role: {
      en: 'Full Stack Developer',
      de: 'Full Stack Developer'
    },
    period: '2024 – 2025',
    location: 'Germany',
    description: {
      en: 'Specialized in e-commerce modules and integration for the German market.',
      de: 'Spezialisierung auf E-Commerce-Module und Integrationen für den deutschen Markt.'
    },
    achievements: [
      { en: 'DHL & UPS business customer portal modules for PrestaShop', de: 'DHL & UPS Geschäftskundenportal-Module für PrestaShop' }
    ],
    stack: ['PHP', 'PrestaShop', 'MySQL']
  },
  {
    id: 'exp2',
    company: 'Mastersolution',
    companyUrl: 'https://mastersolution.com/',
    role: {
      en: 'Web Developer',
      de: 'Webentwickler'
    },
    period: '2022 – 2024',
    location: 'Remote, Germany',
    description: {
      en: 'Development of e-learning solutions and digital learning environments.',
      de: 'Entwicklung von E-Learning-Lösungen und digitalen Lernumgebungen.'
    },
    achievements: [
      { en: 'Development and maintenance of Moodle plugins (DLE)', de: 'Entwicklung und Pflege von Moodle-Plugins (DLE)' }
    ],
    stack: ['PHP', 'Moodle', 'JavaScript']
  },
  {
    id: 'exp3',
    company: 'Webstick',
    companyUrl: 'https://webstick.com.ua/',
    role: {
      en: 'Web Developer',
      de: 'Webentwickler'
    },
    period: '2021 – 2022',
    location: 'Ukraine',
    description: {
      en: 'Full stack development of web applications and online stores.',
      de: 'Full-Stack-Entwicklung von Webanwendungen und Online-Shops.'
    },
    achievements: [
      { en: 'Web app for water delivery Helios; Gas station RLS app', de: 'Web-App für Wasserlieferung Helios; Tankstellen-RLS-App' },
      { en: 'Developed online shops: molfartobacco.ua and topfitness.ua', de: 'Entwicklung der Online-Shops: molfartobacco.ua und topfitness.ua' }
    ],
    stack: ['PHP', 'JavaScript', 'MySQL']
  },
  {
    id: 'exp4',
    company: 'Krivorozhgaz',
    companyUrl: 'https://krgaz.naftogaz.com/',
    role: {
      en: 'Web Developer',
      de: 'Webentwickler'
    },
    period: '2019 – 2021',
    location: 'Ukraine',
    description: {
      en: 'Development of corporate web resources and internal management systems.',
      de: 'Entwicklung von Unternehmens-Webressourcen und internen Managementsystemen.'
    },
    achievements: [
      { en: 'Corporate website, hotel business card, management system', de: 'Unternehmens-Website, Hotel-Visitenkarte, Management-System' }
    ],
    stack: ['PHP', 'MySQL', 'JavaScript']
  },
  {
    id: 'exp5',
    company: 'PrivatBank',
    companyUrl: 'https://privatbank.ua/',
    role: {
      en: 'Financial Analyst & Programmer',
      de: 'Finanzanalyst & Programmierer'
    },
    period: '2000 – 2019',
    location: 'Ukraine',
    description: {
      en: 'Long-term experience in financial automation and web-based planning systems.',
      de: 'Langjährige Erfahrung in der Finanzautomatisierung und webbasierten Planungssystemen.'
    },
    achievements: [
      { en: 'Automation of branch budget planning on WEB platform', de: 'Automatisierung der Filialbudgetplanung auf WEB-Plattform' }
    ],
    stack: ['Web Development', 'Financial Analysis', 'Database']
  }
];

export const skills: Skill[] = [
  // Backend
  { name: 'PHP', category: 'backend' },
  { name: 'Symfony', category: 'backend' },
  { name: 'Laravel', category: 'backend' },
  { name: 'PrestaShop', category: 'backend' },
  { name: 'Moodle', category: 'backend' },
  
  // Frontend
  { name: 'React', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'jQuery', category: 'frontend' },
  { name: 'Inertia.js', category: 'frontend' },
  { name: 'Fabricjs', category: 'frontend' },
  
  // Database
  { name: 'MySQL', category: 'database' },
  { name: 'PostgreSQL', category: 'database' },
  { name: 'MS SQL', category: 'database' },
  
  // DevOps
  { name: 'Docker', category: 'devops' },
  { name: 'Kubernetes', category: 'devops' },
  { name: 'CI/CD', category: 'devops' },
  { name: 'Git', category: 'devops' },
  
  // API
  { name: 'REST', category: 'api' },
  { name: 'SOAP', category: 'api' },
  { name: 'XML/JSON', category: 'api' },
  
  // Testing
  { name: 'Behat', category: 'testing' },
  
  // AI
  { name: 'Claude API', category: 'ai' },
  { name: 'Antigravity', category: 'ai' },
  { name: 'Codex', category: 'ai' },
  { name: 'Prompt Engineering', category: 'ai' },
  
  // Cloud
  { name: 'Google Cloud', category: 'cloud' },
  { name: 'Vercel', category: 'cloud' },
  { name: 'Supabase', category: 'cloud' }
];
