import { useMemo} from "react";
import { getPublicDrawings } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Carousel, { Slide } from "@/components/Carousel";
import GalleryGrid from "@/components/GalleryGrid";
import FullBleedImage from "@/components/FullBleedImage";
import FourUp from "@/components/FourUp";
import { ATTACHMENTS, ADDITIONAL_STOCK, USER_FEATURE } from "@/lib/attachments";


import { useState, useEffect } from "react";
// About.tsx (sirf naya section)
const BANNERS = [
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1600", // construction site with drawings

  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600",
  "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600",
];


export default function Drawings() {



 const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % BANNERS.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);





  const tabs = ["Architectural", "MEP/Interiors"] as const;
  const [active, setActive] = useState<(typeof tabs)[number]>("Architectural");

  const { data: all = [] } = useQuery({
    queryKey: ["drawings"],
    queryFn: () => getPublicDrawings(),
  });
  const filtered = useMemo(() => {
    if (active === "Architectural")
      return all.filter(
        (d: any) =>
          (d.type ||
            (d.discipline === "Arch" ? "Architectural" : d.discipline)) ===
          "Architectural",
      );
    return all.filter(
      (d: any) =>
        (d.type ||
          (d.discipline === "Arch" ? "Architectural" : d.discipline)) !==
        "Architectural",
    );
  }, [active, all]);

  return (
    <main>
      {/* Hero slider */}



<section className="w-full relative h-60 sm:h-80 md:h-[500px] overflow-hidden">
        {BANNERS.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Banner ${i + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
              current === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </section>





      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            Technical Excellence in Every Drawing
          </h1>
          <p className="mt-2 text-neutral-300">
            Clean, approval-ready PDFs for execution.
          </p>
          <div className="mt-6">
            <Carousel>
              {all.slice(0, 5).map((d: any) => (
                <Slide key={d.id}>
                  <div className="rounded-xl border bg-white p-4 shadow-sm">
                    <img
                      src={d.previewImage || "/placeholder.svg"}
                      alt={d.title}
                      className="aspect-[4/3] w-full rounded-lg object-cover"
                      loading="lazy"
                    />
                    <h3 className="mt-2 font-semibold text-black">{d.title}</h3>
                  </div>
                </Slide>
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      {/* Full image */}
      <FullBleedImage src={USER_FEATURE} alt="Feature" />
      <section className="-mt-2 mx-auto max-w-7xl px-4">
        <FourUp images={[ATTACHMENTS[2], ATTACHMENTS[4], ATTACHMENTS[7], ATTACHMENTS[10]]} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="heading-gradient text-2xl sm:text-3xl font-extrabold">Sample Drawings</h2>
        <div className="mt-6">
          <GalleryGrid images={[...ATTACHMENTS.slice(0, 10)].map((src) => ({ src }))} />
        </div>
        <p className="text-neutral-700 max-w-2xl mt-10">
          Browse architectural and MEP/interior drawings. Open to preview, or
          download directly.
        </p>

        <Tabs
          value={active}
          onValueChange={(v) => setActive(v as any)}
          className="mt-6"
        >
          <TabsList>
            {tabs.map((t) => (
              <TabsTrigger key={t} value={t}>
                {t}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={active}>
            <div className="mt-6">
              <Carousel>
                {filtered.map((d) => (
                  <Slide key={d.id}>
                    <div className="rounded-xl border bg-white p-4 shadow-sm">
                      <img
                        src={d.previewImage || "/placeholder.svg"}
                        alt={d.title}
                        loading="lazy"
                        className="aspect-[4/3] w-full rounded-lg object-cover"
                      />
                      <div className="mt-3">
                        <h3 className="font-semibold">{d.title}</h3>
                        <p className="text-xs text-neutral-600">
                          {(d as any).type || d.discipline} • {d.client}
                        </p>
                      </div>
                      {/* <div className="mt-3 flex items-center gap-3">
                        <a
                          href={(d as any).pdf || (d as any).pdfLink}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full bg-black text-white px-3 py-1.5 text-sm font-semibold"
                        >
                          View PDF
                        </a>
                        <a
                          href={(d as any).pdf || (d as any).pdfLink}
                          download
                          className="rounded-full bg-primary text-primary-foreground px-3 py-1.5 text-sm font-semibold"
                        >
                          Download
                        </a>
                      </div> */}
                    </div>
                  </Slide>
                ))}
              </Carousel>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
