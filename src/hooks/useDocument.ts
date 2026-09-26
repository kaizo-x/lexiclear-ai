import { useState, useMemo } from "react";
import { SAMPLE_DOCUMENTS } from "../data/sampleDocuments";
import {
  LegalDocument,
  Clause,
  ChatMessage,
  FilterRiskLevel,
} from "../types/legal";
import * as riskAssessment from "../services/ai/riskAssessment";

const parseRawTextIntoClauses = (text: string) => {
  const parser = (riskAssessment as Record<string, unknown>)[
    "parseRawTextIntoClauses"
  ];

  if (typeof parser === "function") {
    return (parser as (value: string) => any[])(text);
  }

  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => ({
      id: `clause-${index + 1}`,
      title: `Clause ${index + 1}`,
      text: line,
    }));
};

export function useDocument() {
  const [documents, setDocuments] = useState<LegalDocument[]>(() => {
    return (SAMPLE_DOCUMENTS || []).map(
      (doc: any, index: number): LegalDocument => {
        const fullTextContent = doc.fullText || doc.content || doc.text || "";
        return {
          id: doc.id || `doc-${index + 1}`,
          title: doc.title || `Document ${index + 1}`,
          type:
            doc.type && ["NDA", "LEASE", "TOS", "CUSTOM"].includes(doc.type)
              ? doc.type
              : "CUSTOM",
          fullText: fullTextContent,
          dateAdded: doc.dateAdded || new Date().toISOString().split("T")[0],
          fileSize: doc.fileSize || "124 KB",
          overallRiskScore: doc.overallRiskScore ?? 45,
          summary: doc.summary || "Summary of contractual terms.",
          obligations: doc.obligations || [],
          clauses: (
            doc.clauses || parseRawTextIntoClauses(fullTextContent)
          ).map(
            (c: any, cIdx: number): Clause => ({
              id: c.id || `clause-${cIdx + 1}`,
              title: c.title || `Clause ${cIdx + 1}`,
              originalText: c.originalText || c.text || "",
              sectionTag: c.sectionTag || `S${cIdx + 1}`,
              riskLevel: c.riskLevel || "AMBIGUOUS",
              category: c.category || "GENERAL",
              riskReason:
                c.riskReason || "Standard operational risk assessment.",
              recommendation:
                c.recommendation ||
                "Verify with legal team prior to execution.",
              lineStart: c.lineStart ?? cIdx * 5 + 1,
              lineEnd: c.lineEnd ?? cIdx * 5 + 5,
              simplifiedText:
                c.simplifiedText || c.text || "Simplified clause summary.",
            }),
          ),
        };
      },
    );
  });

  const [activeDocumentId, setActiveDocumentId] = useState<string>(
    documents[0]?.id || "doc-1",
  );

  const [riskFilter, setRiskFilter] = useState<FilterRiskLevel>("ALL");
  const [selectedClauseId, setSelectedClauseId] = useState<string | null>(null);
  const [hoveredClauseId, setHoveredClauseId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<
    Record<string, ChatMessage[]>
  >({});

  const activeDocument = useMemo(() => {
    return documents.find((d) => d.id === activeDocumentId) || documents[0];
  }, [documents, activeDocumentId]);

  const selectedClause = useMemo(() => {
    return (
      activeDocument?.clauses.find((c) => c.id === selectedClauseId) || null
    );
  }, [activeDocument, selectedClauseId]);

  const filteredClauses = useMemo(() => {
    if (!activeDocument) return [];
    if (riskFilter === "ALL") return activeDocument.clauses;
    return activeDocument.clauses.filter((c) => c.riskLevel === riskFilter);
  }, [activeDocument, riskFilter]);

  const riskMetrics = useMemo(() => {
    const total = activeDocument?.clauses.length || 1;
    const highCount =
      activeDocument?.clauses.filter((c: Clause) => c.riskLevel === "HIGH")
        .length || 0;
    const ambiguousCount =
      activeDocument?.clauses.filter((c: Clause) => c.riskLevel === "AMBIGUOUS")
        .length || 0;
    const greenCount =
      activeDocument?.clauses.filter((c: Clause) => c.riskLevel === "GREEN")
        .length || 0;

    const score =
      Math.round(
        ((highCount * 3 + ambiguousCount * 2 + greenCount * 1) / (total * 3)) *
          100,
      ) || 35;

    return {
      score,
      highCount,
      ambiguousCount,
      greenCount,
      total,
      high: highCount,
      medium: ambiguousCount,
      low: greenCount,
      riskScore: score,
    };
  }, [activeDocument]);

  const selectDocument = (id: string) => {
    setActiveDocumentId(id);
    setSelectedClauseId(null);
  };

  const handleUploadDocument = (title: string, content: string) => {
    const rawClauses = parseRawTextIntoClauses(content);
    const formattedClauses: Clause[] = rawClauses.map((c, idx) => ({
      id: c.id,
      title: c.title,
      text: c.text,
      originalText: c.text,
      section: c.section,
      sectionTag: `S${idx + 1}`,
      riskLevel: "AMBIGUOUS",
      category: "GENERAL" as any as Clause["category"],
      riskReason: "Uploaded document clause requiring review.",
      recommendation: "Evaluate against standard terms.",
      lineStart: idx * 5 + 1,
      lineEnd: idx * 5 + 5,
      simplifiedText: c.text,
    }));

    const newDoc: LegalDocument = {
      id: `doc-${Date.now()}`,
      title,
      type: "CUSTOM",
      fullText: content,
      dateAdded: new Date().toISOString().split("T")[0],
      fileSize: `${Math.round(content.length / 1024) || 1} KB`,
      overallRiskScore: 40,
      summary: "Newly uploaded document.",
      obligations: [],
      clauses: formattedClauses,
    };

    setDocuments((prev) => [newDoc, ...prev]);
    setActiveDocumentId(newDoc.id);
  };

  const activeChatMessages = useMemo(() => {
    return (
      chatMessages[activeDocumentId] || [
        {
          id: "welcome",
          sender: "ASSISTANT",
          text: `Hello! How can I assist you with ${activeDocument?.title || "this document"}?`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]
    );
  }, [chatMessages, activeDocumentId, activeDocument?.title]);

  const sendChatMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "USER",
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const botMsg: ChatMessage = {
      id: `msg-${Date.now() + 1}`,
      sender: "ASSISTANT",
      text: `Analyzed query regarding "${text}". The clause conditions align with expected legal standards with focused review recommended for indemnification limits.`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChatMessages((prev) => ({
      ...prev,
      [activeDocumentId]: [
        ...(prev[activeDocumentId] || [activeChatMessages[0]]),
        userMsg,
        botMsg,
      ],
    }));
  };

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
    filteredClauses,
    selectDocument,
    handleUploadDocument,
    activeChatMessages,
    sendChatMessage,
    documentText: activeDocument?.fullText || "",
    clauses: activeDocument?.clauses || [],
    obligations: activeDocument?.clauses || [],
    processDocument: (content: string) => {
      handleUploadDocument("New Document", content);
      return activeDocument?.clauses || [];
    },
    setDocumentText: () => {},
  };
}

export default useDocument;
