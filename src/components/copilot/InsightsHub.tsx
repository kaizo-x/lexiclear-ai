import React, { useState } from 'react';
import { LegalDocument, ChatMessage } from '../../types/legal';
import { ExecutiveSummaryTab } from './ExecutiveSummaryTab';
import { CopilotChatTab } from './CopilotChatTab';
import { ClauseComparatorTab } from './ClauseComparatorTab';
import { PrepSheetTab } from './PrepSheetTab';
import { BarChart2, AlertTriangle, MessageSquare, FileText } from 'lucide-react';

interface InsightsHubProps {
  document: LegalDocument;
  riskMetrics: { score: number; highCount: number; ambiguousCount: number; greenCount: number };
  chatMessages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onSelectClause: (id: string) => void;
  onSelectClauseByTag: (tag: string) => void;
}

export type TabType = 'SUMMARY' | 'RISKS' | 'COPILOT' | 'PREP_SHEET';

export const InsightsHub: React.FC<InsightsHubProps> = ({
  document,
  riskMetrics,
  chatMessages,
  onSendMessage,
  onSelectClause,
  onSelectClauseByTag,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('SUMMARY');

  const tabs: { id: TabType; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'SUMMARY',    label: 'Summary',   icon: <BarChart2 className="w-3.5 h-3.5" /> },
    { id: 'RISKS',      label: 'Risks',     icon: <AlertTriangle className="w-3.5 h-3.5" />, badge: riskMetrics.highCount },
    { id: 'COPILOT',    label: 'Copilot',   icon: <MessageSquare className="w-3.5 h-3.5" /> },
    { id: 'PREP_SHEET', label: 'Prep Sheet', icon: <FileText className="w-3.5 h-3.5" /> },
  ];

  return (
    <aside
      role="complementary"
      aria-label="AI Insights Hub"
      className="w-full lg:w-[400px] shrink-0 border-l border-slate-700/50 bg-[#1E293B]/40 flex flex-col h-full overflow-hidden"
    >
      {/* Tab Bar */}
      <div
        role="tablist"
        aria-label="Insights tabs"
        className="h-12 border-b border-slate-700/50 px-2 flex items-center gap-1 bg-[#1E293B]/60 shrink-0"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 h-8 px-2 text-[11px] font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 relative ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/40'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center ${
                  isActive ? 'bg-rose-500 text-white' : 'bg-rose-500/80 text-white'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'SUMMARY' && (
          <div role="tabpanel" id="tabpanel-SUMMARY" aria-labelledby="tab-SUMMARY">
            <ExecutiveSummaryTab
              document={document}
              riskMetrics={riskMetrics}
              onSelectClause={onSelectClause}
            />
          </div>
        )}

        {activeTab === 'RISKS' && (
          <div role="tabpanel" id="tabpanel-RISKS" aria-labelledby="tab-RISKS">
            <ClauseComparatorTab document={document} />
          </div>
        )}

        {activeTab === 'COPILOT' && (
          <div role="tabpanel" id="tabpanel-COPILOT" aria-labelledby="tab-COPILOT" className="h-full">
            <CopilotChatTab
              messages={chatMessages}
              onSendMessage={onSendMessage}
              onSelectClauseByTag={onSelectClauseByTag}
            />
          </div>
        )}

        {activeTab === 'PREP_SHEET' && (
          <div role="tabpanel" id="tabpanel-PREP_SHEET" aria-labelledby="tab-PREP_SHEET">
            <PrepSheetTab document={document} />
          </div>
        )}
      </div>
    </aside>
  );
};
