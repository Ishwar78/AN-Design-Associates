export async function resizeToWebp(
  file: File,
  maxWidth = 1200,
  maxHeight = 800,
  quality = 0.8,
): Promise<string> {
  const img = document.createElement("img");
  const url = URL.createObjectURL(file);
  try {
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Image load failed"));
      img.src = url;
    });
    const { width, height } = img;
    const ratio = Math.min(maxWidth / width, maxHeight / height, 1);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/webp", quality);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function validateFile(file: File, allowed: string[]): string | null {
  const ok = allowed.some((t) => file.type.includes(t));
  return ok ? null : `Invalid file type: ${file.type}`;
}

export function dataUrlToBlob(dataUrl: string, mime = "image/webp"): Blob {
  const arr = dataUrl.split(",");
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new Blob([u8arr], { type: mime });
}
