"use client";

import { useState, useEffect, FormEvent, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getEventById } from "@/app/actions/event";
import { getCurrentUser } from "@/app/actions/auth";
import { createBooking } from "@/app/actions/booking";

function BookingContent() {
  const params = useParams();
  const eventId = Number(params.id);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [event, setEvent] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [step, setStep] = useState(1);
  const [ticketCount, setTicketCount] = useState(
    Number(searchParams.get("tickets")) || 1
  );
  
  // Form State
  const [attendeeName, setAttendeeName] = useState(user?.name || "");
  const [attendeeEmail, setAttendeeEmail] = useState(user?.email || "");
  const [attendeePhone, setAttendeePhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    Promise.all([
      getCurrentUser(),
      getEventById(eventId)
    ]).then(([userData, eventData]) => {
      setUser(userData);
      setEvent(eventData);
      setAuthLoading(false);
      
      if (!userData) {
        router.push(`/login?redirect=/booking/${eventId}`);
      } else {
        if (!attendeeName) setAttendeeName(userData.name);
        if (!attendeeEmail) setAttendeeEmail(userData.email);
      }
    });
  }, [eventId, router]);

  if (authLoading || !user) return null;

  if (!event) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px" }}>
        <h2>Event Not Found</h2>
        <Link href="/events" className="btn-primary" style={{ marginTop: 20 }}>
          Go Back
        </Link>
      </div>
    );
  }

  const totalPrice = event.price * ticketCount;
  const fees = totalPrice * 0.05; // 5% platform fee
  const grandTotal = totalPrice + fees;

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!attendeeName.trim()) e.name = "Name is required";
    if (!attendeeEmail.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(attendeeEmail))
      e.email = "Invalid email";
    if (!attendeePhone.trim()) e.phone = "Phone is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = () => {
    const e: Record<string, string> = {};
    if (!cardNumber.trim() || cardNumber.length < 15) e.card = "Invalid card number";
    if (!expiry.trim() || !/^\d{2}\/\d{2}$/.test(expiry)) e.expiry = "Invalid expiry (MM/YY)";
    if (!cvv.trim() || cvv.length < 3) e.cvv = "Invalid CVV";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 2 && !validateStep2()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    setStep(step + 1);
  };

  const handleComplete = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;
    
    setLoading(true);
    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 1500));
    
    const res = await createBooking(event.id, ticketCount, grandTotal);
    
    setLoading(false);
    if (res.error) {
      setErrors({ card: res.error });
    } else {
      router.push(`/my-bookings?new=true`);
    }
  };

  return (
    <div className="booking-page">
      {/* ─── Stepper ─── */}
      <div className="booking-stepper">
        <div className={`booking-step ${step >= 1 ? "active" : ""} ${step > 1 ? "completed" : ""}`}>
          <div className="booking-step-number">{step > 1 ? "✓" : "1"}</div>
          <div className="booking-step-label">Review</div>
        </div>
        <div className={`booking-step-connector ${step > 1 ? "completed" : ""}`} />
        <div className={`booking-step ${step >= 2 ? "active" : ""} ${step > 2 ? "completed" : ""}`}>
          <div className="booking-step-number">{step > 2 ? "✓" : "2"}</div>
          <div className="booking-step-label">Details</div>
        </div>
        <div className={`booking-step-connector ${step > 2 ? "completed" : ""}`} />
        <div className={`booking-step ${step >= 3 ? "active" : ""}`}>
          <div className="booking-step-number">3</div>
          <div className="booking-step-label">Payment</div>
        </div>
      </div>

      <div className="booking-layout">
        {/* ─── Main Content ─── */}
        <div className="booking-main">
          
          {/* STEP 1: Review */}
          {step === 1 && (
            <div className="booking-section fade-in">
              <h2 className="booking-section-title">Review your selection</h2>
              
              <div className="booking-event-summary">
                <img src={event.image} alt={event.title} className="booking-event-thumb" />
                <div className="booking-event-info">
                  <div className="ep-category-label" style={{ marginBottom: 4 }}>{event.category}</div>
                  <h3>{event.title}</h3>
                  <p>📅 {event.date} · {event.time}</p>
                  <p>📍 {event.location}</p>
                </div>
              </div>

              <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <label className="auth-label" style={{ marginBottom: 12, display: "block" }}>Select Tickets</label>
                <div style={{ display: "flex", alignItems: "center", gap: 16, maxWidth: 200, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "8px 16px" }}>
                  <button onClick={() => setTicketCount((c) => Math.max(1, c - 1))} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "var(--text-secondary)", fontSize: "1.1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                  <span style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--text-primary)", flex: 1, textAlign: "center" }}>{ticketCount}</span>
                  <button onClick={() => setTicketCount((c) => Math.min(10, c + 1))} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "var(--text-secondary)", fontSize: "1.1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                </div>
              </div>

              <div className="booking-btn-row">
                <Link href={`/events/${event.id}`} className="btn-outline">Cancel</Link>
                <button onClick={handleNext} className="btn-primary">Continue</button>
              </div>
            </div>
          )}

          {/* STEP 2: Details */}
          {step === 2 && (
            <div className="booking-section fade-in">
              <h2 className="booking-section-title">Attendee Details</h2>
              <div className="auth-form">
                <div className="auth-field">
                  <label className="auth-label">Full Name</label>
                  <input className="auth-input" type="text" value={attendeeName} onChange={(e) => setAttendeeName(e.target.value)} placeholder="John Doe" />
                  {errors.name && <span className="auth-error">{errors.name}</span>}
                </div>
                <div className="auth-field">
                  <label className="auth-label">Email Address</label>
                  <input className="auth-input" type="email" value={attendeeEmail} onChange={(e) => setAttendeeEmail(e.target.value)} placeholder="john@example.com" />
                  {errors.email && <span className="auth-error">{errors.email}</span>}
                </div>
                <div className="auth-field">
                  <label className="auth-label">Phone Number</label>
                  <input className="auth-input" type="tel" value={attendeePhone} onChange={(e) => setAttendeePhone(e.target.value)} placeholder="+1 (555) 000-0000" />
                  {errors.phone && <span className="auth-error">{errors.phone}</span>}
                </div>
              </div>

              <div className="booking-btn-row">
                <button onClick={() => setStep(1)} className="btn-outline">Back</button>
                <button onClick={handleNext} className="btn-primary">Continue</button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment */}
          {step === 3 && (
            <div className="booking-section fade-in">
              <h2 className="booking-section-title">Payment Method</h2>
              
              <div style={{ padding: 16, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 12, marginBottom: 24, fontSize: "0.85rem", color: "var(--accent-lighter)", display: "flex", gap: 12 }}>
                <span>ℹ️</span>
                <span>This is a demo. No real payment processing will occur. You can enter dummy data.</span>
              </div>

              <form className="auth-form" onSubmit={handleComplete}>
                <div className="auth-field">
                  <label className="auth-label">Card Number</label>
                  <input className="auth-input" type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim())} placeholder="0000 0000 0000 0000" maxLength={19} />
                  {errors.card && <span className="auth-error">{errors.card}</span>}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <div className="auth-field">
                    <label className="auth-label">Expiry Date</label>
                    <input className="auth-input" type="text" value={expiry} onChange={(e) => setExpiry(e.target.value.replace(/[^0-9/]/g, '').replace(/^(\d{2})(\d)/, '$1/$2').slice(0,5))} placeholder="MM/YY" />
                    {errors.expiry && <span className="auth-error">{errors.expiry}</span>}
                  </div>
                  <div className="auth-field">
                    <label className="auth-label">CVV</label>
                    <input className="auth-input" type="text" value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0,4))} placeholder="123" />
                    {errors.cvv && <span className="auth-error">{errors.cvv}</span>}
                  </div>
                </div>

                <div className="booking-btn-row">
                  <button type="button" onClick={() => setStep(2)} className="btn-outline" disabled={loading}>Back</button>
                  <button type="submit" className={`btn-primary auth-submit ${loading ? "auth-submit-loading" : ""}`} style={{ marginTop: 0 }} disabled={loading}>
                    {loading && <span className="auth-spinner" />}
                    {loading ? "Processing..." : `Pay $${grandTotal.toFixed(2)}`}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

        {/* ─── Sidebar Order Summary ─── */}
        <div className="booking-sidebar">
          <h3 className="booking-sidebar-title">Order Summary</h3>
          <div className="booking-price-row">
            <span className="booking-price-label">{ticketCount}x Ticket{ticketCount > 1 ? 's' : ''}</span>
            <span className="booking-price-value">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="booking-price-row">
            <span className="booking-price-label">Platform Fee (5%)</span>
            <span className="booking-price-value">${fees.toFixed(2)}</span>
          </div>
          <div className="booking-price-total">
            <span className="booking-price-total-label">Total</span>
            <span className="booking-price-total-value">${grandTotal.toFixed(2)}</span>
          </div>

          {step < 3 && (
            <div style={{ marginTop: 24, fontSize: "0.75rem", color: "var(--text-faint)", textAlign: "center", display: "flex", flexDirection: "column", gap: 6 }}>
              <span>🔒 Secure checkout</span>
              <span>⚡ Instant confirmation</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="booking-page" style={{ textAlign: "center", padding: "100px 20px", color: "var(--text-muted)" }}>Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}
