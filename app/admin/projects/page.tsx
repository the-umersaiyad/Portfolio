import { db } from "@/db";
import { projects } from "@/db/schema";
import { addProject, deleteProject, updateProject } from "./actions";
import { Layers3, Plus, Edit, X } from "lucide-react";
import { ImageUploader } from "@/components/ImageUploader";
import { SubmitButton } from "@/components/SubmitButton";
import { ProjectsList } from "@/components/ProjectsList";
import Link from "next/link";
import { eq } from "drizzle-orm";

export default async function ProjectsAdminPage(props: { searchParams?: Promise<any> | any }) {
  const resolvedParams = await Promise.resolve(props.searchParams);
  const editId = resolvedParams?.edit;

  let projectToEdit = null;
  if (editId) {
    const res = await db.select().from(projects).where(eq(projects.id, parseInt(editId)));
    projectToEdit = res[0] || null;
  }

  const allProjects = await db.select().from(projects).orderBy(projects.order);

  return (
    <div className="space-y-10">
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-display font-bold text-text flex items-center gap-3">
          <Layers3 className="w-8 h-8 text-accent" />
          Manage Projects
        </h1>
        <p className="text-text-secondary mt-2">
          Add, reorder, or delete projects from your portfolio.
        </p>
      </div>

      {/* Project Form */}
      <div className="bg-surface/50 border border-border p-6 rounded-2xl shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold text-text">
            {projectToEdit ? "Edit Project" : "Add New Project"}
          </h2>
          {projectToEdit && (
            <Link href="/admin/projects" className="text-text-muted hover:text-text flex items-center gap-1 text-sm">
              <X className="w-4 h-4" /> Cancel Edit
            </Link>
          )}
        </div>
        <form action={projectToEdit ? updateProject : addProject} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectToEdit && <input type="hidden" name="id" value={projectToEdit.id} />}
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-secondary ml-1">Project Title</label>
            <input name="title" defaultValue={projectToEdit?.title || ""} required className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-secondary ml-1">Link URL</label>
            <input name="link" defaultValue={projectToEdit?.link || ""} required className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent transition-all" />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-medium text-text-secondary ml-1">Description</label>
            <textarea name="description" defaultValue={projectToEdit?.description || ""} required rows={3} className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent transition-all" />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-medium text-text-secondary ml-1">Project Image</label>
            <ImageUploader name="imageFile" defaultUrl={projectToEdit?.image || undefined} />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-medium text-text-secondary ml-1">Image Alt Text (SEO)</label>
            <input name="imageAlt" defaultValue={projectToEdit?.imageAlt || "Project Image"} required className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent transition-all" />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-medium text-text-secondary ml-1">Tags (comma separated)</label>
            <input name="tags" defaultValue={projectToEdit?.tags?.join(", ") || ""} required placeholder="React, Next.js, Tailwind" className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent transition-all" />
          </div>

          <div className="md:col-span-2 pt-2 flex justify-end">
            <SubmitButton 
              label={projectToEdit ? "Update Project" : "Add Project"} 
              icon={projectToEdit ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />} 
            />
          </div>
        </form>
      </div>

      {/* Projects List */}
      <ProjectsList initialProjects={allProjects} />
    </div>
  );
}
