import React from "react";
import { cn } from "@/lib/utils";

export default function FullBleedImage({
  src,
  alt,
  className,
  height = "h-[46vh] sm:h-[54vh] md:h-[62vh]",
}: {
  src: string;
  alt: string;
  className?: string;
  height?: string;
}) {
  return (
    <section className={cn("mx-auto max-w-7xl px-4 py-8", className)}>
      <div className="relative overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5">
        <img
          src={src}
          alt={alt}
          className={cn("w-full object-cover", height)}
          loading="lazy"
          decoding="async"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
