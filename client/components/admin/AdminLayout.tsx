import { ReactNode, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { isAdminAuthed, logoutAdmin } from "@/lib/admin";
import Logo from "@/components/Logo";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const nav = useNavigate();
  useEffect(() => {
    if (!isAdminAuthed()) nav("/admin/login", { replace: true });
  }, [nav]);
  return (
    <div className="min-h-screen bg-neutral-100">
      <header className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <Logo className="h-8 w-auto" />
            <span className="font-bold">Admin</span>
          </Link>
          <button
            onClick={() => {
              logoutAdmin();
              nav("/admin/login");
            }}
            className="rounded-md bg-black text-white px-3 py-1.5 text-sm"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
}
