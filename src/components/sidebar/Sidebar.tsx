import React from 'react';
import { LegalDocument, FilterRiskLevel } from '../../types/legal';
import { UploadZone } from './UploadZone';
import { SampleSelector } from './SampleSelector';
import { RiskFilter } from './RiskFilter';
import { Clock, ShieldCheck, FileCheck2 } from 'lucide-react';

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
      aria-label="Case Docket Sidebar"
      className="w-full lg:w-80 shrink-0 border-r border-stone-200 dark:border-court-border bg-stone-50/70 dark:bg-court-dark p-5 space-y-6 overflow-y-auto flex flex-col justify-between"
    >
      <div className="space-y-6">
        {/* Step 1: Upload Evidence Document */}
        <UploadZone onUpload={onUploadDoc} />

        <hr className="border-stone-200 dark:border-court-border" />

        {/* Pre-Loaded Case Docket Files */}
        <SampleSelector
          documents={documents}
          activeDocId={activeDoc.id}
          onSelectDoc={onSelectDoc}
        />

        <hr className="border-stone-200 dark:border-court-border" />

        {/* Clause Objections Filter */}
        <RiskFilter
          currentFilter={riskFilter}
          onFilterChange={onFilterChange}
          counts={riskMetrics}
        />

        <hr className="border-stone-200 dark:border-court-border" />

        {/* Audit Trail Status */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 font-serif flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Case Audit Trail
          </label>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-court-mahogany border border-stone-200 dark:border-court-border space-y-2 text-xs">
            <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 font-mono text-[11px]">
              <span>Case ID:</span>
              <span className="font-bold text-amber-700 dark:text-amber-400">{activeDoc.id}</span>
            </div>
            <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 font-mono text-[11px]">
              <span>Clauses Evaluated:</span>
              <span className="font-bold text-stone-800 dark:text-stone-200">{activeDoc.clauses.length}</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold pt-1">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Evidentiary Sanitized</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Footer Badge */}
      <div className="pt-4 border-t border-stone-200 dark:border-court-border text-center">
        <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-court-mahogany px-3 py-1 rounded-full border border-stone-200 dark:border-court-border">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>Zero Knowledge Privacy</span>
        </div>
      </div>
    </aside>
  );
};
