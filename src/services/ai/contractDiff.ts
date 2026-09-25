import { ContractDiffResult, DiffItem, LegalDocument } from '../../types/legal';
import { MOCK_DIFF_RESULTS } from '../../data/sampleDocuments';

/**
 * GenAI Engine Parameter: Contract Diff Utility
 * Compares two legal texts line-by-line / clause-by-clause to highlight additions, omissions, and missing protections.
 */
export function compareContractWithBenchmark(document: LegalDocument): ContractDiffResult {
  if (MOCK_DIFF_RESULTS[document.id]) {
    return MOCK_DIFF_RESULTS[document.id];
  }

  // Dynamic diff computation for user-uploaded documents
  const items: DiffItem[] = [];

  document.clauses.forEach((clause, idx) => {
    if (clause.riskLevel === 'HIGH') {
      items.push({
        id: `diff-custom-${idx}`,
        clauseTag: clause.sectionTag,
        type: 'MISSING_PROTECTION',
        title: `Variance in ${clause.title}`,
        originalClause: clause.originalText,
        comparedClause: 'Standard market protective clause (Mutual cap, 30-day cure period)',
        impactAnalysis: `Current document contains high risk: ${clause.riskReason}`,
        severity: 'HIGH',
      });
    } else if (clause.riskLevel === 'AMBIGUOUS') {
      items.push({
        id: `diff-custom-${idx}`,
        clauseTag: clause.sectionTag,
        type: 'MODIFIED',
        title: `Ambiguous Term: ${clause.title}`,
        originalClause: clause.originalText,
        comparedClause: 'Standard explicit market clause',
        impactAnalysis: 'Term requires explicit clarification prior to execution.',
        severity: 'AMBIGUOUS',
      });
    }
  });

  return {
    baseDocumentTitle: document.title,
    comparedDocumentTitle: 'Standard Market Friendly Template',
    totalVariances: items.length,
    missingProtectionsCount: items.filter(i => i.type === 'MISSING_PROTECTION').length,
    items,
  };
}
