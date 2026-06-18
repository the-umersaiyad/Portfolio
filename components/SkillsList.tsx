"use client";

import { updateSkillsOrder } from "@/app/admin/skills/actions";
import { SortableList } from "@/components/SortableList";
import { Trash2, Edit } from "lucide-react";
import Link from "next/link";
import { deleteSkill } from "@/app/admin/skills/actions";
import { useTransition } from "react";

type Skill = {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  order: number;
};

export function SkillsList({ initialSkills }: { initialSkills: Skill[] }) {
  const [isPending, startTransition] = useTransition();

  const handleReorder = (newItems: Skill[]) => {
    // Optimistically update the database
    startTransition(async () => {
      const updates = newItems.map((item, index) => ({ id: item.id, order: index }));
      await updateSkillsOrder(updates);
    });
  };

  if (initialSkills.length === 0) {
    return <div className="p-8 text-center text-text-muted bg-surface/50 border border-border rounded-2xl shadow-xl">No skills found. Add one above.</div>;
  }

  return (
    <div className="bg-surface/50 border border-border rounded-2xl overflow-x-auto shadow-xl">
      <div className="min-w-[600px] md:min-w-0">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-card/50 text-sm font-medium text-text-secondary pl-14">
          <div className="col-span-3">Category</div>
          <div className="col-span-4">Name</div>
          <div className="col-span-3">Proficiency</div>
          <div className="col-span-2 text-center">Actions</div>
        </div>

        <SortableList
          items={initialSkills}
          onReorder={handleReorder}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(skill) => (
            <div className="grid grid-cols-12 gap-4 items-center w-full">
              <div className="col-span-3 text-sm text-text-secondary">{skill.category}</div>
              <div className="col-span-4 font-medium text-text">{skill.name}</div>
              <div className="col-span-3 text-sm text-accent">{skill.proficiency}%</div>
              <div className="col-span-2 flex justify-center gap-2">
                <Link href={`/admin/skills?edit=${skill.id}`} className="p-2 text-text-muted hover:text-accent hover:bg-accent/10 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </Link>
                <form action={deleteSkill.bind(null, skill.id)}>
                  <button type="submit" className="p-2 text-text-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
