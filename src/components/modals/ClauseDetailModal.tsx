import React from 'react';
import { Clause } from '../../types/legal';
import { RiskBadge } from '../common/RiskBadge';
import { X, AlertTriangle, CheckCircle2, BookOpen } from 'lucide-react';

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-[#1E293B] border border-slate-700/60 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-card-md text-slate-100 relative animate-slide-up">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-700/50 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-slate-700/60 text-slate-300 border border-slate-600/50">
              {clause.sectionTag}
            </span>
            <RiskBadge level={clause.riskLevel} />
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-4 text-xs">
          {/* Title + Original text */}
          <div>
            <h3 id="modal-clause-title" className="text-sm font-bold text-white mb-2">
              {clause.title}
            </h3>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-300 leading-relaxed">
              {clause.originalText}
            </div>
          </div>

          {/* Plain English */}
          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              Plain English Explanation
            </span>
            <p className="text-slate-200 font-medium leading-relaxed">
              {clause.simplifiedText}
            </p>
          </div>

          {/* Risk reason */}
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              Risk Analysis
            </span>
            <p className="text-rose-200 leading-relaxed">{clause.riskReason}</p>
          </div>

          {/* Recommendation */}
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Recommended Redline Fix
            </span>
            <p className="text-emerald-200 font-medium leading-relaxed">{clause.recommendation}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-1 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
