import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useNavigate } from "react-router-dom";
import {
  getAllProjects,
  deleteProject,
  ProjectWithStatus,
  saveProjectForm,
} from "@/lib/store";
import { resizeToWebp, validateFile, dataUrlToBlob } from "@/lib/image";

type FormState = Partial<ProjectWithStatus> & {
  coverData?: string;
  galleryData?: string[];
};

export default function ProjectsAdmin() {
  const [items, setItems] = useState<ProjectWithStatus[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ProjectWithStatus | null>(null);
  const [form, setForm] = useState<FormState>({
    status: "Active",
    category: "Residential",
    galleryData: [],
  });
   const navigate = useNavigate(); 
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    void refresh();
  }, []);

  async function refresh() {
    const data = await getAllProjects();
    setItems(data);
  }

  function onAdd() {
    setEditing(null);
    setForm({ status: "Active", category: "Residential", galleryData: [] });
    setOpen(true);
  }
  function onEdit(p: ProjectWithStatus) {
    setEditing(p);
    setForm({ ...p, galleryData: p.gallery ?? [] });
    setOpen(true);
  }

  async function onCoverChange(file: File) {
    const err = validateFile(file, ["image/jpeg", "image/png", "image/webp"]);
    if (err) {
      alert(err);
      return;
    }
    setProgress(10);
    const data = await resizeToWebp(file);
    setProgress(100);
    setForm((f) => ({ ...f, coverData: data }));
  }
  async function onGalleryChange(files: FileList) {
    const list: string[] = [];
    let p = 0;
    for (const file of Array.from(files)) {
      const err = validateFile(file, ["image/jpeg", "image/png", "image/webp"]);
      if (err) {
        alert(err);
        return;
      }
      const data = await resizeToWebp(file);
      list.push(data);
      p += Math.round(100 / files.length);
      setProgress(Math.min(100, p));
    }
    setForm((f) => ({ ...f, galleryData: list }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = editing?._id || editing?.id;
    const fd = new FormData();
    fd.append("title", form.title || "Untitled");
    fd.append("category", (form.category as any) || "Residential");
    if (form.year) fd.append("year", String(form.year));
    if (form.location) fd.append("location", form.location);
    if (form.pdf) fd.append("pdf", form.pdf);
    fd.append("status", (form.status as any) || "Active");
    if (form.coverData)
      fd.append("coverImage", dataUrlToBlob(form.coverData), "cover.webp");
    else if (form.coverImage) fd.append("coverImage", form.coverImage);
    if (form.galleryData && form.galleryData.length) {
      form.galleryData.forEach((g, i) =>
        fd.append("gallery", dataUrlToBlob(g), `g-${i}.webp`),
      );
    } else if (form.gallery) {
      form.gallery.forEach((g) => fd.append("gallery", g));
    }
    await saveProjectForm(id, fd);
    setOpen(false);
    setProgress(0);
    await refresh();
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    await deleteProject(id);
    await refresh();
  }

  return (
    <AdminLayout>



       <button
        onClick={() => navigate("/admin/dashboard")} 
        className="rounded-md border px-3 py-1.5 text-sm"
      >
        ← Back
      </button>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">Projects</h1>
        <button
          onClick={onAdd}
          className="rounded-md bg-black text-white px-3 py-1.5 text-sm"
        >
          Add Project
        </button>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="p-2 border-b">Title</th>
              <th className="p-2 border-b">Category</th>
              <th className="p-2 border-b">Year</th>
              <th className="p-2 border-b">Status</th>
              <th className="p-2 border-b">Edit</th>
              <th className="p-2 border-b">Delete</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-2">{p.title}</td>
                <td className="p-2">{p.category}</td>
                <td className="p-2">{p.year ?? "-"}</td>
                <td className="p-2">{p.status ?? "Active"}</td>
                <td className="p-2">
                  <button
                    onClick={() => onEdit(p)}
                    className="rounded bg-neutral-800 text-white px-2 py-1"
                  >
                    Edit
                  </button>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => onDelete(p.id)}
                    className="rounded bg-red-600 text-white px-2 py-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 grid place-items-center p-4">
          <div className="w-full max-w-2xl rounded-lg bg-white p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">
                {editing ? "Edit Project" : "Add Project"}
              </h2>
              <button onClick={() => setOpen(false)} className="text-sm">
                Close
              </button>
            </div>
            <form
              onSubmit={onSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              <input
                className="border rounded px-3 py-2"
                placeholder="Title"
                value={form.title || ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              <select
                className="border rounded px-3 py-2"
                value={(form.category as any) || "Residential"}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value as any })
                }
              >
                {(
                  [
                    "Residential",
                    "Commercial",
                    "Interiors",
                    "Landscape",
                  ] as const
                ).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <input
                className="border rounded px-3 py-2"
                placeholder="Year"
                type="number"
                value={(form.year as any) || ""}
                onChange={(e) =>
                  setForm({ ...form, year: Number(e.target.value) })
                }
              />
              <input
                className="border rounded px-3 py-2"
                placeholder="Location"
                value={form.location || ""}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
              <input
                className="border rounded px-3 py-2 col-span-1 sm:col-span-2"
                placeholder="PDF Link (optional)"
                value={form.pdf || ""}
                onChange={(e) => setForm({ ...form, pdf: e.target.value })}
              />
              <select
                className="border rounded px-3 py-2"
                value={(form.status as any) || "Active"}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value as any })
                }
              >
                {(["Active", "Inactive"] as const).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium">Cover Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files && onCoverChange(e.target.files[0])
                  }
                />
                {form.coverData && (
                  <img
                    src={form.coverData}
                    alt="cover"
                    className="mt-2 h-32 object-cover rounded"
                  />
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium">
                  Project Gallery (multiple)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) =>
                    e.target.files && onGalleryChange(e.target.files)
                  }
                />
                {form.galleryData && form.galleryData.length > 0 && (
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {form.galleryData.map((g, i) => (
                      <img
                        key={i}
                        src={g}
                        className="h-20 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>

              {progress > 0 && progress < 100 && (
                <div className="sm:col-span-2 w-full bg-neutral-200 rounded h-2 overflow-hidden">
                  <div
                    className="bg-black h-2"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}

              <div className="sm:col-span-2 flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded border px-3 py-1.5"
                >
                  Cancel
                </button>
                <button className="rounded bg-black text-white px-3 py-1.5">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
