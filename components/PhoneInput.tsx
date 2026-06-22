"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const COUNTRY_CODES = [
  { code: "+91", iso: "in", name: "India" },
  { code: "+1", iso: "us", name: "United States" },
  { code: "+44", iso: "gb", name: "United Kingdom" },
  { code: "+61", iso: "au", name: "Australia" },
  { code: "+971", iso: "ae", name: "UAE" },
  { code: "+49", iso: "de", name: "Germany" },
  { code: "+33", iso: "fr", name: "France" },
  { code: "+65", iso: "sg", name: "Singapore" },
  { code: "+92", iso: "pk", name: "Pakistan" },
  { code: "+880", iso: "bd", name: "Bangladesh" },
  { code: "+94", iso: "lk", name: "Sri Lanka" },
  { code: "+977", iso: "np", name: "Nepal" },
];

export function PhoneInput({ name, defaultValue = "", required }: { name: string, defaultValue?: string, required?: boolean }) {
  // Parse default value to extract prefix and number
  let defaultPrefix = "+91";
  let defaultNumber = defaultValue;

  // Try to match existing country code from the default value
  for (const c of COUNTRY_CODES) {
    if (defaultValue.startsWith(c.code)) {
      defaultPrefix = c.code;
      defaultNumber = defaultValue.substring(c.code.length).trim();
      break;
    }
  }

  const [prefix, setPrefix] = useState(defaultPrefix);
  const [number, setNumber] = useState(defaultNumber);
  const [isOpen, setIsOpen] = useState(false);
  
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

  const selectedCountry = COUNTRY_CODES.find(c => c.code === prefix) || COUNTRY_CODES[0];

  return (
    <div className="flex bg-bg border border-border rounded-xl focus-within:border-accent transition-all relative" ref={containerRef}>
      {/* Hidden input to submit the actual combined value */}
      <input type="hidden" name={name} value={`${prefix} ${number}`} />
      
      {/* Custom Dropdown Trigger */}
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-surface/50 border-none outline-none py-3 pl-4 pr-3 text-sm text-text focus:ring-0 cursor-pointer rounded-l-xl transition-colors hover:bg-surface"
      >
        <img 
          src={`https://flagcdn.com/w20/${selectedCountry.iso}.png`} 
          alt={selectedCountry.name}
          className="w-5 h-auto rounded-[2px]"
        />
        <span>{selectedCountry.code}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-text-muted transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Custom Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-surface border border-border rounded-xl shadow-2xl z-50 py-2 max-h-60 overflow-y-auto">
          {COUNTRY_CODES.map((c) => {
            const isSelected = c.code === prefix;
            return (
              <button
                key={c.iso}
                type="button"
                onClick={() => {
                  setPrefix(c.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  isSelected 
                    ? "bg-accent/10 text-accent font-medium" 
                    : "text-text hover:bg-bg hover:text-accent"
                }`}
              >
                <img 
                  src={`https://flagcdn.com/w20/${c.iso}.png`} 
                  alt={c.name}
                  className="w-5 h-auto rounded-[2px] shadow-sm"
                />
                <span className="flex-1 text-left">{c.name}</span>
                <span className="text-text-muted">{c.code}</span>
              </button>
            );
          })}
        </div>
      )}
      
      <div className="w-px bg-border my-2 mx-1"></div>
      
      {/* Phone Number Input */}
      <input
        type="tel"
        value={number}
        required={required}
        placeholder="9876543210"
        className="flex-1 bg-transparent border-none outline-none py-3 px-4 text-sm text-text rounded-r-xl"
        onInput={(e) => {
          let raw = e.currentTarget.value.replace(/[^0-9\-\s()]/g, '');
          
          let digitCount = 0;
          let truncateAt = raw.length;
          
          for (let i = 0; i < raw.length; i++) {
            if (/[0-9]/.test(raw[i])) {
              digitCount++;
              if (digitCount === 10) {
                truncateAt = i + 1;
                break;
              }
            }
          }
          
          const finalVal = raw.substring(0, truncateAt);
          e.currentTarget.value = finalVal;
          setNumber(finalVal);
        }}
      />
    </div>
  );
}
