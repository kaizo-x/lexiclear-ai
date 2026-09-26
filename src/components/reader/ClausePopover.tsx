import React from 'react';
import { Clause } from '../../types/legal';
import { RiskBadge } from '../common/RiskBadge';
import { BookOpen, ArrowRight } from 'lucide-react';

interface ClausePopoverProps {
  clause: Clause;
  onSelectClause: (clauseId: string) => void;
}

export const ClausePopover: React.FC<ClausePopoverProps> = ({ clause, onSelectClause }) => {
  return (
    <div
      role="tooltip"
      aria-label={`AI note for ${clause.title}`}
      className="w-80 bg-slate-900/98 text-slate-100 border border-slate-700/80 rounded-xl p-4 shadow-card-md backdrop-blur-xl space-y-3 z-50 text-xs animate-popover"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-700/60 pb-2.5">
        <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-indigo-400">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{clause.sectionTag}</span>
        </div>
        <RiskBadge level={clause.riskLevel} size="sm" />
      </div>

      {/* Title + Risk reason */}
      <div>
        <h5 className="font-bold text-white text-xs mb-1">{clause.title}</h5>
        <p className="text-slate-400 leading-relaxed text-[11px] line-clamp-2">{clause.riskReason}</p>
      </div>

      {/* Plain English */}
      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-3 space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block">
          Plain English (5th-grade)
        </span>
        <p className="text-slate-200 font-medium leading-relaxed text-xs">{clause.simplifiedText}</p>
      </div>

      {/* CTA */}
      <button
        onClick={() => onSelectClause(clause.id)}
        className="w-full py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
      >
        <span>Full Analysis</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
