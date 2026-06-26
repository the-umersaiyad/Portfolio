"use server";

import { db } from "@/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { uploadFileToCloudinary } from "@/utils/cloudinary";

export async function updateProfile(formData: FormData) {
  let heroImageUrl = formData.get("heroImageFile_existing") as string;
  let cvFileUrl = formData.get("cvFile_existing") as string;

  const heroFile = formData.get("heroImageFile") as File | null;
  const cvFile = formData.get("cvFile") as File | null;

  if (heroFile && heroFile.size > 0) {
    heroImageUrl = await uploadFileToCloudinary(heroFile, "portfolio/hero");
  }

  if (cvFile && cvFile.size > 0) {
    cvFileUrl = await uploadFileToCloudinary(cvFile, "portfolio/cv");
  }

  const data = {
    name: formData.get("name") as string,
    title: formData.get("title") as string,
    tagline: formData.get("tagline") as string,
    location: formData.get("location") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    experience: formData.get("experience") as string,
    availability: formData.get("availability") as string,
    heroImage: heroImageUrl,
    heroImageAlt: formData.get("heroImageAlt") as string,
    showHeroImage: formData.get("showHeroImage") === "on",
    cvUrl: cvFileUrl,
  };

  const existing = await db.select().from(profiles);
  
  if (existing.length === 0) {
    await db.insert(profiles).values(data);
  } else {
    await db.update(profiles).set(data).where(eq(profiles.id, existing[0].id));
  }

  revalidatePath("/admin/profile");
  revalidatePath("/");
}
