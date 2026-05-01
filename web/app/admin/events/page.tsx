import { getAdminEvents, deleteEvent } from "@/app/actions/admin";
import Link from "next/link";
import AdminPagination from "@/app/components/admin/AdminPagination";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function AdminEventsPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);
  const { events, total, totalPages, pageSize } = await getAdminEvents(page, 10);

  return (
    <div className="admin-events">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
        <div>
          <h1 className="section-title" style={{ marginBottom: 8 }}>Manage Events</h1>
          <p style={{ color: "var(--text-muted)" }}>
            Create, update, or remove events from the platform.
            <span style={{ marginLeft: 8, fontSize: "0.85rem", color: "var(--text-faint)" }}>
              ({total} total)
            </span>
          </p>
        </div>
        <Link href="/admin/events/new" className="btn-primary" style={{ textDecoration: "none" }}>
          + Create New Event
        </Link>
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
              <th style={{ padding: "20px 24px", color: "var(--text-faint)", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase" }}>Event</th>
              <th style={{ padding: "20px 24px", color: "var(--text-faint)", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase" }}>Category</th>
              <th style={{ padding: "20px 24px", color: "var(--text-faint)", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase" }}>Date</th>
              <th style={{ padding: "20px 24px", color: "var(--text-faint)", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase" }}>Price</th>
              <th style={{ padding: "20px 24px", color: "var(--text-faint)", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase" }}>Attendees</th>
              <th style={{ padding: "20px 24px", color: "var(--text-faint)", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: "48px 24px", textAlign: "center", color: "var(--text-faint)" }}>
                  No events found.
                </td>
              </tr>
            ) : events.map((event) => (
              <tr key={event.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <td style={{ padding: "20px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <img src={event.image} alt="" style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover" }} />
                    <span style={{ fontWeight: 600 }}>{event.title}</span>
                  </div>
                </td>
                <td style={{ padding: "20px 24px" }}>
                  <span className="ep-category-label" style={{ fontSize: "0.75rem" }}>{event.category}</span>
                </td>
                <td style={{ padding: "20px 24px", color: "var(--text-secondary)", fontSize: "0.9rem" }}>{event.date}</td>
                <td style={{ padding: "20px 24px", color: "var(--text-primary)", fontWeight: 600 }}>${event.price}</td>
                <td style={{ padding: "20px 24px" }}>
                  <div style={{ fontSize: "0.9rem" }}>{event.attendees} registered</div>
                </td>
                <td style={{ padding: "20px 24px" }}>
                  <div style={{ display: "flex", gap: 12 }}>
                    <Link href={`/admin/events/${event.id}/edit`} style={{ color: "var(--accent-lighter)", textDecoration: "none", fontSize: "0.9rem" }}>Edit</Link>
                    <form action={async () => {
                      "use server";
                      await deleteEvent(event.id);
                    }}>
                      <button type="submit" style={{ background: "none", border: "none", color: "#f43f5e", cursor: "pointer", fontSize: "0.9rem", padding: 0 }}>Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <AdminPagination page={page} totalPages={totalPages} total={total} pageSize={pageSize} />
      </div>
    </div>
  );
}
