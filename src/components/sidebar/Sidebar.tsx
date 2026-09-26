import React from 'react';
import { LegalDocument, FilterRiskLevel } from '../../types/legal';
import { UploadZone } from './UploadZone';
import { SampleSelector } from './SampleSelector';
import { RiskFilter } from './RiskFilter';
import { FileCheck2, ShieldCheck } from 'lucide-react';

interface SidebarProps {
  documents: LegalDocument[];
  activeDoc: LegalDocument;
  riskMetrics: { highCount: number; ambiguousCount: number; greenCount: number };
  riskFilter: FilterRiskLevel;
  onFilterChange: (filter: FilterRiskLevel) => void;
  onSelectDoc: (id: string) => void;
  onUploadDoc: (title: string, content: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  documents,
  activeDoc,
  riskMetrics,
  riskFilter,
  onFilterChange,
  onSelectDoc,
  onUploadDoc,
}) => {
  return (
    <aside
      role="navigation"
      aria-label="Document Navigation"
      className="w-full lg:w-72 shrink-0 border-r border-slate-700/50 bg-[#1E293B]/60 flex flex-col overflow-y-auto"
    >
      <div className="flex-1 p-4 space-y-5">
        {/* Upload */}
        <UploadZone onUpload={onUploadDoc} />

        <div className="border-t border-slate-700/50" />

        {/* Sample Contracts */}
        <SampleSelector
          documents={documents}
          activeDocId={activeDoc.id}
          onSelectDoc={onSelectDoc}
        />

        <div className="border-t border-slate-700/50" />

        {/* Risk Filter */}
        <RiskFilter
          currentFilter={riskFilter}
          onFilterChange={onFilterChange}
          counts={riskMetrics}
        />

        <div className="border-t border-slate-700/50" />

        {/* Document meta */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Document Info
          </p>
          <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/50 space-y-1.5 text-xs font-mono">
            <div className="flex justify-between text-slate-400">
              <span>ID</span>
              <span className="text-slate-300 truncate max-w-[120px]">{activeDoc.id}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Clauses</span>
              <span className="text-slate-300">{activeDoc.clauses.length}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Size</span>
              <span className="text-slate-300">{activeDoc.fileSize}</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 pt-1 border-t border-slate-700/50">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span className="text-[11px] font-semibold">XSS Sanitized</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar footer */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
          <span>Zero-Knowledge · India Legal Context</span>
        </div>
      </div>
    </aside>
  );
};
