"use client";

import { useState, useRef } from "react";
import { Image as ImageIcon, UploadCloud, X } from "lucide-react";

interface ImageUploaderProps {
  name: string;
  defaultUrl?: string;
}

export function ImageUploader({ name, defaultUrl }: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultUrl || null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4.5 * 1024 * 1024) {
        alert("Image must be smaller than 4.5MB");
        if (inputRef.current) inputRef.current.value = "";
        return;
      }
      // Create a temporary local URL for immediate preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    } else {
      setPreviewUrl(defaultUrl || null);
    }
  };

  const clearImage = () => {
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      <input 
        type="file" 
        name={name} 
        accept="image/*" 
        className="hidden" 
        ref={inputRef} 
        onChange={handleFileChange} 
      />
      
      {/* If there's an existing image url in DB, we still need to pass it so the server knows not to delete it if no new file is uploaded */}
      <input type="hidden" name={`${name}_existing`} value={defaultUrl || ""} />

      {previewUrl ? (
        <div className="relative w-full min-h-48 rounded-xl overflow-hidden border border-border group bg-black/5 flex items-center justify-center">
          <img src={previewUrl} alt="Preview" className="w-full max-h-96 object-contain" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            <button 
              type="button" 
              onClick={() => inputRef.current?.click()} 
              className="bg-surface text-text px-4 py-2 rounded-full text-sm font-medium hover:bg-accent hover:text-white transition-colors"
            >
              Change
            </button>
            <button 
              type="button" 
              onClick={clearImage} 
              className="bg-red-500/20 text-red-100 px-4 py-2 rounded-full text-sm font-medium hover:bg-red-500 hover:text-white transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      ) : (
        <div 
          onClick={() => inputRef.current?.click()}
          className="w-full h-48 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-accent hover:bg-accent/5 transition-all text-text-muted hover:text-accent"
        >
          <UploadCloud className="w-8 h-8" />
          <span className="text-sm font-medium">Click to upload image</span>
          <span className="text-xs opacity-70">JPG, PNG, WebP up to 4.5MB</span>
        </div>
      )}
    </div>
  );
}
