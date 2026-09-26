import React from 'react';
import { Scale, Sun, Moon, Shield } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface HeaderProps {
  activeDocTitle?: string;
  overallScore?: number;
}

export const Header: React.FC<HeaderProps> = ({ activeDocTitle, overallScore }) => {
  const { toggleTheme, isDark } = useTheme();

  const scoreColor =
    overallScore !== undefined
      ? overallScore >= 70
        ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
        : overallScore >= 40
        ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
        : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
      : '';

  return (
    <header
      role="banner"
      className="h-14 border-b border-slate-700/60 bg-[#0F172A]/95 backdrop-blur-md px-5 flex items-center justify-between sticky top-0 z-40 shadow-[0_1px_0_0_rgba(99,102,241,0.08)]"
    >
      {/* Left: Brand */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-indigo-glow shrink-0">
          <Scale className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm tracking-tight text-white">
              LexiClear AI
            </span>
            <span className="hidden sm:inline text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/25">
              India Legal
            </span>
          </div>
          <p className="text-[11px] text-slate-400 hidden sm:block leading-none mt-0.5">
            AI-Powered Contract Intelligence Platform
          </p>
        </div>
      </div>

      {/* Center: Active document indicator */}
      {activeDocTitle && (
        <div className="hidden lg:flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-slate-800/70 border border-slate-700/50">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-xs font-medium text-slate-300 truncate max-w-[220px]">
            {activeDocTitle}
          </span>
          {overallScore !== undefined && (
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${scoreColor}`}>
              Score: {overallScore}/100
            </span>
          )}
        </div>
      )}

      {/* Right: Controls */}
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 text-slate-400 text-xs font-medium border border-slate-700/50">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>WCAG AA</span>
        </div>

        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
