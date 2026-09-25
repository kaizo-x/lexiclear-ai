import React from 'react';
import { LegalDocument } from '../../types/legal';
import { compareContractWithBenchmark } from '../../services/ai/contractDiff';
import { RiskBadge } from '../common/RiskBadge';
import { Scale } from 'lucide-react';

interface ClauseComparatorTabProps {
  document: LegalDocument;
}

export const ClauseComparatorTab: React.FC<ClauseComparatorTabProps> = ({ document }) => {
  const diffResult = compareContractWithBenchmark(document);

  return (
    <div className="space-y-4 p-5 text-stone-100 font-sans">
      {/* Diff Header Stats */}
      <div className="p-4 rounded-2xl bg-court-mahogany border border-court-border space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-serif font-bold text-white uppercase tracking-wider">
              Evidentiary Contract Variance Diff
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            {diffResult.totalVariances} Variances
          </span>
        </div>
        <p className="text-xs text-stone-400 leading-relaxed">
          Comparing <strong className="text-stone-200">{diffResult.baseDocumentTitle}</strong> against{' '}
          <strong className="text-amber-400">{diffResult.comparedDocumentTitle}</strong>
        </p>
      </div>

      {/* Side-by-side Diff List */}
      <div className="space-y-3">
        {diffResult.items.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-court-dark border border-court-border space-y-3 hover:border-amber-500/30 transition-colors"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-stone-800 text-amber-400">
                  {item.clauseTag}
                </span>
                <span className="text-xs font-bold text-stone-200 font-serif">{item.title}</span>
              </div>
              <RiskBadge level={item.severity} size="sm" />
            </div>

            {/* Side by Side Comparison Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1">
                <span className="text-[10px] font-bold uppercase text-rose-400 block font-serif">
                  Case Document Term
                </span>
                <p className="text-rose-200 font-serif text-[11px] leading-relaxed">
                  {item.originalClause}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                <span className="text-[10px] font-bold uppercase text-emerald-400 block font-serif">
                  Market Protection Standard
                </span>
                <p className="text-emerald-200 font-serif text-[11px] leading-relaxed">
                  {item.comparedClause}
                </p>
              </div>
            </div>

            <div className="text-[11px] text-stone-400 bg-court-mahogany p-2.5 rounded-xl border border-court-border">
              <strong className="text-amber-400">Judicial Impact Analysis:</strong> {item.impactAnalysis}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
