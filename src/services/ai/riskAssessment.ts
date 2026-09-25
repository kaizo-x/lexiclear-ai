import { Clause, RiskLevel, RiskCategory } from '../../types/legal';

export interface RiskAnalysisResult {
  riskLevel: RiskLevel;
  category: RiskCategory;
  reasoning: string;
  recommendation: string;
}

/**
 * GenAI Engine Parameter: Risk & Obligation Assessment Pipeline
 * Analyzes clauses to assign risk levels (HIGH, AMBIGUOUS, GREEN) and actionable recommendations.
 */
export function analyzeClauseRisk(clauseText: string): RiskAnalysisResult {
  const lower = clauseText.toLowerCase();

  // High Risk Indicators
  if (lower.includes('uncapped') || lower.includes('indemnify') || lower.includes('hold harmless') || lower.includes('5 years') || lower.includes('regardless of whether payment')) {
    let category: RiskCategory = 'LIABILITY';
    if (lower.includes('indemnify')) category = 'INDEMNIFICATION';
    else if (lower.includes('5 years') || lower.includes('non-compete')) category = 'TERMINATION';
    else if (lower.includes('payment') || lower.includes('assigns')) category = 'INTELLECTUAL_PROPERTY';

    return {
      riskLevel: 'HIGH',
      category,
      reasoning: 'Clause introduces significant financial liability, severe post-termination restrictions, or unconditional IP transfer.',
      recommendation: 'Negotiate liability caps, limit scope to direct competitors, and make IP transfer contingent on payment.'
    };
  }

  // Ambiguous Risk Indicators
  if (lower.includes('jurisdiction') || lower.includes('governing law') || lower.includes('sole discretion') || lower.includes('maintenance')) {
    return {
      riskLevel: 'AMBIGUOUS',
      category: lower.includes('jurisdiction') ? 'GOVERNING_LAW' : 'LIABILITY',
      reasoning: 'Clause contains open-ended language or out-of-state legal venue requirements.',
      recommendation: 'Request explicit clarity, local arbitration venue, or objective standards.'
    };
  }

  // Green / Standard Favorable Indicators
  return {
    riskLevel: 'GREEN',
    category: 'CONFIDENTIALITY',
    reasoning: 'Standard commercial term aligned with standard market benchmark practices.',
    recommendation: 'Acceptable as written.'
  };
}

export function parseRawTextIntoClauses(rawDocumentText: string): Clause[] {
  if (!rawDocumentText) return [];

  const lines = rawDocumentText.split('\n');
  const clauses: Clause[] = [];
  let currentTitle = '';
  let currentBuffer = '';
  let lineStart = 1;
  let clauseIndex = 1;

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (trimmed.match(/^(SECTION|\d+\.|\bCLAUSE\b)/i) || trimmed.toUpperCase() === trimmed && trimmed.length > 5) {
      if (currentBuffer.length > 20) {
        const analysis = analyzeClauseRisk(currentBuffer);
        clauses.push({
          id: `custom-c-${clauseIndex}`,
          sectionTag: `CLAUSE-${clauseIndex}.0`,
          title: currentTitle || `Legal Section ${clauseIndex}`,
          originalText: currentBuffer.trim(),
          simplifiedText: `Plain English: ${currentBuffer.slice(0, 100)}...`,
          riskLevel: analysis.riskLevel,
          category: analysis.category,
          riskReason: analysis.reasoning,
          recommendation: analysis.recommendation,
          lineStart,
          lineEnd: idx,
        });
        clauseIndex++;
      }
      currentTitle = trimmed;
      currentBuffer = '';
      lineStart = idx + 1;
    } else {
      currentBuffer += ' ' + trimmed;
    }
  });

  if (currentBuffer.length > 20) {
    const analysis = analyzeClauseRisk(currentBuffer);
    clauses.push({
      id: `custom-c-${clauseIndex}`,
      sectionTag: `CLAUSE-${clauseIndex}.0`,
      title: currentTitle || `Legal Section ${clauseIndex}`,
      originalText: currentBuffer.trim(),
      simplifiedText: `Plain English: ${currentBuffer.slice(0, 100)}...`,
      riskLevel: analysis.riskLevel,
      category: analysis.category,
      riskReason: analysis.reasoning,
      recommendation: analysis.recommendation,
      lineStart,
      lineEnd: lines.length,
    });
  }

  return clauses;
}
