import React from 'react';
import { LegalDocument } from '../../types/legal';
import { RiskBadge } from '../common/RiskBadge';
import { AlertTriangle, CheckCircle2, ArrowUpRight, TrendingDown } from 'lucide-react';

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

  const scoreColor =
    riskMetrics.score >= 70
      ? 'text-rose-400'
      : riskMetrics.score >= 40
      ? 'text-amber-400'
      : 'text-emerald-400';

  const scoreLabel =
    riskMetrics.score >= 70
      ? 'Critical Attention Required'
      : riskMetrics.score >= 40
      ? 'Moderate Risk Profile'
      : 'Low Risk — Standard Terms';

  const scoreDasharray = `${riskMetrics.score}, 100`;
  const strokeColor =
    riskMetrics.score >= 70 ? '#EF4444' : riskMetrics.score >= 40 ? '#F59E0B' : '#10B981';

  return (
    <div className="space-y-5 p-5">
      {/* Risk Score Gauge */}
      <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-between gap-4">
        <div className="space-y-1 flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            <TrendingDown className="w-3.5 h-3.5" />
            Overall Risk Score
          </div>
          <h4 className={`text-sm font-bold ${scoreColor}`}>{scoreLabel}</h4>
          <p className="text-[11px] text-slate-500">
            Based on {document.clauses.length} analyzed clauses
          </p>

          {/* Clause stats row */}
          <div className="flex items-center gap-3 pt-2">
            <span className="text-[11px] text-rose-400 font-semibold">
              {riskMetrics.highCount} High
            </span>
            <span className="text-[11px] text-amber-400 font-semibold">
              {riskMetrics.ambiguousCount} Medium
            </span>
            <span className="text-[11px] text-emerald-400 font-semibold">
              {riskMetrics.greenCount} Safe
            </span>
          </div>
        </div>

        {/* SVG Ring Gauge */}
        <div className="relative w-20 h-20 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-700"
              strokeWidth="3"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              strokeDasharray={scoreDasharray}
              strokeWidth="3"
              strokeLinecap="round"
              stroke={strokeColor}
              fill="none"
              className="gauge-stroke"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-lg font-bold font-mono leading-none ${scoreColor}`}>
              {riskMetrics.score}
            </span>
            <span className="text-[9px] uppercase font-bold text-slate-500 mt-0.5">/100</span>
          </div>
        </div>
      </div>

      {/* Key Takeaways (3 bullets) */}
      <div className="space-y-2">
        <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Key Takeaways
        </h4>
        <ul className="space-y-2 text-xs text-slate-300">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
            <span>
              {riskMetrics.highCount > 0
                ? `${riskMetrics.highCount} high-risk clause${riskMetrics.highCount > 1 ? 's' : ''} require immediate legal review before signing.`
                : 'No high-risk clauses detected — document appears commercially balanced.'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
            <span>
              {riskMetrics.ambiguousCount > 0
                ? `${riskMetrics.ambiguousCount} ambiguous term${riskMetrics.ambiguousCount > 1 ? 's' : ''} may expose you to unfavorable interpretations under Indian Contract Act, 1872.`
                : 'All ambiguous terms are within acceptable commercial standards.'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
            <span>
              {riskMetrics.greenCount} clause{riskMetrics.greenCount !== 1 ? 's' : ''} conform to standard Indian commercial agreement practice.
            </span>
          </li>
        </ul>
      </div>

      {/* High Risk Clauses List */}
      <div className="space-y-2">
        <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
          High Risk Clauses ({highRiskClauses.length})
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
                className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 hover:border-rose-500/40 transition-all cursor-pointer group flex items-start justify-between gap-3"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                      {clause.sectionTag}
                    </span>
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                      {clause.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {clause.riskReason}
                  </p>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-rose-400 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>No high-risk clauses detected in this document.</span>
          </div>
        )}
      </div>

      {/* Obligations */}
      {document.obligations.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Your Obligations ({document.obligations.length})
          </h4>
          <div className="space-y-1.5">
            {document.obligations.map((ob) => (
              <div
                key={ob.id}
                className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-slate-300">{ob.title}</span>
                  {ob.deadline && (
                    <span className="ml-2 text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                      Due: {ob.deadline}
                    </span>
                  )}
                </div>
                <RiskBadge level={ob.riskLevel} size="sm" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
