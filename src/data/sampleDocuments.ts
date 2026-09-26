import { LegalDocument, ContractDiffResult, LawyerPrepSheet } from '../types/legal';

export const SAMPLE_DOCUMENTS: LegalDocument[] = [
  // ── 1. Indian NDA ─────────────────────────────────────────────────────────
  {
    id: 'doc-nda-01',
    title: 'Freelance NDA & IP Assignment — Mumbai.docx',
    type: 'NDA',
    dateAdded: '2026-09-24',
    fileSize: '42 KB',
    overallRiskScore: 78,
    summary:
      'High-risk Indian NDA containing a 3-year worldwide non-compete (potentially void under Section 27, Indian Contract Act, 1872), unilateral IP assignment prior to payment, uncapped indemnity under Indian law, and an unfavourable Mumbai seat arbitration clause.',
    fullText: `NON-DISCLOSURE AND INTELLECTUAL PROPERTY ASSIGNMENT AGREEMENT
Governed by the laws of India | Seat of Arbitration: Mumbai

SECTION 1. DEFINITIONS
1.1 "Confidential Information" includes all proprietary software, source code, trade secrets, client databases, financial projections, and strategic plans disclosed by Disclosing Party, whether orally or in writing.
1.2 Exclusions: Information already in the public domain through no fault of the Recipient or independently developed by the Recipient shall not be deemed confidential.

SECTION 2. NON-COMPETE & RESTRICTIVE COVENANTS
2.1 Non-Compete: During the term and for THREE (3) years following termination, the Consultant agrees not to engage in, perform services for, or hold equity in any business competing in the same software or technology domain worldwide.
2.2 Non-Solicitation: Consultant shall not solicit or hire any employee or client of Disclosing Party for THIRTY-SIX (36) months post-termination.

SECTION 3. INTELLECTUAL PROPERTY ASSIGNMENT
3.1 Immediate Assignment: Consultant irrevocably assigns to the Company all rights, title, and moral rights in all Work Product immediately upon creation, regardless of whether payment has been received or is in dispute.

SECTION 4. INDEMNIFICATION & LIABILITY
4.1 Unlimited Indemnity: Consultant agrees to indemnify and hold harmless the Company from any and all third-party claims, legal costs, and damages arising from alleged breach or negligence.
4.2 Asymmetric Cap: Company's aggregate liability shall be capped at INR 5,000 (Five Thousand Rupees only). Consultant's liability remains uncapped and unlimited.

SECTION 5. DISPUTE RESOLUTION & GOVERNING LAW
5.1 Governing Law: This Agreement is governed by the laws of India. Disputes shall be resolved by a sole arbitrator under the Arbitration and Conciliation Act, 1996, with seat at Mumbai, Maharashtra.`,
    clauses: [
      {
        id: 'c-nda-1',
        sectionTag: 'CLAUSE-2.1',
        title: '3-Year Worldwide Non-Compete',
        originalText:
          'During the term and for THREE (3) years following termination, the Consultant agrees not to engage in, perform services for, or hold equity in any business competing in the same software or technology domain worldwide.',
        simplifiedText:
          'You cannot work for, build, or invest in any tech company worldwide for 3 full years after this contract ends.',
        riskLevel: 'HIGH',
        category: 'TERMINATION',
        riskReason:
          'Broad post-termination non-compete clauses are void under Section 27 of the Indian Contract Act, 1872, which restricts "restraint of trade." Courts in India rarely enforce such clauses beyond the contract period.',
        recommendation:
          'Strike Clause 2.1 or narrow to: "Non-solicitation of direct clients for 12 months, limited to [State/City]." A non-solicitation clause is more likely to be enforceable under Indian law.',
        lineStart: 8,
        lineEnd: 10,
      },
      {
        id: 'c-nda-2',
        sectionTag: 'CLAUSE-3.1',
        title: 'IP Assignment Prior to Full Payment',
        originalText:
          'Consultant irrevocably assigns to the Company all rights, title, and moral rights in all Work Product immediately upon creation, regardless of whether payment has been received or is in dispute.',
        simplifiedText:
          'The client owns everything you create the moment you create it — even if they never pay you a single rupee.',
        riskLevel: 'HIGH',
        category: 'INTELLECTUAL_PROPERTY',
        riskReason:
          'Under the Copyright Act, 1957 and Indian Contract Act, 1872, assignment without consideration (payment) may be challenged. Immediate assignment without payment security leaves you with no recourse.',
        recommendation:
          'Add: "IP assignment shall take effect only upon Consultant\'s receipt of full and cleared payment as per the agreed payment schedule."',
        lineStart: 13,
        lineEnd: 15,
      },
      {
        id: 'c-nda-3',
        sectionTag: 'CLAUSE-4.1',
        title: 'Uncapped Third-Party Indemnification',
        originalText:
          'Consultant agrees to indemnify and hold harmless the Company from any and all third-party claims, legal costs, and damages arising from alleged breach or negligence.',
        simplifiedText:
          'If anyone sues the company because of your work, you must pay all their legal costs and damages with no upper limit.',
        riskLevel: 'HIGH',
        category: 'INDEMNIFICATION',
        riskReason:
          'Unlimited indemnity exposes you to catastrophic personal financial liability. Indian courts may enforce this as written.',
        recommendation:
          'Cap indemnity at the total fees paid under this Agreement and limit to proven wilful misconduct or gross negligence.',
        lineStart: 18,
        lineEnd: 20,
      },
      {
        id: 'c-nda-4',
        sectionTag: 'CLAUSE-4.2',
        title: 'Asymmetric Liability Cap (INR 5,000 vs Unlimited)',
        originalText:
          "Company's aggregate liability shall be capped at INR 5,000 (Five Thousand Rupees only). Consultant's liability remains uncapped and unlimited.",
        simplifiedText:
          'If the company breaks the contract, they owe you at most ₹5,000. But if you break it, you owe them unlimited money.',
        riskLevel: 'HIGH',
        category: 'LIABILITY',
        riskReason:
          'Grossly asymmetric liability structure. INR 5,000 cap for a company while the consultant bears unlimited exposure is commercially unreasonable.',
        recommendation:
          'Negotiate mutual liability caps equal to the total project fees paid in the preceding 6 months.',
        lineStart: 21,
        lineEnd: 22,
      },
      {
        id: 'c-nda-5',
        sectionTag: 'CLAUSE-1.1',
        title: 'Definition of Confidential Information',
        originalText:
          '"Confidential Information" includes all proprietary software, source code, trade secrets, client databases, financial projections, and strategic plans disclosed by Disclosing Party, whether orally or in writing.',
        simplifiedText:
          'Confidential information means code, business secrets, financial forecasts, and client data.',
        riskLevel: 'GREEN',
        category: 'CONFIDENTIALITY',
        riskReason: 'Standard industry definition aligned with Trade Secrets jurisprudence in India.',
        recommendation: 'Acceptable as written.',
        lineStart: 3,
        lineEnd: 5,
      },
      {
        id: 'c-nda-6',
        sectionTag: 'CLAUSE-5.1',
        title: 'Arbitration Seat — Mumbai (Arbitration Act, 1996)',
        originalText:
          'Disputes shall be resolved by a sole arbitrator under the Arbitration and Conciliation Act, 1996, with seat at Mumbai, Maharashtra.',
        simplifiedText: 'Any legal dispute must go through a single arbitrator in Mumbai under Indian arbitration law.',
        riskLevel: 'AMBIGUOUS',
        category: 'GOVERNING_LAW',
        riskReason:
          'Arbitration in Mumbai is legally sound but may be cost-prohibitive if you are based in another city. The Act is governed by Arbitration and Conciliation Act, 1996 as amended in 2015 and 2019.',
        recommendation:
          'Specify: "Arbitration to be conducted via Mumbai Centre for International Arbitration (MCIA) or online via video hearing to reduce geographic burden."',
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
        description: 'Do not work for competing tech companies for 3 years post-termination (likely void under Section 27, ICA).',
        deadline: '3 Years Post-Termination',
        riskLevel: 'HIGH',
      },
      {
        id: 'ob-nda-3',
        party: 'COUNTERPARTY',
        title: 'Timely Payment of Fees',
        description: 'Pay agreed project invoices upon delivery milestones.',
        riskLevel: 'AMBIGUOUS',
      },
    ],
  },

  // ── 2. Indian Vendor Agreement ─────────────────────────────────────────────
  {
    id: 'doc-vendor-02',
    title: 'IT Vendor Services Agreement — Bengaluru.pdf',
    type: 'TOS',
    dateAdded: '2026-09-20',
    fileSize: '128 KB',
    overallRiskScore: 54,
    summary:
      'IT Vendor agreement with auto-renewal without adequate notice, unilateral SLA penalty deductions from invoices, and broad IP ownership claim on vendor tools. Governing law: Karnataka jurisdiction.',
    fullText: `IT VENDOR SERVICES AGREEMENT
Governed by the laws of India | Jurisdiction: High Court of Karnataka, Bengaluru

SECTION 1. SERVICES & TERM
1.1 Services: Vendor shall provide software development, testing, and DevOps support as per the Statement of Work (SOW).
1.2 Term: Twelve (12) months commencing from the Effective Date.

SECTION 2. PAYMENT & AUTO-RENEWAL PENALTY
2.1 Fees: INR 3,00,000 per month payable within 15 days of invoice. Delayed payment attracts interest at 18% per annum (as per MSMED Act, 2006 provisions).
2.2 Auto-Renewal: This Agreement auto-renews for 12 months unless either party delivers written notice 90 days before expiry. Failure to notify results in binding renewal.

SECTION 3. SLA & PENALTY DEDUCTIONS
3.1 Uptime SLA: Vendor guarantees 99.5% monthly availability of all delivered systems.
3.2 Penalty: For each 0.1% downtime below the SLA threshold, Client may deduct INR 10,000 from the outstanding invoice without Vendor consent.

SECTION 4. INTELLECTUAL PROPERTY
4.1 Work-for-Hire: All deliverables, including vendor's pre-existing tools adapted for this engagement, shall vest exclusively in the Client upon delivery.`,
    clauses: [
      {
        id: 'c-vendor-1',
        sectionTag: 'CLAUSE-2.2',
        title: 'Auto-Renewal — 90-Day Notice Trap',
        originalText:
          'This Agreement auto-renews for 12 months unless either party delivers written notice 90 days before expiry. Failure to notify results in binding renewal.',
        simplifiedText:
          'If you forget to send a cancellation letter 3 months before the contract ends, you are locked into another full year.',
        riskLevel: 'HIGH',
        category: 'TERMINATION',
        riskReason:
          'A 90-day notice window is excessively long for an annual IT vendor contract. Missing the window binds you to another 12-month commitment.',
        recommendation:
          'Negotiate notice period to 30 days and allow month-to-month continuation at the same rate instead of a forced 12-month renewal.',
        lineStart: 8,
        lineEnd: 10,
      },
      {
        id: 'c-vendor-2',
        sectionTag: 'CLAUSE-3.2',
        title: 'Unilateral SLA Penalty Deductions',
        originalText:
          'For each 0.1% downtime below the SLA threshold, Client may deduct INR 10,000 from the outstanding invoice without Vendor consent.',
        simplifiedText:
          'The client can automatically cut your payment for downtime without asking you or proving the downtime occurred.',
        riskLevel: 'HIGH',
        category: 'PAYMENT_TERMS',
        riskReason:
          'Unilateral deduction without a dispute resolution mechanism is potentially unlawful. Under MSMED Act, 2006, payment delay beyond agreed terms attracts compound interest and the client cannot set off arbitrary amounts.',
        recommendation:
          'Add: "SLA penalty deductions are subject to written notice and a 7-day dispute window. Disputed amounts shall be held in escrow until resolution."',
        lineStart: 13,
        lineEnd: 15,
      },
      {
        id: 'c-vendor-3',
        sectionTag: 'CLAUSE-4.1',
        title: 'IP Assignment Including Pre-Existing Vendor Tools',
        originalText:
          "All deliverables, including vendor's pre-existing tools adapted for this engagement, shall vest exclusively in the Client upon delivery.",
        simplifiedText:
          'The client gets ownership of not just what you build for them, but also your own tools and frameworks that you brought in.',
        riskLevel: 'AMBIGUOUS',
        category: 'INTELLECTUAL_PROPERTY',
        riskReason:
          'Assignment of pre-existing vendor IP (background IP) is commercially unreasonable and contradicts standard IT vendor practice in India.',
        recommendation:
          'Exclude pre-existing IP explicitly: "Vendor retains all rights in background IP, tools, and frameworks. Client receives a perpetual, non-exclusive licence to use adapted deliverables."',
        lineStart: 17,
        lineEnd: 18,
      },
      {
        id: 'c-vendor-4',
        sectionTag: 'CLAUSE-2.1',
        title: 'MSMED Act Interest on Delayed Payment (18% p.a.)',
        originalText:
          'Delayed payment attracts interest at 18% per annum (as per MSMED Act, 2006 provisions).',
        simplifiedText:
          'If the client pays you late, they owe you 18% per year interest — which is a strong legal protection for you as a vendor.',
        riskLevel: 'GREEN',
        category: 'PAYMENT_TERMS',
        riskReason: 'Favorable clause referencing MSMED Act, 2006 which provides legal backing for interest on delayed payments to MSMEs.',
        recommendation: 'Retain this clause as it protects your payment rights under Indian MSME law.',
        lineStart: 21,
        lineEnd: 22,
      },
    ],
    obligations: [
      {
        id: 'ob-vendor-1',
        party: 'USER',
        title: 'Deliver Monthly Invoice',
        description: 'Issue invoice by the 1st of each month for INR 3,00,000.',
        deadline: '1st of every month',
        riskLevel: 'GREEN',
      },
      {
        id: 'ob-vendor-2',
        party: 'USER',
        title: 'Send Non-Renewal Notice',
        description: 'Must deliver written non-renewal notice 90 days before contract expiry.',
        deadline: '90 Days Before Expiry',
        riskLevel: 'HIGH',
      },
    ],
  },

  // ── 3. Indian Employment Contract ─────────────────────────────────────────
  {
    id: 'doc-emp-03',
    title: 'Senior Engineer Employment Agreement — Pune.md',
    type: 'TOS',
    dateAdded: '2026-09-18',
    fileSize: '88 KB',
    overallRiskScore: 32,
    summary:
      'Standard Indian employment agreement with fair compensation, statutory PF/ESIC compliance, and a straightforward 3-month notice period. Governing law: Bombay High Court jurisdiction.',
    fullText: `EMPLOYMENT AGREEMENT
Governed by the laws of India | Jurisdiction: High Court of Bombay

SECTION 1. POSITION & COMPENSATION
1.1 Role: Senior Software Engineer, reporting to VP Engineering.
1.2 CTC: INR 24,00,000 per annum (Cost to Company) inclusive of basic salary, HRA, and variable pay component of 15%.
1.3 PF & ESIC: Employer shall make statutory Provident Fund (EPF) and ESIC contributions as per Employees' Provident Funds and Miscellaneous Provisions Act, 1952.

SECTION 2. NOTICE PERIOD & TERMINATION
2.1 Notice Period: Either party may terminate this Agreement by providing three (3) months' written notice or payment of salary in lieu thereof.
2.2 Cause Termination: In cases of proven gross misconduct, fraud, or breach of fiduciary duty, the Company may terminate without notice.

SECTION 3. INTELLECTUAL PROPERTY
3.1 Work IP: All software, inventions, and deliverables created in the course of employment vest exclusively in the Company.`,
    clauses: [
      {
        id: 'c-emp-1',
        sectionTag: 'CLAUSE-1.3',
        title: 'Statutory PF & ESIC Contributions',
        originalText:
          "Employer shall make statutory Provident Fund (EPF) and ESIC contributions as per Employees' Provident Funds and Miscellaneous Provisions Act, 1952.",
        simplifiedText:
          "The company must contribute to your PF and ESIC as required by Indian law — this money goes towards your retirement and health insurance.",
        riskLevel: 'GREEN',
        category: 'PAYMENT_TERMS',
        riskReason: 'Mandatory statutory compliance under EPF & MP Act, 1952 and ESI Act, 1948. Favorable for employee.',
        recommendation: 'Favorable statutory clause. Verify actual PF deductions appear on your salary slips.',
        lineStart: 4,
        lineEnd: 5,
      },
      {
        id: 'c-emp-2',
        sectionTag: 'CLAUSE-2.1',
        title: '3-Month Notice Period (Both Ways)',
        originalText:
          'Either party may terminate this Agreement by providing three (3) months\' written notice or payment of salary in lieu thereof.',
        simplifiedText:
          'Both you and the company must give 3 months\' notice before leaving or firing, unless they pay you 3 months\' salary instead.',
        riskLevel: 'GREEN',
        category: 'TERMINATION',
        riskReason: 'Standard 3-month bilateral notice period common in Indian IT industry.',
        recommendation: 'Acceptable as written. Ensure garden leave provisions are included if data security is a concern.',
        lineStart: 8,
        lineEnd: 9,
      },
      {
        id: 'c-emp-3',
        sectionTag: 'CLAUSE-3.1',
        title: 'Employment IP Assignment',
        originalText:
          'All software, inventions, and deliverables created in the course of employment vest exclusively in the Company.',
        simplifiedText:
          'Everything you build while working here belongs to the company — this is standard for employment contracts.',
        riskLevel: 'AMBIGUOUS',
        category: 'INTELLECTUAL_PROPERTY',
        riskReason:
          'Assignment is standard for employment, but scope is not limited to work done "during working hours" or "using company resources". Side projects could be captured.',
        recommendation:
          'Add carveout: "IP assignment applies only to work performed using company resources or during working hours directly related to the company\'s business."',
        lineStart: 12,
        lineEnd: 13,
      },
    ],
    obligations: [
      {
        id: 'ob-emp-1',
        party: 'COUNTERPARTY',
        title: 'Monthly Salary Payment',
        description: 'Pay monthly salary components as per agreed CTC structure.',
        deadline: 'Last working day of month',
        riskLevel: 'GREEN',
      },
      {
        id: 'ob-emp-2',
        party: 'USER',
        title: 'Serve Notice Period',
        description: '3-month notice or salary buyout required before resignation.',
        riskLevel: 'AMBIGUOUS',
      },
    ],
  },
];

