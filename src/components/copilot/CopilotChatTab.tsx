import React, { useState } from 'react';
import { ChatMessage } from '../../types/legal';
import { Send, Scale, User, Tag, Gavel } from 'lucide-react';

interface CopilotChatTabProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onSelectClauseByTag: (tag: string) => void;
}

export const CopilotChatTab: React.FC<CopilotChatTabProps> = ({
  messages,
  onSendMessage,
  onSelectClauseByTag,
}) => {
  const [inputText, setInputText] = useState('');

  const promptChips = [
    'What are my main legal liabilities?',
    'Can I terminate this agreement early?',
    'Are my IP rights protected upon creation?',
    'What is the governing court jurisdiction?',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const handleChipClick = (chipText: string) => {
    onSendMessage(chipText);
  };

  return (
    <div className="flex flex-col h-[600px] text-stone-100 font-sans">
      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'USER';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isUser
                    ? 'bg-amber-600 text-white'
                    : 'bg-court-mahogany text-amber-400 border border-court-border'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Gavel className="w-4 h-4" />}
              </div>

              <div className={`space-y-1 max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    isUser
                      ? 'bg-amber-600 text-white rounded-tr-none'
                      : 'bg-court-mahogany border border-court-border text-stone-200 rounded-tl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  
                  {msg.citedClauseTags && msg.citedClauseTags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-court-border mt-2">
                      <span className="text-[10px] uppercase font-semibold text-amber-400 flex items-center gap-1">
                        <Tag className="w-3 h-3" /> Cited Clauses:
                      </span>
                      {msg.citedClauseTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => onSelectClauseByTag(tag)}
                          className="px-2 py-0.5 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-mono text-[10px] font-bold transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="text-[10px] font-mono text-stone-500 px-1">
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Suggested Prompt Chips */}
      <div className="p-3.5 border-t border-court-border bg-court-dark/80 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1 font-serif">
          <Scale className="w-3.5 h-3.5" /> Suggested Inquiries for AI Co-Counsel
        </span>
        <div className="flex flex-wrap gap-1.5">
          {promptChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleChipClick(chip)}
              className="text-[11px] px-3 py-1.5 rounded-xl bg-court-mahogany hover:bg-amber-600/10 border border-court-border hover:border-amber-500/30 text-stone-300 hover:text-amber-200 transition-all font-medium text-left"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-3.5 bg-court-mahogany border-t border-court-border flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask AI Co-Counsel about any clause or obligation..."
          aria-label="Ask AI Co-Counsel a question"
          className="flex-1 bg-court-dark border border-court-border rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          aria-label="Send Message"
          className="px-3.5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white transition-colors focus:ring-2 focus:ring-amber-400 focus:outline-none"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
