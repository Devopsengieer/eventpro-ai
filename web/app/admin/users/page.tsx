import { getAdminUsers } from "@/app/actions/admin";

export default async function AdminUsersPage() {
  const users = await getAdminUsers();

  return (
    <div className="admin-users">
      <div style={{ marginBottom: 40 }}>
        <h1 className="section-title" style={{ marginBottom: 8 }}>User Directory</h1>
        <p style={{ color: "var(--text-muted)" }}>View and manage registered users and their permissions.</p>
      </div>

      <div style={{ 
        background: "rgba(255,255,255,0.03)", 
        border: "1px solid rgba(255,255,255,0.06)", 
        borderRadius: 24, 
        overflow: "hidden" 
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <th style={{ padding: "20px 24px", color: "var(--text-faint)", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase" }}>User</th>
              <th style={{ padding: "20px 24px", color: "var(--text-faint)", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase" }}>Role</th>
              <th style={{ padding: "20px 24px", color: "var(--text-faint)", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase" }}>Bookings</th>
              <th style={{ padding: "20px 24px", color: "var(--text-faint)", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase" }}>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <td style={{ padding: "20px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ 
                      width: 36, 
                      height: 36, 
                      borderRadius: 10, 
                      background: "rgba(99,102,241,0.1)", 
                      color: "var(--accent-lighter)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.8rem"
                    }}>
                      {u.name?.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{u.name}</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-faint)" }}>{u.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "20px 24px" }}>
                  <span style={{ 
                    padding: "4px 10px", 
                    borderRadius: 6, 
                    fontSize: "0.7rem", 
                    fontWeight: 700, 
                    background: u.role === "ADMIN" ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.05)",
                    color: u.role === "ADMIN" ? "#fbbf24" : "var(--text-secondary)",
                    border: u.role === "ADMIN" ? "1px solid rgba(245,158,11,0.2)" : "1px solid rgba(255,255,255,0.1)"
                  }}>
                    {u.role}
                  </span>
                </td>
                <td style={{ padding: "20px 24px", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                  {u._count.bookings} orders
                </td>
                <td style={{ padding: "20px 24px", color: "var(--text-faint)", fontSize: "0.85rem" }}>
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
