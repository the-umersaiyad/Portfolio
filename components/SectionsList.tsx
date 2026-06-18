"use client";

import { updateSectionsOrder, toggleSectionVisibility } from "@/app/admin/actions";
import { SortableList } from "@/components/SortableList";
import { Monitor, Smartphone } from "lucide-react";
import { useTransition } from "react";

type Section = {
  id: number;
  sectionId: string;
  displayName: string;
  isVisible: boolean;
  isMobileVisible: boolean;
  order: number;
};

export function SectionsList({ initialSections }: { initialSections: Section[] }) {
  const [isPending, startTransition] = useTransition();

  const handleReorder = (newItems: Section[]) => {
    startTransition(async () => {
      const updates = newItems.map((item, index) => ({ id: item.id, order: index + 1 })); // 1-indexed order for sections
      await updateSectionsOrder(updates);
    });
  };

  if (initialSections.length === 0) {
    return <div className="p-8 text-center text-text-muted bg-surface/50 border border-border rounded-2xl shadow-xl">No sections found.</div>;
  }

  return (
    <div className="bg-surface/50 border border-border rounded-2xl overflow-x-auto shadow-xl">
      <div className="min-w-[600px] md:min-w-0">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-card/50 text-sm font-medium text-text-secondary pl-14">
          <div className="col-span-6">Section Name</div>
          <div className="col-span-3 flex items-center justify-center gap-2">
            <Monitor className="w-4 h-4" /> Global Visibility
          </div>
          <div className="col-span-3 flex items-center justify-center gap-2">
            <Smartphone className="w-4 h-4" /> Mobile Visibility
          </div>
        </div>

        <SortableList
          items={initialSections}
          onReorder={handleReorder}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(section) => (
            <div className="grid grid-cols-12 gap-4 items-center w-full">
              <div className="col-span-6 font-medium text-text py-2">
                {section.displayName}
                <div className="text-xs text-text-muted font-mono mt-0.5">#{section.sectionId}</div>
              </div>
              
              <div className="col-span-3 flex justify-center">
                <form action={toggleSectionVisibility.bind(null, section.id, "isVisible", section.isVisible)}>
                  <button type="submit" className={`w-11 h-6 rounded-full transition-colors flex items-center ${section.isVisible ? 'bg-accent' : 'bg-surface border border-border'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${section.isVisible ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </form>
              </div>

              <div className="col-span-3 flex justify-center">
                <form action={toggleSectionVisibility.bind(null, section.id, "isMobileVisible", section.isMobileVisible)}>
                  <button type="submit" className={`w-11 h-6 rounded-full transition-colors flex items-center ${section.isMobileVisible ? 'bg-accent' : 'bg-surface border border-border'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${section.isMobileVisible ? 'translate-x-6' : 'translate-x-1'}`} />
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
