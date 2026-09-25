import { describe, it, expect } from 'vitest';
import { analyzeClauseRisk } from '../services/ai/riskAssessment';
import { calculateRiskMetrics } from '../utils/riskCalculator';
import { Clause } from '../types/legal';

describe('Risk & Obligation Assessment Engine', () => {
  it('should categorize indemnification clauses with unlimited liability as HIGH risk', () => {
    const text = 'Consultant agrees to defend and indemnify Company from all third-party claims without limit.';
    const result = analyzeClauseRisk(text);
    expect(result.riskLevel).toBe('HIGH');
    expect(result.category).toBe('INDEMNIFICATION');
  });

  it('should categorize governing law clauses as AMBIGUOUS risk', () => {
    const text = 'This agreement shall be governed strictly by the state court jurisdiction in Delaware.';
    const result = analyzeClauseRisk(text);
    expect(result.riskLevel).toBe('AMBIGUOUS');
    expect(result.category).toBe('GOVERNING_LAW');
  });

  it('should categorize standard confidentiality as GREEN risk', () => {
    const text = 'Party agrees to maintain standard confidentiality over technical documentation.';
    const result = analyzeClauseRisk(text);
    expect(result.riskLevel).toBe('GREEN');
  });

  it('should calculate accurate risk metrics from a set of clauses', () => {
    const testClauses: Clause[] = [
      {
        id: '1',
        sectionTag: 'CLAUSE-1.1',
        title: 'High Risk Clause',
        originalText: 'Indemnify without limit',
        simplifiedText: 'Plain text',
        riskLevel: 'HIGH',
        category: 'INDEMNIFICATION',
        riskReason: 'Uncapped liability',
        recommendation: 'Cap it',
        lineStart: 1,
        lineEnd: 2,
      },
      {
        id: '2',
        sectionTag: 'CLAUSE-1.2',
        title: 'Green Clause',
        originalText: 'Standard confidentiality',
        simplifiedText: 'Plain text',
        riskLevel: 'GREEN',
        category: 'CONFIDENTIALITY',
        riskReason: 'Standard',
        recommendation: 'Keep',
        lineStart: 3,
        lineEnd: 4,
      }
    ];

    const metrics = calculateRiskMetrics(testClauses);
    expect(metrics.highCount).toBe(1);
    expect(metrics.greenCount).toBe(1);
    expect(metrics.score).toBeGreaterThan(30);
  });
});
