import Link from "next/link";
import { CATEGORIES } from "@/app/lib/data";

export default function CategoriesPage() {
  return (
    <main className="categories-page">
      <div className="categories-header">
        <h1 className="hero-title" style={{ fontSize: "3.5rem", marginBottom: 16 }}>
          Explore <span className="hero-gradient-text">Categories</span>
        </h1>
        <p className="hero-subtitle" style={{ maxWidth: 600, margin: "0 auto" }}>
          From underground tech meetups to massive music festivals, find exactly what moves you.
        </p>
      </div>

      <div className="categories-grid">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.name}
            href={`/events?category=${encodeURIComponent(cat.name)}`}
            className="category-page-card"
            style={{ "--card-accent": cat.accent } as React.CSSProperties}
          >
            <div className="category-page-icon">{cat.icon}</div>
            <h3 className="category-page-title">{cat.name}</h3>
            <span className="category-page-count">{cat.count} Active Events</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
