"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  getEventById,
  getRelatedEvents,
  formatAttendees,
} from "@/app/lib/data";
import EventCard from "@/app/components/EventCard";

export default function EventDetailPage() {
  const params = useParams();
  const eventId = Number(params.id);
  const event = getEventById(eventId);
  const [ticketCount, setTicketCount] = useState(1);
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());

  const toggleSave = (id: number) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  if (!event) {
    return (
      <main
        style={{
          fontFamily: "var(--font-sans)",
          background: "var(--bg-primary)",
          color: "var(--text-secondary)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          textAlign: "center",
          padding: 40,
        }}
      >
        <div style={{ fontSize: "4rem" }}>😢</div>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "2rem",
            color: "var(--text-primary)",
          }}
        >
          Event Not Found
        </h1>
        <p style={{ color: "var(--text-muted)", maxWidth: 400 }}>
          The event you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link
          href="/events"
          className="btn-primary"
          style={{ textDecoration: "none", marginTop: 8 }}
        >
          Browse All Events
        </Link>
      </main>
    );
  }

  const relatedEvents = getRelatedEvents(event);
  const isSaved = savedIds.has(event.id);
  const totalPrice = event.price * ticketCount;

  return (
    <main
      style={{
        fontFamily: "var(--font-sans)",
        background: "var(--bg-primary)",
        color: "var(--text-secondary)",
        minHeight: "100vh",
      }}
    >

      {/* ── HERO IMAGE ── */}
      <div style={{ position: "relative" }}>
        <div
          style={{
            height: "clamp(280px, 45vw, 480px)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src={event.image}
            alt={event.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, var(--bg-primary) 0%, rgba(8,10,15,0.4) 40%, transparent 70%)",
            }}
          />
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div
        style={{
          maxWidth: 1200,
          margin: "-80px auto 0",
          padding: "0 max(20px, 4vw) 80px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Breadcrumbs */}
        <nav
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            marginBottom: 24,
            fontSize: "0.82rem",
          }}
        >
          <Link
            href="/"
            style={{ color: "var(--text-faint)", textDecoration: "none" }}
          >
            Home
          </Link>
          <span style={{ color: "var(--text-ghost)" }}>›</span>
          <Link
            href="/events"
            style={{ color: "var(--text-faint)", textDecoration: "none" }}
          >
            Events
          </Link>
          <span style={{ color: "var(--text-ghost)" }}>›</span>
          <span style={{ color: "var(--accent-lighter)" }}>
            {event.title}
          </span>
        </nav>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: 40,
            alignItems: "start",
          }}
          className="ep-detail-grid"
        >
          {/* Left column — Event info */}
          <div>
            {/* Tag + Category */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <span
                className="badge"
                style={{
                  background: `${event.tagColor}22`,
                  border: `1px solid ${event.tagColor}44`,
                  color: event.tagColor,
                }}
              >
                {event.tag}
              </span>
              <span className="ep-category-label" style={{ margin: 0 }}>
                {event.category}
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 900,
                color: "var(--text-primary)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: 24,
              }}
            >
              {event.title}
            </h1>

            {/* Key details */}
            <div
              style={{
                display: "flex",
                gap: 24,
                flexWrap: "wrap",
                marginBottom: 32,
              }}
            >
              {[
                { icon: "📅", text: `${event.date} · ${event.time}` },
                { icon: "📍", text: event.location },
                {
                  icon: "👥",
                  text: `${formatAttendees(event.attendees)} attending`,
                },
              ].map((item) => (
                <div
                  key={item.text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: "0.9rem",
                    color: "var(--text-muted)",
                  }}
                >
                  <span>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div
              style={{
                display: "flex",
                gap: 12,
                marginBottom: 40,
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => toggleSave(event.id)}
                className="btn-outline"
                style={{
                  padding: "10px 20px",
                  fontSize: "0.85rem",
                  color: isSaved ? "#f43f5e" : undefined,
                  borderColor: isSaved
                    ? "rgba(244,63,94,0.3)"
                    : undefined,
                }}
              >
                {isSaved ? "♥ Saved" : "♡ Save Event"}
              </button>
              <button
                className="btn-outline"
                style={{ padding: "10px 20px", fontSize: "0.85rem" }}
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: event.title,
                      text: `Check out ${event.title} on EventPro AI`,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
              >
                ↗ Share
              </button>
            </div>

            {/* Description */}
            <div style={{ marginBottom: 48 }}>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: 16,
                }}
              >
                About This Event
              </h2>
              <p
                style={{
                  color: "var(--text-muted)",
                  lineHeight: 1.8,
                  fontSize: "0.95rem",
                  fontWeight: 300,
                }}
              >
                {event.description}
              </p>
            </div>

            {/* Highlights */}
            <div style={{ marginBottom: 48 }}>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: 20,
                }}
              >
                Event Highlights
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: 12,
                }}
              >
                {event.highlights.map((h) => (
                  <div
                    key={h}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "14px 16px",
                      borderRadius: 12,
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--accent-lighter)",
                        fontSize: "0.9rem",
                        flexShrink: 0,
                      }}
                    >
                      ✦
                    </span>
                    <span
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "0.85rem",
                        fontWeight: 500,
                      }}
                    >
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div style={{ marginBottom: 48 }}>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: 20,
                }}
              >
                Event Schedule
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {event.schedule.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 20,
                      padding: "18px 0",
                      borderBottom:
                        i < event.schedule.length - 1
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "none",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        minWidth: 80,
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        color: "var(--accent-lighter)",
                        paddingTop: 2,
                      }}
                    >
                      {item.time}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.92rem",
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          marginBottom: item.speaker ? 4 : 0,
                        }}
                      >
                        {item.title}
                      </div>
                      {item.speaker && (
                        <div
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--text-faint)",
                          }}
                        >
                          🎤 {item.speaker}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Organizer */}
            <div style={{ marginBottom: 48 }}>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: 20,
                }}
              >
                Organized By
              </h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: 24,
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <img
                  src={event.organizer.avatar}
                  alt={event.organizer.name}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: 4,
                    }}
                  >
                    {event.organizer.name}
                  </div>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--text-faint)",
                      lineHeight: 1.6,
                      fontWeight: 300,
                    }}
                  >
                    {event.organizer.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — Booking card (sticky) */}
          <div
            className="ep-booking-card"
            style={{
              position: "sticky",
              top: 92,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20,
              padding: 28,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {/* Price header */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                }}
              >
                ${event.price}
              </span>
              <span
                style={{
                  fontSize: "0.82rem",
                  color: "var(--text-faint)",
                }}
              >
                per ticket
              </span>
            </div>

            <div
              style={{
                height: 1,
                background: "rgba(255,255,255,0.06)",
              }}
            />

            {/* Date & time */}
            <div>
              <div
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-faint)",
                  marginBottom: 8,
                }}
              >
                Date & Time
              </div>
              <div
                style={{
                  fontSize: "0.92rem",
                  color: "var(--text-primary)",
                  fontWeight: 500,
                }}
              >
                📅 {event.date}
              </div>
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  marginTop: 4,
                }}
              >
                ⏰ {event.time}
              </div>
            </div>

            {/* Location */}
            <div>
              <div
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-faint)",
                  marginBottom: 8,
                }}
              >
                Location
              </div>
              <div
                style={{
                  fontSize: "0.92rem",
                  color: "var(--text-primary)",
                  fontWeight: 500,
                }}
              >
                📍 {event.location}
              </div>
            </div>

            <div
              style={{
                height: 1,
                background: "rgba(255,255,255,0.06)",
              }}
            />

            {/* Ticket selector */}
            <div>
              <div
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-faint)",
                  marginBottom: 12,
                }}
              >
                Tickets
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: "8px 16px",
                }}
              >
                <button
                  onClick={() =>
                    setTicketCount((c) => Math.max(1, c - 1))
                  }
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.05)",
                    color: "var(--text-secondary)",
                    fontSize: "1.1rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  −
                </button>
                <span
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    minWidth: 28,
                    textAlign: "center",
                  }}
                >
                  {ticketCount}
                </span>
                <button
                  onClick={() =>
                    setTicketCount((c) => Math.min(10, c + 1))
                  }
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.05)",
                    color: "var(--text-secondary)",
                    fontSize: "1.1rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  +
                </button>
                <div
                  style={{
                    marginLeft: "auto",
                    textAlign: "right",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--text-ghost)",
                    }}
                  >
                    Total
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.3rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                    }}
                  >
                    ${totalPrice}
                  </div>
                </div>
              </div>
            </div>

            {/* Book button */}
            <Link
              href={`/booking/${event.id}?tickets=${ticketCount}`}
              className="btn-primary"
              style={{
                padding: "16px 24px",
                fontSize: "1rem",
                width: "100%",
                borderRadius: 14,
                textAlign: "center",
                textDecoration: "none"
              }}
            >
              Book Now — ${totalPrice}
            </Link>

            {/* Attendees */}
            <div
              style={{
                textAlign: "center",
                fontSize: "0.8rem",
                color: "var(--text-faint)",
              }}
            >
              👥 {formatAttendees(event.attendees)} people attending
            </div>

            {/* Guarantee */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                padding: "16px",
                borderRadius: 12,
                background: "rgba(99,102,241,0.06)",
                border: "1px solid rgba(99,102,241,0.12)",
              }}
            >
              {[
                "✓ Instant confirmation",
                "✓ Free cancellation up to 48h",
                "✓ Mobile ticket included",
              ].map((g) => (
                <span
                  key={g}
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--accent-lighter)",
                  }}
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RELATED EVENTS ── */}
        {relatedEvents.length > 0 && (
          <div style={{ marginTop: 80 }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                marginBottom: 32,
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div>
                <div
                  className="section-label"
                  style={{ marginBottom: 8 }}
                >
                  ✦ You May Also Like
                </div>
                <h2 className="section-title">Related Events</h2>
              </div>
              <Link
                href={`/events?category=${encodeURIComponent(event.category)}`}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 999,
                  padding: "10px 22px",
                  color: "#8b8fa8",
                  fontSize: "0.875rem",
                  textDecoration: "none",
                }}
              >
                View All {event.category} →
              </Link>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 24,
              }}
            >
              {relatedEvents.map((e, i) => (
                <EventCard
                  key={e.id}
                  event={e}
                  index={i}
                  saved={savedIds.has(e.id)}
                  onToggleSave={toggleSave}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Responsive styles for this page */}
      <style>{`
        .ep-detail-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 40px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .ep-detail-grid {
            grid-template-columns: 1fr !important;
          }
          .ep-booking-card {
            position: static !important;
            order: -1;
          }
        }
      `}</style>
    </main>
  );
}