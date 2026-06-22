"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export interface Option {
  value: string;
  label: string;
}

export function CustomSelect({
  name,
  options,
  defaultValue,
  required,
}: {
  name: string;
  options: Option[];
  defaultValue?: string;
  required?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(defaultValue || options[0]?.value || "");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className="relative w-full" ref={containerRef}>
      <input type="hidden" name={name} value={value} required={required} />
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between bg-bg border rounded-xl px-4 py-3 text-sm transition-all focus:outline-none ${
          isOpen ? "border-accent text-text" : "border-border text-text hover:border-accent/50"
        }`}
      >
        <span>{selectedOption ? selectedOption.label : "Select..."}</span>
        <ChevronDown className={`w-4 h-4 text-text-secondary transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 w-full bg-surface border border-border rounded-xl shadow-2xl z-50 py-2 max-h-60 overflow-y-auto">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setValue(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  isSelected 
                    ? "bg-accent/10 text-accent font-medium" 
                    : "text-text hover:bg-bg hover:text-accent"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
