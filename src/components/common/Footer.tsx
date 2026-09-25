import React from 'react';
import { Scale } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer 
      role="contentinfo" 
      aria-label="Legal Disclaimer"
      className="bg-stone-100 text-stone-600 dark:bg-court-dark dark:text-stone-400 border-t border-stone-200 dark:border-court-border px-6 py-3 text-xs font-normal sticky bottom-0 z-30"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold shrink-0 font-serif">
          <Scale className="w-4 h-4" aria-hidden="true" />
          <span>JUDICIAL NOTICE:</span>
        </div>
        <p className="text-center sm:text-left text-stone-600 dark:text-stone-300 leading-tight font-sans">
          LexiClear AI provides legal information and document analysis using Generative AI. It does not provide formal legal advice or replace a qualified legal professional.
        </p>
        <div className="text-[11px] text-stone-400 dark:text-stone-500 font-mono whitespace-nowrap hidden lg:block">
          Evidentiary DOM Sanitized
        </div>
      </div>
    </footer>
  );
};
