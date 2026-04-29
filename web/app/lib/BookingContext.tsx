"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Booking {
  id: string;
  eventId: number;
  eventTitle: string;
  eventImage: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventCategory: string;
  tickets: number;
  totalPrice: number;
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone: string;
  bookedAt: string;
  status: "confirmed" | "cancelled" | "past";
}

interface BookingContextValue {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, "id" | "bookedAt" | "status">) => Booking;
  cancelBooking: (id: string) => void;
  getBookingsByStatus: (
    status: "all" | "confirmed" | "cancelled" | "past"
  ) => Booking[];
}

// ─── Context ─────────────────────────────────────────────────────────────────

const BookingContext = createContext<BookingContextValue | null>(null);

const STORAGE_KEY = "ep_bookings";

// ─── Provider ────────────────────────────────────────────────────────────────

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setBookings(JSON.parse(stored));
    } catch {
      /* empty */
    }
  }, []);

  const persist = (next: Booking[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setBookings(next);
  };

  const addBooking = useCallback(
    (data: Omit<Booking, "id" | "bookedAt" | "status">): Booking => {
      const newBooking: Booking = {
        ...data,
        id: `BK-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        bookedAt: new Date().toISOString(),
        status: "confirmed",
      };
      const next = [newBooking, ...bookings];
      persist(next);
      return newBooking;
    },
    [bookings]
  );

  const cancelBooking = useCallback(
    (id: string) => {
      const next = bookings.map((b) =>
        b.id === id ? { ...b, status: "cancelled" as const } : b
      );
      persist(next);
    },
    [bookings]
  );

  const getBookingsByStatus = useCallback(
    (status: "all" | "confirmed" | "cancelled" | "past") => {
      if (status === "all") return bookings;
      return bookings.filter((b) => b.status === status);
    },
    [bookings]
  );

  return (
    <BookingContext.Provider
      value={{ bookings, addBooking, cancelBooking, getBookingsByStatus }}
    >
      {children}
    </BookingContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useBookings() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBookings must be used within BookingProvider");
  return ctx;
}
