/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'de';

export interface LocalizedText {
  en: string;
  de: string;
}

export type ProjectType = 'commercial' | 'pet' | 'cms';

export interface Project {
  id: string;
  title: string;
  description: LocalizedText;
  fullDescription: LocalizedText;
  image: string;
  tags: string[];
  links: {
    github?: string;
    demo?: string;
  };
  type: ProjectType;
  stack: string[];
  challenges?: LocalizedText[];
  solutions?: LocalizedText[];
  aiAssisted?: boolean;
  aiDescription?: LocalizedText;
}

export interface Experience {
  id: string;
  company: string;
  companyUrl?: string;
  role: LocalizedText;
  period: string; // e.g. "2021 - Present"
  description: LocalizedText;
  achievements: LocalizedText[];
  stack: string[];
  location: string;
}

export interface Skill {
  name: string;
  level?: number; // 0-100
  category: 'backend' | 'frontend' | 'database' | 'devops' | 'tools' | 'ai' | 'other' | 'cloud' | 'api' | 'testing';
}
