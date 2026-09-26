export interface SimplifiedClause {
  originalText: string;
  simplifiedText: string;
  keyPoints: string[];
  plainEnglishSummary: string;
}

export async function simplifyClause(
  clauseText: string,
): Promise<SimplifiedClause> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

  if (!apiKey) {
    return getFallbackSimplification(clauseText);
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Analyze and simplify this legal clause. Return strictly valid JSON only: {"simplifiedText": string, "keyPoints": string[], "plainEnglishSummary": string}\n\nClause: "${clauseText}"`,
                },
              ],
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`API HTTP error ${response.status}`);
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const cleanJson = rawText.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleanJson);

    return {
      originalText: clauseText,
      simplifiedText: parsed.simplifiedText || clauseText,
      keyPoints:
        Array.isArray(parsed.keyPoints) && parsed.keyPoints.length > 0
          ? parsed.keyPoints
          : ["Core obligation defined."],
      plainEnglishSummary:
        parsed.plainEnglishSummary || "Simplified legal overview.",
    };
  } catch (error) {
    console.warn(
      "Gemini API call failed or quota reached. Using fallback simplification:",
      error,
    );
    return getFallbackSimplification(clauseText);
  }
}

export function simplifyText(text: string): Promise<SimplifiedClause> {
  return simplifyClause(text);
}

function getFallbackSimplification(clauseText: string): SimplifiedClause {
  return {
    originalText: clauseText,
    simplifiedText:
      clauseText.length > 140 ? clauseText.slice(0, 140) + "..." : clauseText,
    keyPoints: [
      "Standard contractual clause outlining obligations.",
      "Defines operational rights, responsibilities, and timeline expectations.",
      "Requires compliance by involved contracting parties.",
    ],
    plainEnglishSummary:
      "This clause outlines rights and obligations in plain language.",
  };
}

export default simplifyClause;
