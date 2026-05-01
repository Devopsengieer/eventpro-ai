import { getAdminCategories } from "@/app/actions/admin";
import AdminPagination from "@/app/components/admin/AdminPagination";
import CategoryManager from "@/app/components/admin/CategoryManager";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ page?: string }> 
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);
  const { categories, total, totalPages, pageSize } = await getAdminCategories(page);

  return (
    <div className="admin-categories">
      <div style={{ marginBottom: 40 }}>
        <h1 className="section-title" style={{ marginBottom: 8 }}>Event Categories</h1>
        <p style={{ color: "var(--text-muted)" }}>Manage dynamic categories for event creation</p>
      </div>

      <CategoryManager initialCategories={categories} />

      <div style={{ marginTop: 32 }}>
        <AdminPagination page={page} totalPages={totalPages} total={total} pageSize={pageSize} />
      </div>
    </div>
  );
}
