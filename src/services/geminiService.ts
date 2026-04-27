import { GoogleGenAI } from "@google/genai";
import { experience, skills } from "../data";
import { Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function analyzeJobMatch(jobDescription: string, lang: Language): Promise<string> {
  const portfolioContext = `
    Developer Portfolio Context:
    Skills: ${skills.map(s => s.name).join(", ")}
    Experience:
    ${experience.map(exp => `
      - Company: ${exp.company}
      - Role: ${exp.role[lang]}
      - Description: ${exp.description[lang]}
      - Achievements: ${exp.achievements.map(a => a[lang]).join("; ")}
      - Stack: ${exp.stack.join(", ")}
    `).join("\n")}
  `;

  const prompt = `
    You are an expert technical career coach. 
    Analyze the following job description and compare it with the developer's portfolio context.
    Provide a concise, professional paragraph (max 4 sentences) in ${lang === 'en' ? 'English' : 'German'} explaining why this developer is a strong match for the position, highlighting key technological overlaps and relevant achievements.
    Focus on being persuasive and specific.

    Job Description:
    ${jobDescription}

    ${portfolioContext}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || (lang === 'en' ? "Match analysis completed." : "Match-Analyse abgeschlossen.");
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return lang === 'en' 
      ? "AI analysis is currently unavailable. Please try again later."
      : "KI-Analyse ist derzeit nicht verfügbar. Bitte versuchen Sie es später noch einmal.";
  }
}

export async function fetchMarketInsights(lang: Language): Promise<string> {
  const prompt = `
    Search for and provide current IT job market trends in Germany for 2026, specifically focusing on the demand for PHP/Laravel and React developers. 
    Provide a very concise summary (3-4 bullet points) in ${lang === 'en' ? 'English' : 'German'}. 
    Include estimated demand levels (e.g., "High Demand") or percentage growth if available.
    Format the output as a simple list.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || (lang === 'en' ? "No data available." : "Keine Daten verfügbar.");
  } catch (error) {
    console.error("Market insights search failed:", error);
    return lang === 'en' ? "Failed to load market data." : "Marktdaten konnten nicht geladen werden.";
  }
}
