/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function improveDescription(text: string, context: string): Promise<string> {
  const prompt = `You are a professional resume writer. 
Improve the following description for a resume entry. 
Focus on achievements, use strong action verbs, and quantify results where possible.
Context: ${context}
Input text: ${text}

Return only the improved text, no preamble or commentary. Keep it concise and professional. Use bullet points if appropriate (using '•' character).`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return text;
  }
}

export async function suggestSkills(jobTitle: string, description: string): Promise<string[]> {
  const prompt = `Based on the job title "${jobTitle}" and the description "${description}", suggest 5 relevant professional skills for a resume. 
Return only a JSON array of strings.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    const skills = JSON.parse(response.text || '[]');
    return Array.isArray(skills) ? skills : [];
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
}
