import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, Github, Linkedin, MessageCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Language } from '../types';

interface ContactProps {
  lang: Language;
}

export default function Contact({ lang }: ContactProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const t = {
    en: {
      title: 'Get In Touch',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message',
      success: 'Message sent successfully!',
      placeholderName: 'Your name',
      placeholderEmail: 'your@email.com',
      placeholderMsg: 'How can I help you?',
      connect: 'Let\'s Connect',
      whatsapp: 'WhatsApp',
    },
    de: {
      title: 'Kontakt aufnehmen',
      name: 'Name',
      email: 'E-Mail',
      message: 'Nachricht',
      send: 'Nachricht senden',
      success: 'Nachricht erfolgreich gesendet!',
      placeholderName: 'Ihr Name',
      placeholderEmail: 'ihre@email.com',
      placeholderMsg: 'Wie kann ich Ihnen helfen?',
      connect: 'Lass uns connecten',
      whatsapp: 'WhatsApp',
    }
  }[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Option A: mailto - Самый простой способ без сторонних сервисов
      // Он откроет почтовый клиент пользователя с предзаполненными данными
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name}`);
      const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`);
      window.location.href = `mailto:sergej.belaj.kr@gmail.com?subject=${subject}&body=${body}`;

      /* 
      // Option B: Использование Formspree (Рекомендуется для продакшена)
      // 1. Создайте форму на https://formspree.io/
      // 2. Раскомментируйте код ниже и замените YOUR_FORM_ID на ваш ID
      
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState)
      });
      
      if (!response.ok) throw new Error('Failed to send');
      */

      setIsSuccess(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Submission error:', error);
      alert(lang === 'en' ? 'Failed to send message.' : 'Nachricht konnte nicht gesendet werden.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 border-t border-slate-200 dark:border-slate-800">
      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-12 lg:col-span-12 mb-8">
          <h2 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">{t.title}</h2>
          <div className="h-1 w-12 bg-indigo-600 rounded-full"></div>
        </div>

        {/* Contact Form */}
        <div className="col-span-12 lg:col-span-7">
          <div className="sleek-card">
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="text-emerald-500" size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{t.success}</h3>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-2">{t.name}</label>
                    <input 
                      required
                      type="text"
                      placeholder={t.placeholderName}
                      value={formState.name}
                      onChange={e => setFormState({...formState, name: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-colors"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-2">{t.email}</label>
                    <input 
                      required
                      type="email"
                      placeholder={t.placeholderEmail}
                      value={formState.email}
                      onChange={e => setFormState({...formState, email: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-2">{t.message}</label>
                  <textarea 
                    required
                    rows={5}
                    placeholder={t.placeholderMsg}
                    value={formState.message}
                    onChange={e => setFormState({...formState, message: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-colors resize-none"
                  />
                </div>
                <button 
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-4 flex items-center justify-center gap-2 font-bold text-sm tracking-wide transition-all shadow-lg shadow-indigo-600/30 active:scale-[0.98] relative group overflow-hidden disabled:opacity-50"
                  id="contact-submit-btn"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  {t.send}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Contact Info & Socials */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
          <div className="sleek-card flex flex-col gap-8">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">{t.connect}</h3>
            
            <div className="space-y-6">
              <a href="mailto:sergej.belaj.kr@gmail.com" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                  <Mail size={18} className="text-slate-600 dark:text-slate-400 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-tighter">Email</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">sergej.belaj.kr@gmail.com</p>
                </div>
              </a>

              <a href="tel:+4915124113693" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                  <Phone size={18} className="text-slate-600 dark:text-slate-400 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-tighter">Phone / Mobile</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">+49 1512 4113693</p>
                </div>
              </a>
            </div>

            <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
              <div className="flex gap-4">
                <a 
                  href="https://linkedin.com" target="_blank" rel="noreferrer"
                  className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-white hover:bg-[#0077b5] transition-all"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="https://github.com/krivbass3D" target="_blank" rel="noreferrer"
                  className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-white hover:bg-slate-900 transition-all"
                >
                  <Github size={20} />
                </a>
                <a 
                  href="https://wa.me/4915124113693" target="_blank" rel="noreferrer"
                  className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-white hover:bg-[#25D366] transition-all"
                >
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-indigo-600/5 border border-indigo-500/20 rounded-2xl p-6">
            <p className="text-xs text-indigo-400 font-medium leading-relaxed italic">
              "Based in Zwickau, Germany. Open to new opportunities and collaboration on exciting Full Stack or AI-driven projects."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
