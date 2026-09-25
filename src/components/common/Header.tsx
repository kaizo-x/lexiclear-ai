import React from 'react';
import { Scale, Sun, Moon, ShieldCheck, ChevronRight } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface HeaderProps {
  activeDocTitle?: string;
  overallScore?: number;
}

export const Header: React.FC<HeaderProps> = ({ activeDocTitle, overallScore }) => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <header 
      role="banner"
      className="border-b border-stone-200/80 dark:border-stone-800 bg-white/95 dark:bg-[#0F0D0E]/95 backdrop-blur-md px-6 py-3 sticky top-0 z-40 transition-colors space-y-2.5 shadow-sm"
    >
      {/* Top Row: Brand & Main Navigation Controls */}
      <div className="flex items-center justify-between">
        {/* Left: Judicial Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-600 rounded-2xl shadow-md shadow-amber-600/15 text-white flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-lg tracking-tight text-stone-900 dark:text-stone-50">
                LexiClear Judicial AI
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                Courtroom Chambers
              </span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 font-medium hidden sm:block">
              Contract Intelligence & Judicial Case Assessment
            </p>
          </div>
        </div>

        {/* Center: Active Case Docket Status */}
        {activeDocTitle && (
          <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 rounded-full bg-stone-100/80 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-medium text-stone-700 dark:text-stone-300 truncate max-w-[240px]">
              Case Docket: {activeDocTitle}
            </span>
            {overallScore !== undefined && (
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                overallScore >= 70 
                  ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' 
                  : overallScore >= 40 
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' 
                  : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
              }`}>
                Objection Risk: {overallScore}/100
              </span>
            )}
          </div>
        )}

        {/* Right: Controls & Theme Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-stone-100/80 dark:bg-stone-900 text-stone-600 dark:text-stone-300 text-xs font-medium border border-stone-200/80 dark:border-stone-800">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>WCAG AA Ready</span>
          </div>

          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            className="p-2 rounded-xl bg-stone-100/80 dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 border border-stone-200/80 dark:border-stone-800 transition-colors focus:ring-2 focus:ring-amber-500 focus:outline-none"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-amber-600" />}
          </button>
        </div>
      </div>

      {/* Bottom Row: 3-Step Guided Workflow Banner */}
      <div className="bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 rounded-2xl px-4 py-2 flex items-center justify-between overflow-x-auto text-xs font-medium">
        <div className="flex items-center gap-1.5 shrink-0 text-amber-800 dark:text-amber-400 font-bold uppercase tracking-wider text-[10px] font-serif">
          <span>HOW TO PROCEED:</span>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4 shrink-0 font-sans text-stone-700 dark:text-stone-300">
          <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-400">
            <span className="w-4 h-4 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px] font-mono font-bold">1</span>
            <span>Select Case Docket</span>
          </div>

          <ChevronRight className="w-3.5 h-3.5 text-stone-300 shrink-0" />

          <div className="flex items-center gap-1.5 font-semibold text-rose-600 dark:text-rose-400">
            <span className="w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-mono font-bold">2</span>
            <span>Review Clause Objections</span>
          </div>

          <ChevronRight className="w-3.5 h-3.5 text-stone-300 shrink-0" />

          <div className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-mono font-bold">3</span>
            <span>Consult Co-Counsel / Export Brief</span>
          </div>
        </div>
      </div>
    </header>
  );
};
