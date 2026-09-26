import React from 'react';
import { Scale } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer
      role="contentinfo"
      aria-label="Legal Disclaimer"
      className="bg-[#0F172A] border-t border-slate-700/50 px-5 py-2.5 text-xs sticky bottom-0 z-30"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5">
        <div className="flex items-center gap-2 text-indigo-400 font-semibold shrink-0">
          <Scale className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Disclaimer:</span>
        </div>
        <p className="text-center sm:text-left text-slate-500 leading-tight">
          LexiClear AI provides AI-assisted legal document analysis for informational purposes only. This is not formal legal advice under the Advocates Act, 1961 or Bar Council of India Rules. Consult a qualified Indian legal practitioner before acting on any clause analysis.
        </p>
        <div className="text-[11px] text-slate-600 font-mono whitespace-nowrap hidden lg:block">
          DOM Sanitized · Zero-Knowledge
        </div>
      </div>
    </footer>
  );
};
