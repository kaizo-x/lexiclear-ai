import { GoogleGenAI } from "@google/genai";
import { Clause } from "../../types/legal";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

/**
 * 1. Synchronous analysis helper used by unit tests & fallback parser.
 */
export function analyzeClauseRisk(clauseText: string): {
  riskLevel: "HIGH" | "AMBIGUOUS" | "GREEN";
  category: string;
} {
  const text = clauseText.toLowerCase();

  if (
    text.includes("indemn") ||
    text.includes("penalt") ||
    text.includes("unilateral") ||
    text.includes("liabil")
  ) {
    return { riskLevel: "HIGH", category: "INDEMNIFICATION" };
  }
  if (
    text.includes("terminat") ||
    text.includes("arbitrat") ||
    text.includes("damages") ||
    text.includes("governing law")
  ) {
    return { riskLevel: "AMBIGUOUS", category: "GOVERNING_LAW" };
  }
  return { riskLevel: "GREEN", category: "GENERAL" };
}

/**
 * 2. Raw text parser required by useDocument.ts and local state builders.
 */
export function parseRawTextIntoClauses(rawText: string): Clause[] {
  const paragraphs = rawText
    .split(/\n\s*\n/)
    .filter((p) => p.trim().length > 0);
  let currentLine = 1;

  return paragraphs.map((p, i) => {
    const analysis = analyzeClauseRisk(p);
    const mappedRiskLevel =
      analysis.riskLevel === "AMBIGUOUS" ? "AMBER" : analysis.riskLevel;
    const lineCount = p.split("\n").length;
    const lineStart = currentLine;
    const lineEnd = currentLine + lineCount - 1;
    currentLine = lineEnd + 1;

    return {
      id: `c-${i + 1}`,
      title: `Clause ${i + 1}`,
      sectionTag: `Section ${i + 1}`,
      originalText: p.trim(),
      simplifiedText: p.trim(),
      category: analysis.category as any,
      riskLevel: mappedRiskLevel as any,
      riskReason: `Analyzed clause risk: ${mappedRiskLevel}`,
      explanation: `Analysis for clause ${i + 1}`,
      mitigation:
        mappedRiskLevel === "HIGH"
          ? "Review with legal counsel prior to signing."
          : "Standard commercial term.",
      recommendation:
        mappedRiskLevel === "HIGH"
          ? "Propose revision to limit liability."
          : "Accept term as drafted.",
      impactLevel:
        mappedRiskLevel === "HIGH"
          ? "HIGH"
          : mappedRiskLevel === "AMBER"
            ? "MEDIUM"
            : "LOW",
      actionableAdvice:
        mappedRiskLevel === "HIGH"
          ? "Negotiate or remove clause."
          : "Accept as standard.",
      lineStart,
      lineEnd,
    } as Clause;
  });
}

/**
 * 3. Live Google Gemini API Integration.
 */
export async function analyzeContractRisks(documentText: string) {
  try {
    const prompt = `You are an expert Indian commercial and technology lawyer. Analyze the following legal document under Indian law and return a strict JSON object with an overall risk score (0-100) and an array of clause risk breakdowns. Reference relevant Indian statutes where applicable (e.g., Indian Contract Act 1872, Copyright Act 1957, Arbitration and Conciliation Act 1996, MSMED Act 2006, IT Act 2000, EPF Act 1952).

Expected JSON Structure:
{
  "overallRiskScore": 75,
  "clauses": [
    {
      "id": "c1",
      "title": "Clause Title",
      "originalText": "exact clause excerpt",
      "riskLevel": "HIGH",
      "explanation": "Detailed explanation of legal risk under Indian law, citing relevant statutes",
      "mitigation": "Recommended negotiation tactic or alternative clause aligned with Indian commercial practice"
    }
  ]
}

Legal Document Text (assess under Indian jurisdiction):
${documentText}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
  } catch (error) {
    console.error("Gemini Risk Analysis Error:", error);
  }
  return null;
}
