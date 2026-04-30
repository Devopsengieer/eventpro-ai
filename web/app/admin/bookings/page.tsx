import { getAdminBookings } from "@/app/actions/admin";

export default async function AdminBookingsPage() {
  const bookings = await getAdminBookings();

  return (
    <div className="admin-bookings">
      <div style={{ marginBottom: 40 }}>
        <h1 className="section-title" style={{ marginBottom: 8 }}>System Bookings</h1>
        <p style={{ color: "var(--text-muted)" }}>View and monitor all event transactions and registrations.</p>
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
              <th style={{ padding: "20px 24px", color: "var(--text-faint)", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase" }}>Event</th>
              <th style={{ padding: "20px 24px", color: "var(--text-faint)", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase" }}>Tickets</th>
              <th style={{ padding: "20px 24px", color: "var(--text-faint)", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase" }}>Total</th>
              <th style={{ padding: "20px 24px", color: "var(--text-faint)", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase" }}>Status</th>
              <th style={{ padding: "20px 24px", color: "var(--text-faint)", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <td style={{ padding: "20px 24px" }}>
                  <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{b.user.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-faint)" }}>{b.user.email}</div>
                </td>
                <td style={{ padding: "20px 24px", color: "var(--text-primary)", fontSize: "0.95rem" }}>
                  {b.event.title}
                </td>
                <td style={{ padding: "20px 24px", color: "var(--text-secondary)" }}>
                  {b.ticketCount}
                </td>
                <td style={{ padding: "20px 24px", color: "var(--text-primary)", fontWeight: 700 }}>
                  ${b.totalAmount.toFixed(2)}
                </td>
                <td style={{ padding: "20px 24px" }}>
                  <span style={{ 
                    padding: "4px 10px", 
                    borderRadius: 6, 
                    fontSize: "0.7rem", 
                    fontWeight: 700, 
                    background: b.status === "CONFIRMED" ? "rgba(16,185,129,0.15)" : "rgba(244,63,94,0.15)",
                    color: b.status === "CONFIRMED" ? "#10b981" : "#f43f5e",
                    border: b.status === "CONFIRMED" ? "1px solid rgba(16,185,129,0.2)" : "1px solid rgba(244,63,94,0.2)"
                  }}>
                    {b.status}
                  </span>
                </td>
                <td style={{ padding: "20px 24px", color: "var(--text-faint)", fontSize: "0.85rem" }}>
                  {new Date(b.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
