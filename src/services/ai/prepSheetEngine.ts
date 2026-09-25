import { LawyerPrepSheet, LegalDocument } from '../../types/legal';
import { MOCK_PREP_SHEETS } from '../../data/sampleDocuments';

/**
 * GenAI Engine Parameter: Professional Preparation Engine
 * Generates structured, actionable 1-page consultation briefs for legal counsel.
 */
export function generateLawyerPrepSheet(document: LegalDocument): LawyerPrepSheet {
  if (MOCK_PREP_SHEETS[document.id]) {
    return MOCK_PREP_SHEETS[document.id];
  }

  const highRisks = document.clauses.filter(c => c.riskLevel === 'HIGH');
  
  return {
    documentId: document.id,
    documentTitle: document.title,
    generatedDate: new Date().toISOString().split('T')[0],
    executiveBrief: `Legal analysis completed for ${document.title}. Identified ${highRisks.length} high-risk clauses requiring professional legal review and redlining.`,
    highPriorityRisks: highRisks.map(c => ({
      clauseTag: c.sectionTag,
      issue: c.title,
      impact: c.riskReason,
      proposedFix: c.recommendation,
    })),
    questionsForCounsel: [
      'What are the legal enforcement precedents for these specific terms in our jurisdiction?',
      'How should we structure the liability cap to ensure mutual protection?',
      'Can we insert a standard cure period before default remedies apply?'
    ],
    suggestedRedlines: highRisks.map(c => ({
      clauseTag: c.sectionTag,
      currentText: c.originalText.slice(0, 80) + '...',
      proposedRedline: `Proposed revision: ${c.recommendation}`,
      rationale: c.riskReason,
    })),
    keyDatesAndDeadlines: [
      {
        label: 'Contract Execution Target',
        dateOrTimeframe: 'Prior to signature',
        actionRequired: 'Submit redlines to counterparty legal counsel.'
      }
    ]
  };
}
