import { getAdminBookings, adminCancelBooking } from "@/app/actions/admin";

export default async function AdminBookingsPage() {
  const bookings = await getAdminBookings();

  return (
    <div className="admin-bookings">
      <div style={{ marginBottom: 40 }}>
        <h1 className="section-title" style={{ marginBottom: 8 }}>System Bookings</h1>
        <p style={{ color: "var(--text-muted)" }}>View and manage all event transactions and registrations.</p>
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
              <th style={{ padding: "20px 24px", color: "var(--text-faint)", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase" }}>Booked On</th>
              <th style={{ padding: "20px 24px", color: "var(--text-faint)", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase" }}>Actions</th>
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
                  <div>
                    <span style={{ 
                      padding: "4px 10px", borderRadius: 6, fontSize: "0.7rem", fontWeight: 700, 
                      background: b.status === "CONFIRMED" ? "rgba(16,185,129,0.15)" : "rgba(244,63,94,0.15)",
                      color: b.status === "CONFIRMED" ? "#10b981" : "#f43f5e",
                      border: b.status === "CONFIRMED" ? "1px solid rgba(16,185,129,0.2)" : "1px solid rgba(244,63,94,0.2)"
                    }}>
                      {b.status}
                    </span>
                    {b.cancelledAt && (
                      <div style={{ fontSize: "0.72rem", color: "var(--text-faint)", marginTop: 6 }}>
                        Cancelled: {new Date(b.cancelledAt).toLocaleString()}
                      </div>
                    )}
                  </div>
                </td>
                <td style={{ padding: "20px 24px", color: "var(--text-faint)", fontSize: "0.85rem" }}>
                  {new Date(b.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: "20px 24px" }}>
                  {b.status === "CONFIRMED" ? (
                    <form action={async () => {
                      "use server";
                      await adminCancelBooking(b.id);
                    }}>
                      <button type="submit" style={{ 
                        background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.2)", 
                        color: "#f43f5e", cursor: "pointer", fontSize: "0.78rem", padding: "6px 14px",
                        borderRadius: 8, fontFamily: "inherit", fontWeight: 600
                      }}>
                        Cancel Order
                      </button>
                    </form>
                  ) : (
                    <span style={{ fontSize: "0.8rem", color: "var(--text-ghost)" }}>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
