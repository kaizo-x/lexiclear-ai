import React, { useMemo } from 'react';
import { LegalDocument, FilterRiskLevel, Clause } from '../../types/legal';
import { ClauseHighlightOverlay } from './ClauseHighlightOverlay';
import { sanitizeHTML } from '../../utils/sanitizer';
import { FileText, CheckCircle2, Filter } from 'lucide-react';

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
      aria-label="Document Reader"
      className="flex-1 flex flex-col h-full bg-[#0F172A] overflow-hidden"
    >
      {/* Reader Toolbar */}
      <div className="h-12 border-b border-slate-700/50 px-5 flex items-center justify-between bg-[#1E293B]/50 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-md bg-indigo-500/15 border border-indigo-500/25">
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-xs font-semibold text-slate-200 flex items-center gap-2">
              Contract Viewer
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-700/60 text-slate-400 border border-slate-700/50">
                {document.clauses.length} clauses
              </span>
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {riskFilter !== 'ALL' && (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/25">
              <Filter className="w-3 h-3" />
              Filtered: {riskFilter}
            </span>
          )}
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            Hover or click clauses to inspect
          </span>
        </div>
      </div>

      {/* Document Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Document Summary Banner */}
        <div className="p-4 rounded-xl bg-[#1E293B]/80 border border-slate-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              AI Summary
            </span>
            <p className="text-xs text-slate-300 font-medium mt-1 leading-relaxed">
              {sanitizedSummary}
            </p>
          </div>
          <div className="flex flex-col items-center shrink-0 px-4 py-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
            <span className={`text-2xl font-bold font-mono ${
              document.overallRiskScore >= 70
                ? 'text-rose-400'
                : document.overallRiskScore >= 40
                ? 'text-amber-400'
                : 'text-emerald-400'
            }`}>
              {document.overallRiskScore}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Risk Score
            </span>
          </div>
        </div>

        {/* Clause Cards */}
        <div className="bg-[#1E293B]/40 rounded-xl border border-slate-700/50 divide-y divide-slate-700/30 overflow-hidden">
          <div className="px-5 py-2.5 flex items-center justify-between bg-slate-800/30">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Clause · Section
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Risk · Click to Inspect
            </span>
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
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="text-sm font-semibold text-slate-300">
                No clauses match the active filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
