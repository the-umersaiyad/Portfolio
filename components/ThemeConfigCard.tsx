"use client";

import { useState, useTransition, useRef } from "react";
import { updateGlobalSettings } from "@/app/admin/actions";
import { Palette, Moon, Sun, Loader2, RotateCcw, Copy, Check } from "lucide-react";

export function ThemeConfigCard({ initialSettings }: { initialSettings: any }) {
  const [settings, setSettings] = useState(initialSettings);
  const [isPending, startTransition] = useTransition();
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const handleUpdate = (field: string, value: string) => {
    const newSettings = { ...settings, [field]: value };
    setSettings(newSettings);
    
    if (timerRef.current) clearTimeout(timerRef.current);
    
    if (field === "activeTheme") {
      startTransition(() => {
        updateGlobalSettings({ [field]: value });
      });
    } else {
      timerRef.current = setTimeout(() => {
        startTransition(() => {
          updateGlobalSettings({ [field]: value });
        });
      }, 500);
    }
  };

  const handleReset = () => {
    const defaults = {
      activeTheme: "dark",
      accentColorDark: "#10b981",
      accentColorLight: "#8b5cf6",
    };
    setSettings(defaults);
    startTransition(() => {
      updateGlobalSettings(defaults);
    });
  };

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden mb-8">
      <div className="p-5 border-b border-border flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-accent-subtle flex items-center justify-center">
          <Palette className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h2 className="font-display font-bold text-lg text-text">Global Appearance</h2>
          <p className="text-sm text-text-secondary">Manage the public website's active theme and accent colors.</p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          {isPending && <Loader2 className="w-4 h-4 text-accent animate-spin" />}
          <button 
            onClick={handleReset}
            className="text-text-muted hover:text-text flex items-center gap-1.5 text-xs transition-colors bg-bg px-2.5 py-1.5 rounded-md border border-border"
            title="Reset to default colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Active Theme Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-text">Active Website Theme</h3>
            <p className="text-xs text-text-muted mt-1">Set the default mode for all visitors.</p>
          </div>
          <div className="flex bg-bg rounded-lg p-1 border border-border">
            <button
              onClick={() => handleUpdate("activeTheme", "dark")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                settings.activeTheme === "dark" ? "bg-surface text-text shadow-sm" : "text-text-muted hover:text-text-secondary"
              }`}
            >
              <Moon className="w-4 h-4" /> Dark
            </button>
            <button
              onClick={() => handleUpdate("activeTheme", "light")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                settings.activeTheme === "light" ? "bg-surface text-text shadow-sm" : "text-text-muted hover:text-text-secondary"
              }`}
            >
              <Sun className="w-4 h-4" /> Light
            </button>
          </div>
        </div>

        {/* Accent Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-bg border border-border rounded-xl p-4 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-text text-sm">Dark Mode Accent</h3>
              <p className="text-[11px] text-text-muted mt-1">Primary color for dark mode.</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => copyToClipboard(settings.accentColorDark)}
                className="p-1.5 text-text-muted hover:text-text hover:bg-surface rounded-md transition-all"
                title="Copy Hex Code"
              >
                {copiedColor === settings.accentColorDark ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
              <input
                type="color"
                value={settings.accentColorDark}
                onChange={(e) => handleUpdate("accentColorDark", e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border-0 p-0 bg-transparent"
              />
            </div>
          </div>

          <div className="bg-bg border border-border rounded-xl p-4 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-text text-sm">Light Mode Accent</h3>
              <p className="text-[11px] text-text-muted mt-1">Primary color for light mode.</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => copyToClipboard(settings.accentColorLight)}
                className="p-1.5 text-text-muted hover:text-text hover:bg-surface rounded-md transition-all"
                title="Copy Hex Code"
              >
                {copiedColor === settings.accentColorLight ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
              <input
                type="color"
                value={settings.accentColorLight}
                onChange={(e) => handleUpdate("accentColorLight", e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border-0 p-0 bg-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
