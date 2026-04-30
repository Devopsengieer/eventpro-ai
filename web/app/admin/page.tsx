import { getAdminStats } from "@/app/actions/admin";

export default async function AdminDashboard() {
  const stats = await getAdminStats();

  return (
    <div className="admin-dashboard">
      <div style={{ marginBottom: 40 }}>
        <h1 className="section-title" style={{ marginBottom: 8 }}>Dashboard Overview</h1>
        <p style={{ color: "var(--text-muted)" }}>Welcome to the EventPro AI management console.</p>
      </div>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", 
        gap: 24 
      }}>
        <StatCard label="Total Revenue" value={`$${stats.revenue.toLocaleString()}`} icon="💰" color="#10b981" />
        <StatCard label="Total Bookings" value={stats.bookings.toString()} icon="🎟️" color="#6366f1" />
        <StatCard label="Active Events" value={stats.events.toString()} icon="📅" color="#f59e0b" />
        <StatCard label="Registered Users" value={stats.users.toString()} icon="👥" color="#ec4899" />
      </div>

      <div style={{ marginTop: 60, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        <div style={{ 
          padding: 32, 
          borderRadius: 24, 
          background: "rgba(255,255,255,0.03)", 
          border: "1px solid rgba(255,255,255,0.06)" 
        }}>
          <h3 style={{ fontSize: "1.2rem", marginBottom: 20 }}>System Activity</h3>
          <div style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Activity tracking will be implemented in the next phase.
          </div>
        </div>
        
        <div style={{ 
          padding: 32, 
          borderRadius: 24, 
          background: "rgba(255,255,255,0.03)", 
          border: "1px solid rgba(255,255,255,0.06)" 
        }}>
          <h3 style={{ fontSize: "1.2rem", marginBottom: 20 }}>Quick Actions</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <button className="btn-primary" style={{ fontSize: "0.85rem", padding: "10px 16px" }}>+ New Event</button>
            <button className="btn-outline" style={{ fontSize: "0.85rem", padding: "10px 16px" }}>Export Data</button>
            <button className="btn-outline" style={{ fontSize: "0.85rem", padding: "10px 16px" }}>System Logs</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }: { label: string, value: string, icon: string, color: string }) {
  return (
    <div style={{ 
      padding: 30, 
      borderRadius: 24, 
      background: "rgba(255,255,255,0.03)", 
      border: "1px solid rgba(255,255,255,0.06)",
      transition: "transform 0.2s ease",
      cursor: "default"
    }}>
      <div style={{ 
        width: 48, 
        height: 48, 
        borderRadius: 14, 
        background: `${color}20`, 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        fontSize: "1.5rem",
        marginBottom: 20
      }}>
        {icon}
      </div>
      <div style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--text-primary)" }}>{value}</div>
    </div>
  );
}
