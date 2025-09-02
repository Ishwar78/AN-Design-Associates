import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export interface GalleryImage {
  src: string;
  alt?: string;
}

export default function GalleryGrid({
  images,
  className,
  fit = "cover",
  screenshot = false,
}: {
  images: GalleryImage[];
  className?: string;
  fit?: "cover" | "contain";
  screenshot?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const spans = useMemo(
    () =>
      images.map((_, i) =>
        // Widen selected tiles on sm+ to get big/small rhythm without gaps
        i % 6 === 0 || i % 6 === 3 ? "sm:col-span-2 lg:col-span-2" : "",
      ),
    [images],
  );

  return (
    <>
      <div
        className={cn(
          // tighter, professional spacing
          "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3",
          screenshot && "rounded-xl bg-[#C8A94B] p-2 sm:p-3",
          className,
        )}
      >
        {images.map((img, i) => (
          <figure
            key={i}
            className={cn(
              "group relative overflow-hidden rounded-lg cursor-pointer aspect-[4/3]",
              screenshot ? "bg-transparent" : "bg-black/5",
              spans[i],
            )}
            onClick={() => {
              setActive(i);
              setOpen(true);
            }}
          >
            <img
              src={img.src}
              alt={img.alt || `Gallery image ${i + 1}`}
              loading={i < 2 ? "eager" : "lazy"}
              decoding="async"
              className={cn(
                "block w-full h-full transition-transform duration-300",
                fit === "cover" ? "object-cover group-hover:scale-[1.03]" : "object-contain",
              )}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </figure>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden">
          <img
            src={images[active]?.src}
            alt={images[active]?.alt || "Full image"}
            className="w-full h-full object-contain bg-black"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
