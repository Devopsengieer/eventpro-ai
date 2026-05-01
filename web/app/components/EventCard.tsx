"use client";

import Link from "next/link";
import type { Event } from "@/app/lib/data";
import { formatAttendees, formatDate, formatTime } from "@/app/lib/data";

interface EventCardProps {
  event: Event;
  index?: number;
  view?: "grid" | "list";
  saved?: boolean;
  onToggleSave?: (id: number) => void;
}

export default function EventCard({
  event,
  index = 0,
  view = "grid",
  saved = false,
  onToggleSave,
}: EventCardProps) {
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleSave?.(event.id);
  };

  if (view === "list") {
    return (
      <Link
        href={`/events/${event.id}`}
        className="event-card-list fade-in"
        style={{ animationDelay: `${index * 0.035}s`, textDecoration: "none", color: "inherit" }}
      >
        <div className="list-img" style={{ position: "relative", overflow: "hidden", flexShrink: 0, width: 200 }}>
          <img
            src={event.image}
            alt={event.title}
            style={{ width: "100%", height: "100%", minHeight: 140, objectFit: "cover", display: "block" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(8,10,15,.2)" }} />
        </div>
        <div style={{ padding: "20px 22px", flex: 1, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 8 }}>
              <span className="ep-category-label">{event.category}</span>
              <span
                className="badge"
                style={{
                  background: `${event.tagColor}18`,
                  border: `1px solid ${event.tagColor}33`,
                  color: event.tagColor,
                  fontSize: ".65rem",
                }}
              >
                {event.tag}
              </span>
            </div>
            <h3 className="ep-card-title" style={{ marginBottom: 10 }}>
              {event.title}
            </h3>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
              <span className="ep-card-meta">📅 {formatDate(event.date)} · {formatTime(event.time)}</span>
              <span className="ep-card-meta">📍 {event.location}</span>
              <span className="ep-card-meta">👥 {formatAttendees(event.attendees)} attending</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
            <div style={{ textAlign: "right" }}>
              <span className="ep-price-label">from</span>
              <span className="ep-price-value">${event.price}</span>
            </div>
            <button onClick={handleSave} className="ep-save-btn-sm" style={{ color: saved ? "#f43f5e" : "#4b5068", display: "flex", alignItems: "center", gap: "6px", width: "auto", padding: "6px 12px", borderRadius: "100px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <span style={{ fontSize: "1.1rem" }}>{saved ? "♥" : "♡"}</span>
              <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>{saved ? "Saved" : "Save Event"}</span>
            </button>
            <span className="btn-primary ep-book-btn">Book</span>
          </div>
        </div>
      </Link>
    );
  }

  // Grid view
  return (
    <Link
      href={`/events/${event.id}`}
      className="event-card fade-in"
      style={{ animationDelay: `${index * 0.04}s`, textDecoration: "none", color: "inherit" }}
    >
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img src={event.image} alt={event.title} className="card-thumb" />
        <div className="ep-card-gradient" />
        <div style={{ position: "absolute", top: 13, left: 13 }}>
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
        </div>
        <button onClick={handleSave} className="ep-save-btn" style={{ color: saved ? "#f43f5e" : "#6b7094", display: "flex", alignItems: "center", gap: "6px", width: "auto", padding: "8px 14px", borderRadius: "100px", background: "rgba(8,10,15,0.7)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.08)", right: 13, top: 13 }}>
          <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>{saved ? "♥" : "♡"}</span>
          <span style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.02em" }}>{saved ? "Saved" : "Save Event"}</span>
        </button>
      </div>

      <div className="ep-card-body">
        <div className="ep-category-label">{event.category}</div>
        <h3 className="ep-card-title">{event.title}</h3>

        <div className="ep-card-details">
          <span className="ep-card-meta">📅 {formatDate(event.date)} · {formatTime(event.time)}</span>
          <span className="ep-card-meta">📍 {event.location}</span>
          <span className="ep-card-meta">👥 {formatAttendees(event.attendees)} attending</span>
        </div>

        <div className="ep-card-footer">
          <div>
            <span className="ep-price-label">from</span>
            <span className="ep-price-value">${event.price}</span>
          </div>
          <span className="btn-primary ep-book-btn">Book Now</span>
        </div>
      </div>
    </Link>
  );
}
