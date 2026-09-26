import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

/**
 * Synchronous local fallback simplifier required for offline rendering
 */
export function simplifyClauseLocal(text: string): string {
  if (!text || text.trim().length === 0) return "";

  return text
    .replace(/indemnify and hold harmless/gi, "protect and pay for any legal damages incurred by")
    .replace(/notwithstanding anything to the contrary/gi, "regardless of any other rules mentioned here")
    .replace(/in its sole and absolute discretion/gi, "whenever they decide to do so")
    .replace(/shall be deemed to constitute/gi, "will be considered as")
    .replace(/in witness whereof/gi, "to confirm this agreement")
    .replace(/restraint of trade/gi, "restriction on your ability to work (may be void under Section 27, Indian Contract Act 1872)");
}

/**
 * Live Google Gemini 2.5 Flash API Integration.
 * Sends Indian legal clause text to Gemini and returns plain English explanation.
 */
export async function simplifyLegalText(text: string): Promise<string> {
  if (!text || text.trim().length === 0) return "";

  try {
    const prompt = `You are an Indian legal expert. Translate the following complex legal clause into plain language that a non-lawyer in India can understand. Be concise and direct. Reference relevant Indian laws where helpful (e.g., Indian Contract Act 1872, Copyright Act 1957, Arbitration and Conciliation Act 1996).\n\nClause Text:\n${text}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    if (response.text) {
      return response.text.trim();
    }
  } catch (error) {
    console.error("Gemini Simplifier Error:", error);
  }

  return simplifyClauseLocal(text);
}
