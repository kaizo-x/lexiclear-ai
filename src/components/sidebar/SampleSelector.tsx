import React from 'react';
import { LegalDocument } from '../../types/legal';
import { FileText, ChevronRight, AlertTriangle } from 'lucide-react';

interface SampleSelectorProps {
  documents: LegalDocument[];
  activeDocId: string;
  onSelectDoc: (id: string) => void;
}

export const SampleSelector: React.FC<SampleSelectorProps> = ({ documents, activeDocId, onSelectDoc }) => {
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
        Sample Contracts
      </p>

      <div className="space-y-1.5">
        {documents.map((doc) => {
          const isActive = doc.id === activeDocId;
          const highCount = doc.clauses.filter((c) => c.riskLevel === 'HIGH').length;

          return (
            <button
              key={doc.id}
              onClick={() => onSelectDoc(doc.id)}
              aria-selected={isActive}
              tabIndex={0}
              className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                isActive
                  ? 'bg-indigo-600/15 border-indigo-500/40 shadow-sm'
                  : 'bg-slate-800/40 border-slate-700/50 hover:border-slate-600/60 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`p-1.5 rounded-md shrink-0 ${
                  isActive ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400'
                }`}>
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <h4 className={`text-xs font-semibold truncate ${
                    isActive ? 'text-indigo-300' : 'text-slate-300'
                  }`}>
                    {doc.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-mono text-slate-500">
                      {doc.type}
                    </span>
                    {highCount > 0 && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-rose-400">
                        <AlertTriangle className="w-2.5 h-2.5" />
                        {highCount} high
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                isActive ? 'text-indigo-400 translate-x-0.5' : 'text-slate-600'
              }`} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
