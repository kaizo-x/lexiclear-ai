import React, { useMemo } from 'react';
import { LegalDocument, FilterRiskLevel, Clause } from '../../types/legal';
import { ClauseHighlightOverlay } from './ClauseHighlightOverlay';
import { sanitizeHTML } from '../../utils/sanitizer';
import { Filter, CheckCircle2, Scroll, Scale } from 'lucide-react';

interface DocumentReaderProps {
  document: LegalDocument;
  filteredClauses: Clause[];
  selectedClauseId: string | null;
  riskFilter: FilterRiskLevel;
  onSelectClause: (id: string) => void;
  onHoverClause: (id: string | null) => void;
}

export const DocumentReader: React.FC<DocumentReaderProps> = ({
  document,
  filteredClauses,
  selectedClauseId,
  riskFilter,
  onSelectClause,
  onHoverClause,
}) => {
  const sanitizedSummary = useMemo(() => {
    return sanitizeHTML(document.summary);
  }, [document.summary]);

  return (
    <main
      role="main"
      aria-label="Document Reader Pane"
      className="flex-1 flex flex-col h-full bg-court-parchment dark:bg-court-dark overflow-hidden border-r border-stone-200 dark:border-court-border"
    >
      {/* Reader Header Toolbar */}
      <div className="h-16 border-b border-stone-200 dark:border-court-border px-6 flex items-center justify-between bg-white/90 dark:bg-court-mahogany/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
            <Scroll className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              Official Document Scroll
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                {document.clauses.length} Evaluated Clauses
              </span>
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {riskFilter !== 'ALL' && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              <Filter className="w-3 h-3" /> Filtered: {riskFilter}
            </span>
          )}
          <span className="text-xs text-stone-500 dark:text-stone-400 font-mono hidden sm:inline">
            Step 2: Hover or Click Clause Objections Below
          </span>
        </div>
      </div>

      {/* Main Document Body Viewer */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Document Metadata Banner */}
        <div className="p-5 rounded-2xl bg-white dark:bg-court-mahogany border border-stone-200 dark:border-court-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-parchment-shadow">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 font-serif flex items-center gap-1">
              <Scale className="w-3.5 h-3.5" /> Judicial Assessment Executive Brief
            </span>
            <p className="text-xs text-stone-700 dark:text-stone-300 font-medium mt-1 max-w-2xl leading-relaxed">
              {sanitizedSummary}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <div className="text-xl font-bold text-stone-900 dark:text-stone-100 font-mono">
                {document.overallRiskScore}/100
              </div>
              <div className="text-[10px] uppercase font-bold text-stone-400">Objection Score</div>
            </div>
          </div>
        </div>

        {/* Clause Highlights & Line-by-Line Legal Text Reader */}
        <div className="bg-white dark:bg-court-mahogany/40 rounded-2xl border border-stone-200 dark:border-court-border p-6 space-y-4 font-serif text-sm shadow-sm">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-stone-400 border-b border-stone-200 dark:border-court-border pb-3 font-sans">
            <span>Clause Tag & Section</span>
            <span>Evidentiary Clause Objections (Click to Inspect)</span>
          </div>

          {filteredClauses.length > 0 ? (
            filteredClauses.map((clause) => (
              <ClauseHighlightOverlay
                key={clause.id}
                clause={clause}
                isSelected={selectedClauseId === clause.id}
                onSelect={onSelectClause}
                onHover={onHoverClause}
              />
            ))
          ) : (
            <div className="py-12 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <p className="text-sm font-bold text-stone-700 dark:text-stone-300">
                No clause objections match the active filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
