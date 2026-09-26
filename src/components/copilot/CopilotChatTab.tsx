import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../../types/legal';
import { Send, Bot, User, Tag, Sparkles } from 'lucide-react';

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
  const bottomRef = useRef<HTMLDivElement>(null);

  const promptChips = [
    'What are my main legal liabilities?',
    'Is this non-compete enforceable in India?',
    'Are my IP rights protected upon creation?',
    'Which court has jurisdiction under this agreement?',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[600px]">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'USER';
          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                isUser
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-700 text-indigo-400 border border-slate-600/50'
              }`}>
                {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              {/* Bubble */}
              <div className={`space-y-1 max-w-[85%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className={`p-3 rounded-xl text-xs leading-relaxed ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-800/70 border border-slate-700/50 text-slate-200 rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Cited clause tags */}
                  {msg.citedClauseTags && msg.citedClauseTags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-2.5 border-t border-white/10 mt-2">
                      <span className="text-[10px] uppercase font-semibold text-indigo-300 flex items-center gap-1">
                        <Tag className="w-2.5 h-2.5" /> Referenced:
                      </span>
                      {msg.citedClauseTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => onSelectClauseByTag(tag)}
                          className="px-2 py-0.5 rounded bg-indigo-500/25 hover:bg-indigo-500/40 text-indigo-300 font-mono text-[10px] font-bold transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-mono text-slate-600 px-1">{msg.timestamp}</span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Prompt chips */}
      <div className="p-3 border-t border-slate-700/50 bg-slate-800/30 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-indigo-400" />
          Quick Questions
        </span>
        <div className="flex flex-wrap gap-1.5">
          {promptChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => onSendMessage(chip)}
              className="text-[11px] px-2.5 py-1.5 rounded-lg bg-slate-700/50 hover:bg-indigo-600/20 border border-slate-600/50 hover:border-indigo-500/40 text-slate-300 hover:text-indigo-300 transition-all font-medium text-left"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-3 bg-slate-800/50 border-t border-slate-700/50 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask Legal Copilot about any clause..."
          aria-label="Ask Legal Copilot a question"
          className="flex-1 bg-slate-900/60 border border-slate-700/50 rounded-lg px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          aria-label="Send message"
          className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
