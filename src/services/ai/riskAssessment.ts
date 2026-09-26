export type RiskLevel = "HIGH" | "AMBIGUOUS" | "GREEN";

export type ClauseCategory =
  | "INDEMNIFICATION"
  | "GOVERNING_LAW"
  | "NOTICES"
  | "GENERAL";

export interface ClauseRiskAssessment {
  riskLevel: RiskLevel;
  category: ClauseCategory;
}

/** Performs a deterministic first-pass assessment without requiring an AI service. */
export async function analyzeClauseRisk(
  clauseText: string,
): Promise<ClauseRiskAssessment> {
  const text = clauseText.toLowerCase();

  if (/indemnif|hold harmless|defend/.test(text)) {
    return { riskLevel: "HIGH", category: "INDEMNIFICATION" };
  }

  if (/governed by|governing law|laws of/.test(text)) {
    return { riskLevel: "AMBIGUOUS", category: "GOVERNING_LAW" };
  }

  if (/notices?\b/.test(text)) {
    return { riskLevel: "GREEN", category: "NOTICES" };
  }

  return { riskLevel: "GREEN", category: "GENERAL" };
}
