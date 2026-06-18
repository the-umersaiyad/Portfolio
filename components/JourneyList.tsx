"use client";

import { updateJourneyOrder } from "@/app/admin/journey/actions";
import { SortableList } from "@/components/SortableList";
import { Trash2, Edit } from "lucide-react";
import Link from "next/link";
import { deleteJourneyEvent } from "@/app/admin/journey/actions";
import { useTransition } from "react";

type JourneyEvent = {
  id: number;
  title: string;
  organization: string;
  description: string;
  startDate: string;
  endDate: string;
  type: string;
  order: number;
};

export function JourneyList({ initialEvents }: { initialEvents: JourneyEvent[] }) {
  const [isPending, startTransition] = useTransition();

  const handleReorder = (newItems: JourneyEvent[]) => {
    startTransition(async () => {
      const updates = newItems.map((item, index) => ({ id: item.id, order: index }));
      await updateJourneyOrder(updates);
    });
  };

  if (initialEvents.length === 0) {
    return <div className="p-8 text-center text-text-muted bg-surface/50 border border-border rounded-2xl shadow-xl">No journey events found. Add one above.</div>;
  }

  return (
    <div className="bg-surface/50 border border-border rounded-2xl overflow-x-auto shadow-xl">
      <div className="min-w-[800px] md:min-w-0">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-card/50 text-sm font-medium text-text-secondary pl-14">
          <div className="col-span-2">Type / Dates</div>
          <div className="col-span-8">Details</div>
          <div className="col-span-2 text-center">Actions</div>
        </div>

        <SortableList
          items={initialEvents}
          onReorder={handleReorder}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(ev) => (
            <div className="grid grid-cols-12 gap-4 items-center w-full">
              <div className="col-span-2 text-sm text-text-secondary">
                <span className="capitalize text-accent font-medium">{ev.type}</span>
                <br />
                <span className="text-xs">{ev.startDate} - {ev.endDate}</span>
              </div>
              <div className="col-span-8">
                <div className="font-medium text-text">{ev.title}</div>
                <div className="text-sm text-accent font-medium mt-0.5">{ev.organization}</div>
                <div className="text-xs text-text-muted mt-1 truncate">{ev.description}</div>
              </div>
              <div className="col-span-2 flex justify-center gap-2">
                <Link href={`/admin/journey?edit=${ev.id}`} className="p-2 text-text-muted hover:text-accent hover:bg-accent/10 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </Link>
                <form action={deleteJourneyEvent.bind(null, ev.id)}>
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
