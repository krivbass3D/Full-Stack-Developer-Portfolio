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
    title: 'AI Prompt Explorer',
    type: 'pet',
    description: {
      en: 'A platform to test and share optimized AI prompts.',
      de: 'Eine Plattform zum Testen und Teilen optimierter KI-Prompts.'
    },
    fullDescription: {
      en: 'Built with React and OpenAI API to help developers manage complex prompt engineering workflows.',
      de: 'Entwickelt mit React und der OpenAI-API, um Entwicklern bei der Verwaltung komplexer Prompt-Engineering-Workflows zu helfen.'
    },
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    tags: ['Pet Project', 'AI'],
    stack: ['React', 'TypeScript', 'OpenAI API', 'Tailwind CSS'],
    links: {
      github: 'https://github.com/example/ai-prompts'
    },
    aiAssisted: true,
    challenges: [
      { en: 'Managing token costs and API limits', de: 'Verwaltung von Token-Kosten und API-Limits' }
    ],
    solutions: [
      { en: 'Implemented client-side caching and debounced requests', de: 'Client-seitiges Caching und Debouncing von Anfragen implementiert' }
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
  }
];

export const experience: Experience[] = [
  {
    id: 'exp1',
    company: 'TechFlow Solutions GmbH',
    role: {
      en: 'Senior Full Stack Developer',
      de: 'Senior Full Stack Entwickler'
    },
    period: '2021 — Present',
    location: 'Berlin / Remote',
    description: {
      en: 'Leading the development of scalable web applications for European clients.',
      de: 'Leitung der Entwicklung skalierbarer Webanwendungen für europäische Kunden.'
    },
    achievements: [
      { en: 'Modernized legacy PHP codebase to Laravel 10', de: 'Modernisierung der Legacy-PHP-Codebasis auf Laravel 10' },
      { en: 'Reduced deployment time by 40% using Dockerized CI/CD', de: 'Reduzierung der Deployment-Zeit um 40% durch Dockerized CI/CD' }
    ],
    stack: ['PHP', 'Laravel', 'React', 'Docker', 'PostgreSQL']
  }
];

export const skills: Skill[] = [
  { name: 'PHP', category: 'backend' },
  { name: 'Laravel', category: 'backend' },
  { name: 'React', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'Docker', category: 'devops' },
  { name: 'PostgreSQL', category: 'database' },
  { name: 'REST API', category: 'backend' },
  { name: 'CI/CD', category: 'devops' },
  { name: 'Cursor', category: 'ai' },
  { name: 'Claude', category: 'ai' },
  { name: 'Copilot', category: 'ai' },
  { name: 'Antigravity', category: 'ai' }
];
