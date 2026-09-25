import React from 'react';
import { LegalDocument } from '../../types/legal';
import { FileText, ChevronRight, AlertOctagon, Scale } from 'lucide-react';

interface SampleSelectorProps {
  documents: LegalDocument[];
  activeDocId: string;
  onSelectDoc: (id: string) => void;
}

export const SampleSelector: React.FC<SampleSelectorProps> = ({ documents, activeDocId, onSelectDoc }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 font-serif flex items-center gap-1.5">
          <Scale className="w-3.5 h-3.5" />
          Case Docket Files
        </label>
        <span className="text-[10px] font-mono text-stone-400">Pre-Loaded</span>
      </div>

      <div className="space-y-2">
        {documents.map((doc) => {
          const isActive = doc.id === activeDocId;
          const highCount = doc.clauses.filter((c) => c.riskLevel === 'HIGH').length;

          return (
            <button
              key={doc.id}
              onClick={() => onSelectDoc(doc.id)}
              aria-selected={isActive}
              tabIndex={0}
              className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 focus:ring-2 focus:ring-amber-500 focus:outline-none ${
                isActive
                  ? 'bg-amber-500/10 dark:bg-amber-600/15 border-amber-500/40 text-stone-900 dark:text-white shadow-sm ring-1 ring-amber-500/30'
                  : 'bg-white dark:bg-court-mahogany/60 border-stone-200 dark:border-court-border text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-700 hover:bg-stone-50 dark:hover:bg-court-mahogany'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`p-2 rounded-xl shrink-0 ${
                  isActive ? 'bg-amber-600 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400'
                }`}>
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold truncate text-stone-900 dark:text-stone-100 font-sans">
                    {doc.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] font-mono text-stone-400 dark:text-stone-500">
                      {doc.type} • {doc.fileSize}
                    </span>
                    {highCount > 0 && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-rose-600 dark:text-rose-400">
                        <AlertOctagon className="w-3 h-3" />
                        {highCount} Objections
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                isActive ? 'text-amber-600 dark:text-amber-400 translate-x-0.5' : 'text-stone-400 dark:text-stone-600'
              }`} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
