import React from 'react';
import { FilterRiskLevel } from '../../types/legal';
import { Filter } from 'lucide-react';

interface RiskFilterProps {
  currentFilter: FilterRiskLevel;
  onFilterChange: (filter: FilterRiskLevel) => void;
  counts: { highCount: number; ambiguousCount: number; greenCount: number };
}

export const RiskFilter: React.FC<RiskFilterProps> = ({ currentFilter, onFilterChange, counts }) => {
  const total = counts.highCount + counts.ambiguousCount + counts.greenCount;

  const filters: { id: FilterRiskLevel; label: string; count: number; activeBg: string }[] = [
    { id: 'ALL', label: 'All Clauses', count: total, activeBg: 'bg-amber-600 text-white' },
    { id: 'HIGH', label: 'Objections', count: counts.highCount, activeBg: 'bg-rose-600 text-white' },
    { id: 'AMBIGUOUS', label: 'Ambiguous', count: counts.ambiguousCount, activeBg: 'bg-amber-700 text-white' },
    { id: 'GREEN', label: 'Safe Terms', count: counts.greenCount, activeBg: 'bg-emerald-600 text-white' },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 font-serif flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5" />
          Filter Objections
        </label>
        {currentFilter !== 'ALL' && (
          <button
            onClick={() => onFilterChange('ALL')}
            className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline font-semibold"
          >
            Reset
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {filters.map((f) => {
          const isActive = currentFilter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => onFilterChange(f.id)}
              aria-pressed={isActive}
              tabIndex={0}
              className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all focus:ring-2 focus:ring-amber-500 focus:outline-none ${
                isActive
                  ? `${f.activeBg} border-transparent shadow-sm`
                  : 'bg-white dark:bg-court-mahogany border-stone-200 dark:border-court-border text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-700'
              }`}
            >
              <span className="truncate">{f.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400'
                }`}
              >
                {f.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
