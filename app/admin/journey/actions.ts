"use server";

import { db } from "@/db";
import { journeyEvents } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addJourneyEvent(formData: FormData) {
  const maxOrderRes = await db.select({ order: journeyEvents.order }).from(journeyEvents).orderBy(journeyEvents.order);
  const nextOrder = maxOrderRes.length > 0 ? maxOrderRes[maxOrderRes.length - 1].order + 1 : 0;

  const data = {
    title: formData.get("title") as string,
    organization: formData.get("organization") as string,
    description: formData.get("description") as string,
    startDate: formData.get("startDate") as string,
    endDate: formData.get("endDate") as string,
    type: formData.get("type") as string,
    order: nextOrder,
  };

  await db.insert(journeyEvents).values(data);
  revalidatePath("/admin/journey");
  revalidatePath("/");
}

export async function deleteJourneyEvent(id: number) {
  await db.delete(journeyEvents).where(eq(journeyEvents.id, id));
  revalidatePath("/admin/journey");
  revalidatePath("/");
}

export async function updateJourneyEvent(formData: FormData) {
  const id = Number(formData.get("id"));
  const data = {
    title: formData.get("title") as string,
    organization: formData.get("organization") as string,
    description: formData.get("description") as string,
    startDate: formData.get("startDate") as string,
    endDate: formData.get("endDate") as string,
    type: formData.get("type") as string,
  };

  await db.update(journeyEvents).set(data).where(eq(journeyEvents.id, id));
  revalidatePath("/admin/journey");
  revalidatePath("/");
}

export async function updateJourneyOrder(updates: { id: number; order: number }[]) {
  for (const update of updates) {
    await db.update(journeyEvents).set({ order: update.order }).where(eq(journeyEvents.id, update.id));
  }
  revalidatePath("/admin/journey");
  revalidatePath("/");
}
