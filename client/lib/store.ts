export type ProjectWithStatus = {
  _id?: string;
  id?: string;
  title: string;
  category: "Residential" | "Commercial" | "Interiors" | "Landscape";
  coverImage?: string;
  gallery: string[];
  location?: string;
  year?: number;
  pdf?: string;
  status?: "Active" | "Inactive";
};

export type DrawingWithStatus = {
  _id?: string;
  id?: string;
  title: string;
  discipline?: "Arch" | "Interior" | "MEP"; // legacy
  type?: "Architectural" | "MEP" | "Interior" | "Sanitary";
  client?: string;
  siteAddress?: string;
  previewImage?: string;
  pdf?: string;
  status?: "Active" | "Inactive";
};

const API = {
  async getProjects(): Promise<ProjectWithStatus[]> {
    const r = await fetch("/api/projects");
    if (!r.ok) return [];
    const data = await r.json();
    return Array.isArray(data)
      ? data.map((p: any) => ({
          ...p,
          id: p._id,
          coverImage: p.coverImage || p.imageUrl || "",
          gallery: Array.isArray(p.gallery)
            ? p.gallery
            : p.imageUrl
            ? [p.imageUrl]
            : [],
          pdf: p.pdf || p.pdfUrl,
        }))
      : [];
  },
  async getDrawings(): Promise<DrawingWithStatus[]> {
    const r = await fetch("/api/drawings");
    if (!r.ok) return [];
    const data = await r.json();
    return Array.isArray(data)
      ? data.map((d: any) => ({ ...d, id: d._id }))
      : [];
  },
  async createProject(fd: FormData) {
    const token = localStorage.getItem("admin_token");
    const r = await fetch("/api/projects", {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: fd,
    });
    return r.json();
  },
  async updateProject(id: string, fd: FormData) {
    const token = localStorage.getItem("admin_token");
    const r = await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: fd,
    });
    return r.json();
  },
  async deleteProject(id: string) {
    const token = localStorage.getItem("admin_token");
    await fetch(`/api/projects/${id}`, {
      method: "DELETE",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  },
  async createDrawing(fd: FormData) {
    const token = localStorage.getItem("admin_token");
    const r = await fetch("/api/drawings", {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: fd,
    });
    return r.json();
  },
  async updateDrawing(id: string, fd: FormData) {
    const token = localStorage.getItem("admin_token");
    const r = await fetch(`/api/drawings/${id}`, {
      method: "PUT",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: fd,
    });
    return r.json();
  },
  async deleteDrawing(id: string) {
    const token = localStorage.getItem("admin_token");
    await fetch(`/api/drawings/${id}`, {
      method: "DELETE",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  },
};

export async function getAllProjects() {
  return API.getProjects();
}
export async function getPublicProjects() {
  const all = await API.getProjects();
  return all.filter((p) => (p.status ?? "Active") === "Active");
}
export async function saveProjectForm(id: string | undefined, fd: FormData) {
  if (id) return API.updateProject(id, fd);
  return API.createProject(fd);
}
export async function deleteProject(id: string) {
  return API.deleteProject(id);
}

export async function getAllDrawings() {
  return API.getDrawings();
}
export async function getPublicDrawings() {
  const all = await API.getDrawings();
  return all.filter((d) => (d.status ?? "Active") === "Active");
}
export async function saveDrawingForm(id: string | undefined, fd: FormData) {
  if (id) return API.updateDrawing(id, fd);
  return API.createDrawing(fd);
}
export async function deleteDrawing(id: string) {
  return API.deleteDrawing(id);
}
