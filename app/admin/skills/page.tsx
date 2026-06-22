import { db } from "@/db";
import { skills } from "@/db/schema";
import { addSkill, deleteSkill, updateSkill } from "./actions";
import { Code2, Plus, Edit, X } from "lucide-react";
import { SubmitButton } from "@/components/SubmitButton";
import { SkillsList } from "@/components/SkillsList";
import { ProficiencyInput } from "@/components/ProficiencyInput";
import Link from "next/link";
import { eq } from "drizzle-orm";

export default async function SkillsAdminPage(props: { searchParams?: Promise<any> | any }) {
  const resolvedParams = await Promise.resolve(props.searchParams);
  const editId = resolvedParams?.edit;

  let skillToEdit = null;
  if (editId) {
    const res = await db.select().from(skills).where(eq(skills.id, parseInt(editId)));
    skillToEdit = res[0] || null;
  }

  const allSkills = await db.select().from(skills).orderBy(skills.order);

  return (
    <div className="space-y-10">
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-display font-bold text-text flex items-center gap-3">
          <Code2 className="w-8 h-8 text-accent" />
          Manage Skills
        </h1>
        <p className="text-text-secondary mt-2">
          Add or remove technical skills displayed on your portfolio.
        </p>
      </div>

      <div className="bg-surface/50 border border-border p-6 rounded-2xl shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold text-text">
            {skillToEdit ? "Edit Skill" : "Add New Skill"}
          </h2>
          {skillToEdit && (
            <Link href="/admin/skills" className="text-text-muted hover:text-text flex items-center gap-1 text-sm">
              <X className="w-4 h-4" /> Cancel Edit
            </Link>
          )}
        </div>
        <form action={skillToEdit ? updateSkill : addSkill} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillToEdit && <input type="hidden" name="id" value={skillToEdit.id} />}
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-secondary ml-1">Skill Name (e.g. React)</label>
            <input name="name" defaultValue={skillToEdit?.name || ""} required className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-secondary ml-1">Category</label>
            <select name="category" defaultValue={skillToEdit?.category || "Frontend & Core"} required className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent transition-all appearance-none">
              <option value="Frontend & Core">Frontend & Core</option>
              <option value="Backend & APIs">Backend & APIs</option>
              <option value="Databases & DevOps">Databases & DevOps</option>
              <option value="Tools & Design">Tools & Design</option>
            </select>
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-medium text-text-secondary ml-1">Proficiency (0-100)</label>
            <ProficiencyInput defaultValue={skillToEdit?.proficiency?.toString() || "80"} />
          </div>

          <div className="md:col-span-2 pt-2 flex justify-end">
            <SubmitButton 
              label={skillToEdit ? "Update Skill" : "Add Skill"} 
              icon={skillToEdit ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />} 
            />
          </div>
        </form>
      </div>

      {/* Skills List */}
      <SkillsList initialSkills={allSkills} />
    </div>
  );
}
