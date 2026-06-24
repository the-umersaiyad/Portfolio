"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  name: string;
  options: Option[];
  defaultValue?: string;
  required?: boolean;
}

export function CustomSelect({ name, options, defaultValue, required }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue || options[0]?.value || "");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      {/* Hidden input for standard form submission */}
      <input type="hidden" name={name} value={selectedValue} required={required} />

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between bg-bg border rounded-xl px-4 py-3 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-accent ${
          isOpen ? "border-accent ring-1 ring-accent" : "border-border hover:border-accent/50 text-text"
        }`}
      >
        <span className={selectedValue ? "text-text" : "text-text-muted"}>
          {selectedOption ? selectedOption.label : "Select an option"}
        </span>
        <ChevronDown className={`w-4 h-4 text-text-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-50 w-full mt-2 bg-surface/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto p-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setSelectedValue(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors ${
                    selectedValue === option.value
                      ? "bg-accent/10 text-accent font-medium"
                      : "text-text hover:bg-bg"
                  }`}
                >
                  {option.label}
                  {selectedValue === option.value && <Check className="w-4 h-4 text-accent" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
