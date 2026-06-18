"use client";

import { updateProjectsOrder } from "@/app/admin/projects/actions";
import { SortableList } from "@/components/SortableList";
import { Trash2, Edit } from "lucide-react";
import Link from "next/link";
import { deleteProject } from "@/app/admin/projects/actions";
import { useTransition } from "react";
import Image from "next/image";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  link: string;
  tags: string[];
  order: number;
};

export function ProjectsList({ initialProjects }: { initialProjects: Project[] }) {
  const [isPending, startTransition] = useTransition();

  const handleReorder = (newItems: Project[]) => {
    startTransition(async () => {
      const updates = newItems.map((item, index) => ({ id: item.id, order: index }));
      await updateProjectsOrder(updates);
    });
  };

  if (initialProjects.length === 0) {
    return <div className="p-8 text-center text-text-muted bg-surface/50 border border-border rounded-2xl shadow-xl">No projects found. Add one above.</div>;
  }

  return (
    <div className="bg-surface/50 border border-border rounded-2xl overflow-x-auto shadow-xl">
      <div className="min-w-[800px] md:min-w-0">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-card/50 text-sm font-medium text-text-secondary pl-14">
          <div className="col-span-2">Image</div>
          <div className="col-span-8">Details</div>
          <div className="col-span-2 text-center">Actions</div>
        </div>

        <SortableList
          items={initialProjects}
          onReorder={handleReorder}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(project) => (
            <div className="grid grid-cols-12 gap-4 items-center w-full">
              <div className="col-span-2 py-2">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border bg-card/50">
                  <Image src={project.image} alt={project.imageAlt} fill className="object-cover" />
                </div>
              </div>
              <div className="col-span-8">
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-text">{project.title}</span>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:underline truncate max-w-[200px]">
                    {project.link}
                  </a>
                </div>
                <div className="text-sm text-text-muted mt-1 truncate">{project.description}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full border border-accent/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="col-span-2 flex justify-center gap-2">
                <Link href={`/admin/projects?edit=${project.id}`} className="p-2 text-text-muted hover:text-accent hover:bg-accent/10 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </Link>
                <form action={deleteProject.bind(null, project.id)}>
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
