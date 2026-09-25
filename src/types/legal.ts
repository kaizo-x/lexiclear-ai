export type RiskLevel = 'HIGH' | 'AMBIGUOUS' | 'GREEN';
export type FilterRiskLevel = 'ALL' | 'HIGH' | 'AMBIGUOUS' | 'GREEN';

export type RiskCategory = 
  | 'LIABILITY'
  | 'INDEMNIFICATION'
  | 'TERMINATION'
  | 'INTELLECTUAL_PROPERTY'
  | 'CONFIDENTIALITY'
  | 'GOVERNING_LAW'
  | 'PAYMENT_TERMS';

export interface Clause {
  id: string;
  sectionTag: string; // e.g. "CLAUSE-3.1"
  title: string;
  originalText: string;
  simplifiedText: string; // 5th grade plain English translation
  riskLevel: RiskLevel;
  category: RiskCategory;
  riskReason: string;
  recommendation: string;
  lineStart: number;
  lineEnd: number;
}

export interface Obligation {
  id: string;
  party: 'USER' | 'COUNTERPARTY' | 'MUTUAL';
  title: string;
  description: string;
  deadline?: string;
  riskLevel: RiskLevel;
}

export interface LegalDocument {
  id: string;
  title: string;
  type: 'NDA' | 'LEASE' | 'TOS' | 'CUSTOM';
  dateAdded: string;
  fileSize: string;
  overallRiskScore: number; // 0 to 100
  summary: string;
  clauses: Clause[];
  obligations: Obligation[];
  fullText: string;
}

export interface DiffItem {
  id: string;
  clauseTag: string;
  type: 'ADDED' | 'REMOVED' | 'MODIFIED' | 'MISSING_PROTECTION';
  title: string;
  originalClause?: string;
  comparedClause?: string;
  impactAnalysis: string;
  severity: RiskLevel;
}

export interface ContractDiffResult {
  baseDocumentTitle: string;
  comparedDocumentTitle: string;
  totalVariances: number;
  missingProtectionsCount: number;
  items: DiffItem[];
}

export interface LawyerPrepSheet {
  documentId: string;
  documentTitle: string;
  generatedDate: string;
  executiveBrief: string;
  highPriorityRisks: {
    clauseTag: string;
    issue: string;
    impact: string;
    proposedFix: string;
  }[];
  questionsForCounsel: string[];
  suggestedRedlines: {
    clauseTag: string;
    currentText: string;
    proposedRedline: string;
    rationale: string;
  }[];
  keyDatesAndDeadlines: {
    label: string;
    dateOrTimeframe: string;
    actionRequired: string;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'USER' | 'ASSISTANT';
  text: string;
  timestamp: string;
  citedClauseTags?: string[];
}
