"use client";

import React, { useState } from "react";

// Format YYYY-MM to "MMM YYYY" (e.g. "2024-05" -> "May 2024")
function formatMonth(val: string) {
  if (!val || val === "Present") return val;
  const [year, month] = val.split("-");
  if (!year || !month) return val;
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// Parse "MMM YYYY" to YYYY-MM
function parseMonth(val: string) {
  if (!val || val === "Present") return "";
  const parts = val.split(" ");
  if (parts.length !== 2) return "";
  // Check if it's a valid month
  const monthIdx = new Date(Date.parse(parts[0] + " 1, 2012")).getMonth() + 1;
  if (isNaN(monthIdx)) return "";
  const monthStr = monthIdx < 10 ? `0${monthIdx}` : `${monthIdx}`;
  return `${parts[1]}-${monthStr}`;
}

export function JourneyDatePickers({ defaultStart, defaultEnd }: { defaultStart?: string, defaultEnd?: string }) {
  const [start, setStart] = useState(parseMonth(defaultStart || ""));
  const [end, setEnd] = useState(parseMonth(defaultEnd || ""));
  const [isPresent, setIsPresent] = useState(defaultEnd === "Present");

  return (
    <>
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-text-secondary ml-1">Start Date</label>
        <input 
          type="month" 
          value={start}
          onChange={(e) => setStart(e.target.value)}
          required 
          className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent transition-all" 
        />
        {/* Hidden formatted input for server action */}
        <input type="hidden" name="startDate" value={formatMonth(start)} />
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between items-center ml-1">
          <label className="text-sm font-medium text-text-secondary">End Date</label>
          <label className="text-xs flex items-center gap-1.5 text-text-muted cursor-pointer hover:text-text transition-colors">
            <input 
              type="checkbox" 
              checked={isPresent} 
              onChange={(e) => setIsPresent(e.target.checked)} 
              className="accent-accent"
            />
            Present
          </label>
        </div>
        <input 
          type="month" 
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          disabled={isPresent}
          required={!isPresent}
          className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
        />
        <input type="hidden" name="endDate" value={isPresent ? "Present" : formatMonth(end)} />
      </div>
    </>
  );
}
