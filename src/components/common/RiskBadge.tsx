import React from 'react';
import { RiskLevel } from '../../types/legal';
import { AlertOctagon, Scale, CheckCircle2 } from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, showIcon = true, size = 'md' }) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs font-semibold gap-1.5',
    lg: 'px-3 py-1.5 text-sm font-bold gap-2',
  };

  const badgeConfig = {
    HIGH: {
      label: 'Objection (High Risk)',
      bgColor: 'bg-rose-500/10 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30',
      icon: <AlertOctagon className="w-3.5 h-3.5 text-rose-600 dark:text-rose-500" />,
    },
    AMBIGUOUS: {
      label: 'Review (Ambiguous Term)',
      bgColor: 'bg-amber-500/10 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30',
      icon: <Scale className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" />,
    },
    GREEN: {
      label: 'Verdict (Standard Safe)',
      bgColor: 'bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" />,
    },
  };

  const config = badgeConfig[level] || badgeConfig.GREEN;

  return (
    <span
      className={`inline-flex items-center rounded-full border shadow-sm transition-colors font-sans ${sizeClasses[size]} ${config.bgColor}`}
    >
      {showIcon && config.icon}
      <span>{config.label}</span>
    </span>
  );
};
