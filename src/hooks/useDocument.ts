import { useState, useMemo, useCallback } from 'react';
import { LegalDocument, FilterRiskLevel, ChatMessage } from '../types/legal';
import { SAMPLE_DOCUMENTS } from '../data/sampleDocuments';
import { calculateRiskMetrics } from '../utils/riskCalculator';
import { parseRawTextIntoClauses } from '../services/ai/riskAssessment';

export function useDocument() {
  const [documents, setDocuments] = useState<LegalDocument[]>(SAMPLE_DOCUMENTS);
  const [activeDocumentId, setActiveDocumentId] = useState<string>(SAMPLE_DOCUMENTS[0].id);
  const [riskFilter, setRiskFilter] = useState<FilterRiskLevel>('ALL');
  const [selectedClauseId, setSelectedClauseId] = useState<string | null>(null);
  const [hoveredClauseId, setHoveredClauseId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({
    'doc-nda-01': [
      {
        id: 'msg-1',
        sender: 'ASSISTANT',
        text: 'Welcome to LexiClear Copilot! I have analyzed "Freelance Mutual NDA & IP Transfer.docx". I detected 4 High-Risk items including a 5-year global non-compete and uncapped indemnification. How can I assist you?',
        timestamp: '13:40',
        citedClauseTags: ['CLAUSE-2.1', 'CLAUSE-4.1'],
      },
    ],
  });

  const activeDocument = useMemo(() => {
    return documents.find((doc) => doc.id === activeDocumentId) || documents[0];
  }, [documents, activeDocumentId]);

  const riskMetrics = useMemo(() => {
    return calculateRiskMetrics(activeDocument.clauses);
  }, [activeDocument]);

  const filteredClauses = useMemo(() => {
    if (riskFilter === 'ALL') return activeDocument.clauses;
    return activeDocument.clauses.filter((c) => c.riskLevel === riskFilter);
  }, [activeDocument, riskFilter]);

  const selectedClause = useMemo(() => {
    if (!selectedClauseId) return null;
    return activeDocument.clauses.find((c) => c.id === selectedClauseId) || null;
  }, [activeDocument, selectedClauseId]);

  const hoveredClause = useMemo(() => {
    if (!hoveredClauseId) return null;
    return activeDocument.clauses.find((c) => c.id === hoveredClauseId) || null;
  }, [activeDocument, hoveredClauseId]);

  const selectDocument = useCallback((docId: string) => {
    setActiveDocumentId(docId);
    setSelectedClauseId(null);
  }, []);

  const handleUploadDocument = useCallback((fileTitle: string, fileContent: string) => {
    const parsedClauses = parseRawTextIntoClauses(fileContent);
    const newDocId = `doc-custom-${Date.now()}`;
    const metrics = calculateRiskMetrics(parsedClauses);

    const newDoc: LegalDocument = {
      id: newDocId,
      title: fileTitle,
      type: 'CUSTOM',
      dateAdded: new Date().toISOString().split('T')[0],
      fileSize: `${Math.round(fileContent.length / 1024)} KB`,
      overallRiskScore: metrics.score,
      summary: `Uploaded document analyzed. ${metrics.highCount} high-risk and ${metrics.ambiguousCount} ambiguous terms detected.`,
      clauses: parsedClauses,
      obligations: parsedClauses.map((c, i) => ({
        id: `ob-cust-${i}`,
        party: 'USER',
        title: c.title,
        description: c.riskReason,
        riskLevel: c.riskLevel,
      })),
      fullText: fileContent,
    };

    setDocuments((prev) => [newDoc, ...prev]);
    setActiveDocumentId(newDocId);
    setChatMessages((prev) => ({
      ...prev,
      [newDocId]: [
        {
          id: `msg-init-${Date.now()}`,
          sender: 'ASSISTANT',
          text: `Document "${fileTitle}" processed successfully. Identified ${parsedClauses.length} clauses with overall risk score ${metrics.score}/100. Ask me any questions about your document!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    }));
  }, []);

  const sendChatMessage = useCallback((userText: string) => {
    if (!userText.trim()) return;

    const currentDocId = activeDocument.id;
    const userMsg: ChatMessage = {
      id: `msg-u-${Date.now()}`,
      sender: 'USER',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => ({
      ...prev,
      [currentDocId]: [...(prev[currentDocId] || []), userMsg],
    }));

    // Generate context-aware AI response
    setTimeout(() => {
      const lower = userText.toLowerCase();
      let replyText = `Based on my analysis of ${activeDocument.title}, `;
      let citedTags: string[] = [];

      if (lower.includes('liabil') || lower.includes('cap')) {
        const clause = activeDocument.clauses.find(c => c.category === 'LIABILITY' || c.category === 'INDEMNIFICATION');
        replyText += clause 
          ? `Section ${clause.sectionTag} (${clause.title}) contains an asymmetric liability structure. ${clause.riskReason} I recommend: ${clause.recommendation}`
          : 'no explicit liability caps were flagged as high risk.';
        if (clause) citedTags.push(clause.sectionTag);
      } else if (lower.includes('compete') || lower.includes('restrict')) {
        const clause = activeDocument.clauses.find(c => c.title.toLowerCase().includes('non-compete'));
        replyText += clause
          ? `Section ${clause.sectionTag} imposes a restrictive covenant. ${clause.simplifiedText}`
          : 'no non-compete clause was found in this agreement.';
        if (clause) citedTags.push(clause.sectionTag);
      } else if (lower.includes('terminate') || lower.includes('cancel')) {
        replyText += `you must provide proper written notice prior to the renewal window. Review high risk notice obligations in Section CLAUSE-2.2.`;
        citedTags.push('CLAUSE-2.2');
      } else {
        replyText += `the overall document risk score is ${riskMetrics.score}/100. Key focus areas include indemnification limits, IP retention, and non-solicitation periods.`;
      }

      const aiMsg: ChatMessage = {
        id: `msg-a-${Date.now()}`,
        sender: 'ASSISTANT',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citedClauseTags: citedTags.length > 0 ? citedTags : undefined,
      };

      setChatMessages((prev) => ({
        ...prev,
        [currentDocId]: [...(prev[currentDocId] || []), aiMsg],
      }));
    }, 400);
  }, [activeDocument, riskMetrics]);

  return {
    documents,
    activeDocument,
    riskMetrics,
    riskFilter,
    setRiskFilter,
    selectedClauseId,
    setSelectedClauseId,
    selectedClause,
    hoveredClauseId,
    setHoveredClauseId,
    hoveredClause,
    filteredClauses,
    selectDocument,
    handleUploadDocument,
    activeChatMessages: chatMessages[activeDocument.id] || [],
    sendChatMessage,
  };
}
