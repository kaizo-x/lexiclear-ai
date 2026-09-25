import React, { useState } from 'react';
import { Clause } from '../../types/legal';
import { ClausePopover } from './ClausePopover';
import { AlertOctagon, Scale, CheckCircle2 } from 'lucide-react';

interface ClauseHighlightOverlayProps {
  clause: Clause;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

export const ClauseHighlightOverlay: React.FC<ClauseHighlightOverlayProps> = ({
  clause,
  isSelected,
  onSelect,
  onHover,
}) => {
  const [showPopover, setShowPopover] = useState(false);

  const styleConfig = {
    HIGH: {
      bg: 'bg-rose-500/10 dark:bg-rose-500/15 border-l-4 border-rose-600 text-stone-900 dark:text-stone-100',
      activeBorder: 'ring-2 ring-rose-500 shadow-glow-objection',
      tagBg: 'bg-rose-600 text-white',
      badgeText: 'OBJECTION: High Risk Term',
      icon: <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />,
    },
    AMBIGUOUS: {
      bg: 'bg-amber-500/10 dark:bg-amber-500/15 border-l-4 border-amber-600 text-stone-900 dark:text-stone-100',
      activeBorder: 'ring-2 ring-amber-500',
      tagBg: 'bg-amber-600 text-white',
      badgeText: 'REVIEW: Ambiguous Term',
      icon: <Scale className="w-3.5 h-3.5 text-amber-600" />,
    },
    GREEN: {
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/15 border-l-4 border-emerald-600 text-stone-900 dark:text-stone-100',
      activeBorder: 'ring-2 ring-emerald-500',
      tagBg: 'bg-emerald-600 text-white',
      badgeText: 'SAFE: Standard Favorable',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
    },
  };

  const config = styleConfig[clause.riskLevel] || styleConfig.GREEN;

  return (
    <div
      tabIndex={0}
      role="region"
      aria-label={`Clause ${clause.sectionTag}: ${clause.title}`}
      onMouseEnter={() => {
        setShowPopover(true);
        onHover(clause.id);
      }}
      onMouseLeave={() => {
        setShowPopover(false);
        onHover(null);
      }}
      onClick={() => onSelect(clause.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(clause.id);
        }
      }}
      className={`relative group my-3 p-4 rounded-r-2xl transition-all cursor-pointer ${config.bg} ${
        isSelected ? config.activeBorder : ''
      } focus:ring-2 focus:ring-amber-500 focus:outline-none`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${config.tagBg}`}>
            {clause.sectionTag}
          </span>
          <span className="text-xs font-bold font-sans text-stone-900 dark:text-stone-100">
            {clause.title}
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-600 dark:text-stone-300">
          {config.icon}
          <span>{config.badgeText}</span>
        </span>
      </div>

      <p className="text-sm font-serif leading-relaxed text-stone-900 dark:text-stone-100 selection:bg-amber-500 selection:text-white">
        {clause.originalText}
      </p>

      {/* Instant Hover Popover */}
      {showPopover && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 z-50 pointer-events-auto">
          <ClausePopover clause={clause} onSelectClause={onSelect} />
        </div>
      )}
    </div>
  );
};
