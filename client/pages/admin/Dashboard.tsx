import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { isAdminAuthed } from "@/lib/admin";
import { useEffect } from "react";

export default function Dashboard() {
  const nav = useNavigate();
  useEffect(() => {
    if (!isAdminAuthed()) nav("/admin/login", { replace: true });
  }, [nav]);
  return (
    <AdminLayout>
      <h1 className="text-2xl font-extrabold">Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/admin/projects"
          className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition"
        >
          <h2 className="font-semibold">Manage Projects</h2>
          <p className="text-sm text-neutral-600">
            Add, edit, or delete projects.
          </p>
        </Link>
        <Link
          to="/admin/drawings"
          className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition"
        >
          <h2 className="font-semibold">Manage Drawings</h2>
          <p className="text-sm text-neutral-600">
            Add, edit, or delete drawings.
          </p>
        </Link>
      </div>
    </AdminLayout>
  );
}
