import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { loginAdmin } from "@/lib/admin";

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const ok = await loginAdmin(email.trim(), password);
    setLoading(false);
    if (ok) nav("/admin/dashboard");
    else setError("Invalid credentials");
  }

  return (
    <main className="min-h-screen bg-black text-white grid place-items-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-3 mb-6">
          <Logo className="h-10 w-auto" />
          <h1 className="text-xl font-bold">Admin Login</h1>
        </div>
        <form
          onSubmit={onSubmit}
          className="space-y-3 bg-white/5 rounded-lg p-5"
        >
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm outline-none"
            required
          />
          <button className="w-full rounded-md bg-[#C8A94B] text-black py-2 font-semibold" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
