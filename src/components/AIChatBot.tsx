import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Loader2, Sparkles, User, Bot } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { projects, experience, skills } from '../data';
import { Language } from '../types';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

interface AIChatBotProps {
  lang: Language;
  isEmbed?: boolean;
}

export default function AIChatBot({ lang, isEmbed = false }: AIChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'bot', 
      text: lang === 'en' 
        ? "Hi! I'm Sergej's AI agent. Ask me anything about his projects, skills, or experience!" 
        : "Hallo! Ich bin Sergejs KI-Agent. Frag mich alles über seine Projekte, Fähigkeiten oder Erfahrungen!" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

  const getSystemInstruction = () => {
    const portfolioContext = `
      Developer Name: Sergej
      Email: sergej.dev@portfolio.io
      Phone: +49 123 4567890 (Placeholder - Please contact via LinkedIn or Email)
      LinkedIn: linkedin.com/in/sergej-dev
      Skills: ${skills.map(s => s.name).join(', ')}
      Key Projects: ${projects.map(p => `${p.title} (${p.stack.join(', ')})`).join('; ')}
      Work Experience: ${experience.map(e => `${e.role[lang]} at ${e.company}`).join('; ')}
    `;

    return `
      You are a professional AI assistant and "AI-Twin" for Sergej, a Senior Full Stack Developer.
      Your goal is to answer questions about Sergej's work, skills, and experience as if you were him.
      
      Key Context:
      ${portfolioContext}

      Instructions:
      - Answer concisely and professionally.
      - Focus on technical skills (PHP, React, Docker, TypeScript, Laravel).
      - If asked for contact details, provide the Email and LinkedIn link. Mention the phone is for scheduled calls only.
      - Highlight experience working in the German market.
      - Use professional and friendly tone.
      - Answer in the same language as the user's message.
      - Avoid making up information not provided in the context.
      - Sergej is open to new opportunities in Germany and Remote.
    `;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: getSystemInstruction(),
        },
        contents: [
          ...messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }],
          })),
          { role: 'user', parts: [{ text: userMessage }] },
        ],
      });

      const botText = response.text || (lang === 'en' ? "I'm sorry, I couldn't process that." : "Entschuldigung, das konnte ich nicht verarbeiten.");
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: lang === 'en' ? "Error connecting to AI. Please try again." : "Fehler bei der KI-Verbindung. Bitte versuchen Sie es erneut." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmbed) {
    return (
      <div className="flex flex-col h-full bg-white dark:bg-slate-900">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800"
        >
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center shadow-sm ${m.role === 'user' ? 'bg-indigo-600' : 'bg-slate-100 dark:bg-slate-800'}`}>
                {m.role === 'user' ? <User size={18} className="text-white" /> : <Bot size={18} className="text-indigo-600 dark:text-indigo-400" />}
              </div>
              <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none shadow-indigo-600/10' 
                  : 'bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700/50'
              }`}>
                <div className="prose dark:prose-invert prose-sm">
                  <ReactMarkdown>{m.text}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-sm">
                <Bot size={18} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-2xl rounded-tl-none px-4 py-3">
                <Loader2 size={16} className="animate-spin text-indigo-500" />
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={lang === 'en' ? "Ask something about my experience..." : "Fragen Sie nach meiner Erfahrung..."}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-5 pr-14 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600/50 transition-all shadow-sm"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-3 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 disabled:opacity-50 transition-all shadow-lg shadow-indigo-600/20"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 md:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[500px]"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest leading-none">AI Twin</h3>
                  <span className="text-[10px] text-emerald-500 dark:text-emerald-400 font-medium">Online</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-500 dark:text-slate-400"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[350px] scrollbar-thin scrollbar-thumb-slate-800"
            >
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${m.role === 'user' ? 'bg-indigo-600' : 'bg-slate-100 dark:bg-slate-800'}`}>
                    {m.role === 'user' ? <User size={12} className="text-white" /> : <Bot size={12} className="text-indigo-600 dark:text-indigo-400" />}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700/50'
                  }`}>
                    <div className="prose dark:prose-invert prose-xs">
                      <ReactMarkdown>{m.text}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center">
                    <Bot size={12} className="text-indigo-400" />
                  </div>
                  <div className="bg-slate-800 text-slate-400 rounded-2xl rounded-tl-none px-3 py-2 border border-slate-700/50">
                    <Loader2 size={14} className="animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={lang === 'en' ? "Ask something..." : "Frag etwas..."}
                  className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl py-2 pl-3 pr-10 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-1.5 text-indigo-400 hover:text-indigo-300 disabled:opacity-50 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-indigo-600 hover:bg-indigo-500 rounded-full flex items-center justify-center shadow-xl shadow-indigo-600/20 text-white relative z-10"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageSquare size={24} />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-950 rounded-full animate-pulse"></span>
        )}
      </motion.button>
    </div>
  );
}
