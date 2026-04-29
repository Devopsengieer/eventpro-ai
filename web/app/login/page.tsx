"use client";

import { useState, type FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/lib/AuthContext";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  // Redirect if already logged in
  if (isAuthenticated) {
    const redirect = searchParams.get("redirect") || "/events";
    router.push(redirect);
    return null;
  }

  const validate = () => {
    const e: typeof errors = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter a valid email address";
    if (!password) e.password = "Password is required";
    else if (password.length < 6)
      e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await login(email, password);
      const redirect = searchParams.get("redirect") || "/events";
      router.push(redirect);
    } catch {
      setErrors({ email: "Login failed. Please try again." });
    } finally {
      setLoading(false);
    }
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
            Welcome Back to{" "}
            <span className="hero-gradient-text">EventPro AI</span>
          </h1>
          <p className="auth-brand-subtitle">
            Your intelligent event companion. Discover, book, and experience
            unforgettable moments — all powered by AI.
          </p>
          <div className="auth-brand-features">
            {[
              {
                icon: "✦",
                text: "AI-powered event recommendations",
                bg: "rgba(99,102,241,0.12)",
              },
              {
                icon: "⚡",
                text: "Instant booking confirmation",
                bg: "rgba(245,158,11,0.12)",
              },
              {
                icon: "🔒",
                text: "Secure payments & free cancellation",
                bg: "rgba(16,185,129,0.12)",
              },
            ].map((f) => (
              <div key={f.text} className="auth-brand-feature">
                <div
                  className="auth-brand-feature-icon"
                  style={{ background: f.bg }}
                >
                  {f.icon}
                </div>
                <span className="auth-brand-feature-text">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Form Panel (right) ─── */}
      <div className="auth-form-panel">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h2 className="auth-form-title">Login</h2>
            <p className="auth-form-desc">
              Enter your credentials to access your account
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="auth-field">
              <label className="auth-label" htmlFor="login-email">
                Email Address
              </label>
              <div className="auth-input-wrap">
                <input
                  id="login-email"
                  className="auth-input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className="auth-error">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="auth-field">
              <label className="auth-label" htmlFor="login-password">
                Password
              </label>
              <div className="auth-input-wrap">
                <input
                  id="login-password"
                  className="auth-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingRight: 44 }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="auth-input-icon"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
              {errors.password && (
                <span className="auth-error">{errors.password}</span>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="auth-row">
              <label className="auth-checkbox-wrap">
                <input
                  type="checkbox"
                  className="auth-checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span className="auth-checkbox-label">Remember me</span>
              </label>
              <Link href="/forgot-password" className="auth-link">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`btn-primary auth-submit ${loading ? "auth-submit-loading" : ""}`}
              disabled={loading}
            >
              {loading && <span className="auth-spinner" />}
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <div className="auth-divider-line" />
            <span className="auth-divider-text">or continue with</span>
            <div className="auth-divider-line" />
          </div>

          {/* Social */}
          <div className="auth-social-row">
            <button className="social-btn" type="button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button className="social-btn" type="button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </button>
          </div>

          {/* Footer link */}
          <div className="auth-footer">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="auth-link" style={{ fontWeight: 600 }}>
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="auth-page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", color: "var(--text-muted)" }}>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
