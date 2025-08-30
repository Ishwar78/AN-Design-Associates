import multer from "multer";
import fs from "fs";
import path from "path";

const root = path.resolve(".");
const uploadsRoot = path.join(root, "uploads");
const imagesDir = path.join(uploadsRoot, "images");
const pdfsDir = path.join(uploadsRoot, "pdfs");

for (const dir of [uploadsRoot, imagesDir, pdfsDir]) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    const isPdf = file.mimetype.includes("pdf");
    cb(null, isPdf ? pdfsDir : imagesDir);
  },
  filename: (_req, file, cb) => {
    const ext =
      path.extname(file.originalname) ||
      (file.mimetype.includes("pdf") ? ".pdf" : ".webp");
    const name = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
    cb(null, name);
  },
});

function fileFilter(
  _req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) {
  const allowedImages = ["image/jpeg", "image/png", "image/webp"];
  if (file.mimetype.includes("pdf")) return cb(null, true);
  if (allowedImages.includes(file.mimetype)) return cb(null, true);
  cb(new Error("Invalid file type"));
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 15 * 1024 * 1024 },
});

export function fileUrl(file: Express.Multer.File) {
  const isPdf = file.mimetype.includes("pdf");
  const dir = isPdf ? "pdfs" : "images";
  return `/uploads/${dir}/${file.filename}`;
}
