import { updateEvent } from "@/app/actions/admin";
import { getEventById } from "@/app/actions/event";
import EventForm from "@/app/components/admin/EventForm";
import { notFound } from "next/navigation";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const eventId = parseInt(id);
  const event = await getEventById(eventId);

  if (!event) {
    notFound();
  }

  // Bind the ID to the update action
  const updateEventWithId = updateEvent.bind(null, eventId);

  return (
    <div className="admin-edit-event">
      <div style={{ marginBottom: 40 }}>
        <h1 className="section-title" style={{ marginBottom: 8 }}>Edit Event</h1>
        <p style={{ color: "var(--text-muted)" }}>Modifying: {event.title}</p>
      </div>

      <EventForm initialData={event} action={updateEventWithId} />
    </div>
  );
}
