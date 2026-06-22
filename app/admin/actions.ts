"use server";

import { db } from "@/db";
import { siteSections, globalSettings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const defaultSections = [
  { sectionId: "hero", displayName: "Hero Section", order: 1 },
  { sectionId: "about", displayName: "About Section", order: 2 },
  { sectionId: "services", displayName: "Services Section", order: 3 },
  { sectionId: "projects", displayName: "Projects Section", order: 4 },
  { sectionId: "skills", displayName: "Skills Section", order: 5 },
  { sectionId: "journey", displayName: "Journey Section", order: 6 },
  { sectionId: "socials", displayName: "Socials Section", order: 7 },
  { sectionId: "contact", displayName: "Contact Section", order: 8 },
];

export async function initializeSections() {
  const existing = await db.select().from(siteSections);
  if (existing.length === 0) {
    await db.insert(siteSections).values(defaultSections);
  }
}

export async function toggleSectionVisibility(id: number, field: "isVisible" | "isMobileVisible", currentValue: boolean) {
  await db
    .update(siteSections)
    .set({ [field]: !currentValue })
    .where(eq(siteSections.id, id));
  
  revalidatePath("/admin");
  revalidatePath("/");
}
export async function updateSectionsOrder(updates: { id: number; order: number }[]) {
  for (const update of updates) {
    await db.update(siteSections).set({ order: update.order }).where(eq(siteSections.id, update.id));
  }
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function initializeSettings() {
  try {
    const existing = await db.select().from(globalSettings);
    if (existing.length === 0) {
      await db.insert(globalSettings).values({
        activeTheme: "dark",
        accentColorDark: "#10b981",
        accentColorLight: "#8b5cf6",
      });
    }
  } catch (e) {
    console.warn("Could not initialize settings: table may not exist.");
  }
}

export async function updateGlobalSettings(data: { activeTheme?: string; accentColorDark?: string; accentColorLight?: string }) {
  try {
    const existing = await db.select().from(globalSettings);
    if (existing.length === 0) {
      await initializeSettings();
    }
    await db.update(globalSettings).set(data).where(eq(globalSettings.id, 1));
    revalidatePath("/");
    revalidatePath("/admin");
  } catch (e) {
    console.warn("Could not update settings: table may not exist.");
  }
}
