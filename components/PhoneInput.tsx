"use client";

import React from "react";

export function PhoneInput({ name, defaultValue, required }: { name: string, defaultValue?: string, required?: boolean }) {
  return (
    <input
      name={name}
      type="tel"
      defaultValue={defaultValue}
      required={required}
      className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent transition-all"
      onInput={(e) => {
        let raw = e.currentTarget.value.replace(/[^0-9+\-\s()]/g, '');
        
        // Count maximum allowed digits: 13 if it has a prefix (+), otherwise 10
        const maxDigits = raw.includes('+') ? 14 : 10;
        
        let digitCount = 0;
        let truncateAt = raw.length;
        
        for (let i = 0; i < raw.length; i++) {
          if (/[0-9]/.test(raw[i])) {
            digitCount++;
            if (digitCount === maxDigits) {
              truncateAt = i + 1;
              break;
            }
          }
        }
        
        e.currentTarget.value = raw.substring(0, truncateAt);
      }}
    />
  );
}
