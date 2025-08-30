import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { DRAWINGS } from "@/lib/data";

export default function ProjectsSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {DRAWINGS.slice(0, 8).map((d) => (
            <a
              key={d.id}
              href={d.previewImage || d.pdfLink}
              target="_blank"
              rel="noreferrer"
              className="min-w-[90%] sm:min-w-[45%] lg:min-w-[30%] rounded-xl border bg-white shadow-sm hover:shadow-md transition"
            >
              <img
                src={d.previewImage || "/placeholder.svg"}
                alt={d.title}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-t-xl object-cover"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                decoding="async"
              />
              <div className="p-4">
                <h3 className="font-semibold truncate">{d.title}</h3>
                <p className="text-xs text-neutral-600 truncate">{d.client} • {d.siteAddress}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-white via-transparent to-white opacity-60" />
      <div className="mt-4 flex justify-between">
        <button onClick={scrollPrev} className="rounded-full bg-black text-white px-4 py-2">Prev</button>
        <button onClick={scrollNext} className="rounded-full bg-black text-white px-4 py-2">Next</button>
      </div>
    </div>
  );
}
