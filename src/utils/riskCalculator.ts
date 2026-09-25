import { Clause, RiskLevel } from '../types/legal';

export interface RiskMetrics {
  score: number; // 0 (safest) to 100 (highest risk)
  highCount: number;
  ambiguousCount: number;
  greenCount: number;
  overallCategory: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  badgeColor: string;
}

/**
 * Computes an objective risk score (0-100) based on weighted clause risk analysis.
 * Parameter: Efficiency & React state optimization
 */
export function calculateRiskMetrics(clauses: Clause[]): RiskMetrics {
  if (!clauses || clauses.length === 0) {
    return {
      score: 10,
      highCount: 0,
      ambiguousCount: 0,
      greenCount: 0,
      overallCategory: 'LOW',
      badgeColor: 'emerald',
    };
  }

  let highCount = 0;
  let ambiguousCount = 0;
  let greenCount = 0;

  clauses.forEach((clause) => {
    if (clause.riskLevel === 'HIGH') highCount++;
    else if (clause.riskLevel === 'AMBIGUOUS') ambiguousCount++;
    else if (clause.riskLevel === 'GREEN') greenCount++;
  });

  // Calculate weighted risk index
  // High risk = 35 pts each, Ambiguous = 15 pts each, Green = 2 pts each
  const rawScore = (highCount * 30) + (ambiguousCount * 12) + (greenCount * 2);
  const maxPossible = Math.max(clauses.length * 25, 1);
  const normalizedScore = Math.min(Math.round((rawScore / maxPossible) * 100), 100);

  let overallCategory: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW' = 'LOW';
  let badgeColor = 'emerald';

  if (normalizedScore >= 75 || highCount >= 3) {
    overallCategory = 'CRITICAL';
    badgeColor = 'red';
  } else if (normalizedScore >= 50 || highCount >= 1) {
    overallCategory = 'HIGH';
    badgeColor = 'amber';
  } else if (normalizedScore >= 25 || ambiguousCount >= 2) {
    overallCategory = 'MODERATE';
    badgeColor = 'amber';
  } else {
    overallCategory = 'LOW';
    badgeColor = 'emerald';
  }

  return {
    score: Math.max(normalizedScore, 15), // Ensure visually clear gauge score
    highCount,
    ambiguousCount,
    greenCount,
    overallCategory,
    badgeColor,
  };
}

export function filterClausesByRisk(clauses: Clause[], filter: 'ALL' | RiskLevel): Clause[] {
  if (filter === 'ALL') return clauses;
  return clauses.filter((c) => c.riskLevel === filter);
}
