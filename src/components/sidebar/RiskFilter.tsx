import React from 'react';
import { FilterRiskLevel } from '../../types/legal';

interface RiskFilterProps {
  currentFilter: FilterRiskLevel;
  onFilterChange: (filter: FilterRiskLevel) => void;
  counts: { highCount: number; ambiguousCount: number; greenCount: number };
}

export const RiskFilter: React.FC<RiskFilterProps> = ({ currentFilter, onFilterChange, counts }) => {
  const total = counts.highCount + counts.ambiguousCount + counts.greenCount;

  const filters: {
    id: FilterRiskLevel;
    label: string;
    count: number;
    activeClass: string;
    dotClass: string;
  }[] = [
    {
      id: 'ALL',
      label: 'All',
      count: total,
      activeClass: 'bg-indigo-600/20 border-indigo-500/50 text-indigo-300',
      dotClass: 'bg-indigo-400',
    },
    {
      id: 'HIGH',
      label: 'High Risk',
      count: counts.highCount,
      activeClass: 'bg-rose-500/15 border-rose-500/40 text-rose-300',
      dotClass: 'bg-rose-400',
    },
    {
      id: 'AMBIGUOUS',
      label: 'Medium',
      count: counts.ambiguousCount,
      activeClass: 'bg-amber-500/15 border-amber-500/40 text-amber-300',
      dotClass: 'bg-amber-400',
    },
    {
      id: 'GREEN',
      label: 'Safe',
      count: counts.greenCount,
      activeClass: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
      dotClass: 'bg-emerald-400',
    },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Risk Filter
        </p>
        {currentFilter !== 'ALL' && (
          <button
            onClick={() => onFilterChange('ALL')}
            className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {filters.map((f) => {
          const isActive = currentFilter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => onFilterChange(f.id)}
              aria-pressed={isActive}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                isActive
                  ? f.activeClass
                  : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:border-slate-600/60 hover:text-slate-300'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? f.dotClass : 'bg-slate-500'}`} />
              <span>{f.label}</span>
              <span className={`text-[10px] font-mono px-1 py-0.5 rounded ${
                isActive ? 'bg-white/10' : 'bg-slate-700/60 text-slate-500'
              }`}>
                {f.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
