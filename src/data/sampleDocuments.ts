import { LegalDocument, ContractDiffResult, LawyerPrepSheet } from '../types/legal';

export const SAMPLE_DOCUMENTS: LegalDocument[] = [
  {
    id: 'doc-nda-01',
    title: 'Freelance Mutual NDA & IP Transfer.docx',
    type: 'NDA',
    dateAdded: '2026-09-24',
    fileSize: '42 KB',
    overallRiskScore: 78,
    summary: 'Contains critical risk clauses including unilateral perpetual IP assignment without milestone payment, broad non-compete restrictions, and unlimited indemnity obligations.',
    fullText: `MUTUAL NON-DISCLOSURE AND INTELLECTUAL PROPERTY AGREEMENT

SECTION 1. CONFIDENTIAL INFORMATION & DEFINITIONS
1.1 "Confidential Information" shall encompass all proprietary software, source code, trade secrets, customer records, financial projections, and strategic roadmap documents disclosed by Disclosing Party, whether orally, visually, or in writing.
1.2 Exclusions: Confidential Information shall not include information that is currently public knowledge through no breach of Recipient, or was independently developed without reference to Disclosing Party's materials.

SECTION 2. PERPETUAL NON-COMPETE & RESTRICTIVE COVENANTS
2.1 Non-Compete Restriction: During the term of this Agreement and for a period of five (5) years following termination, Consultant agrees not to directly or indirectly engage in, perform services for, consult with, or own equity in any commercial business entity competing within the same software domain worldwide.
2.2 Non-Solicitation: Consultant shall not solicit, recruit, or hire any employees, contractors, or client accounts of Disclosing Party for a period of thirty-six (36) months post-termination.

SECTION 3. INTELLECTUAL PROPERTY ASSIGNMENT
3.1 Unilateral Assignment: Consultant hereby irrevocably grants, assigns, and transfers to Company all rights, title, copyright, patent rights, and moral rights in all Work Product created during the engagement, immediately upon creation, regardless of whether payment has been remitted or disputed.

SECTION 4. INDEMNIFICATION & LIABILITY
4.1 Unlimited Indemnity: Consultant agrees to defend, indemnify, hold harmless, and reimburse Company from any and all third-party claims, attorney fees, liabilities, damages, or settlements arising out of any alleged negligence, contract breach, or copyright infringement.
4.2 Limitation of Liability Waiver: Company's total liability shall be capped at $100.00, whereas Consultant's liability shall remain completely uncapped and unlimited.

SECTION 5. GOVERNING LAW & JURISDICTION
5.1 Jurisdiction: This Agreement shall be governed strictly by the laws of the State of Delaware, and any arbitration or litigation shall take place exclusively in Wilmington, Delaware.`,
    clauses: [
      {
        id: 'c-nda-1',
        sectionTag: 'CLAUSE-2.1',
        title: '5-Year Worldwide Non-Compete Restriction',
        originalText: 'During the term of this Agreement and for a period of five (5) years following termination, Consultant agrees not to directly or indirectly engage in, perform services for, consult with, or own equity in any commercial business entity competing within the same software domain worldwide.',
        simplifiedText: 'You cannot work for, build, or consult with any company in the same industry anywhere in the world for 5 full years after this contract ends.',
        riskLevel: 'HIGH',
        category: 'TERMINATION',
        riskReason: 'Excessively broad 5-year global non-compete clause likely renders you unable to work in your primary profession.',
        recommendation: 'Negotiate to reduce non-compete duration to 6 months max, limit geographic scope, or restrict only to direct competitors.',
        lineStart: 8,
        lineEnd: 10,
      },
      {
        id: 'c-nda-2',
        sectionTag: 'CLAUSE-3.1',
        title: 'IP Assignment Prior to Full Payment',
        originalText: 'Consultant hereby irrevocably grants, assigns, and transfers to Company all rights, title, copyright, patent rights, and moral rights in all Work Product created during the engagement, immediately upon creation, regardless of whether payment has been remitted or disputed.',
        simplifiedText: 'The client owns all your work immediately as you make it, even if they refuse to pay you for it.',
        riskLevel: 'HIGH',
        category: 'INTELLECTUAL_PROPERTY',
        riskReason: 'Transfers full ownership of code and IP even if the client defaults on compensation.',
        recommendation: 'Add conditional language: "IP transfer shall take effect strictly upon full and final receipt of agreed payment."',
        lineStart: 13,
        lineEnd: 15,
      },
      {
        id: 'c-nda-3',
        sectionTag: 'CLAUSE-4.1',
        title: 'Uncapped Third-Party Indemnification',
        originalText: 'Consultant agrees to defend, indemnify, hold harmless, and reimburse Company from any and all third-party claims, attorney fees, liabilities, damages, or settlements arising out of any alleged negligence, contract breach, or copyright infringement.',
        simplifiedText: 'If anyone sues the client over the project, you must pay all legal bills and damages out of your own pocket.',
        riskLevel: 'HIGH',
        category: 'INDEMNIFICATION',
        riskReason: 'Exposes consultant to potentially catastrophic personal financial liability without cap.',
        recommendation: 'Cap indemnity to total fees paid under the contract and limit to willful misconduct.',
        lineStart: 18,
        lineEnd: 20,
      },
      {
        id: 'c-nda-4',
        sectionTag: 'CLAUSE-4.2',
        title: 'Asymmetric Liability Cap ($100 vs Unlimited)',
        originalText: "Company's total liability shall be capped at $100.00, whereas Consultant's liability shall remain completely uncapped and unlimited.",
        simplifiedText: "If the client breaches the contract, they only owe you $100 max. But if you breach, you owe unlimited money.",
        riskLevel: 'HIGH',
        category: 'LIABILITY',
        riskReason: 'Unfairly asymmetric liability structure favoring one party entirely.',
        recommendation: 'Make liability caps mutual and equal to 1x contract value.',
        lineStart: 21,
        lineEnd: 22,
      },
      {
        id: 'c-nda-5',
        sectionTag: 'CLAUSE-1.1',
        title: 'Definition of Confidential Information',
        originalText: 'Confidential Information shall encompass all proprietary software, source code, trade secrets, customer records, financial projections, and strategic roadmap documents disclosed by Disclosing Party.',
        simplifiedText: 'Confidential information includes code, business secrets, financial forecasts, and customer lists.',
        riskLevel: 'GREEN',
        category: 'CONFIDENTIALITY',
        riskReason: 'Standard industry definition of confidential business materials.',
        recommendation: 'Acceptable as written.',
        lineStart: 3,
        lineEnd: 5,
      },
      {
        id: 'c-nda-6',
        sectionTag: 'CLAUSE-5.1',
        title: 'Exclusive Jurisdiction (Delaware)',
        originalText: 'This Agreement shall be governed strictly by the laws of the State of Delaware, and any arbitration or litigation shall take place exclusively in Wilmington, Delaware.',
        simplifiedText: 'Any legal dispute must be handled in Delaware state courts.',
        riskLevel: 'AMBIGUOUS',
        category: 'GOVERNING_LAW',
        riskReason: 'Requires travel and out-of-state legal expenses if you reside outside Delaware.',
        recommendation: 'Request jurisdiction in your home state or local county arbitration.',
        lineStart: 25,
        lineEnd: 27,
      },
    ],
    obligations: [
      {
        id: 'ob-nda-1',
        party: 'USER',
        title: 'Maintain Strict Confidentiality',
        description: 'Keep all source code, customer data, and trade secrets secure and undisclosed.',
        riskLevel: 'GREEN',
      },
      {
        id: 'ob-nda-2',
        party: 'USER',
        title: 'Refrain from Competing Businesses',
        description: 'Do not perform services for competing software companies for 5 years.',
        deadline: '5 Years Post-Termination',
        riskLevel: 'HIGH',
      },
      {
        id: 'ob-nda-3',
        party: 'COUNTERPARTY',
        title: 'Remit Fee Payments',
        description: 'Pay agreed project invoices upon delivery.',
        riskLevel: 'AMBIGUOUS',
      },
    ],
  },
  {
    id: 'doc-lease-02',
    title: 'Residential Tenancy Agreement (Downtown).pdf',
    type: 'LEASE',
    dateAdded: '2026-09-20',
    fileSize: '128 KB',
    overallRiskScore: 54,
    summary: 'Residential lease with high automatic renewal penalties, tenant maintenance burden, and non-refundable security deposit deductions.',
    fullText: `RESIDENTIAL LEASE AGREEMENT

SECTION 1. PREMISES AND TERM
1.1 Property: Apartment 4B, 100 Main Street.
1.2 Term: Twelve (12) months starting October 1, 2026.

SECTION 2. RENT AND AUTOMATIC RENEWAL
2.1 Monthly Rent: $2,800.00 payable on the 1st of each calendar month. Late fee of $150 applies on the 3rd.
2.2 Automatic 24-Month Renewal: Tenant must provide written notice of non-renewal exactly 120 days prior to lease end. Failure to do so automatically renews lease for 24 months at a 20% rent increase.

SECTION 3. SECURITY DEPOSIT AND DEDUCTIONS
3.1 Security Deposit: $5,600 held by Landlord.
3.2 Deductions: Landlord reserves full right to deduct mandatory $800 cleaning fee and painting costs regardless of move-out condition.

SECTION 4. REPAIRS AND MAINTENANCE
4.1 Repairs: Tenant shall be responsible for all plumbing, HVAC, appliance repairs, and general upkeep exceeding $50 per incident.`,
    clauses: [
      {
        id: 'c-lease-1',
        sectionTag: 'CLAUSE-2.2',
        title: 'Automatic 24-Month Renewal & 20% Hike',
        originalText: 'Tenant must provide written notice of non-renewal exactly 120 days prior to lease end. Failure to do so automatically renews lease for 24 months at a 20% rent increase.',
        simplifiedText: 'If you miss the notice deadline 4 months before your lease ends, you are locked into a new 2-year lease with 20% higher rent.',
        riskLevel: 'HIGH',
        category: 'TERMINATION',
        riskReason: 'Unusually long 120-day notice window with severe automatic 24-month lock-in penalty.',
        recommendation: 'Negotiate notice period down to 30-60 days and cap auto-renewal to month-to-month.',
        lineStart: 8,
        lineEnd: 10,
      },
      {
        id: 'c-lease-2',
        sectionTag: 'CLAUSE-3.2',
        title: 'Mandatory Non-Refundable Deposit Deductions',
        originalText: 'Landlord reserves full right to deduct mandatory $800 cleaning fee and painting costs regardless of move-out condition.',
        simplifiedText: 'The landlord automatically keeps $800 of your deposit for cleaning, even if you leave the apartment spotless.',
        riskLevel: 'HIGH',
        category: 'PAYMENT_TERMS',
        riskReason: 'Violates standard tenant protection laws prohibiting mandatory automatic deposit retention.',
        recommendation: 'Strike mandatory deduction; limit deductions only to documented damage beyond normal wear & tear.',
        lineStart: 13,
        lineEnd: 15,
      },
      {
        id: 'c-lease-3',
        sectionTag: 'CLAUSE-4.1',
        title: 'Tenant Maintenance Responsibility ($50+)',
        originalText: 'Tenant shall be responsible for all plumbing, HVAC, appliance repairs, and general upkeep exceeding $50 per incident.',
        simplifiedText: 'You have to pay for fixing pipes, heater, or air conditioner if the bill is over $50.',
        riskLevel: 'AMBIGUOUS',
        category: 'LIABILITY',
        riskReason: 'Shifts structural and landlord maintenance duties onto the tenant.',
        recommendation: 'Landlord must handle structural, plumbing, and HVAC maintenance.',
        lineStart: 17,
        lineEnd: 18,
      },
    ],
    obligations: [
      {
        id: 'ob-lease-1',
        party: 'USER',
        title: 'Pay Rent by 1st of Month',
        description: '$2,800/month rent. $150 late fee after 3rd.',
        deadline: '1st of every month',
        riskLevel: 'GREEN',
      },
      {
        id: 'ob-lease-2',
        party: 'USER',
        title: 'Send Non-Renewal Notice',
        description: 'Must deliver written notice 120 days prior to end of term.',
        deadline: '120 Days Before Lease End',
        riskLevel: 'HIGH',
      },
    ],
  },
  {
    id: 'doc-tos-03',
    title: 'Enterprise SaaS Terms of Service.md',
    type: 'TOS',
    dateAdded: '2026-09-18',
    fileSize: '88 KB',
    overallRiskScore: 32,
    summary: 'Standard Enterprise SaaS agreement with acceptable data protection and standard SLA terms.',
    fullText: `ENTERPRISE SAAS TERMS OF SERVICE

SECTION 1. SERVICE AVAILABILITY & SLA
1.1 Uptime Guarantee: Provider guarantees 99.9% monthly service availability excluding scheduled maintenance.
1.2 SLA Credits: If uptime falls below 99.9%, Customer receives a 10% monthly fee credit.

SECTION 2. DATA PRIVACY AND SECURITY
2.1 Customer Ownership: Customer retains sole ownership and title to all uploaded Customer Data.
2.2 SOC2 Compliance: Provider maintains SOC 2 Type II certification and encryption at rest (AES-256) and in transit (TLS 1.3).`,
    clauses: [
      {
        id: 'c-tos-1',
        sectionTag: 'CLAUSE-1.1',
        title: '99.9% Monthly Uptime SLA',
        originalText: 'Provider guarantees 99.9% monthly service availability excluding scheduled maintenance.',
        simplifiedText: 'The software will be available 99.9% of the time every month.',
        riskLevel: 'GREEN',
        category: 'PAYMENT_TERMS',
        riskReason: 'Favorable industry standard SLA commitment.',
        recommendation: 'Standard term.',
        lineStart: 4,
        lineEnd: 5,
      },
      {
        id: 'c-tos-2',
        sectionTag: 'CLAUSE-2.1',
        title: 'Customer Data Ownership Guarantee',
        originalText: 'Customer retains sole ownership and title to all uploaded Customer Data.',
        simplifiedText: 'You own 100% of the data you upload to the app.',
        riskLevel: 'GREEN',
        category: 'INTELLECTUAL_PROPERTY',
        riskReason: 'Protects user data privacy and proprietary rights.',
        recommendation: 'Favorable term.',
        lineStart: 8,
        lineEnd: 9,
      },
    ],
    obligations: [
      {
        id: 'ob-tos-1',
        party: 'USER',
        title: 'Timely Subscription Payment',
        description: 'Pay monthly subscription fee within 30 net days.',
        riskLevel: 'GREEN',
      },
    ],
  }
];

