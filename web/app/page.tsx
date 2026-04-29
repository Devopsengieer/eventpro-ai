"use client";

import { useState } from "react";

const NAV_LINKS = ["Discover", "Categories", "Pricing", "About"];

const FEATURED_EVENTS = [
  {
    id: 1,
    title: "Global AI Summit 2026",
    category: "Technology",
    date: "May 14–16, 2026",
    location: "San Francisco, CA",
    price: "$299",
    attendees: "4,200+",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    tag: "Trending",
    tagColor: "#f97316",
  },
  {
    id: 2,
    title: "Neon Music Festival",
    category: "Music",
    date: "June 21–23, 2026",
    location: "Miami, FL",
    price: "$149",
    attendees: "12,000+",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80",
    tag: "Hot",
    tagColor: "#ec4899",
  },
  {
    id: 3,
    title: "Future Finance Forum",
    category: "Business",
    date: "July 5, 2026",
    location: "New York, NY",
    price: "$499",
    attendees: "2,800+",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&q=80",
    tag: "Exclusive",
    tagColor: "#a78bfa",
  },
  {
    id: 4,
    title: "Digital Arts Expo",
    category: "Art & Design",
    date: "Aug 10–12, 2026",
    location: "Los Angeles, CA",
    price: "$89",
    attendees: "6,500+",
    image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80",
    tag: "New",
    tagColor: "#34d399",
  },
];

const CATEGORIES = [
  { name: "Technology", icon: "⚡", count: 284, accent: "#6366f1" },
  { name: "Music", icon: "🎵", count: 519, accent: "#ec4899" },
  { name: "Business", icon: "📈", count: 173, accent: "#f59e0b" },
  { name: "Sports", icon: "🏆", count: 342, accent: "#10b981" },
  { name: "Art & Design", icon: "🎨", count: 201, accent: "#a78bfa" },
  { name: "Food & Drink", icon: "🍷", count: 388, accent: "#f97316" },
  { name: "Health", icon: "🧠", count: 156, accent: "#06b6d4" },
  { name: "Education", icon: "📚", count: 447, accent: "#84cc16" },
];