// ── Mock Diff Data (Indian context) ──────────────────────────────────────────
export const MOCK_DIFF_RESULTS: Record<string, ContractDiffResult> = {
  'doc-nda-01': {
    baseDocumentTitle: 'Freelance NDA & IP Assignment — Mumbai.docx',
    comparedDocumentTitle: 'India Market-Standard Freelance NDA (Benchmark)',
    totalVariances: 4,
    missingProtectionsCount: 2,
    items: [
      {
        id: 'diff-1',
        clauseTag: 'CLAUSE-2.1',
        type: 'MODIFIED',
        title: 'Non-Compete Duration & Scope',
        originalClause: '3-year worldwide non-compete — likely void under Section 27, ICA',
        comparedClause: 'No post-employment non-compete (only 12-month non-solicitation of direct clients)',
        impactAnalysis:
          'Current clause likely void under Section 27 of the Indian Contract Act, 1872 (restraint of trade). Courts routinely strike such clauses. Benchmark has no non-compete.',
        severity: 'HIGH',
      },
      {
        id: 'diff-2',
        clauseTag: 'CLAUSE-3.1',
        type: 'MISSING_PROTECTION',
        title: 'Payment Contingency for IP Transfer',
        originalClause: 'IP assigns immediately upon creation regardless of payment',
        comparedClause: 'IP transfers strictly upon receipt of full and cleared payment',
        impactAnalysis:
          'Missing a standard protective clause that prevents the client from retaining your code without paying. Benchmark ties IP transfer to payment receipt.',
        severity: 'HIGH',
      },
      {
        id: 'diff-3',
        clauseTag: 'CLAUSE-4.2',
        type: 'MODIFIED',
        title: 'Mutual Liability Cap Asymmetry',
        originalClause: 'Company capped at INR 5,000; Consultant uncapped',
        comparedClause: 'Mutual cap at total project fees paid in preceding 6 months',
        impactAnalysis:
          'INR 5,000 company cap against unlimited consultant liability is grossly asymmetric. Benchmark enforces equal mutual caps.',
        severity: 'HIGH',
      },
      {
        id: 'diff-4',
        clauseTag: 'CLAUSE-1.2',
        type: 'ADDED',
        title: 'Standard Confidentiality Exclusions',
        originalClause: 'Includes public domain and independent development exceptions',
        comparedClause: 'Matches benchmark',
        impactAnalysis: 'Favorable match with market standard exclusions. No changes required.',
        severity: 'GREEN',
      },
    ],
  },
  'doc-vendor-02': {
    baseDocumentTitle: 'IT Vendor Services Agreement — Bengaluru.pdf',
    comparedDocumentTitle: 'India IT Vendor Market Standard (Benchmark)',
    totalVariances: 2,
    missingProtectionsCount: 1,
    items: [
      {
        id: 'diff-v1',
        clauseTag: 'CLAUSE-2.2',
        type: 'MODIFIED',
        title: 'Auto-Renewal Notice Period',
        originalClause: '90-day notice required for non-renewal',
        comparedClause: '30-day notice — industry standard for annual IT contracts',
        impactAnalysis:
          '90 days is 3× the market standard. Missing this window locks you into another 12-month commitment.',
        severity: 'HIGH',
      },
      {
        id: 'diff-v2',
        clauseTag: 'CLAUSE-3.2',
        type: 'MISSING_PROTECTION',
        title: 'SLA Dispute Window',
        originalClause: 'Unilateral deduction without consent',
        comparedClause: '7-day dispute window before any SLA deduction',
        impactAnalysis:
          'Benchmark requires a written dispute mechanism. Unilateral deductions are potentially challengeable under MSMED Act, 2006.',
        severity: 'HIGH',
      },
    ],
  },
  'doc-emp-03': {
    baseDocumentTitle: 'Senior Engineer Employment Agreement — Pune.md',
    comparedDocumentTitle: 'India IT Employment Market Standard (Benchmark)',
    totalVariances: 1,
    missingProtectionsCount: 0,
    items: [
      {
        id: 'diff-e1',
        clauseTag: 'CLAUSE-3.1',
        type: 'MODIFIED',
        title: 'IP Assignment Scope',
        originalClause: 'All IP created "in the course of employment" — no carveout for personal projects',
        comparedClause: 'IP limited to work performed using company resources or during office hours',
        impactAnalysis:
          'Overbroad scope could capture personal side projects. Benchmark includes a clear personal-project carveout.',
        severity: 'AMBIGUOUS',
      },
    ],
  },
};

