import React from 'react';
import { LegalDocument } from '../../types/legal';
import { generateLawyerPrepSheet } from '../../services/ai/prepSheetEngine';
import { generatePrepSheetMarkdown, downloadFile, printPrepSheet } from '../../utils/exportHelper';
import { Printer, Download, HelpCircle, AlertOctagon, Gavel } from 'lucide-react';

interface PrepSheetTabProps {
  document: LegalDocument;
}

export const PrepSheetTab: React.FC<PrepSheetTabProps> = ({ document }) => {
  const prepSheet = generateLawyerPrepSheet(document);

  const handleDownload = () => {
    const md = generatePrepSheetMarkdown(prepSheet);
    downloadFile(md, `${document.title.replace(/[^a-z0-9]/gi, '_')}_Trial_Prep_Sheet.md`);
  };

  const handlePrint = () => {
    printPrepSheet(prepSheet);
  };

  return (
    <div className="space-y-5 p-5 text-stone-100 font-sans">
      {/* Action Toolbar */}
      <div className="p-4 rounded-2xl bg-amber-600/10 border border-amber-500/20 flex items-center justify-between gap-3">
        <div>
          <h4 className="text-xs font-serif font-bold text-white flex items-center gap-1.5">
            <Gavel className="w-4 h-4 text-amber-400" />
            1-Page Trial & Attorney Prep Brief
          </h4>
          <p className="text-[11px] text-stone-400">Export structured brief for formal legal counsel review</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            aria-label="Download Markdown Brief"
            className="px-3 py-1.5 rounded-xl bg-court-mahogany hover:bg-stone-800 text-xs font-medium text-stone-200 border border-court-border flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Markdown</span>
          </button>
          <button
            onClick={handlePrint}
            aria-label="Print Prep Sheet"
            className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-xs font-bold text-white shadow-md flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print PDF</span>
          </button>
        </div>
      </div>

      {/* Structured Brief Preview Card */}
      <div className="p-5 rounded-2xl bg-court-mahogany border border-court-border space-y-5 text-xs font-sans">
        {/* Executive Summary */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-serif">
            1. Judicial Executive Brief
          </span>
          <p className="text-stone-300 leading-relaxed font-normal">
            {prepSheet.executiveBrief}
          </p>
        </div>

        <hr className="border-court-border" />

        {/* Priority Risks */}
        <div className="space-y-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1 font-serif">
            <AlertOctagon className="w-3.5 h-3.5" /> 2. High-Priority Objections & Proposed Fixes
          </span>
          {prepSheet.highPriorityRisks.map((risk, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-court-dark border border-court-border space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded">
                  {risk.clauseTag}
                </span>
                <span className="font-bold text-stone-200 font-serif">{risk.issue}</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">{risk.impact}</p>
              <div className="text-[11px] text-emerald-400 font-medium">
                Fix: {risk.proposedFix}
              </div>
            </div>
          ))}
        </div>

        <hr className="border-court-border" />

        {/* Questions for Legal Counsel */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1 font-serif">
            <HelpCircle className="w-3.5 h-3.5" /> 3. Questions for Legal Counsel
          </span>
          <ul className="space-y-2 list-disc list-inside text-stone-300">
            {prepSheet.questionsForCounsel.map((q, idx) => (
              <li key={idx} className="leading-relaxed">{q}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
