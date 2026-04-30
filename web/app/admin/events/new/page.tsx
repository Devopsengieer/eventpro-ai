import { createEvent } from "@/app/actions/admin";
import EventForm from "@/app/components/admin/EventForm";

export default function NewEventPage() {
  return (
    <div className="admin-new-event">
      <div style={{ marginBottom: 40 }}>
        <h1 className="section-title" style={{ marginBottom: 8 }}>Create New Event</h1>
        <p style={{ color: "var(--text-muted)" }}>Add a new experience to the EventPro AI platform.</p>
      </div>

      <EventForm action={createEvent} />
    </div>
  );
}
