import React from 'react';
import { Clause } from '../../types/legal';
import { RiskBadge } from '../common/RiskBadge';
import { Scale, ArrowRight, BookOpen } from 'lucide-react';

interface ClausePopoverProps {
  clause: Clause;
  onSelectClause: (clauseId: string) => void;
}

export const ClausePopover: React.FC<ClausePopoverProps> = ({ clause, onSelectClause }) => {
  return (
    <div
      role="tooltip"
      aria-label={`Judicial translation note for ${clause.title}`}
      className="w-88 bg-stone-900/95 text-stone-100 border border-amber-600/30 rounded-2xl p-4 shadow-2xl backdrop-blur-xl space-y-3 z-50 text-xs animate-in fade-in zoom-in-95 duration-150"
    >
      <div className="flex items-center justify-between gap-2 border-b border-stone-800 pb-2.5">
        <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-amber-400">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>Judicial Note • {clause.sectionTag}</span>
        </div>
        <RiskBadge level={clause.riskLevel} size="sm" />
      </div>

      <div>
        <h5 className="font-bold text-white text-sm tracking-tight mb-1 font-serif">{clause.title}</h5>
        <p className="text-stone-300 leading-relaxed text-[11px] line-clamp-2">{clause.riskReason}</p>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
          <Scale className="w-3.5 h-3.5" /> Plain 5th-Grade Legal Translation
        </span>
        <p className="text-amber-100 font-medium leading-relaxed text-xs">{clause.simplifiedText}</p>
      </div>

      <button
        onClick={() => onSelectClause(clause.id)}
        className="w-full py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 focus:ring-2 focus:ring-amber-400 focus:outline-none shadow-md"
      >
        <span>Examine Clause Objection</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
