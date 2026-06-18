"use client";

import { useState, useRef } from "react";
import { FileText, UploadCloud, X } from "lucide-react";

interface FileUploaderProps {
  name: string;
  defaultUrl?: string;
}

export function FileUploader({ name, defaultUrl }: FileUploaderProps) {
  const [fileName, setFileName] = useState<string | null>(
    defaultUrl ? defaultUrl.split("/").pop() || "Existing File" : null
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName(defaultUrl ? defaultUrl.split("/").pop() || "Existing File" : null);
    }
  };

  const clearFile = () => {
    setFileName(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      <input 
        type="file" 
        name={name} 
        accept="application/pdf,.doc,.docx" 
        className="hidden" 
        ref={inputRef} 
        onChange={handleFileChange} 
      />
      
      {/* Existing url fallback */}
      <input type="hidden" name={`${name}_existing`} value={defaultUrl || ""} />

      {fileName ? (
        <div className="flex items-center justify-between w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text">
          <div className="flex items-center gap-3 overflow-hidden">
            <FileText className="w-5 h-5 text-accent flex-shrink-0" />
            <span className="truncate">{fileName}</span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-4">
            <button 
              type="button" 
              onClick={() => inputRef.current?.click()} 
              className="text-text-secondary hover:text-accent transition-colors"
            >
              Change
            </button>
            <button 
              type="button" 
              onClick={clearFile} 
              className="text-text-secondary hover:text-red-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div 
          onClick={() => inputRef.current?.click()}
          className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text-muted hover:border-accent hover:text-accent cursor-pointer transition-all flex items-center gap-3"
        >
          <UploadCloud className="w-5 h-5" />
          Click to select a CV document (PDF)
        </div>
      )}
    </div>
  );
}
