"use server";

import { db } from "@/db";
import { skills } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addSkill(formData: FormData) {
  // Get max order
  const maxOrderRes = await db.select({ order: skills.order }).from(skills).orderBy(skills.order);
  const nextOrder = maxOrderRes.length > 0 ? maxOrderRes[maxOrderRes.length - 1].order + 1 : 0;

  const data = {
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    proficiency: Number(formData.get("proficiency") || 50),
    order: nextOrder,
  };

  await db.insert(skills).values(data);
  revalidatePath("/admin/skills");
  revalidatePath("/");
}

export async function deleteSkill(id: number) {
  await db.delete(skills).where(eq(skills.id, id));
  revalidatePath("/admin/skills");
  revalidatePath("/");
}

export async function updateSkill(formData: FormData) {
  const id = Number(formData.get("id"));
  const data = {
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    proficiency: Number(formData.get("proficiency") || 50),
  };

  await db.update(skills).set(data).where(eq(skills.id, id));
  revalidatePath("/admin/skills");
  revalidatePath("/");
}

export async function updateSkillsOrder(updates: { id: number; order: number }[]) {
  // Update each skill's order in the database
  for (const update of updates) {
    await db.update(skills).set({ order: update.order }).where(eq(skills.id, update.id));
  }
  revalidatePath("/admin/skills");
  revalidatePath("/");
}