const WHY_CHOOSE = [
  {
    icon: "✦",
    title: "AI-Powered Matching",
    desc: "Our proprietary engine analyzes your interests and behavioral signals to surface events you'll love before you even search.",
    accent: "#6366f1",
  },
  {
    icon: "⬡",
    title: "Instant Booking",
    desc: "One-tap checkout with Apple Pay, Google Pay, and 40+ payment methods. Tickets land in your wallet in seconds.",
    accent: "#ec4899",
  },
  {
    icon: "◈",
    title: "Smart Reminders",
    desc: "Intelligent alerts timed to your commute, traffic, and personal schedule — so you're never late to what matters.",
    accent: "#f59e0b",
  },
  {
    icon: "⊕",
    title: "Live Analytics",
    desc: "Organizers get real-time dashboards with attendance heatmaps, revenue forecasts, and audience sentiment.",
    accent: "#10b981",
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main
      style={{
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        background: "#080a0f",
        color: "#e8eaf0",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0d0f16; }
        ::-webkit-scrollbar-thumb { background: #2a2d3a; border-radius: 3px; }

        .nav-link {
          color: #8b8fa8;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          text-decoration: none;
          transition: color 0.2s;
          cursor: pointer;
        }
        .nav-link:hover { color: #e8eaf0; }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 7vw, 5.5rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: #f0f2ff;
        }

        .hero-gradient-text {
          background: linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f472b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .search-bar {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          backdrop-filter: blur(12px);
          padding: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          transition: border-color 0.3s;
        }
        .search-bar:focus-within {
          border-color: rgba(129,140,248,0.5);
          box-shadow: 0 0 0 4px rgba(129,140,248,0.08);
        }

        .search-input {
          background: transparent;
          border: none;
          outline: none;
          color: #e8eaf0;
          font-size: 0.95rem;
          font-family: inherit;
          flex: 1;
          min-width: 180px;
          padding: 10px 16px;
        }
        .search-input::placeholder { color: #4b5068; }

        .search-divider {
          width: 1px;
          height: 32px;
          background: rgba(255,255,255,0.08);
        }

        .search-select {
          background: transparent;
          border: none;
          outline: none;
          color: #8b8fa8;
          font-size: 0.875rem;
          font-family: inherit;
          padding: 10px 12px;
          cursor: pointer;
          -webkit-appearance: none;
        }
        .search-select option { background: #1a1d2e; color: #e8eaf0; }

        .btn-primary {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 14px 28px;
          font-size: 0.9rem;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.25s;
          white-space: nowrap;
          letter-spacing: 0.01em;
        }
        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(99,102,241,0.4);
        }

        .event-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          cursor: pointer;
        }
        .event-card:hover {
          transform: translateY(-6px);
          border-color: rgba(255,255,255,0.14);
          box-shadow: 0 24px 48px rgba(0,0,0,0.5);
        }
        .event-card:hover .card-img { transform: scale(1.05); }

        .card-img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);
          display: block;
        }

        .category-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 24px 20px;
          cursor: pointer;
          transition: all 0.25s;
          text-align: center;
        }
        .category-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.06);
        }

        .why-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 36px 32px;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        .why-card::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.3s;
          border-radius: 20px;
        }
        .why-card:hover { border-color: rgba(255,255,255,0.12); }
        .why-card:hover::before { opacity: 1; }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .stat-number {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: #f0f2ff;
          line-height: 1;
        }

        .noise-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }

        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }

        .section-label {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #6366f1;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: #f0f2ff;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .footer-link {
          color: #5a5e77;
          font-size: 0.875rem;
          text-decoration: none;
          transition: color 0.2s;
          cursor: pointer;
          display: block;
          margin-bottom: 12px;
        }
        .footer-link:hover { color: #a5a8c0; }

        @media (max-width: 768px) {
          .search-divider { display: none; }
          .search-select { display: none; }
          .hero-stats { flex-direction: column; gap: 16px; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        .float-anim { animation: float 8s ease-in-out infinite; }
        .pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
      `}</style>

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* ── NAVBAR ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 max(24px, 5vw)",
          height: "68px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(8,10,15,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.05em",
              flexShrink: 0,
            }}
          >
            EP
          </div>
          <span
            style={{
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "#f0f2ff",
              letterSpacing: "-0.02em",
            }}
          >
            EventPro{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #818cf8, #c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AI
            </span>
          </span>
        </div>

        {/* Desktop nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "36px",
          }}
          className="hidden md:flex"
        >
          {NAV_LINKS.map((l) => (
            <span key={l} className="nav-link">
              {l}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span className="nav-link" style={{ display: "none" }}>
            Sign In
          </span>
          <button
            className="btn-primary"
            style={{ padding: "10px 20px", fontSize: "0.85rem" }}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px max(24px, 5vw) 80px",
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
            background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
            top: "10%",
            left: "-10%",
          }}
        />
        <div
          className="glow-orb pulse-glow"
          style={{
            width: 500,
            height: 500,
            background: "radial-gradient(circle, rgba(192,132,252,0.15) 0%, transparent 70%)",
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
            background: "radial-gradient(circle, rgba(244,114,182,0.12) 0%, transparent 70%)",
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
            color: "#a5b4fc",
            marginBottom: "28px",
          }}
        >
          <span style={{ fontSize: "0.65rem" }}>✦</span>
          AI-Powered Event Discovery
          <span style={{ fontSize: "0.65rem" }}>✦</span>
        </div>

        {/* Headline */}
        <h1 className="hero-title" style={{ maxWidth: 820, marginBottom: "24px" }}>
          Discover Events
          <br />
          <span className="hero-gradient-text">That Move You</span>
        </h1>

        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.15rem)",
            color: "#6b7094",
            maxWidth: 560,
            lineHeight: 1.7,
            marginBottom: "52px",
            fontWeight: 300,
          }}
        >
          EventPro AI surfaces the world's most compelling experiences — concerts, conferences, 
          festivals, and more — matched to who you are.
        </p>

        {/* Search bar */}
        <div className="search-bar" style={{ maxWidth: 760, width: "100%", marginBottom: "52px" }}>
          <span style={{ paddingLeft: "12px", fontSize: "1.1rem" }}>🔍</span>
          <input
            className="search-input"
            placeholder="Search events, artists, speakers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="search-divider" />
          <select
            className="search-select"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {["All Locations", "New York", "San Francisco", "Los Angeles", "Miami", "Chicago"].map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
          <div className="search-divider" />
          <select
            className="search-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {["All Categories", "Technology", "Music", "Business", "Sports", "Art"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <button className="btn-primary">Search Events</button>
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
              <div style={{ fontSize: "0.8rem", color: "#4b5068", marginTop: "4px", letterSpacing: "0.05em" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED EVENTS ── */}
      <section style={{ padding: "80px max(24px, 5vw)", position: "relative" }}>
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
            <button
              className="nav-link"
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "999px",
                padding: "10px 22px",
                cursor: "pointer",
                color: "#8b8fa8",
                fontSize: "0.875rem",
                fontFamily: "inherit",
                transition: "all 0.2s",
              }}
            >
              View All →
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {FEATURED_EVENTS.map((event) => (
              <div key={event.id} className="event-card">
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <img src={event.image} alt={event.title} className="card-img" />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(8,10,15,0.85) 0%, transparent 50%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 14,
                      left: 14,
                    }}
                  >
                    <span
                      className="badge"
                      style={{
                        background: `${event.tagColor}22`,
                        border: `1px solid ${event.tagColor}44`,
                        color: event.tagColor,
                        fontSize: "0.7rem",
                      }}
                    >
                      {event.tag}
                    </span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: 14,
                      right: 14,
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      background: "rgba(0,0,0,0.5)",
                      backdropFilter: "blur(8px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                    }}
                  >
                    ♡
                  </div>
                </div>

                <div style={{ padding: "20px" }}>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#6366f1",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      marginBottom: "8px",
                    }}
                  >
                    {event.category}
                  </div>
                  <h3
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      color: "#f0f2ff",
                      marginBottom: "12px",
                      lineHeight: 1.3,
                    }}
                  >
                    {event.title}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      marginBottom: "16px",
                    }}
                  >
                    <span style={{ fontSize: "0.82rem", color: "#5a5e77" }}>
                      📅 {event.date}
                    </span>
                    <span style={{ fontSize: "0.82rem", color: "#5a5e77" }}>
                      📍 {event.location}
                    </span>
                    <span style={{ fontSize: "0.82rem", color: "#5a5e77" }}>
                      👥 {event.attendees} attending
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "14px",
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.3rem",
                        fontWeight: 700,
                        color: "#f0f2ff",
                      }}
                    >
                      {event.price}
                    </span>
                    <button className="btn-primary" style={{ padding: "10px 18px", fontSize: "0.82rem" }}>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section
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
              From intimate workshops to massive festivals — every kind of experience.
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
              <div key={cat.name} className="category-card">
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
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "#4b5068",
                  }}
                >
                  {cat.count} events
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section style={{ padding: "80px max(24px, 5vw)", position: "relative" }}>
        <div
          className="glow-orb pulse-glow"
          style={{
            width: 700,
            height: 700,
            background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
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
                    color: "#f0f2ff",
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
            style={{
              marginTop: "72px",
              padding: "clamp(36px, 5vw, 56px) clamp(28px, 5vw, 64px)",
              borderRadius: "24px",
              background: "linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(168,85,247,0.15) 50%, rgba(244,114,182,0.12) 100%)",
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
                background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
                top: "-50%",
                right: "10%",
              }}
            />
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                fontWeight: 700,
                color: "#f0f2ff",
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
                color: "#6b7094",
                fontSize: "1rem",
                marginBottom: "32px",
                fontWeight: 300,
                position: "relative",
              }}
            >
              Join 2.4 million people discovering the world's best events with AI.
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
              <button className="btn-primary" style={{ padding: "16px 36px", fontSize: "0.95rem" }}>
                Start for Free
              </button>
              <button
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#a5a8c0",
                  borderRadius: "12px",
                  padding: "16px 36px",
                  fontSize: "0.95rem",
                  fontFamily: "inherit",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                See Demo →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "64px max(24px, 5vw) 32px",
          background: "rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr repeat(3, 1fr)",
              gap: "40px",
              marginBottom: "52px",
              flexWrap: "wrap",
            }}
          >
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #6366f1, #a855f7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  EP
                </div>
                <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#f0f2ff" }}>
                  EventPro AI
                </span>
              </div>
              <p
                style={{
                  color: "#4b5068",
                  fontSize: "0.875rem",
                  lineHeight: 1.7,
                  fontWeight: 300,
                  maxWidth: 260,
                }}
              >
                The world's most intelligent event discovery platform, powered by AI that actually understands you.
              </p>
              <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
                {["𝕏", "in", "ig", "yt"].map((s) => (
                  <div
                    key={s}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "10px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.8rem",
                      color: "#5a5e77",
                      cursor: "pointer",
                    }}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              {
                title: "Product",
                links: ["Discover Events", "AI Matching", "For Organizers", "Pricing", "API"],
              },
              {
                title: "Company",
                links: ["About Us", "Blog", "Careers", "Press Kit", "Partners"],
              },
              {
                title: "Support",
                links: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service", "Status"],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#3a3d50",
                    marginBottom: "20px",
                  }}
                >
                  {col.title}
                </h4>
                {col.links.map((l) => (
                  <a key={l} className="footer-link">
                    {l}
                  </a>
                ))}
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            style={{
              paddingTop: "28px",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <span style={{ fontSize: "0.8rem", color: "#3a3d50" }}>
              © 2026 EventPro AI. All rights reserved.
            </span>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#10b981",
                  boxShadow: "0 0 8px #10b981",
                }}
              />
              <span style={{ fontSize: "0.78rem", color: "#3a3d50" }}>
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
