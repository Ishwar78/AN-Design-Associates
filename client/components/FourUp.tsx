import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function FourUp({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3",
          className,
        )}
      >
        {images.slice(0, 4).map((src, i) => (
          <figure
            key={i}
            className="group relative overflow-hidden rounded-lg cursor-pointer aspect-[4/3] bg-black/5"
            onClick={() => {
              setActive(i);
              setOpen(true);
            }}
          >
            <img
              src={src}
              alt={`Feature ${i + 1}`}
              className="block w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              loading={i < 1 ? "eager" : "lazy"}
              decoding="async"
            />
          </figure>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden">
          <img
            src={images[active]}
            alt="Preview"
            className="w-full h-full object-contain bg-black"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
