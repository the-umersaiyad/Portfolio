import { db } from "@/db";
import { profiles } from "@/db/schema";
import { updateProfile } from "./actions";
import { User, Save } from "lucide-react";

import { ImageUploader } from "@/components/ImageUploader";
import { FileUploader } from "@/components/FileUploader";
import { SubmitButton } from "@/components/SubmitButton";

export default async function ProfileAdminPage() {
  const data = await db.select().from(profiles);
  
  // Default values if table is empty
  const profile = data[0] || {
    name: "Umer Saiyad",
    title: "Full Stack Developer",
    tagline: "Building modern web experiences.",
    location: "Surat, Gujarat, India",
    email: "umersaiyad76@gmail.com",
    phone: "+91 9510131599",
    experience: "6+ Months",
    availability: "Available for freelance",
    heroImage: "/umer-hero-bg.png",
    heroImageAlt: "Umer Saiyad - Full Stack Developer",
    cvUrl: "",
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-display font-bold text-text flex items-center gap-3">
          <User className="w-8 h-8 text-accent" />
          Edit Profile
        </h1>
        <p className="text-text-secondary mt-2">
          Update the personal information displayed in your Hero and About sections.
        </p>
      </div>

      <form action={updateProfile} className="bg-surface/50 border border-border p-6 rounded-2xl shadow-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-secondary ml-1">Full Name</label>
            <input name="name" defaultValue={profile.name} required className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-secondary ml-1">Job Title</label>
            <input name="title" defaultValue={profile.title} required className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent transition-all" />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-medium text-text-secondary ml-1">Tagline</label>
            <input name="tagline" defaultValue={profile.tagline} required className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-secondary ml-1">Email</label>
            <input name="email" type="email" defaultValue={profile.email} required className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-secondary ml-1">Phone</label>
            <input name="phone" type="tel" defaultValue={profile.phone} required className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-secondary ml-1">Location</label>
            <input name="location" defaultValue={profile.location} required className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-secondary ml-1">Experience</label>
            <input name="experience" defaultValue={profile.experience} required className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-secondary ml-1">Availability</label>
            <input name="availability" defaultValue={profile.availability} required className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent transition-all" />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-medium text-text-secondary ml-1">Hero Image</label>
            <ImageUploader name="heroImageFile" defaultUrl={profile.heroImage} />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-medium text-text-secondary ml-1">Hero Image Alt Text (SEO)</label>
            <input name="heroImageAlt" defaultValue={profile.heroImageAlt} required className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent transition-all" />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-medium text-text-secondary ml-1">CV File (PDF Link)</label>
            <FileUploader name="cvFile" defaultUrl={profile.cvUrl} />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <SubmitButton label="Save Profile" />
        </div>
      </form>
    </div>
  );
}
