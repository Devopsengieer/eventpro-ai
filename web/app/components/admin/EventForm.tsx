"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCategories } from "@/app/actions/admin";

export default function EventForm({ 
  initialData, 
  action 
}: { 
  initialData?: any, 
  action: (formData: FormData) => Promise<{ success?: boolean, error?: string }> 
}) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<{name: string}[]>([]);
  const [imagePreview, setImagePreview] = useState(initialData?.image || "");
  const router = useRouter();

  useEffect(() => {
    async function loadCategories() {
      try {
        const cats = await getCategories();
        setCategories(cats);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    }
    loadCategories();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setImagePreview(data.url);
      } else {
        setError(data.error || "Upload failed");
      }
    } catch (err) {
      setError("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    
    // Client-side validation
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const location = formData.get("location") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;

    if (!title?.trim()) {
      setError("Event title is required");
      setLoading(false);
      return;
    }
    if (!category?.trim()) {
      setError("Category is required");
      setLoading(false);
      return;
    }
    if (!date?.trim()) {
      setError("Date is required");
      setLoading(false);
      return;
    }
    if (!time?.trim()) {
      setError("Time is required");
      setLoading(false);
      return;
    }
    if (!location?.trim()) {
      setError("Location is required");
      setLoading(false);
      return;
    }
    if (!price?.trim() || isNaN(parseFloat(price)) || parseFloat(price) < 0) {
      setError("Price must be a valid positive number");
      setLoading(false);
      return;
    }
    if (!description?.trim()) {
      setError("Description is required");
      setLoading(false);
      return;
    }
    if (!imagePreview?.trim()) {
      setError("Event image is required");
      setLoading(false);
      return;
    }

    // Validate JSON fields
    try {
      JSON.parse(formData.get("organizer") as string);
    } catch {
      setError("Invalid organizer JSON format. Please check the JSON syntax.");
      setLoading(false);
      return;
    }
    try {
      JSON.parse(formData.get("schedule") as string);
    } catch {
      setError("Invalid schedule JSON format. Please check the JSON syntax.");
      setLoading(false);
      return;
    }
    try {
      JSON.parse(formData.get("highlights") as string);
    } catch {
      setError("Invalid highlights JSON format. Please check the JSON syntax.");
      setLoading(false);
      return;
    }

    // Ensure the image URL from preview/upload is used
    formData.set("image", imagePreview);
    
    const result = await action(formData);

    if (result.success) {
      router.push("/admin/events");
      router.refresh();
    } else {
      setError(result.error || "An error occurred");
      setLoading(false);
    }
  };

  // Helper to format date for input
  const formatDateForInput = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return "";
      return date.toISOString().split('T')[0];
    } catch (e) {
      return "";
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
          <select name="category" className="auth-input" defaultValue={initialData?.category || ""} required>
            <option value="" disabled>Select Category</option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="auth-field">
          <label className="auth-label">Date</label>
          <input 
            name="date" 
            type="date" 
            className="auth-input" 
            defaultValue={formatDateForInput(initialData?.date)} 
            required 
          />
        </div>
        <div className="auth-field">
          <label className="auth-label">Time</label>
          <input 
            name="time" 
            type="time" 
            className="auth-input" 
            defaultValue={initialData?.time || ""} 
            required 
          />
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
          <label className="auth-label">Event Image</label>
          <div style={{ display: "flex", gap: 20, alignItems: "flex-start", marginTop: 8 }}>
            {imagePreview && (
              <div style={{ position: "relative" }}>
                <img src={imagePreview} alt="Preview" style={{ width: 140, height: 140, borderRadius: 16, objectFit: "cover", border: "1px solid rgba(255,255,255,0.1)" }} />
                <button 
                  type="button" 
                  onClick={() => setImagePreview("")}
                  style={{ 
                    position: "absolute", top: -8, right: -8, width: 24, height: 24, borderRadius: "50%", 
                    background: "#f43f5e", color: "white", border: "none", cursor: "pointer", fontSize: 12
                  }}
                >✕</button>
              </div>
            )}
            <div style={{ flex: 1 }}>
              <div style={{ 
                position: "relative", border: "2px dashed rgba(255,255,255,0.1)", 
                borderRadius: 16, padding: "30px 20px", textAlign: "center",
                transition: "all 0.2s ease",
                background: uploading ? "rgba(255,255,255,0.05)" : "transparent"
              }}>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  style={{ 
                    position: "absolute", inset: 0, opacity: 0, cursor: "pointer", zIndex: 2 
                  }}
                />
                <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  {uploading ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                      <span className="auth-spinner" style={{ width: 20, height: 20 }} />
                      Uploading...
                    </div>
                  ) : (
                    <>
                      <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>📸</div>
                      <div>Click or drag to upload image</div>
                      <div style={{ fontSize: "0.75rem", marginTop: 4 }}>PNG, JPG, WEBP (max. 5MB)</div>
                    </>
                  )}
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                <label style={{ fontSize: "0.7rem", color: "var(--text-ghost)", display: "block", marginBottom: 4 }}>OR ENTER IMAGE URL</label>
                <input 
                  className="auth-input" 
                  value={imagePreview} 
                  onChange={(e) => setImagePreview(e.target.value)}
                  placeholder="https://images.unsplash.com/..." 
                />
              </div>
            </div>
          </div>
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

      <div style={{ marginTop: 32, padding: 24, background: "rgba(255,255,255,0.02)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.04)" }}>
        <h4 style={{ marginBottom: 16, fontSize: "0.9rem", color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Advanced Data (JSON Format)</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
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
        <button type="submit" disabled={loading || uploading} className={`btn-primary auth-submit ${loading ? "auth-submit-loading" : ""}`} style={{ marginTop: 0, flex: 1 }}>
          {(loading || uploading) && <span className="auth-spinner" />}
          {loading ? "Saving..." : uploading ? "Uploading..." : initialData ? "Update Event" : "Create Event"}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-outline" style={{ flex: 1 }}>
          Cancel
        </button>
      </div>
    </form>
  );
}
