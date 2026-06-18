import { db } from "@/db";
import { siteSections } from "@/db/schema";
import { initializeSections, toggleSectionVisibility } from "./actions";
import { Settings, AlertCircle } from "lucide-react";
import { SectionsList } from "@/components/SectionsList";

export default async function SuperAdminConfigPage() {
  let sections = await db.select().from(siteSections).orderBy(siteSections.order);

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
