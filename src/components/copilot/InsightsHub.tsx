import React, { useState } from 'react';
import { LegalDocument, ChatMessage } from '../../types/legal';
import { ExecutiveSummaryTab } from './ExecutiveSummaryTab';
import { CopilotChatTab } from './CopilotChatTab';
import { ClauseComparatorTab } from './ClauseComparatorTab';
import { PrepSheetTab } from './PrepSheetTab';
import { Scale, MessageSquare, GitCompare, FileCheck } from 'lucide-react';

interface InsightsHubProps {
  document: LegalDocument;
  riskMetrics: { score: number; highCount: number; ambiguousCount: number; greenCount: number };
  chatMessages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onSelectClause: (id: string) => void;
  onSelectClauseByTag: (tag: string) => void;
}

export type TabType = 'SUMMARY' | 'COPILOT' | 'COMPARATOR' | 'PREP_SHEET';

export const InsightsHub: React.FC<InsightsHubProps> = ({
  document,
  riskMetrics,
  chatMessages,
  onSendMessage,
  onSelectClause,
  onSelectClauseByTag,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('SUMMARY');

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'SUMMARY', label: 'Verdict', icon: <Scale className="w-4 h-4" /> },
    { id: 'COPILOT', label: 'Co-Counsel', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'COMPARATOR', label: 'Diff', icon: <GitCompare className="w-4 h-4" /> },
    { id: 'PREP_SHEET', label: 'Trial Prep', icon: <FileCheck className="w-4 h-4" /> },
  ];

  return (
    <aside
      role="complementary"
      aria-label="Judicial Intelligence Hub"
      className="w-full lg:w-[420px] shrink-0 border-l border-stone-200 dark:border-court-border bg-stone-50/70 dark:bg-court-dark flex flex-col h-full overflow-hidden"
    >
      {/* Accessible ARIA Tab Bar */}
      <div 
        role="tablist" 
        aria-label="Judicial Intelligence Tabs"
        className="h-16 border-b border-stone-200 dark:border-court-border px-3 flex items-center justify-around bg-white/90 dark:bg-court-mahogany/80 backdrop-blur-md gap-1"
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
              className={`flex-1 py-2 px-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all focus:ring-2 focus:ring-amber-500 focus:outline-none ${
                isActive
                  ? 'bg-amber-600 text-white shadow-sm font-serif'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              {tab.icon}
              <span className="truncate">{tab.label}</span>
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

        {activeTab === 'COPILOT' && (
          <div role="tabpanel" id="tabpanel-COPILOT" aria-labelledby="tab-COPILOT">
            <CopilotChatTab
              messages={chatMessages}
              onSendMessage={onSendMessage}
              onSelectClauseByTag={onSelectClauseByTag}
            />
          </div>
        )}

        {activeTab === 'COMPARATOR' && (
          <div role="tabpanel" id="tabpanel-COMPARATOR" aria-labelledby="tab-COMPARATOR">
            <ClauseComparatorTab document={document} />
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
