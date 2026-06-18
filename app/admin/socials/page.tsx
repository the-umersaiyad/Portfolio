import { db } from "@/db";
import { socialLinks } from "@/db/schema";
import { addSocial, deleteSocial, updateSocial } from "./actions";
import { Share2, Plus, Edit, X } from "lucide-react";
import { SubmitButton } from "@/components/SubmitButton";
import { SocialsList } from "@/components/SocialsList";
import Link from "next/link";
import { eq } from "drizzle-orm";

export default async function SocialsAdminPage(props: { searchParams?: Promise<any> | any }) {
  const resolvedParams = await Promise.resolve(props.searchParams);
  const editId = resolvedParams?.edit;

  let linkToEdit = null;
  if (editId) {
    const res = await db.select().from(socialLinks).where(eq(socialLinks.id, parseInt(editId)));
    linkToEdit = res[0] || null;
  }

  const links = await db.select().from(socialLinks).orderBy(socialLinks.order);

  return (
    <div className="space-y-10">
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-display font-bold text-text flex items-center gap-3">
          <Share2 className="w-8 h-8 text-accent" />
          Manage Socials
        </h1>
        <p className="text-text-secondary mt-2">
          Add or remove links to your social media profiles.
        </p>
      </div>

      <div className="bg-surface/50 border border-border p-6 rounded-2xl shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold text-text">
            {linkToEdit ? "Edit Link" : "Add New Link"}
          </h2>
          {linkToEdit && (
            <Link href="/admin/socials" className="text-text-muted hover:text-text flex items-center gap-1 text-sm">
              <X className="w-4 h-4" /> Cancel Edit
            </Link>
          )}
        </div>
        <form action={linkToEdit ? updateSocial : addSocial} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {linkToEdit && <input type="hidden" name="id" value={linkToEdit.id} />}
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-secondary ml-1">Platform (e.g. github)</label>
            <input name="platform" defaultValue={linkToEdit?.platform || ""} required className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent transition-all" />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-medium text-text-secondary ml-1">URL</label>
            <input name="url" type="url" defaultValue={linkToEdit?.url || ""} required className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent transition-all" />
          </div>

          <div className="md:col-span-3 pt-2 flex justify-end">
            <SubmitButton 
              label={linkToEdit ? "Update Link" : "Add Link"} 
              icon={linkToEdit ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />} 
            />
          </div>
        </form>
      </div>

      {/* Socials List */}
      <SocialsList initialLinks={links} />
    </div>
  );
}