export const MOCK_DIFF_RESULTS: Record<string, ContractDiffResult> = {
  'doc-nda-01': {
    baseDocumentTitle: 'Freelance Mutual NDA & IP Transfer.docx',
    comparedDocumentTitle: 'Standard Market Friendly NDA (Benchmark)',
    totalVariances: 4,
    missingProtectionsCount: 2,
    items: [
      {
        id: 'diff-1',
        clauseTag: 'CLAUSE-2.1',
        type: 'MODIFIED',
        title: 'Non-Compete Duration & Territory',
        originalClause: '5 years worldwide non-compete restriction',
        comparedClause: 'No non-compete restriction (or 6-month limited scope)',
        impactAnalysis: 'Current contract restricts client work globally for 5 years. Market benchmark has zero non-compete.',
        severity: 'HIGH',
      },
      {
        id: 'diff-2',
        clauseTag: 'CLAUSE-3.1',
        type: 'MISSING_PROTECTION',
        title: 'Payment Contingency for IP Transfer',
        originalClause: 'IP assigns immediately upon creation regardless of payment',
        comparedClause: 'IP transfers strictly upon receipt of full payment',
        impactAnalysis: 'Missing standard protective clause that prevents client from keeping code without paying.',
        severity: 'HIGH',
      },
      {
        id: 'diff-3',
        clauseTag: 'CLAUSE-4.2',
        type: 'MODIFIED',
        title: 'Mutual Liability Cap Asymmetry',
        originalClause: "Company capped at $100; Consultant uncapped",
        comparedClause: 'Mutual liability cap equal to total fees paid',
        impactAnalysis: 'Current contract creates extreme liability asymmetry favoring the company.',
        severity: 'HIGH',
      },
      {
        id: 'diff-4',
        clauseTag: 'CLAUSE-1.2',
        type: 'ADDED',
        title: 'Standard Confidentiality Exclusions',
        originalClause: 'Includes standard public domain and independent development exceptions',
        comparedClause: 'Matches benchmark',
        impactAnalysis: 'Favorable match with market standard exclusions.',
        severity: 'GREEN',
      },
    ],
  },
};

