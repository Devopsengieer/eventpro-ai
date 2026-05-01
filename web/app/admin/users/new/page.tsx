"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/app/actions/admin";

export default function NewUserPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    
    // Client-side validation
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;

    if (!name?.trim()) {
      setError("Full name is required");
      setLoading(false);
      return;
    }

    if (!email?.trim()) {
      setError("Email is required");
      setLoading(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      setLoading(false);
      return;
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (!role) {
      setError("Role is required");
      setLoading(false);
      return;
    }

    const result = await createUser(formData);

    if (result.success) {
      router.push("/admin/users");
      router.refresh();
    } else {
      setError(result.error || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <h1 className="section-title" style={{ marginBottom: 8 }}>Create New User</h1>
        <p style={{ color: "var(--text-muted)" }}>Add a new user account to the platform.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ 
        maxWidth: 520, background: "rgba(255,255,255,0.02)", padding: 40, 
        borderRadius: 24, border: "1px solid rgba(255,255,255,0.06)",
        display: "flex", flexDirection: "column", gap: 20 
      }}>
        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <div className="auth-field">
          <label className="auth-label">Full Name</label>
          <input name="name" className="auth-input" required placeholder="e.g. John Doe" />
        </div>

        <div className="auth-field">
          <label className="auth-label">Email Address</label>
          <input name="email" type="email" className="auth-input" required placeholder="john@example.com" />
        </div>

        <div className="auth-field">
          <label className="auth-label">Password</label>
          <input name="password" type="password" className="auth-input" required minLength={6} placeholder="Minimum 6 characters" />
        </div>

        <div className="auth-field">
          <label className="auth-label">Role</label>
          <select name="role" className="auth-input" defaultValue="USER" style={{ cursor: "pointer" }} required>
            <option value="USER">USER — Standard user</option>
            <option value="ADMIN">ADMIN — Full admin access</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
          <button type="submit" disabled={loading} className={`btn-primary auth-submit ${loading ? "auth-submit-loading" : ""}`} style={{ marginTop: 0, flex: 1 }}>
            {loading && <span className="auth-spinner" />}
            {loading ? "Creating..." : "Create User"}
          </button>
          <button type="button" onClick={() => router.back()} className="btn-outline" style={{ flex: 1 }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
