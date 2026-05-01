"use client";

import { useState } from "react";
import IconPicker from "./IconPicker";

export default function CategoryForm({ 
  initialData, 
  onSubmit,
  onCancel,
  loading
}: { 
  initialData?: any, 
  onSubmit: (formData: FormData) => void,
  onCancel: () => void,
  loading: boolean
}) {
  const [icon, setIcon] = useState(initialData?.icon || "Zap");
  const [formError, setFormError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const accent = formData.get("accent") as string;

    // Validation
    if (!name?.trim()) {
      setFormError("Category name is required");
      return;
    }

    if (!accent) {
      setFormError("Accent color is required");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form" style={{ padding: 24, background: "rgba(255,255,255,0.03)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.06)", marginBottom: 32 }}>
      {formError && <div className="auth-error" style={{ marginBottom: 16 }}>{formError}</div>}
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
        <div className="auth-field">
          <label className="auth-label">Category Name</label>
          <input name="name" className="auth-input" defaultValue={initialData?.name} required placeholder="e.g. Technology" />
        </div>
        <div className="auth-field">
          <label className="auth-label">Category Icon</label>
          <IconPicker value={icon} onChange={setIcon} />
          <input type="hidden" name="icon" value={icon} />
        </div>
        <div className="auth-field">
          <label className="auth-label">Accent Color</label>
          <input name="accent" type="color" className="auth-input" defaultValue={initialData?.accent || "#6366f1"} style={{ height: 48, padding: 4 }} required />
        </div>
      </div>

      <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
        <button type="submit" disabled={loading} className="btn-primary" style={{ padding: "10px 24px", fontSize: "0.85rem" }}>
          {loading ? "Saving..." : initialData ? "Update Category" : "Add Category"}
        </button>
        <button type="button" onClick={onCancel} className="btn-outline" style={{ padding: "10px 24px", fontSize: "0.85rem" }}>
          Cancel
        </button>
      </div>
    </form>
  );
}
