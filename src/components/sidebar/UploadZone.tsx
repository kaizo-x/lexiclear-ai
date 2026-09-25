import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, FolderPlus } from 'lucide-react';

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
      const content = e.target?.result as string || '';
      onUpload(file.name, content);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 font-serif flex items-center gap-1.5">
          <FolderPlus className="w-3.5 h-3.5" />
          Upload Evidence File
        </label>
        <span className="text-[10px] font-mono text-stone-400">Step 1</span>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        tabIndex={0}
        role="button"
        aria-label="Upload evidence document drag and drop zone"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-4 text-center transition-all focus:ring-2 focus:ring-amber-500 focus:outline-none ${
          isSuccess
            ? 'border-emerald-500/50 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400'
            : isDragging
            ? 'border-amber-500 bg-amber-500/5 text-amber-700 dark:text-amber-400 scale-[1.01]'
            : 'border-stone-300 dark:border-court-border bg-white dark:bg-court-mahogany/60 hover:border-amber-500/50 hover:bg-stone-50 dark:hover:bg-court-mahogany text-stone-600 dark:text-stone-400 shadow-sm'
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
            <CheckCircle2 className="w-6 h-6 text-emerald-500 animate-bounce" />
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Evidence File Added to Case Docket!</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-1">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900 dark:text-stone-100 font-sans">
                Drop your contract or click to upload
              </p>
              <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-0.5">
                Supports TXT, MD, PDF, DOCX
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
