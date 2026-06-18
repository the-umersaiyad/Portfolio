"use server";

import { db } from "@/db";
import { socialLinks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addSocial(formData: FormData) {
  const maxOrderRes = await db.select({ order: socialLinks.order }).from(socialLinks).orderBy(socialLinks.order);
  const nextOrder = maxOrderRes.length > 0 ? maxOrderRes[maxOrderRes.length - 1].order + 1 : 0;

  const data = {
    platform: formData.get("platform") as string,
    url: formData.get("url") as string,
    order: nextOrder,
  };

  await db.insert(socialLinks).values(data);
  revalidatePath("/admin/socials");
  revalidatePath("/");
}

export async function deleteSocial(id: number) {
  await db.delete(socialLinks).where(eq(socialLinks.id, id));
  revalidatePath("/admin/socials");
  revalidatePath("/");
}

export async function updateSocial(formData: FormData) {
  const id = Number(formData.get("id"));
  const data = {
    platform: formData.get("platform") as string,
    url: formData.get("url") as string,
  };

  await db.update(socialLinks).set(data).where(eq(socialLinks.id, id));
  revalidatePath("/admin/socials");
  revalidatePath("/");
}

export async function updateSocialsOrder(updates: { id: number; order: number }[]) {
  for (const update of updates) {
    await db.update(socialLinks).set({ order: update.order }).where(eq(socialLinks.id, update.id));
  }
  revalidatePath("/admin/socials");
  revalidatePath("/");
}
