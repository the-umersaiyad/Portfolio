import { db } from "@/db";
import { siteSections, globalSettings } from "@/db/schema";
import { initializeSections, initializeSettings, toggleSectionVisibility } from "./actions";
import { Settings, AlertCircle } from "lucide-react";
import { SectionsList } from "@/components/SectionsList";
import { ThemeConfigCard } from "@/components/ThemeConfigCard";

export default async function SuperAdminConfigPage() {
  let sections = await db.select().from(siteSections).orderBy(siteSections.order);
  let gSettings: any[] = [];

  try {
    gSettings = await db.select().from(globalSettings);
    if (gSettings.length === 0) {
      await initializeSettings();
      gSettings = await db.select().from(globalSettings);
    }
  } catch (e) {
    console.warn("Global settings table missing.");
  }

  // Auto-initialize if empty
  if (sections.length === 0) {
    await initializeSections();
    sections = await db.select().from(siteSections).orderBy(siteSections.order);
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-display font-bold text-text flex items-center gap-3">
          <Settings className="w-8 h-8 text-accent" />
          Super Admin Configuration
        </h1>
        <p className="text-text-secondary mt-2">
          Toggle the visibility of sections across your entire portfolio.
        </p>
      </div>

      <ThemeConfigCard initialSettings={gSettings[0] || { activeTheme: "dark", accentColorDark: "#10b981", accentColorLight: "#8b5cf6" }} />

      <SectionsList initialSections={sections} />

      <div className="bg-accent-subtle/50 border border-accent/20 rounded-xl p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
        <div className="text-sm text-text-secondary leading-relaxed">
          <strong className="text-text font-medium block mb-1">How visibility works:</strong>
          Disabling <span className="text-accent">Global Visibility</span> will completely hide the section from the frontend. Disabling <span className="text-accent">Mobile Visibility</span> will hide it only on small screens (like phones), but it will remain visible on desktops.
        </div>
      </div>
    </div>
  );
}
