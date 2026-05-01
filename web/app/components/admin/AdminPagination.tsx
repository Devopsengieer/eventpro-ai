"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface AdminPaginationProps {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
}

export default function AdminPagination({ page, totalPages, total, pageSize = 10 }: AdminPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const goTo = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  // Build visible page numbers with ellipsis logic
  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("...");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pages.push(i);
    }
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 24px",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      flexWrap: "wrap",
      gap: 16,
    }}>
      <span style={{ fontSize: "0.85rem", color: "var(--text-faint)" }}>
        Showing <strong style={{ color: "var(--text-secondary)" }}>{from}–{to}</strong> of{" "}
        <strong style={{ color: "var(--text-secondary)" }}>{total}</strong> results
      </span>

      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {/* Prev */}
        <button
          onClick={() => goTo(page - 1)}
          disabled={page === 1}
          style={{
            padding: "8px 14px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.08)",
            background: page === 1 ? "transparent" : "rgba(255,255,255,0.04)",
            color: page === 1 ? "var(--text-ghost)" : "var(--text-secondary)",
            cursor: page === 1 ? "not-allowed" : "pointer",
            fontSize: "0.85rem",
            fontFamily: "inherit",
            transition: "all 0.15s ease",
          }}
        >
          ← Prev
        </button>

        {/* Page numbers */}
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} style={{ padding: "0 4px", color: "var(--text-faint)", fontSize: "0.85rem" }}>
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => goTo(p as number)}
              style={{
                minWidth: 36,
                height: 36,
                borderRadius: 10,
                border: p === page ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.08)",
                background:
                  p === page
                    ? "var(--gradient-primary)"
                    : "rgba(255,255,255,0.03)",
                color: p === page ? "white" : "var(--text-secondary)",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontFamily: "inherit",
                fontWeight: p === page ? 700 : 400,
                boxShadow: p === page ? "0 4px 12px rgba(99,102,241,0.3)" : "none",
                transition: "all 0.15s ease",
              }}
            >
              {p}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => goTo(page + 1)}
          disabled={page === totalPages}
          style={{
            padding: "8px 14px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.08)",
            background: page === totalPages ? "transparent" : "rgba(255,255,255,0.04)",
            color: page === totalPages ? "var(--text-ghost)" : "var(--text-secondary)",
            cursor: page === totalPages ? "not-allowed" : "pointer",
            fontSize: "0.85rem",
            fontFamily: "inherit",
            transition: "all 0.15s ease",
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
