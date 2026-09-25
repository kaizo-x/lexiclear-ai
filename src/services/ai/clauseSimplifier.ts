import { sanitizeHTML } from '../../utils/sanitizer';

/**
 * GenAI Engine Parameter: Clause Simplification
 * Converts dense legalese into plain 5th-grade English summaries.
 * Supports API key integration with graceful local NLP fallback.
 */
export async function simplifyLegalese(originalLegaleseText: string): Promise<string> {
  if (!originalLegaleseText || originalLegaleseText.trim().length === 0) {
    return 'No legal text provided to simplify.';
  }

  const apiKey = import.meta.env?.VITE_LLM_API_KEY;

  // If live API key is present, invoke external LLM endpoint
  if (apiKey && apiKey !== 'your_api_key_here') {
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a legal AI assistant. Translate the following legalese clause into a 2-sentence 5th-grade plain English summary: "${originalLegaleseText}"`
            }]
          }]
        })
      });
      const data = await response.json();
      const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (generatedText) {
        return sanitizeHTML(generatedText.trim());
      }
    } catch {
      // Fallback silently to deterministic local engine on network failure
    }
  }

  // Local Rule-Based NLP Heuristic Engine
  const text = originalLegaleseText.toLowerCase();

  if (text.includes('indemnify') || text.includes('hold harmless')) {
    return sanitizeHTML('If someone sues over this work, you must cover all legal bills, costs, and damages for the other party out of your pocket.');
  }
  if (text.includes('non-compete') || text.includes('competing within')) {
    return sanitizeHTML('You are prohibited from working for or starting a business that competes in the same market after this contract ends.');
  }
  if (text.includes('irrevocably grants') || text.includes('assigns') || text.includes('work product')) {
    return sanitizeHTML('All code, designs, and work you create become the immediate property of the client.');
  }
  if (text.includes('liability shall be capped') || text.includes('limited to')) {
    return sanitizeHTML('This sets a maximum limit on the total money one party can be forced to pay if a contract dispute arises.');
  }
  if (text.includes('automatically renew') || text.includes('written notice')) {
    return sanitizeHTML('This contract automatically extends for another term unless you cancel in writing before the deadline.');
  }

  return sanitizeHTML(`Simplified overview: "${originalLegaleseText.slice(0, 120)}..."`);
}
