import { db } from "@/db";
import { journeyEvents } from "@/db/schema";
import { addJourneyEvent, deleteJourneyEvent, updateJourneyEvent } from "./actions";
import { Clock, Plus, Edit, X } from "lucide-react";
import { SubmitButton } from "@/components/SubmitButton";
import { JourneyList } from "@/components/JourneyList";
import { JourneyDatePickers } from "@/components/JourneyDatePickers";
import Link from "next/link";
import { eq } from "drizzle-orm";

export default async function JourneyAdminPage(props: { searchParams?: Promise<any> | any }) {
  const resolvedParams = await Promise.resolve(props.searchParams);
  const editId = resolvedParams?.edit;

  let eventToEdit = null;
  if (editId) {
    const res = await db.select().from(journeyEvents).where(eq(journeyEvents.id, parseInt(editId)));
    eventToEdit = res[0] || null;
  }

  const events = await db.select().from(journeyEvents).orderBy(journeyEvents.order);

  return (
    <div className="space-y-10">
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-display font-bold text-text flex items-center gap-3">
          <Clock className="w-8 h-8 text-accent" />
          Manage Journey
        </h1>
        <p className="text-text-secondary mt-2">
          Add your education and work experience for the timeline section.
        </p>
      </div>

      <div className="bg-surface/50 border border-border p-6 rounded-2xl shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold text-text">
            {eventToEdit ? "Edit Journey Event" : "Add New Event"}
          </h2>
          {eventToEdit && (
            <Link href="/admin/journey" className="text-text-muted hover:text-text flex items-center gap-1 text-sm">
              <X className="w-4 h-4" /> Cancel Edit
            </Link>
          )}
        </div>
        <form action={eventToEdit ? updateJourneyEvent : addJourneyEvent} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {eventToEdit && <input type="hidden" name="id" value={eventToEdit.id} />}
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-secondary ml-1">Event Type</label>
            <select name="type" defaultValue={eventToEdit?.type || "work"} required className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent transition-all appearance-none">
              <option value="work">Work Experience</option>
              <option value="education">Education</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-secondary ml-1">Title/Degree</label>
            <input name="title" defaultValue={eventToEdit?.title || ""} required placeholder="e.g. Senior Developer" className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-secondary ml-1">Organization/University</label>
            <input name="organization" defaultValue={eventToEdit?.organization || ""} required placeholder="e.g. Google" className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent transition-all" />
          </div>
          
          <JourneyDatePickers 
            defaultStart={eventToEdit?.startDate || undefined} 
            defaultEnd={eventToEdit?.endDate || undefined} 
          />

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-medium text-text-secondary ml-1">Description</label>
            <textarea name="description" defaultValue={eventToEdit?.description || ""} required rows={3} className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent transition-all" />
          </div>

          <div className="md:col-span-2 pt-2 flex justify-end">
            <SubmitButton 
              label={eventToEdit ? "Update Event" : "Add Event"} 
              icon={eventToEdit ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />} 
            />
          </div>
        </form>
      </div>

      <JourneyList initialEvents={events} />
    </div>
  );
}
