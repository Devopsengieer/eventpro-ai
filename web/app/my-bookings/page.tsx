"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/app/actions/auth";
import { getMyBookings, cancelBooking } from "@/app/actions/booking";

function MyBookingsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "confirmed" | "cancelled" | "past">("all");
  const [showCancelModal, setShowCancelModal] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      getCurrentUser(),
      getMyBookings()
    ]).then(([userData, bookingsData]) => {
      setUser(userData);
      setBookings(bookingsData);
      setAuthLoading(false);
      
      if (!userData) {
        router.push("/login?redirect=/my-bookings");
      }
    });
  }, [router]);

  useEffect(() => {
    if (searchParams.get("new")) {
      const url = new URL(window.location.href);
      url.searchParams.delete("new");
      window.history.replaceState({}, "", url.toString());
    }
  }, [searchParams]);

  if (authLoading || !user) return null;

  const getBookingsByStatus = (status: "all" | "confirmed" | "cancelled" | "past") => {
    if (status === "all") return bookings;
    if (status === "confirmed") return bookings.filter(b => b.status === "CONFIRMED");
    if (status === "cancelled") return bookings.filter(b => b.status === "CANCELLED");
    if (status === "past") return bookings.filter(b => b.status === "PAST");
    return bookings;
  };

  const displayedBookings = getBookingsByStatus(activeTab);
  
  const upcomingCount = getBookingsByStatus("confirmed").length;
  const pastCount = getBookingsByStatus("past").length;
  const cancelledCount = getBookingsByStatus("cancelled").length;

  const handleCancel = async (id: string) => {
    const res = await cancelBooking(id);
    if (res?.success) {
      setBookings(bookings.map(b => b.id === id ? { ...b, status: "CANCELLED" } : b));
    }
    setShowCancelModal(null);
  };

  return (
    <div className="my-bookings-page">
      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="modal-overlay" onClick={() => setShowCancelModal(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>⚠️</div>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 12 }}>Cancel Booking?</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: 24 }}>
              Are you sure you want to cancel this booking? This action cannot be undone. Refunds may take 3-5 business days to process.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button className="btn-outline" onClick={() => setShowCancelModal(null)}>Keep Booking</button>
              <button 
                className="btn-primary" 
                style={{ background: "#f43f5e" }}
                onClick={() => handleCancel(showCancelModal)}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="my-bookings-header">
        <h1 className="my-bookings-greeting">Hello, {user?.name.split(" ")[0]}!</h1>
        <p className="my-bookings-subtitle">Manage your upcoming events and past experiences.</p>
        
        <div className="my-bookings-stats">
          <div className="my-bookings-stat">
            <div className="my-bookings-stat-number">{upcomingCount}</div>
            <div className="my-bookings-stat-label">Upcoming</div>
          </div>
          <div className="my-bookings-stat">
            <div className="my-bookings-stat-number">{pastCount}</div>
            <div className="my-bookings-stat-label">Past</div>
          </div>
          <div className="my-bookings-stat">
            <div className="my-bookings-stat-number">{cancelledCount}</div>
            <div className="my-bookings-stat-label">Cancelled</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="my-bookings-tabs">
        <button className={`my-bookings-tab ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>All Bookings</button>
        <button className={`my-bookings-tab ${activeTab === "confirmed" ? "active" : ""}`} onClick={() => setActiveTab("confirmed")}>Upcoming</button>
        <button className={`my-bookings-tab ${activeTab === "past" ? "active" : ""}`} onClick={() => setActiveTab("past")}>Past</button>
        <button className={`my-bookings-tab ${activeTab === "cancelled" ? "active" : ""}`} onClick={() => setActiveTab("cancelled")}>Cancelled</button>
      </div>

      {/* List */}
      <div className="my-bookings-list">
        {displayedBookings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🎟️</div>
            <h3 className="empty-state-title">No bookings found</h3>
            <p className="empty-state-desc">You don&apos;t have any {activeTab !== "all" ? activeTab : ""} bookings yet. Start exploring events to find your next adventure!</p>
            <Link href="/events" className="btn-primary">Browse Events</Link>
          </div>
        ) : (
          displayedBookings.map((b) => (
            <div key={b.id} className="my-booking-card">
              <img src={b.event.image} alt={b.event.title} className="my-booking-img" />
              
              <div className="my-booking-info">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span className={`status-badge ${b.status.toLowerCase()}`}>
                    {b.status === "CONFIRMED" ? "✓ Confirmed" : b.status === "PAST" ? "Completed" : "Cancelled"}
                  </span>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-ghost)" }}>ID: {b.id}</span>
                </div>
                
                <h3 className="my-booking-title">{b.event.title}</h3>
                
                <div className="my-booking-meta">
                  <span>📅 {b.event.date} · {b.event.time}</span>
                  <span>📍 {b.event.location}</span>
                </div>
                
                <div className="my-booking-details">
                  <span className="my-booking-tickets">🎫 {b.ticketCount} Ticket{b.ticketCount > 1 ? 's' : ''}</span>
                  <span className="my-booking-price">${b.totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="my-booking-actions">
                <Link href={`/events/${b.eventId}`} className="btn-primary" style={{ background: b.status !== "CONFIRMED" ? "rgba(255,255,255,0.1)" : undefined }}>
                  {b.status === "CONFIRMED" ? "View Ticket" : "View Event"}
                </Link>
                {b.status === "CONFIRMED" && (
                  <button className="btn-outline" style={{ color: "#f43f5e", borderColor: "rgba(244,63,94,0.3)" }} onClick={() => setShowCancelModal(b.id)}>
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function MyBookingsPage() {
  return (
    <Suspense fallback={<div className="my-bookings-page" style={{ textAlign: "center", padding: "100px 20px", color: "var(--text-muted)" }}>Loading bookings...</div>}>
      <MyBookingsContent />
    </Suspense>
  );
}
