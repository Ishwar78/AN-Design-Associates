import { RequestHandler, Router } from "express";
import { connectDB } from "../db";
import Project from "../models/Project";
import Drawing from "../models/Drawing";
import { upload, fileUrl } from "../uploads";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const adminRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@andesignassociates.in";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "amir12345";

// Admin login (JWT)
adminRouter.post("/admin/login", async (req, res) => {
  const { email, password } = (req.body || {}) as {
    email?: string;
    password?: string;
  };
  if (!email || !password) return res.status(400).json({ ok: false });
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD)
    return res.status(401).json({ ok: false });
  const token = jwt.sign({ sub: email, role: "admin" }, JWT_SECRET, {
    expiresIn: "7d",
  });
  res.json({ token });
});

// Ensure DB connection for data routes
adminRouter.use(async (_req, res, next) => {
  const ok = await connectDB();
  if (!ok || mongoose.connection.readyState !== 1) {
    return res.status(503).json({ ok: false, error: "Database unavailable" });
  }
  next();
});

// Auth middleware for protected routes
const requireAuth: RequestHandler = (req, res, next) => {
  const auth = req.headers.authorization || "";
  const [, token] = auth.split(" ");
  if (!token) return res.status(401).json({ ok: false });
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ ok: false });
  }
};

// Simple Idempotency (optional, in-memory)
const idemCache = new Map<string, { at: number }>();
const IDEM_TTL = 2 * 60 * 1000;
const idempotency: RequestHandler = (req, res, next) => {
  const key = req.header("Idempotency-Key");
  if (!key) return next();
  const now = Date.now();
  for (const [k, v] of idemCache) if (now - v.at > IDEM_TTL) idemCache.delete(k);
  if (idemCache.has(key)) return res.status(200).json({ ok: true });
  idemCache.set(key, { at: now });
  next();
};

// Public endpoints (lean responses)
adminRouter.get("/projects", async (_req, res) => {
  const items = await (Project as any)
    .find()
    .sort({ createdAt: -1 })
    .select("-__v")
    .lean();
  res.json(items);
});
adminRouter.get("/drawings", async (_req, res) => {
  const items = await (Drawing as any)
    .find()
    .sort({ createdAt: -1 })
    .select("-__v")
    .lean();
  res.json(items);
});

// Create/Update with uploads mapped to new fields
const projectFields = upload.fields([
  { name: "coverImage", maxCount: 1 },
  { name: "pdf", maxCount: 1 },
]);

adminRouter.post("/projects", requireAuth, idempotency, projectFields, async (req, res) => {
  const body = req.body || {};
  const files = req.files as Record<string, Express.Multer.File[]> | undefined;
  const imageUrl = files?.coverImage?.[0]
    ? fileUrl(files.coverImage[0])
    : body.coverImage || body.imageUrl;
  const pdfUrl = files?.pdf?.[0] ? fileUrl(files.pdf[0]) : body.pdf || body.pdfUrl;
  const item = await (Project as any).create({
    title: body.title,
    description: body.description,
    category: body.category,
    imageUrl,
    pdfUrl,
  });
  res.json(item);
});

adminRouter.put("/projects/:id", requireAuth, idempotency, projectFields, async (req, res) => {
  const { id } = req.params;
  const body = req.body || {};
  const files = req.files as Record<string, Express.Multer.File[]> | undefined;
  const imageUrl = files?.coverImage?.[0]
    ? fileUrl(files.coverImage[0])
    : body.coverImage || body.imageUrl;
  const pdfUrl = files?.pdf?.[0] ? fileUrl(files.pdf[0]) : body.pdf || body.pdfUrl;
  const item = await (Project as any).findByIdAndUpdate(
    id,
    {
      title: body.title,
      description: body.description,
      category: body.category,
      imageUrl,
      pdfUrl,
    },
    { new: true },
  );
  res.json(item);
});

adminRouter.delete("/projects/:id", requireAuth, idempotency, async (req, res) => {
  const { id } = req.params;
  await (Project as any).findByIdAndDelete(id);
  res.json({ ok: true });
});

// Drawings
const drawingFields = upload.fields([
  { name: "previewImage", maxCount: 1 },
  { name: "pdf", maxCount: 1 },
]);

adminRouter.post("/drawings", requireAuth, idempotency, drawingFields, async (req, res) => {
  const body = req.body || {};
  const files = req.files as Record<string, Express.Multer.File[]> | undefined;
  const previewImage = files?.previewImage?.[0]
    ? fileUrl(files.previewImage[0])
    : body.previewImage;
  const pdfUrl = files?.pdf?.[0] ? fileUrl(files.pdf[0]) : body.pdf || body.pdfUrl;
  const item = await (Drawing as any).create({
    title: body.title,
    siteAddress: body.siteAddress,
    previewImage,
    pdfUrl,
  });
  res.json(item);
});

adminRouter.put("/drawings/:id", requireAuth, idempotency, drawingFields, async (req, res) => {
  const { id } = req.params;
  const body = req.body || {};
  const files = req.files as Record<string, Express.Multer.File[]> | undefined;
  const previewImage = files?.previewImage?.[0]
    ? fileUrl(files.previewImage[0])
    : body.previewImage;
  const pdfUrl = files?.pdf?.[0] ? fileUrl(files.pdf[0]) : body.pdf || body.pdfUrl;
  const item = await (Drawing as any).findByIdAndUpdate(
    id,
    {
      title: body.title,
      siteAddress: body.siteAddress,
      previewImage,
      pdfUrl,
    },
    { new: true },
  );
  res.json(item);
});

adminRouter.delete("/drawings/:id", requireAuth, idempotency, async (req, res) => {
  const { id } = req.params;
  await (Drawing as any).findByIdAndDelete(id);
  res.json({ ok: true });
});
