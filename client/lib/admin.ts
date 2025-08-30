const TOKEN_KEY = "admin_token";

export async function loginAdmin(email: string, password: string): Promise<boolean> {
  try {
    const r = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!r.ok) return false;
    const data = await r.json();
    if (data?.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function getAdminToken(): string | null {
  return typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
}

export function isAdminAuthed(): boolean {
  return !!getAdminToken();
}

export function logoutAdmin() {
  localStorage.removeItem(TOKEN_KEY);
}

// Storage helpers
export const PROJECTS_KEY = "admin_projects";
export const DRAWINGS_KEY = "admin_drawings";

export function readStorage<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}
