import React from 'react';
import { LegalDocument } from '../../types/legal';
import { RiskBadge } from '../common/RiskBadge';
import { AlertOctagon, Scale, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface ExecutiveSummaryTabProps {
  document: LegalDocument;
  riskMetrics: { score: number; highCount: number; ambiguousCount: number; greenCount: number };
  onSelectClause: (id: string) => void;
}

export const ExecutiveSummaryTab: React.FC<ExecutiveSummaryTabProps> = ({
  document,
  riskMetrics,
  onSelectClause,
}) => {
  const highRiskClauses = document.clauses.filter((c) => c.riskLevel === 'HIGH');

  return (
    <div className="space-y-6 p-5 text-stone-100 font-sans">
      {/* Risk Score Radar Ring & Gauge */}
      <div className="p-5 rounded-2xl bg-court-mahogany border border-court-border shadow-sm flex items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1 font-serif">
            <Scale className="w-3.5 h-3.5" /> Judicial Risk Scale
          </span>
          <h4 className="text-lg font-serif font-bold text-white tracking-tight">
            {riskMetrics.score >= 70 ? 'Critical Attention Required' : riskMetrics.score >= 40 ? 'Moderate Risk Profile' : 'Standard / Low Risk'}
          </h4>
          <p className="text-xs text-stone-400">
            Calculated across {document.clauses.length} evaluated clauses
          </p>
        </div>

        <div className="relative shrink-0 flex items-center justify-center w-20 h-20 rounded-full border-4 border-court-border bg-court-dark">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-stone-800"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={riskMetrics.score >= 70 ? 'text-rose-500' : riskMetrics.score >= 40 ? 'text-amber-500' : 'text-emerald-500'}
              strokeDasharray={`${riskMetrics.score}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-lg font-bold font-mono text-white leading-none">
              {riskMetrics.score}
            </span>
            <span className="text-[9px] uppercase font-bold text-stone-400 mt-0.5">/100</span>
          </div>
        </div>
      </div>

      {/* Critical Objections Flag List */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center justify-between font-serif">
          <span className="flex items-center gap-1.5 text-rose-400">
            <AlertOctagon className="w-4 h-4" />
            Critical Legal Objections ({highRiskClauses.length})
          </span>
        </h4>

        {highRiskClauses.length > 0 ? (
          <div className="space-y-2">
            {highRiskClauses.map((clause) => (
              <div
                key={clause.id}
                onClick={() => onSelectClause(clause.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') onSelectClause(clause.id); }}
                className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 hover:border-rose-500/40 transition-all cursor-pointer group flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-600 text-white">
                      {clause.sectionTag}
                    </span>
                    <h5 className="text-xs font-bold text-stone-200 group-hover:text-white transition-colors font-serif">
                      {clause.title}
                    </h5>
                  </div>
                  <p className="text-[11px] text-stone-400 line-clamp-2 leading-relaxed">
                    {clause.riskReason}
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-rose-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Zero critical legal objections detected in this document.</span>
          </div>
        )}
      </div>

      {/* Contract Commitments & Obligations */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5 font-serif">
          <Scale className="w-4 h-4 text-amber-400" />
          Contractual Obligations & Deadlines ({document.obligations.length})
        </h4>

        <div className="space-y-2">
          {document.obligations.map((ob) => (
            <div
              key={ob.id}
              className="p-3.5 rounded-2xl bg-court-mahogany border border-court-border space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-200">{ob.title}</span>
                <RiskBadge level={ob.riskLevel} size="sm" />
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">{ob.description}</p>
              {ob.deadline && (
                <div className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded inline-block">
                  Due: {ob.deadline}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
