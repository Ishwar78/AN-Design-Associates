import { getPublicProjects } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Carousel, { Slide } from "@/components/Carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "react-router-dom";




import { useState, useEffect, useMemo } from "react";
// About.tsx (sirf naya section)
const BANNERS = [
   "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600",
 
];



export default function Projects() {



const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % BANNERS.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);





  const categories = [
    "All",
    "Residential",
    "Commercial",
    "Interiors",
    "Landscape",
  ] as const;
  const [active, setActive] = useState<(typeof categories)[number]>("All");

  const { data: all = [] } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getPublicProjects(),
  });
  const filtered = useMemo(
    () => all.filter((p) => (active === "All" ? true : p.category === active)),
    [active, all],
  );

  return (
    <main>
      {/* Hero */}





<section className="w-full relative h-60 sm:h-80 md:h-[500px] overflow-hidden">
        {BANNERS.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Banner ${i + 1}`}
            sizes="100vw"
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
              current === i ? "opacity-100" : "opacity-0"
            }`}
            decoding="async"
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
      </section>








      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            Our Work Speaks for Itself
          </h1>
          <p className="mt-2 text-neutral-300">
            Residential • Commercial • Interiors • Landscape
          </p>
          <div className="mt-6">
            <Carousel>
              {all.slice(0, 5).map((p) => (
                <Slide key={`hero-${p.id}`}>
                  <img
                    src={p.coverImage}
                    alt={p.title}
                    className="h-56 w-full rounded-2xl border object-cover shadow-sm"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    decoding="async"
                  />
                </Slide>
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <Tabs value={active} onValueChange={(v) => setActive(v as any)}>
          <TabsList>
            {categories.map((c) => (
              <TabsTrigger key={c} value={c}>
                {c}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={active}>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((p) => (
                <Dialog key={p.id}>
                  <DialogTrigger asChild>
                    <button className="text-left rounded-xl border bg-white shadow-sm hover:shadow-md transition overflow-hidden">
                      <img
                        src={p.coverImage}
                        alt={p.title}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        decoding="async"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold break-words">{p.title}</h3>
                        <p className="text-xs text-neutral-600 break-words">
                          {p.category}
                          {p.location ? ` • ${p.location}` : ""}
                        </p>
                      </div>
                    </button>
                  </DialogTrigger>
                  <GalleryModal
                    title={p.title}
                    images={p.gallery}
                    pdfLink={(p as any).pdf || (p as any).pdfLink}
                  />
                </Dialog>
              ))}
            </div>
            <div className="mt-8">
              <Carousel>
                {filtered.map((p) => (
                  <Slide key={`slide-${p.id}`}>
                    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
                      <img
                        src={p.coverImage}
                        alt={p.title}
                        className="aspect-[4/3] w-full object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold break-words">{p.title}</h3>
                        <p className="text-xs text-neutral-600 break-words">
                          {p.category}
                          {p.location ? ` • ${p.location}` : ""}
                        </p>
                      </div>
                    </div>
                  </Slide>
                ))}
              </Carousel>
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-[#C8A94B] text-black px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h3 className="text-lg font-extrabold">
            Want a similar design? Contact us
          </h3>
          <Link
            to="/contact"
            className="rounded-full bg-black text-white px-5 py-3 font-semibold"
          >
            Start Project
          </Link>
        </div>
      </section>
    </main>
  );
}

function GalleryModal({
  title,
  images,
  pdfLink,
}: {
  title: string;
  images: string[];
  pdfLink?: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });
  return (
    <DialogContent className="max-w-5xl">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="mb-2 flex items-center gap-2">
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="rounded bg-black text-white px-2 py-1 text-sm"
        >
          Prev
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          className="rounded bg-black text-white px-2 py-1 text-sm"
        >
          Next
        </button>
        {pdfLink && (
          <a
            href={pdfLink}
            target="_blank"
            rel="noreferrer"
            className="ml-auto rounded bg-primary text-primary-foreground px-3 py-1.5 text-sm"
          >
            Open PDF
          </a>
        )}
      </div>
      <div className="overflow-hidden rounded-lg border" ref={emblaRef}>
        <div className="flex">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${title} ${i + 1}`}
              className="min-w-full max-h-[70vh] object-contain bg-black/5"
            />
          ))}
        </div>
      </div>
    </DialogContent>
  );
}
