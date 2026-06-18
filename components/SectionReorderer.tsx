"use client";

import { updateSectionOrder } from "@/app/admin/profile/actions";
import { SortableList } from "@/components/SortableList";

const AVAILABLE_SECTIONS = [
  { id: "hero", label: "Hero & About" },
  { id: "journey", label: "Journey" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export function SectionReorderer({ initialOrder }: { initialOrder: string[] }) {
  // Ensure all available sections exist in the list
  const orderedSections = initialOrder
    .filter(id => AVAILABLE_SECTIONS.some(s => s.id === id))
    .map(id => AVAILABLE_SECTIONS.find(s => s.id === id)!);

  AVAILABLE_SECTIONS.forEach(s => {
    if (!orderedSections.find(os => os.id === s.id)) {
      orderedSections.push(s);
    }
  });

  const handleReorder = async (newItems: { id: string, label: string }[]) => {
    const newOrder = newItems.map(item => item.id);
    const formData = new FormData();
    formData.append("sectionOrder", JSON.stringify(newOrder));
    await updateSectionOrder(formData);
  };

  return (
    <div className="bg-surface/50 border border-border p-6 rounded-2xl shadow-xl space-y-6">
      <h2 className="text-xl font-display font-bold text-text">Homepage Section Order</h2>
      <p className="text-sm text-text-secondary">Drag and drop the sections below to change their order on your live portfolio.</p>
      
      <div className="bg-bg border border-border rounded-xl p-4">
        <SortableList 
          items={orderedSections}
          onReorder={handleReorder}
          keyExtractor={(item) => item.id}
          renderItem={(item) => (
            <div className="font-medium text-text capitalize px-2 py-1">{item.label}</div>
          )}
        />
      </div>
    </div>
  );
}
