"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import {
  EVENTS,
  FILTER_CATEGORIES,
  SORT_OPTIONS,
  CATEGORY_ICONS,
} from "@/app/lib/data";
import EventCard from "@/app/components/EventCard";

function EventsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [sortBy, setSortBy] = useState("Relevance");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    import("@/app/actions/event").then((m) => {
      m.getAllEvents().then((data) => {
        setEvents(data);
        setLoading(false);
      });
    });
  }, []);

  // Sync URL params on initial load
  useEffect(() => {
    const q = searchParams.get("q");
    const cat = searchParams.get("category");
    if (q) setQuery(q);
    if (cat && FILTER_CATEGORIES.includes(cat)) setActiveCategory(cat);
  }, [searchParams]);

  // Update URL when filters change
  const updateUrl = (newQuery: string, newCategory: string) => {
    const params = new URLSearchParams();
    if (newQuery) params.set("q", newQuery);
    if (newCategory !== "All") params.set("category", newCategory);
    const qs = params.toString();
    router.replace(`/events${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    updateUrl(val, activeCategory);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    updateUrl(query, cat);
  };

  const toggleSave = (id: number) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let list = events.filter((e) => {
      const matchQuery =
        !query ||
        e.title.toLowerCase().includes(query.toLowerCase()) ||
        e.location.toLowerCase().includes(query.toLowerCase()) ||
        e.category.toLowerCase().includes(query.toLowerCase());
      const matchCat =
        activeCategory === "All" || e.category === activeCategory;
      const matchPrice = e.price <= maxPrice;
      return matchQuery && matchCat && matchPrice;
    });
    if (sortBy === "Date: Soonest")
      list = [...list].sort((a, b) => a.date.localeCompare(b.date));
    else if (sortBy === "Price: Low to High")
      list = [...list].sort((a, b) => a.price - b.price);
    else if (sortBy === "Price: High to Low")
      list = [...list].sort((a, b) => b.price - a.price);
    else if (sortBy === "Most Popular")
      list = [...list].sort((a, b) => b.attendees - a.attendees);
    return list;
  }, [query, activeCategory, sortBy, maxPrice]);

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
        {/* PAGE HEADING */}
        <div style={{ marginBottom: 6 }}>
          <span className="section-label">✦ Explore</span>
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
            All Events
          </h1>
          <span
            className="badge"
            style={{
              background: "rgba(99,102,241,.15)",
              border: "1px solid rgba(99,102,241,.25)",
              color: "var(--accent-lighter)",
              fontSize: ".78rem",
              padding: "3px 12px",
            }}
          >
            {filtered.length} results
          </span>
        </div>

        {loading ? (
          <div style={{ padding: "100px 0", textAlign: "center", color: "var(--text-muted)" }}>Loading events from database...</div>
        ) : (
          <>
            {/* SEARCH + CONTROLS */}
            <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            marginBottom: 20,
          }}
        >
          <div className="search-wrap" style={{ flex: 1, minWidth: 220 }}>
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="#3d405a"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              className="search-input"
              placeholder="Search events, artists, venues…"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              style={{ padding: "13px 0" }}
            />
            {query && (
              <button
                onClick={() => handleQueryChange("")}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-faint)",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  lineHeight: 1,
                  padding: 0,
                }}
              >
                ×
              </button>
            )}
          </div>

          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>

          {/* View toggle */}
          <div
            style={{
              display: "flex",
              gap: 4,
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.07)",
              borderRadius: 10,
              padding: 3,
            }}
          >
            <button
              className={`btn-icon${viewMode === "grid" ? " active" : ""}`}
              onClick={() => setViewMode("grid")}
              style={{ border: "none" }}
            >
              <svg
                width="14"
                height="14"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <rect x="0" y="0" width="6" height="6" rx="1.5" />
                <rect x="10" y="0" width="6" height="6" rx="1.5" />
                <rect x="0" y="10" width="6" height="6" rx="1.5" />
                <rect x="10" y="10" width="6" height="6" rx="1.5" />
              </svg>
            </button>
            <button
              className={`btn-icon${viewMode === "list" ? " active" : ""}`}
              onClick={() => setViewMode("list")}
              style={{ border: "none" }}
            >
              <svg
                width="14"
                height="14"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <rect x="0" y="1" width="16" height="3" rx="1.5" />
                <rect x="0" y="6.5" width="16" height="3" rx="1.5" />
                <rect x="0" y="12" width="16" height="3" rx="1.5" />
              </svg>
            </button>
          </div>

          <button
            className={`btn-icon${filtersOpen ? " active" : ""}`}
            onClick={() => setFiltersOpen((o) => !o)}
            style={{
              width: "auto",
              padding: "0 14px",
              gap: 7,
              fontSize: ".82rem",
              fontWeight: 500,
            }}
          >
            <svg
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="16" y2="12" />
              <line x1="11" y1="18" x2="13" y2="18" />
            </svg>
            Filters
          </button>
        </div>

        {/* FILTER PANEL */}
        {filtersOpen && (
          <div className="filter-panel fade-in" style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p
                  style={{
                    fontSize: ".75rem",
                    fontWeight: 600,
                    color: "var(--text-faint)",
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  Max Price
                </p>
                <input
                  type="range"
                  min={0}
                  max={1000}
                  step={25}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 10,
                  }}
                >
                  <span
                    style={{ fontSize: ".78rem", color: "var(--text-ghost)" }}
                  >
                    $0
                  </span>
                  <span
                    style={{
                      fontSize: ".8rem",
                      color: "var(--accent-lighter)",
                      fontWeight: 600,
                    }}
                  >
                    {maxPrice >= 1000 ? "Any price" : `≤ $${maxPrice}`}
                  </span>
                </div>
              </div>
              <div>
                <p
                  style={{
                    fontSize: ".75rem",
                    fontWeight: 600,
                    color: "var(--text-faint)",
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  Format
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["In-Person", "Online", "Hybrid"].map((f) => (
                    <button
                      key={f}
                      className="cat-chip"
                      style={{ fontSize: ".78rem" }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p
                  style={{
                    fontSize: ".75rem",
                    fontWeight: 600,
                    color: "var(--text-faint)",
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  Date
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["This Week", "This Month", "Next 3 Months"].map((d) => (
                    <button
                      key={d}
                      className="cat-chip"
                      style={{ fontSize: ".78rem" }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <hr
              style={{
                border: "none",
                borderTop: "1px solid rgba(255,255,255,.06)",
                margin: "20px 0",
              }}
            />
            <div
              style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}
            >
              <button
                onClick={() => setMaxPrice(1000)}
                className="btn-outline"
                style={{
                  padding: "8px 16px",
                  fontSize: ".82rem",
                  borderRadius: 8,
                }}
              >
                Reset
              </button>
              <button
                className="btn-primary"
                style={{ padding: "8px 18px" }}
                onClick={() => setFiltersOpen(false)}
              >
                Apply
              </button>
            </div>
          </div>
        )}

        {/* CATEGORY CHIPS */}
        <div
          style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            paddingBottom: 4,
            marginBottom: 32,
            scrollbarWidth: "none",
          }}
        >
          {FILTER_CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`cat-chip${activeCategory === cat ? " active" : ""}`}
              onClick={() => handleCategoryChange(cat)}
            >
              <span>{CATEGORY_ICONS[cat]}</span>
              {cat}
            </button>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filtered.length === 0 ? (
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
            <div style={{ fontSize: "3rem" }}>🔍</div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.6rem",
                color: "var(--text-primary)",
              }}
            >
              No events found
            </h2>
            <p style={{ color: "var(--text-faint)", fontSize: ".9rem" }}>
              Try adjusting your search or filters.
            </p>
            <button
              className="btn-primary"
              onClick={() => {
                handleQueryChange("");
                handleCategoryChange("All");
                setMaxPrice(1000);
              }}
            >
              Clear all filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          /* GRID VIEW */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
              gap: 24,
              paddingBottom: 80,
            }}
          >
            {filtered.map((event, i) => (
              <EventCard
                key={event.id}
                event={event}
                index={i}
                view="grid"
                saved={savedIds.has(event.id)}
                onToggleSave={toggleSave}
              />
            ))}
          </div>
        ) : (
          /* LIST VIEW */
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              paddingBottom: 80,
            }}
          >
            {filtered.map((event, i) => (
              <EventCard
                key={event.id}
                event={event}
                index={i}
                view="list"
                saved={savedIds.has(event.id)}
                onToggleSave={toggleSave}
              />
            ))}
          </div>
        )}
          </>
        )}
      </div>
    </main>
  );
}

export default function EventsPage() {
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
          Loading events...
        </div>
      }
    >
      <EventsContent />
    </Suspense>
  );
}
