"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createCategory, updateCategory, deleteCategory } from "@/app/actions/admin";
import CategoryForm from "./CategoryForm";
import DynamicIcon from "../DynamicIcon";

export default function CategoryManager({ initialCategories }: { initialCategories: any[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async (formData: FormData) => {
    setLoading(true);
    setError("");
    const result = await createCategory(formData);
    if (result.success) {
      setIsAdding(false);
      setLoading(false);
      startTransition(() => {
        router.refresh();
      });
    } else {
      setError(result.error || "Failed to add category");
      setLoading(false);
    }
  };

  const handleUpdate = async (formData: FormData) => {
    if (editingId === null) return;
    setLoading(true);
    setError("");
    const result = await updateCategory(editingId, formData);
    if (result.success) {
      setEditingId(null);
      setLoading(false);
      startTransition(() => {
        router.refresh();
      });
    } else {
      setError(result.error || "Failed to update category");
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    setError("");
    const result = await deleteCategory(id);
    if (result.success) {
      startTransition(() => {
        router.refresh();
      });
    } else {
      setError(result.error || "Failed to delete category");
    }
  };

  return (
    <div>
      {error && <div className="auth-error" style={{ marginBottom: 24 }}>{error}</div>}

      {!isAdding && editingId === null && (
        <button onClick={() => setIsAdding(true)} className="btn-primary" style={{ marginBottom: 32, padding: "12px 24px" }}>
          + Add New Category
        </button>
      )}

      {isAdding && (
        <CategoryForm 
          onSubmit={handleAdd} 
          onCancel={() => setIsAdding(false)} 
          loading={loading} 
        />
      )}

      {editingId !== null && (
        <CategoryForm 
          initialData={initialCategories.find(c => c.id === editingId)} 
          onSubmit={handleUpdate} 
          onCancel={() => setEditingId(null)} 
          loading={loading} 
        />
      )}

      <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 24, border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
              <th style={{ padding: "16px 24px", color: "var(--text-faint)", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase" }}>Category</th>
              <th style={{ padding: "16px 24px", color: "var(--text-faint)", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase" }}>Events</th>
              <th style={{ padding: "16px 24px", color: "var(--text-faint)", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase" }}>Accent</th>
              <th style={{ padding: "16px 24px", color: "var(--text-faint)", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {initialCategories.map((cat) => (
              <tr key={cat.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <td style={{ padding: "16px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <DynamicIcon name={cat.icon} size={20} style={{ color: cat.accent }} />
                    <span style={{ fontWeight: 500 }}>{cat.name}</span>
                  </div>
                </td>
                <td style={{ padding: "16px 24px" }}>
                  <span style={{ color: "var(--text-muted)" }}>{cat._count.events} events</span>
                </td>
                <td style={{ padding: "16px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 16, height: 16, borderRadius: 4, background: cat.accent }} />
                    <code style={{ fontSize: "0.75rem", color: "var(--text-ghost)" }}>{cat.accent}</code>
                  </div>
                </td>
                <td style={{ padding: "16px 24px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setEditingId(cat.id)} className="btn-icon" title="Edit">✏️</button>
                    <button onClick={() => handleDelete(cat.id)} className="btn-icon" title="Delete" style={{ color: "#f43f5e" }}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
