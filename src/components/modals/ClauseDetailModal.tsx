import React from 'react';
import { Clause } from '../../types/legal';
import { RiskBadge } from '../common/RiskBadge';
import { X, AlertOctagon, CheckCircle2, BookOpen } from 'lucide-react';

interface ClauseDetailModalProps {
  clause: Clause | null;
  onClose: () => void;
}

export const ClauseDetailModal: React.FC<ClauseDetailModalProps> = ({ clause, onClose }) => {
  if (!clause) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-clause-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-court-dark/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-court-mahogany border border-court-border rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl text-stone-100 relative">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-court-border pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">
              {clause.sectionTag}
            </span>
            <RiskBadge level={clause.riskLevel} />
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-xl bg-court-dark hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-4 text-xs font-sans">
          <div>
            <h3 id="modal-clause-title" className="text-base font-serif font-bold text-white mb-2">
              {clause.title}
            </h3>
            <div className="p-4 rounded-2xl bg-court-dark border border-court-border font-serif text-stone-200 leading-relaxed text-xs">
              {clause.originalText}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1 font-serif">
              <BookOpen className="w-3.5 h-3.5" /> Plain 5th-Grade Legal Translation
            </span>
            <p className="text-amber-100 text-sm font-medium leading-relaxed">
              {clause.simplifiedText}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1 font-serif">
              <AlertOctagon className="w-3.5 h-3.5" /> Objection Grounds & Impact
            </span>
            <p className="text-rose-200 leading-relaxed">{clause.riskReason}</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1 font-serif">
              <CheckCircle2 className="w-3.5 h-3.5" /> Recommended Redline Fix
            </span>
            <p className="text-emerald-200 font-medium leading-relaxed">{clause.recommendation}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-colors shadow-md"
          >
            Close Examination
          </button>
        </div>
      </div>
    </div>
  );
};