export const MOCK_PREP_SHEETS: Record<string, LawyerPrepSheet> = {
  'doc-nda-01': {
    documentId: 'doc-nda-01',
    documentTitle: 'Freelance Mutual NDA & IP Transfer.docx',
    generatedDate: '2026-09-25',
    executiveBrief: 'This agreement contains severe high-risk terms regarding global non-competes, premature IP assignment prior to payment, and uncapped liability. Professional legal revision is strongly advised before signing.',
    highPriorityRisks: [
      {
        clauseTag: 'CLAUSE-2.1',
        issue: '5-Year Global Non-Compete Restriction',
        impact: 'Prevents you from taking engineering contracts or employment anywhere in the software sector worldwide.',
        proposedFix: 'Strike Clause 2.1 entirely or limit to 6-month non-solicitation of direct clients.',
      },
      {
        clauseTag: 'CLAUSE-3.1',
        issue: 'IP Assignment Prior to Payment',
        impact: 'Company acquires full ownership of your deliverables even if they default on invoice payment.',
        proposedFix: 'Add prerequisite: "Assignment shall take effect upon receipt of cleared funds."',
      },
      {
        clauseTag: 'CLAUSE-4.1 & 4.2',
        issue: 'Uncapped Liability & $100 Company Cap',
        impact: 'Exposes consultant to unlimited personal financial damages while capping company liability at $100.',
        proposedFix: 'Implement mutual liability cap equal to total project compensation.',
      }
    ],
    questionsForCounsel: [
      'Is the 5-year global non-compete enforceable under Delaware law for an independent contractor?',
      'How can we best frame the IP assignment clause to retain a security interest until final invoice payment?',
      'Will removing the indemnification clause leave me exposed to third-party IP claims, or can we add standard warranty disclaimers?'
    ],
    suggestedRedlines: [
      {
        clauseTag: 'CLAUSE-3.1',
        currentText: 'regardless of whether payment has been remitted or disputed.',
        proposedRedline: 'conditioned upon Consultant\'s receipt of full and final payment under this Agreement.',
        rationale: 'Protects developer from non-payment and contract default.'
      },
      {
        clauseTag: 'CLAUSE-4.2',
        currentText: 'Company\'s total liability shall be capped at $100.00, whereas Consultant\'s liability shall remain completely uncapped...',
        proposedRedline: 'Each party\'s aggregate liability under this Agreement shall be limited to the total fees paid or payable by Company to Consultant in the preceding 12 months.',
        rationale: 'Establishes fair, standard mutual liability limits.'
      }
    ],
    keyDatesAndDeadlines: [
      {
        label: 'Contract Execution Date',
        dateOrTimeframe: 'Prior to Project Commencement',
        actionRequired: 'Submit revised redlined draft to company legal counsel.'
      },
      {
        label: 'Post-Termination Non-Solicit Window',
        dateOrTimeframe: '36 Months Post-Termination',
        actionRequired: 'Refrain from directly recruiting company staff or active clients.'
      }
    ]
  }
};
