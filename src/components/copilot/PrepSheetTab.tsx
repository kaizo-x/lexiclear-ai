import React from 'react';
import { LegalDocument } from '../../types/legal';
import { generateLawyerPrepSheet } from '../../services/ai/prepSheetEngine';
import { generatePrepSheetMarkdown, downloadFile, printPrepSheet } from '../../utils/exportHelper';
import { Printer, Download, AlertTriangle, HelpCircle, FileDown } from 'lucide-react';

interface PrepSheetTabProps {
  document: LegalDocument;
}

export const PrepSheetTab: React.FC<PrepSheetTabProps> = ({ document }) => {
  const prepSheet = generateLawyerPrepSheet(document);

  const handleDownload = () => {
    const md = generatePrepSheetMarkdown(prepSheet);
    downloadFile(md, `${document.title.replace(/[^a-z0-9]/gi, '_')}_Lawyer_Prep_Sheet.md`);
  };

  const handlePrint = () => {
    printPrepSheet(prepSheet);
  };

  return (
    <div className="space-y-5 p-5">
      {/* Action Toolbar */}
      <div className="p-4 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-between gap-3">
        <div>
          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
            <FileDown className="w-4 h-4 text-indigo-400" />
            Lawyer Prep Sheet
          </h4>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Exportable 1-page brief for your legal counsel
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleDownload}
            aria-label="Download Markdown"
            className="px-3 py-1.5 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-xs font-medium text-slate-300 border border-slate-600/50 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>.md</span>
          </button>
          <button
            onClick={handlePrint}
            aria-label="Print PDF"
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>PDF</span>
          </button>
        </div>
      </div>

      {/* Prep Sheet Content */}
      <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-5 text-xs">
        {/* Executive Brief */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
            Executive Brief
          </span>
          <p className="text-slate-300 leading-relaxed">{prepSheet.executiveBrief}</p>
        </div>

        <div className="border-t border-slate-700/50" />

        {/* High-Priority Risks */}
        <div className="space-y-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            High-Priority Risks &amp; Proposed Fixes
          </span>
          {prepSheet.highPriorityRisks.map((risk, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-slate-900/50 border border-slate-700/50 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-500/15 px-1.5 py-0.5 rounded border border-rose-500/25">
                  {risk.clauseTag}
                </span>
                <span className="font-semibold text-slate-200">{risk.issue}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{risk.impact}</p>
              <div className="text-[11px] text-emerald-400 font-medium">
                ✓ Fix: {risk.proposedFix}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-700/50" />

        {/* Questions for Counsel */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" />
            Questions for Your Advocate
          </span>
          <ul className="space-y-2 text-slate-300">
            {prepSheet.questionsForCounsel.map((q, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="text-indigo-500 shrink-0 font-mono font-bold text-[10px] mt-0.5">
                  Q{idx + 1}.
                </span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Dates */}
        {prepSheet.keyDatesAndDeadlines.length > 0 && (
          <>
            <div className="border-t border-slate-700/50" />
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                Key Dates &amp; Deadlines
              </span>
              {prepSheet.keyDatesAndDeadlines.map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-amber-500/8 border border-amber-500/20 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-slate-200">{item.label}</span>
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded">
                      {item.dateOrTimeframe}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{item.actionRequired}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
