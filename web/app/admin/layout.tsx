import { getCurrentUser } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="admin-layout" style={{ display: "flex", minHeight: "calc(100vh - 80px)", background: "var(--bg-primary)" }}>
      {/* Admin Sidebar */}
      <aside className="admin-sidebar" style={{ 
        width: "280px", 
        borderRight: "1px solid rgba(255,255,255,0.06)", 
        padding: "40px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 30,
        background: "rgba(255,255,255,0.02)"
      }}>
        <div>
          <h2 style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-faint)", marginBottom: 20, paddingLeft: 12 }}>
            Admin Control
          </h2>
          <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <AdminNavLink href="/admin" icon="📊" label="Dashboard" />
            <AdminNavLink href="/admin/categories" icon="🏷️" label="Categories" />
            <AdminNavLink href="/admin/events" icon="📅" label="Manage Events" />
            <AdminNavLink href="/admin/users" icon="👥" label="User Directory" />
            <AdminNavLink href="/admin/bookings" icon="🎟️" label="All Bookings" />
          </nav>
        </div>

        <div style={{ marginTop: "auto", padding: "20px", borderRadius: 16, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.1)" }}>
          <div style={{ fontSize: "0.85rem", color: "var(--accent-lighter)", fontWeight: 600 }}>Admin Session</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>Logged in as {user.name}</div>
        </div>
      </aside>

      {/* Admin Content */}
      <main style={{ flex: 1, padding: "40px", overflowY: "auto", scrollBehavior: "smooth" }}>
        {children}
      </main>

      <style>{`
        .admin-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.95rem;
          transition: all 0.2s ease;
        }
        .admin-nav-link:hover {
          background: rgba(255,255,255,0.05);
          color: var(--text-primary);
        }
        .admin-nav-link.active {
          background: var(--accent-gradient);
          color: white;
          box-shadow: 0 4px 15px rgba(99,102,241,0.3);
        }
      `}</style>
    </div>
  );
}

function AdminNavLink({ href, icon, label }: { href: string, icon: string, label: string }) {
  return (
    <Link href={href} className="admin-nav-link">
      <span style={{ fontSize: "1.1rem" }}>{icon}</span>
      {label}
    </Link>
  );
}
