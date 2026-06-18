"use server";

import { db } from "@/db";
import { siteSections } from "@/db/schema";
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
