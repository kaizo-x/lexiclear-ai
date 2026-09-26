import React, { useState } from 'react';
import { Clause } from '../../types/legal';
import { ClausePopover } from './ClausePopover';
import { AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';

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
      rowBg: 'bg-rose-500/8 hover:bg-rose-500/12',
      leftBorder: 'border-l-2 border-rose-500',
      selectedBg: 'bg-rose-500/15 ring-1 ring-rose-500/40',
      tagClass: 'bg-rose-500/20 text-rose-400 border border-rose-500/30',
      badgeClass: 'text-rose-400',
      badgeText: 'High Risk',
      icon: <AlertTriangle className="w-3.5 h-3.5" />,
    },
    AMBIGUOUS: {
      rowBg: 'bg-amber-500/8 hover:bg-amber-500/12',
      leftBorder: 'border-l-2 border-amber-500',
      selectedBg: 'bg-amber-500/15 ring-1 ring-amber-500/40',
      tagClass: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
      badgeClass: 'text-amber-400',
      badgeText: 'Medium Risk',
      icon: <AlertCircle className="w-3.5 h-3.5" />,
    },
    GREEN: {
      rowBg: 'bg-emerald-500/5 hover:bg-emerald-500/8',
      leftBorder: 'border-l-2 border-emerald-500',
      selectedBg: 'bg-emerald-500/12 ring-1 ring-emerald-500/30',
      tagClass: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      badgeClass: 'text-emerald-400',
      badgeText: 'Standard',
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    },
  };

  const config = styleConfig[clause.riskLevel] || styleConfig.GREEN;

  return (
    <div
      tabIndex={0}
      role="region"
      aria-label={`${clause.sectionTag}: ${clause.title}`}
      onMouseEnter={() => { setShowPopover(true); onHover(clause.id); }}
      onMouseLeave={() => { setShowPopover(false); onHover(null); }}
      onClick={() => onSelect(clause.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(clause.id); }
      }}
      className={`relative group px-5 py-4 cursor-pointer transition-all ${config.leftBorder} ${
        isSelected ? config.selectedBg : config.rowBg
      } focus:outline-none focus:ring-2 focus:ring-indigo-500/50`}
    >
      {/* Clause Header */}
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${config.tagClass} shrink-0`}>
            {clause.sectionTag}
          </span>
          <span className="text-xs font-semibold text-slate-200 truncate">
            {clause.title}
          </span>
        </div>
        <span className={`inline-flex items-center gap-1 text-[11px] font-semibold shrink-0 ${config.badgeClass}`}>
          {config.icon}
          <span className="hidden sm:inline">{config.badgeText}</span>
        </span>
      </div>

      {/* Clause Text */}
      <p className="text-sm leading-relaxed text-slate-300 line-clamp-3 group-hover:line-clamp-none transition-all">
        {clause.originalText}
      </p>

      {/* Hover Popover */}
      {showPopover && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 pointer-events-auto">
          <ClausePopover clause={clause} onSelectClause={onSelect} />
        </div>
      )}
    </div>
  );
};
