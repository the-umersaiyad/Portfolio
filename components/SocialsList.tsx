"use client";

import { updateSocialsOrder } from "@/app/admin/socials/actions";
import { SortableList } from "@/components/SortableList";
import { Trash2, Edit } from "lucide-react";
import Link from "next/link";
import { deleteSocial } from "@/app/admin/socials/actions";
import { useTransition } from "react";

type SocialLink = {
  id: number;
  platform: string;
  url: string;
  order: number;
};

export function SocialsList({ initialLinks }: { initialLinks: SocialLink[] }) {
  const [isPending, startTransition] = useTransition();

  const handleReorder = (newItems: SocialLink[]) => {
    startTransition(async () => {
      const updates = newItems.map((item, index) => ({ id: item.id, order: index }));
      await updateSocialsOrder(updates);
    });
  };

  if (initialLinks.length === 0) {
    return <div className="p-8 text-center text-text-muted bg-surface/50 border border-border rounded-2xl shadow-xl">No social links found. Add one above.</div>;
  }

  return (
    <div className="bg-surface/50 border border-border rounded-2xl overflow-x-auto shadow-xl">
      <div className="min-w-[600px] md:min-w-0">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-card/50 text-sm font-medium text-text-secondary pl-14">
          <div className="col-span-3">Platform</div>
          <div className="col-span-6">URL</div>
          <div className="col-span-3 text-center">Actions</div>
        </div>

        <SortableList
          items={initialLinks}
          onReorder={handleReorder}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(link) => (
            <div className="grid grid-cols-12 gap-4 items-center w-full">
              <div className="col-span-3 font-medium text-text capitalize">{link.platform}</div>
              <div className="col-span-6 text-sm text-text-secondary truncate">{link.url}</div>
              <div className="col-span-3 flex justify-center gap-2">
                <Link href={`/admin/socials?edit=${link.id}`} className="p-2 text-text-muted hover:text-accent hover:bg-accent/10 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </Link>
                <form action={deleteSocial.bind(null, link.id)}>
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
