"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

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
  const monthIdx = new Date(Date.parse(parts[0] + " 1, 2012")).getMonth() + 1;
  if (isNaN(monthIdx)) return "";
  const monthStr = monthIdx < 10 ? `0${monthIdx}` : `${monthIdx}`;
  return `${parts[1]}-${monthStr}`;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function CustomMonthPicker({ 
  value, 
  onChange, 
  disabled,
  minDate
}: { 
  value: string; 
  onChange: (val: string) => void;
  disabled?: boolean;
  minDate?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Extract year and month from value (YYYY-MM)
  const currentYear = value ? parseInt(value.split("-")[0]) : new Date().getFullYear();
  const currentMonthIdx = value ? parseInt(value.split("-")[1]) - 1 : new Date().getMonth();

  const [viewYear, setViewYear] = useState(currentYear);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isMonthDisabled = (year: number, monthIdx: number) => {
    if (!minDate) return false;
    const [minY, minM] = minDate.split("-").map(Number);
    if (year < minY) return true;
    if (year === minY && monthIdx < minM - 1) return true;
    return false;
  };

  const handleSelectMonth = (monthIdx: number) => {
    if (isMonthDisabled(viewYear, monthIdx)) return;
    const monthStr = monthIdx + 1 < 10 ? `0${monthIdx + 1}` : `${monthIdx + 1}`;
    onChange(`${viewYear}-${monthStr}`);
    setIsOpen(false);
  };

  const displayValue = value ? formatMonth(value) : "Select Date";

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between bg-bg border rounded-xl px-4 py-3 text-sm transition-all focus:outline-none ${
          disabled ? "opacity-50 cursor-not-allowed border-border text-text-muted" : 
          isOpen ? "border-accent text-text" : "border-border text-text hover:border-accent/50"
        }`}
      >
        <span>{disabled ? "Present" : displayValue}</span>
        <Calendar className="w-4 h-4 text-text-secondary" />
      </button>

      {isOpen && !disabled && (
        <div className="absolute top-full mt-2 left-0 w-full md:w-64 bg-surface border border-border rounded-xl shadow-2xl z-50 p-4">
          <div className="flex items-center justify-between mb-4">
            <button 
              type="button" 
              onClick={() => setViewYear(y => y - 1)}
              className="p-1 hover:bg-bg rounded-lg text-text-secondary hover:text-text transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-display font-semibold text-text">{viewYear}</span>
            <button 
              type="button" 
              onClick={() => setViewYear(y => y + 1)}
              className="p-1 hover:bg-bg rounded-lg text-text-secondary hover:text-text transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {MONTHS.map((m, idx) => {
              const isSelected = viewYear === currentYear && idx === currentMonthIdx;
              const disabledMonth = isMonthDisabled(viewYear, idx);
              return (
                <button
                  key={m}
                  type="button"
                  disabled={disabledMonth}
                  onClick={() => handleSelectMonth(idx)}
                  className={`py-2 text-sm rounded-lg transition-all ${
                    disabledMonth 
                      ? "opacity-20 cursor-not-allowed" :
                    isSelected 
                      ? "bg-accent text-white font-medium shadow-lg shadow-accent/20" 
                      : "text-text hover:bg-bg hover:text-accent"
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function JourneyDatePickers({ defaultStart, defaultEnd }: { defaultStart?: string, defaultEnd?: string }) {
  const [start, setStart] = useState(parseMonth(defaultStart || ""));
  const [end, setEnd] = useState(parseMonth(defaultEnd || ""));
  const [isPresent, setIsPresent] = useState(defaultEnd === "Present");

  // Auto-correct end date if start date is moved past it
  useEffect(() => {
    if (start && end && !isPresent) {
      const [sy, sm] = start.split("-").map(Number);
      const [ey, em] = end.split("-").map(Number);
      if (sy > ey || (sy === ey && sm > em)) {
        setEnd(start);
      }
    }
  }, [start, end, isPresent]);

  return (
    <>
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-text-secondary ml-1">Start Date</label>
        <CustomMonthPicker 
          value={start} 
          onChange={setStart} 
        />
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
        <CustomMonthPicker 
          value={end} 
          onChange={setEnd} 
          disabled={isPresent}
          minDate={start}
        />
        <input type="hidden" name="endDate" value={isPresent ? "Present" : formatMonth(end)} />
      </div>
    </>
  );
}
