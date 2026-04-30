"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EventForm({ 
  initialData, 
  action 
}: { 
  initialData?: any, 
  action: (formData: FormData) => Promise<{ success?: boolean, error?: string }> 
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await action(formData);

    if (result.success) {
      router.push("/admin/events");
      router.refresh();
    } else {
      setError(result.error || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form" style={{ maxWidth: "800px", background: "rgba(255,255,255,0.02)", padding: 40, borderRadius: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
      {error && <div className="auth-error" style={{ marginBottom: 24 }}>{error}</div>}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div className="auth-field">
          <label className="auth-label">Event Title</label>
          <input name="title" className="auth-input" defaultValue={initialData?.title} required placeholder="e.g. AI Innovation Summit" />
        </div>
        <div className="auth-field">
          <label className="auth-label">Category</label>
          <select name="category" className="auth-input" defaultValue={initialData?.category || "Technology"} required>
            <option value="Technology">Technology</option>
            <option value="Conference">Conference</option>
            <option value="Workshop">Workshop</option>
            <option value="Networking">Networking</option>
            <option value="Music">Music</option>
            <option value="Art">Art</option>
          </select>
        </div>
        <div className="auth-field">
          <label className="auth-label">Date</label>
          <input name="date" className="auth-input" defaultValue={initialData?.date} required placeholder="e.g. Oct 24, 2024" />
        </div>
        <div className="auth-field">
          <label className="auth-label">Time</label>
          <input name="time" className="auth-input" defaultValue={initialData?.time} required placeholder="e.g. 10:00 AM - 4:00 PM" />
        </div>
        <div className="auth-field">
          <label className="auth-label">Location</label>
          <input name="location" className="auth-input" defaultValue={initialData?.location} required placeholder="e.g. Silicon Valley, CA" />
        </div>
        <div className="auth-field">
          <label className="auth-label">Price ($)</label>
          <input name="price" type="number" step="0.01" className="auth-input" defaultValue={initialData?.price} required placeholder="e.g. 299" />
        </div>
        <div className="auth-field" style={{ gridColumn: "span 2" }}>
          <label className="auth-label">Image URL</label>
          <input name="image" className="auth-input" defaultValue={initialData?.image} required placeholder="https://images.unsplash.com/..." />
        </div>
        <div className="auth-field">
          <label className="auth-label">Tag Label</label>
          <input name="tag" className="auth-input" defaultValue={initialData?.tag} placeholder="e.g. SOLD OUT" />
        </div>
        <div className="auth-field">
          <label className="auth-label">Tag Color</label>
          <input name="tagColor" type="color" className="auth-input" defaultValue={initialData?.tagColor || "#6366f1"} style={{ height: 48, padding: 4 }} />
        </div>
      </div>

      <div className="auth-field" style={{ marginTop: 24 }}>
        <label className="auth-label">Description</label>
        <textarea name="description" className="auth-input" defaultValue={initialData?.description} required rows={4} style={{ padding: 16, resize: "vertical" }} placeholder="Describe the event..." />
      </div>

      <div style={{ marginTop: 24, padding: 24, background: "rgba(255,255,255,0.02)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.04)" }}>
        <h4 style={{ marginBottom: 16, fontSize: "0.9rem", color: "var(--text-faint)" }}>Advanced Data (JSON Format)</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
          <div className="auth-field">
            <label className="auth-label">Organizer Info</label>
            <textarea name="organizer" className="auth-input" rows={2} defaultValue={JSON.stringify(initialData?.organizer || { name: "EventPro Team", avatar: "https://i.pravatar.cc/150?u=admin", bio: "Official organizers" }, null, 2)} />
          </div>
          <div className="auth-field">
            <label className="auth-label">Schedule</label>
            <textarea name="schedule" className="auth-input" rows={4} defaultValue={JSON.stringify(initialData?.schedule || [{ time: "09:00 AM", title: "Registration" }], null, 2)} />
          </div>
          <div className="auth-field">
            <label className="auth-label">Highlights</label>
            <textarea name="highlights" className="auth-input" rows={2} defaultValue={JSON.stringify(initialData?.highlights || ["Expert speakers", "Networking session"], null, 2)} />
          </div>
        </div>
      </div>

      <div style={{ marginTop: 40, display: "flex", gap: 16 }}>
        <button type="submit" disabled={loading} className={`btn-primary auth-submit ${loading ? "auth-submit-loading" : ""}`} style={{ marginTop: 0, flex: 1 }}>
          {loading && <span className="auth-spinner" />}
          {loading ? "Saving..." : initialData ? "Update Event" : "Create Event"}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-outline" style={{ flex: 1 }}>
          Cancel
        </button>
      </div>
    </form>
  );
}
