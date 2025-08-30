import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useNavigate } from "react-router-dom";
import {
  getAllDrawings,
  deleteDrawing,
  DrawingWithStatus,
  saveDrawingForm,
} from "@/lib/store";
import { resizeToWebp, validateFile, dataUrlToBlob } from "@/lib/image";

export default function DrawingsAdmin() {
    const navigate = useNavigate(); 
  const [items, setItems] = useState<DrawingWithStatus[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<DrawingWithStatus | null>(null);
  const [progress, setProgress] = useState(0);
  const [form, setForm] = useState<
    Partial<DrawingWithStatus> & { previewData?: string }
  >({ status: "Active", discipline: "Arch" });

  useEffect(() => {
    void refresh();
  }, []);

  async function refresh() {
    const data = await getAllDrawings();
    setItems(data);
  }
  function onAdd() {
    setEditing(null);
    setForm({ status: "Active", discipline: "Arch" });
    setOpen(true);
  }
  function onEdit(d: DrawingWithStatus) {
    setEditing(d);
    setForm({ ...d });
    setOpen(true);
  }

  async function onPreviewChange(file: File) {
    const err = validateFile(file, ["image/jpeg", "image/png", "image/webp"]);
    if (err) {
      alert(err);
      return;
    }
    setProgress(10);
    const data = await resizeToWebp(file);
    setProgress(100);
    setForm((f) => ({ ...f, previewData: data }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = editing?._id || editing?.id;
    const fd = new FormData();
    fd.append("title", form.title || "Untitled");
    fd.append(
      "type",
      (form.discipline as any) === "Arch"
        ? "Architectural"
        : (form.discipline as any) || "Architectural",
    );
    if (form.client) fd.append("client", form.client);
    if (form.siteAddress) fd.append("siteAddress", form.siteAddress);
    if (form.pdf) fd.append("pdf", form.pdf);
    fd.append("status", (form.status as any) || "Active");
    if (form.previewData)
      fd.append(
        "previewImage",
        dataUrlToBlob(form.previewData),
        "preview.webp",
      );
    else if (form.previewImage) fd.append("previewImage", form.previewImage);
    await saveDrawingForm(id, fd);
    setOpen(false);
    setProgress(0);
    await refresh();
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this drawing?")) return;
    await deleteDrawing(id);
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
        <h1 className="text-2xl font-extrabold">Drawings</h1>
        <button
          onClick={onAdd}
          className="rounded-md bg-black text-white px-3 py-1.5 text-sm"
        >
          Add Drawing
        </button>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="p-2 border-b">Title</th>
              <th className="p-2 border-b">Type</th>
              <th className="p-2 border-b">Client/Site</th>
              <th className="p-2 border-b">Status</th>
              <th className="p-2 border-b">Edit</th>
              <th className="p-2 border-b">Delete</th>
            </tr>
          </thead>
          <tbody>
            {items.map((d) => (
              <tr key={d.id} className="border-b">
                <td className="p-2">{d.title}</td>
                <td className="p-2">{d.discipline}</td>
                <td className="p-2">{d.client}</td>
                <td className="p-2">{d.status ?? "Active"}</td>
                <td className="p-2">
                  <button
                    onClick={() => onEdit(d)}
                    className="rounded bg-neutral-800 text-white px-2 py-1"
                  >
                    Edit
                  </button>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => onDelete(d.id)}
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
                {editing ? "Edit Drawing" : "Add Drawing"}
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
                value={(form.discipline as any) || "Arch"}
                onChange={(e) =>
                  setForm({ ...form, discipline: e.target.value as any })
                }
              >
                {(["Arch", "Interior", "MEP"] as const).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <input
                className="border rounded px-3 py-2"
                placeholder="Client/Site"
                value={form.client || ""}
                onChange={(e) => setForm({ ...form, client: e.target.value })}
              />
              <input
                className="border rounded px-3 py-2"
                placeholder="Site Address"
                value={form.siteAddress || ""}
                onChange={(e) =>
                  setForm({ ...form, siteAddress: e.target.value })
                }
              />
              <input
                className="border rounded px-3 py-2 col-span-1 sm:col-span-2"
                placeholder="PDF Link"
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
                <label className="block text-sm font-medium">
                  Preview Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files && onPreviewChange(e.target.files[0])
                  }
                />
                {form.previewData && (
                  <img
                    src={form.previewData}
                    alt="preview"
                    className="mt-2 h-32 object-cover rounded"
                  />
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
