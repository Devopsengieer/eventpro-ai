"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/app/actions/auth";
import { getWishlistItems, toggleWishlistItem } from "@/app/actions/wishlist";
import EventCard from "@/app/components/EventCard";

function WishlistContent() {
  const router = useRouter();
  
  const [user, setUser] = useState<any>(null);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    Promise.all([
      getCurrentUser(),
      getWishlistItems()
    ]).then(([userData, items]) => {
      if (!userData) {
        router.push("/login?redirect=/wishlist");
        return;
      }
      setUser(userData);
      setWishlistItems(items);
      setSavedIds(new Set(items.map((i: any) => i.eventId)));
      setLoading(false);
    });
  }, [router]);

  const toggleSave = (id: number) => {
    // optimistic update
    setSavedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    // Remove from UI immediately for better UX on wishlist page
    setWishlistItems((prev) => prev.filter((item) => item.eventId !== id));
    
    import("@/app/actions/wishlist").then((m) => {
      m.toggleWishlistItem(id);
    });
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
        Loading saved events...
      </div>
    );
  }

  return (
    <main
      style={{
        fontFamily: "var(--font-sans)",
        background: "var(--bg-primary)",
        color: "var(--text-secondary)",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          padding: "48px max(20px,4vw) 0",
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: 6 }}>
          <span className="section-label">✦ Your Favorites</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem,5vw,3rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              lineHeight: 1.1,
              letterSpacing: "-.02em",
            }}
          >
            My Saved Events
          </h1>
          <span
            className="badge"
            style={{
              background: "rgba(244,63,94,.15)",
              border: "1px solid rgba(244,63,94,.25)",
              color: "#f43f5e",
              fontSize: ".78rem",
              padding: "3px 12px",
            }}
          >
            {wishlistItems.length} saved
          </span>
        </div>

        {wishlistItems.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div style={{ fontSize: "3rem" }}>❤️</div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.6rem",
                color: "var(--text-primary)",
              }}
            >
              No saved events
            </h2>
            <p style={{ color: "var(--text-faint)", fontSize: ".9rem", maxWidth: 400 }}>
              You haven't saved any events yet. Explore upcoming events and tap the heart icon to save them here.
            </p>
            <Link href="/events" className="btn-primary" style={{ marginTop: 8 }}>
              Browse Events
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
              gap: 24,
              paddingBottom: 80,
            }}
          >
            {wishlistItems.map((item, i) => (
              <EventCard
                key={item.id}
                event={item.event}
                index={i}
                view="grid"
                saved={savedIds.has(item.eventId)}
                onToggleSave={toggleSave}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function WishlistPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            background: "var(--bg-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-muted)",
          }}
        >
          Loading saved events...
        </div>
      }
    >
      <WishlistContent />
    </Suspense>
  );
}
