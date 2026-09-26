import React from 'react';
import { RiskLevel } from '../../types/legal';
import { AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, showIcon = true, size = 'md' }) => {
  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-[10px] gap-1',
    md: 'px-2.5 py-0.5 text-xs gap-1.5',
    lg: 'px-3 py-1 text-sm gap-2',
  };

  const badgeConfig = {
    HIGH: {
      label: 'High Risk',
      className: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
      icon: <AlertTriangle className="w-3 h-3" />,
    },
    AMBIGUOUS: {
      label: 'Medium Risk',
      className: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
      icon: <AlertCircle className="w-3 h-3" />,
    },
    GREEN: {
      label: 'Standard',
      className: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
      icon: <CheckCircle2 className="w-3 h-3" />,
    },
  };

  const config = badgeConfig[level] || badgeConfig.GREEN;

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold font-sans tracking-wide ${sizeClasses[size]} ${config.className}`}
    >
      {showIcon && config.icon}
      <span>{config.label}</span>
    </span>
  );
};