// ── Mock Prep Sheets (Indian context) ─────────────────────────────────────────
export const MOCK_PREP_SHEETS: Record<string, LawyerPrepSheet> = {
  'doc-nda-01': {
    documentId: 'doc-nda-01',
    documentTitle: 'Freelance NDA & IP Assignment — Mumbai.docx',
    generatedDate: '2026-09-25',
    executiveBrief:
      'This agreement contains severe high-risk provisions under Indian law: (1) a 3-year non-compete likely void under Section 27, Indian Contract Act, 1872; (2) unilateral IP assignment prior to payment under the Copyright Act, 1957; and (3) an asymmetric liability cap of INR 5,000 vs unlimited consultant exposure. Professional revision by an Indian IP/commercial lawyer is strongly advised before execution.',
    highPriorityRisks: [
      {
        clauseTag: 'CLAUSE-2.1',
        issue: '3-Year Global Non-Compete (Void under Section 27, ICA)',
        impact:
          'Indian courts routinely strike post-termination non-competes as void restraint of trade under Section 27 of the Indian Contract Act, 1872. This clause is likely unenforceable but creates harassment risk.',
        proposedFix:
          'Strike Clause 2.1 entirely. Replace with a 12-month non-solicitation of direct company clients limited to [City/State].',
      },
      {
        clauseTag: 'CLAUSE-3.1',
        issue: 'IP Assignment Without Payment Security',
        impact:
          'Company acquires full copyright ownership under Copyright Act, 1957 even if they default on invoice payment, leaving you with zero recourse.',
        proposedFix:
          'Add: "Assignment takes effect only upon Consultant\'s receipt of full and cleared payment as per the payment schedule."',
      },
      {
        clauseTag: 'CLAUSE-4.1 & 4.2',
        issue: 'Uncapped Liability + INR 5,000 Company Cap',
        impact:
          'Exposes consultant to unlimited personal financial damages while capping company liability at just INR 5,000 — commercially unreasonable under Indian contract law.',
        proposedFix:
          'Implement mutual liability cap equal to total fees paid in the preceding 6 months, limited to direct damages only.',
      },
    ],
    questionsForCounsel: [
      'Is the 3-year worldwide non-compete enforceable under Section 27 of the Indian Contract Act, 1872 for an independent contractor (not an employee)?',
      'How can we best structure the IP assignment clause to retain a security interest until full invoice payment under Indian Copyright Act, 1957?',
      'Can we invoke the arbitration clause under the Arbitration and Conciliation Act, 1996 to challenge the asymmetric liability cap as unconscionable?',
      'What stamp duty is required for this NDA under the Maharashtra Stamp Act for enforceability before an Indian court?',
    ],
    suggestedRedlines: [
      {
        clauseTag: 'CLAUSE-3.1',
        currentText: 'regardless of whether payment has been received or is in dispute.',
        proposedRedline:
          "conditioned upon Consultant's receipt of full and cleared payment as per the agreed invoice schedule.",
        rationale: 'Ties IP transfer to payment receipt, protecting developer under Indian contract law.',
      },
      {
        clauseTag: 'CLAUSE-4.2',
        currentText:
          "Company's aggregate liability shall be capped at INR 5,000 (Five Thousand Rupees only). Consultant's liability remains uncapped and unlimited.",
        proposedRedline:
          "Each party's aggregate liability under this Agreement shall be limited to the total fees paid or payable by Company to Consultant in the preceding six (6) months.",
        rationale: 'Establishes fair mutual liability limits consistent with Indian commercial practice.',
      },
    ],
    keyDatesAndDeadlines: [
      {
        label: 'Contract Execution & Stamp Duty',
        dateOrTimeframe: 'Before Project Commencement',
        actionRequired:
          'Execute agreement on appropriate stamp paper under Maharashtra Stamp Act. Submit revised redlined draft to company legal counsel.',
      },
      {
        label: 'Non-Solicitation Window',
        dateOrTimeframe: '12 Months Post-Termination (proposed)',
        actionRequired:
          'Refrain from directly soliciting active company clients. This is likely the only enforceable restriction post-Section 27, ICA.',
      },
    ],
  },
};
