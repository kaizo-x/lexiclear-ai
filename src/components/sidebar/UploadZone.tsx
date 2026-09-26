import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2 } from 'lucide-react';

interface UploadZoneProps {
  onUpload: (title: string, content: string) => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = (e.target?.result as string) || '';
      onUpload(file.name, content);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2500);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) processFile(e.target.files[0]);
  };

  return (
    <div className="space-y-2">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
        Upload Document
      </p>

      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        tabIndex={0}
        role="button"
        aria-label="Upload contract document"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
        className={`relative cursor-pointer rounded-lg border-2 border-dashed p-4 text-center transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
          isSuccess
            ? 'border-emerald-500/50 bg-emerald-500/5'
            : isDragging
            ? 'border-indigo-500 bg-indigo-500/8 scale-[1.01]'
            : 'border-slate-600/60 bg-slate-800/40 hover:border-indigo-500/50 hover:bg-slate-800/60'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          accept=".txt,.md,.doc,.docx,.pdf"
          className="hidden"
        />

        {isSuccess ? (
          <div className="flex flex-col items-center gap-1.5 py-1">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400">Document uploaded!</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-1">
            <div className={`p-2 rounded-lg border transition-colors ${
              isDragging
                ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-400'
                : 'bg-slate-700/60 border-slate-600/50 text-slate-400'
            }`}>
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-300">
                Drop contract or click to upload
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                PDF · DOCX · TXT
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
