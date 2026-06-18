"use server";

import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { uploadFileToCloudinary } from "@/utils/cloudinary";

export async function addProject(formData: FormData) {
  let imageUrl = "https://via.placeholder.com/600x400";
  const imageFile = formData.get("imageFile") as File | null;
  
  if (imageFile && imageFile.size > 0) {
    imageUrl = await uploadFileToCloudinary(imageFile, "portfolio/projects");
  }

  const maxOrderRes = await db.select({ order: projects.order }).from(projects).orderBy(projects.order);
  const nextOrder = maxOrderRes.length > 0 ? maxOrderRes[maxOrderRes.length - 1].order + 1 : 0;

  const data = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    image: imageUrl,
    imageAlt: formData.get("imageAlt") as string,
    link: formData.get("link") as string,
    tags: (formData.get("tags") as string).split(",").map(t => t.trim()),
    order: nextOrder,
  };

  await db.insert(projects).values(data);
  revalidatePath("/admin/projects");
  revalidatePath("/");
}

export async function deleteProject(id: number) {
  await db.delete(projects).where(eq(projects.id, id));
  revalidatePath("/admin/projects");
  revalidatePath("/");
}

export async function updateProject(formData: FormData) {
  const id = Number(formData.get("id"));
  const existingImageUrl = formData.get("imageFile_existing") as string;
  let imageUrl = existingImageUrl || "https://via.placeholder.com/600x400";
  
  const imageFile = formData.get("imageFile") as File | null;
  if (imageFile && imageFile.size > 0) {
    imageUrl = await uploadFileToCloudinary(imageFile, "portfolio/projects");
  }

  const data = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    image: imageUrl,
    imageAlt: formData.get("imageAlt") as string,
    link: formData.get("link") as string,
    tags: (formData.get("tags") as string).split(",").map(t => t.trim()),
  };

  await db.update(projects).set(data).where(eq(projects.id, id));
  revalidatePath("/admin/projects");
  revalidatePath("/");
}

export async function updateProjectsOrder(updates: { id: number; order: number }[]) {
  for (const update of updates) {
    await db.update(projects).set({ order: update.order }).where(eq(projects.id, update.id));
  }
  revalidatePath("/admin/projects");
  revalidatePath("/");
}
