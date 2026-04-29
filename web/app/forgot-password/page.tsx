"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useAuth } from "@/app/lib/AuthContext";

export default function ForgotPasswordPage() {
  const { isAuthenticated } = useAuth();
  
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Can still reset password if logged out. If logged in, maybe show a different UI, but for now we let it render or redirect.
  // We'll just let them use the form.

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="auth-page">
      {/* ─── Brand Panel (left) ─── */}
      <div className="auth-brand-panel">
        <div className="auth-brand-orb auth-brand-orb-1" />
        <div className="auth-brand-orb auth-brand-orb-2" />
        <div className="auth-brand-content">
          <div className="auth-brand-logo">EP</div>
          <h1 className="auth-brand-title">
            Reset Your <span className="hero-gradient-text">Password</span>
          </h1>
          <p className="auth-brand-subtitle">
            Don&apos;t worry, it happens to the best of us. We&apos;ll help you get back to discovering amazing events.
          </p>
        </div>
      </div>

      {/* ─── Form Panel (right) ─── */}
      <div className="auth-form-panel">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h2 className="auth-form-title">Forgot Password</h2>
            <p className="auth-form-desc">
              Enter your email and we&apos;ll send you a link to reset your password.
            </p>
          </div>

          {!submitted ? (
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <div className="auth-field">
                <label className="auth-label" htmlFor="reset-email">
                  Email Address
                </label>
                <input
                  id="reset-email"
                  className="auth-input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
                {error && <span className="auth-error">{error}</span>}
              </div>

              <button
                type="submit"
                className={`btn-primary auth-submit ${loading ? "auth-submit-loading" : ""}`}
                disabled={loading}
              >
                {loading && <span className="auth-spinner" />}
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          ) : (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>📬</div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 12 }}>
                Check Your Email
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: 32 }}>
                We have sent a password reset link to <strong style={{ color: "var(--text-primary)" }}>{email}</strong>. 
                Please check your inbox (and spam folder) to continue.
              </p>
            </div>
          )}

          <div className="auth-divider">
            <div className="auth-divider-line" />
            <span className="auth-divider-text">Wait, I remember it!</span>
            <div className="auth-divider-line" />
          </div>

          <div className="auth-footer" style={{ marginTop: 24 }}>
            <Link href="/login" className="btn-outline" style={{ display: "inline-block", width: "100%", padding: "14px 20px", textDecoration: "none" }}>
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
