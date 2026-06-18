"use client";

import React, { useState } from "react";

export function ProficiencyInput({ defaultValue }: { defaultValue: string }) {
  const [value, setValue] = useState(defaultValue || "80");

  return (
    <div className="flex items-center gap-4">
      <input 
        name="proficiency" 
        type="range" 
        min="0" 
        max="100" 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
        required 
        className="flex-1 accent-accent" 
      />
      <div className="w-16 text-center bg-bg border border-border rounded-xl py-2.5 text-sm font-medium text-accent">
        {value}%
      </div>
    </div>
  );
}
