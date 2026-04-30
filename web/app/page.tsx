"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CATEGORIES,
  WHY_CHOOSE,
} from "@/app/lib/data";
import EventCard from "@/app/components/EventCard";

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [featuredEvents, setFeaturedEvents] = useState<any[]>([]);

  useEffect(() => {
    import("@/app/actions/event").then((m) => {
      m.getFeaturedEventsFromDB().then((data: any[]) => setFeaturedEvents(data));
    });
  }, []);

  const toggleSave = (id: number) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedCategory !== "All Categories")
      params.set("category", selectedCategory);
    if (selectedLocation !== "All Locations")
      params.set("location", selectedLocation);
    router.push(`/events${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  // Back to top scroll listener
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setShowBackToTop(window.scrollY > 600);
    });
  }

  return (
    <main
      style={{
        fontFamily: "var(--font-sans)",
        background: "var(--bg-primary)",
        color: "var(--text-secondary)",
        overflowX: "hidden",
      }}
    >
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* ── HERO ── */}
      <section
        id="hero"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "52px max(24px, 5vw) 80px",
          position: "relative",
          textAlign: "center",
        }}
      >
        {/* Background orbs */}
        <div
          className="glow-orb pulse-glow"
          style={{
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
            top: "10%",
            left: "-10%",
          }}
        />
        <div
          className="glow-orb pulse-glow"
          style={{
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(192,132,252,0.15) 0%, transparent 70%)",
            top: "20%",
            right: "-8%",
            animationDelay: "2s",
          }}
        />
        <div
          className="glow-orb"
          style={{
            width: 300,
            height: 300,
            background:
              "radial-gradient(circle, rgba(244,114,182,0.12) 0%, transparent 70%)",
            bottom: "15%",
            left: "40%",
          }}
        />

        {/* Badge */}
        <div
          className="badge"
          style={{
            background: "rgba(99,102,241,0.12)",
            border: "1px solid rgba(99,102,241,0.25)",
            color: "var(--accent-lighter)",
            marginBottom: "28px",
            fontSize: "0.75rem",
          }}
        >
          <span style={{ fontSize: "0.65rem" }}>✦</span>
          AI-Powered Event Discovery
          <span style={{ fontSize: "0.65rem" }}>✦</span>
        </div>

        {/* Headline */}
        <h1
          className="hero-title"
          style={{ maxWidth: 820, marginBottom: "24px" }}
        >
          Discover Events
          <br />
          <span className="hero-gradient-text">That Move You</span>
        </h1>

        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.15rem)",
            color: "var(--text-muted)",
            maxWidth: 560,
            lineHeight: 1.7,
            marginBottom: "52px",
            fontWeight: 300,
          }}
        >
          EventPro AI surfaces the world&apos;s most compelling experiences —
          concerts, conferences, festivals, and more — matched to who you are.
        </p>

        {/* Search bar */}
        <div
          className="search-bar"
          style={{ maxWidth: 760, width: "100%", marginBottom: "52px" }}
        >
          <span style={{ paddingLeft: "12px", fontSize: "1.1rem" }}>🔍</span>
          <input
            className="search-input"
            placeholder="Search events, artists, speakers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="search-divider" />
          <select
            className="search-select"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {[
              "All Locations",
              "New York",
              "San Francisco",
              "Los Angeles",
              "Miami",
              "Chicago",
            ].map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
          <div className="search-divider" />
          <select
            className="search-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {[
              "All Categories",
              "Technology",
              "Music",
              "Business",
              "Sports",
              "Art & Design",
              "Food & Drink",
              "Health",
              "Education",
              "Theatre",
              "Comedy",
              "Film & Cinema",
              "Fitness & Wellness",
              "Gaming & Esports",
            ].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <button className="btn-primary" onClick={handleSearch}>
            Search Events
          </button>
        </div>

        {/* Stats */}
        <div
          className="hero-stats"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "48px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            { num: "50K+", label: "Events Listed" },
            { num: "2.4M", label: "Happy Attendees" },
            { num: "180+", label: "Cities Worldwide" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div className="stat-number">{s.num}</div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-faint)",
                  marginTop: "4px",
                  letterSpacing: "0.05em",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED EVENTS ── */}
      <section
        id="discover"
        style={{ padding: "80px max(24px, 5vw)", position: "relative" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "48px",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <div className="section-label" style={{ marginBottom: "10px" }}>
                ✦ Curated For You
              </div>
              <h2 className="section-title">Featured Events</h2>
            </div>
            <Link
              href="/events"
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "999px",
                padding: "10px 22px",
                color: "#8b8fa8",
                fontSize: "0.875rem",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              View All →
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {featuredEvents.map((event, i) => (
              <EventCard
                key={event.id}
                event={event}
                index={i}
                saved={savedIds.has(event.id)}
                onToggleSave={toggleSave}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section
        id="categories"
        style={{
          padding: "80px max(24px, 5vw)",
          background: "rgba(255,255,255,0.015)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <div className="section-label" style={{ marginBottom: "10px" }}>
              ✦ Browse By Type
            </div>
            <h2 className="section-title">Explore Categories</h2>
            <p
              style={{
                color: "#5a5e77",
                fontSize: "0.95rem",
                marginTop: "14px",
                fontWeight: 300,
              }}
            >
              From intimate workshops to massive festivals — every kind of
              experience.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: "16px",
            }}
          >
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={`/events?category=${encodeURIComponent(cat.name)}`}
                className="category-card"
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "16px",
                    background: `${cat.accent}18`,
                    border: `1px solid ${cat.accent}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    margin: "0 auto 14px",
                  }}
                >
                  {cat.icon}
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "#d4d8f0",
                    marginBottom: "6px",
                  }}
                >
                  {cat.name}
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-faint)" }}>
                  {cat.count} events
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section
        id="about"
        style={{ padding: "80px max(24px, 5vw)", position: "relative" }}
      >
        <div
          className="glow-orb pulse-glow"
          style={{
            width: 700,
            height: 700,
            background:
              "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        <div
          style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}
        >
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div className="section-label" style={{ marginBottom: "10px" }}>
              ✦ The EventPro Difference
            </div>
            <h2 className="section-title">
              Why 2 Million Attendees
              <br />
              Choose EventPro AI
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {WHY_CHOOSE.map((item) => (
              <div key={item.title} className="why-card">
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "14px",
                    background: `${item.accent}18`,
                    border: `1px solid ${item.accent}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.3rem",
                    color: item.accent,
                    marginBottom: "20px",
                    fontWeight: 700,
                  }}
                >
                  {item.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    marginBottom: "12px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "#5a5e77",
                    lineHeight: 1.7,
                    fontWeight: 300,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div
            id="pricing"
            style={{
              marginTop: "72px",
              padding: "clamp(36px, 5vw, 56px) clamp(28px, 5vw, 64px)",
              borderRadius: "24px",
              background:
                "linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(168,85,247,0.15) 50%, rgba(244,114,182,0.12) 100%)",
              border: "1px solid rgba(99,102,241,0.25)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              className="glow-orb"
              style={{
                width: 300,
                height: 300,
                background:
                  "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
                top: "-50%",
                right: "10%",
              }}
            />
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "16px",
                position: "relative",
              }}
            >
              Ready to Find Your Next
              <br />
              <span className="hero-gradient-text">Unforgettable Moment?</span>
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "1rem",
                marginBottom: "32px",
                fontWeight: 300,
                position: "relative",
              }}
            >
              Join 2.4 million people discovering the world&apos;s best events
              with AI.
            </p>
            <div
              style={{
                display: "flex",
                gap: "14px",
                justifyContent: "center",
                flexWrap: "wrap",
                position: "relative",
              }}
            >
              <Link
                href="/events"
                className="btn-primary"
                style={{
                  padding: "16px 36px",
                  fontSize: "0.95rem",
                  textDecoration: "none",
                }}
              >
                Start for Free
              </Link>
              <Link
                href="/events"
                className="btn-outline"
                style={{
                  padding: "16px 36px",
                  fontSize: "0.95rem",
                  textDecoration: "none",
                }}
              >
                See Demo →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Back to top */}
      {showBackToTop && (
        <button
          className="ep-back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </main>
  );
}
