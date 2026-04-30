import Link from "next/link";
import { CATEGORIES } from "@/app/lib/data";
import { prisma } from "@/app/lib/db";

export default async function CategoriesPage() {
  // Fetch real counts from the database
  const counts = await prisma.event.groupBy({
    by: ["category"],
    _count: { id: true },
  });
  const countMap: Record<string, number> = {};
  counts.forEach((c) => { countMap[c.category] = c._count.id; });

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
            <span className="category-page-count">{countMap[cat.name] || 0} Active Events</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
