"use client";

import React, { useState } from "react";

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇺🇸", name: "United States / Canada" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+92", flag: "🇵🇰", name: "Pakistan" },
  { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "+94", flag: "🇱🇰", name: "Sri Lanka" },
  { code: "+977", flag: "🇳🇵", name: "Nepal" },
];

export function PhoneInput({ name, defaultValue = "", required }: { name: string, defaultValue?: string, required?: boolean }) {
  // Parse default value to extract prefix and number
  let defaultPrefix = "+91";
  let defaultNumber = defaultValue;

  // Try to match existing country code from the default value
  for (const c of COUNTRY_CODES) {
    if (defaultValue.startsWith(c.code)) {
      defaultPrefix = c.code;
      // Extract the remaining part and strip leading spaces
      defaultNumber = defaultValue.substring(c.code.length).trim();
      break;
    }
  }

  const [prefix, setPrefix] = useState(defaultPrefix);
  const [number, setNumber] = useState(defaultNumber);

  return (
    <div className="flex bg-bg border border-border rounded-xl focus-within:border-accent transition-all overflow-hidden relative">
      {/* The actual hidden input that submits the form data */}
      <input type="hidden" name={name} value={`${prefix} ${number}`} />
      
      <div className="relative flex items-center bg-surface/50">
        <select 
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
          className="bg-transparent border-none outline-none py-3 pl-4 pr-8 text-sm text-text focus:ring-0 appearance-none cursor-pointer z-10"
        >
          {COUNTRY_CODES.map(c => (
            <option key={c.code} value={c.code} className="bg-bg text-text">
              {c.flag} {c.code}
            </option>
          ))}
        </select>
        {/* Custom Chevron for select */}
        <div className="absolute right-3 pointer-events-none opacity-50 z-0">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
      
      <div className="w-px bg-border"></div>
      
      <input
        type="tel"
        value={number}
        required={required}
        placeholder="9876543210"
        className="flex-1 bg-transparent border-none outline-none py-3 px-4 text-sm text-text"
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
