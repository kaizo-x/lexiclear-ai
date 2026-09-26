import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { Header } from "./components/common/Header";
import { Footer } from "./components/common/Footer";
import { Sidebar } from "./components/sidebar/Sidebar";
import { DocumentReader } from "./components/reader/DocumentReader";
import { InsightsHub } from "./components/copilot/InsightsHub";
import { ClauseDetailModal } from "./components/modals/ClauseDetailModal";
import { useDocument } from "./hooks/useDocument";
import { Clause } from "./types/legal";

export function LexiClearApp() {
  const {
    documents,
    activeDocument,
    riskMetrics,
    riskFilter,
    setRiskFilter,
    selectedClauseId,
    setSelectedClauseId,
    selectedClause,
    setHoveredClauseId,
    filteredClauses,
    selectDocument,
    handleUploadDocument,
    activeChatMessages,
    sendChatMessage,
  } = useDocument();

  const handleSelectClauseByTag = (tag: string) => {
    const clause = activeDocument.clauses.find(
      (c: Clause) => c.sectionTag === tag,
    );
    if (clause) {
      setSelectedClauseId(clause.id);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-white dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
        {/* Header */}
        <Header
          activeDocTitle={activeDocument.title}
          overallScore={riskMetrics.score}
        />

        {/* Main Three-Pane SaaS Architecture Layout */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-[calc(100vh-8rem)]">
          {/* Left Pane: Sidebar Navigation & Filters */}
          <Sidebar
            documents={documents}
            activeDoc={activeDocument}
            riskMetrics={riskMetrics}
            riskFilter={riskFilter}
            onFilterChange={setRiskFilter}
            onSelectDoc={selectDocument}
            onUploadDoc={handleUploadDocument}
          />

          {/* Center Pane: Main Interactive Document Reader */}
          <DocumentReader
            document={activeDocument}
            filteredClauses={filteredClauses}
            selectedClauseId={selectedClauseId}
            riskFilter={riskFilter}
            onSelectClause={setSelectedClauseId}
            onHoverClause={setHoveredClauseId}
          />

          {/* Right Pane: AI Copilot & Insights Hub */}
          <InsightsHub
            document={activeDocument}
            riskMetrics={riskMetrics}
            chatMessages={activeChatMessages}
            onSendMessage={sendChatMessage}
            onSelectClause={setSelectedClauseId}
            onSelectClauseByTag={handleSelectClauseByTag}
          />
        </div>

        {/* Modal for Clause Risk Analysis */}
        <ClauseDetailModal
          clause={selectedClause}
          onClose={() => setSelectedClauseId(null)}
        />

        {/* Footer Banner - Non-Advisory Legal Disclaimer */}
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default LexiClearApp;
