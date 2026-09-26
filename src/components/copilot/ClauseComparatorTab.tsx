import React from 'react';
import { LegalDocument } from '../../types/legal';
import { compareContractWithBenchmark } from '../../services/ai/contractDiff';
import { RiskBadge } from '../common/RiskBadge';
import { GitCompare, TrendingUp } from 'lucide-react';

interface ClauseComparatorTabProps {
  document: LegalDocument;
}

export const ClauseComparatorTab: React.FC<ClauseComparatorTabProps> = ({ document }) => {
  const diffResult = compareContractWithBenchmark(document);

  return (
    <div className="space-y-4 p-5">
      {/* Stats Header */}
      <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300">
            <GitCompare className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold">Risk Breakdown</span>
          </div>
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/25">
            {diffResult.totalVariances} variances
          </span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Comparing <strong className="text-slate-300">{diffResult.baseDocumentTitle}</strong> against{' '}
          <strong className="text-indigo-400">{diffResult.comparedDocumentTitle}</strong>
        </p>
      </div>

      {/* Diff Items — accordion-style */}
      <div className="space-y-3">
        {diffResult.items.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-700/50 bg-slate-800/30 overflow-hidden hover:border-slate-600/60 transition-colors"
          >
            {/* Item Header */}
            <div className="px-4 py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-700/60 text-slate-400 border border-slate-600/50 shrink-0">
                  {item.clauseTag}
                </span>
                <span className="text-xs font-semibold text-slate-200 truncate">{item.title}</span>
              </div>
              <RiskBadge level={item.severity} size="sm" />
            </div>

            {/* Side-by-Side Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-700/30">
              <div className="p-3 bg-slate-800/60 space-y-1">
                <span className="text-[10px] font-bold uppercase text-rose-400 block">
                  Current Clause
                </span>
                <p className="text-rose-200/80 text-[11px] leading-relaxed">
                  {item.originalClause}
                </p>
              </div>
              <div className="p-3 bg-slate-800/60 space-y-1">
                <span className="text-[10px] font-bold uppercase text-emerald-400 block">
                  Market Standard
                </span>
                <p className="text-emerald-200/80 text-[11px] leading-relaxed">
                  {item.comparedClause}
                </p>
              </div>
            </div>

            {/* Impact Analysis */}
            <div className="px-4 py-3 bg-slate-800/20 border-t border-slate-700/30">
              <div className="flex items-start gap-2 text-[11px] text-slate-400 leading-relaxed">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-indigo-400">Impact:</strong> {item.impactAnalysis}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
