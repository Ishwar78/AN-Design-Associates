import {
  CheckCircle,
  Ruler,
  Building2,
  ClipboardList,
  FileCheck2,
  HardHat,
  Hammer,
  Layers3,
} from "lucide-react";
import { Link } from "react-router-dom";

const SERVICES = [
  {
    title: "Architectural Design",
    desc: "Concept to execution.",
    icon: Building2,
  },
  {
    title: "Interior Design",
    desc: "Spaces that reflect lifestyle.",
    icon: Layers3,
  },
  {
    title: "3D Visualization",
    desc: "Realistic renders before build.",
    icon: Ruler,
  },
  {
    title: "Working Drawings",
    desc: "Detailed technical sets.",
    icon: ClipboardList,
  },
  { title: "Approvals", desc: "Fast municipal sanctioning.", icon: FileCheck2 },
  {
    title: "Site Supervision",
    desc: "Quality & timeline monitoring.",
    icon: HardHat,
  },
  { title: "Renovation", desc: "Smart upgrades for old spaces.", icon: Hammer },
  {
    title: "Turnkey Solutions",
    desc: "End-to-end project delivery.",
    icon: CheckCircle,
  },
];

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

export default function Services() {



 const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % BANNERS.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);



  return (
    <main>
      {/* Hero with slider */}



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
            Our Services – Complete Design Solutions
          </h1>
          <p className="mt-2 text-neutral-300">
            Architecture • Interiors • 3D • Approvals • Turnkey
          </p>
          <div className="mt-6">
            <Carousel>
              {SERVICES.slice(0, 5).map(({ title, desc, icon: Icon }) => (
                <Slide key={title}>
                  <div className="rounded-xl border bg-white p-5 shadow-sm h-full text-black">
                    <div className="flex items-center gap-3">
                      <div className="size-9 grid place-items-center rounded-full bg-primary/20">
                        <Icon className="text-black" />
                      </div>
                      <h3 className="font-semibold">{title}</h3>
                    </div>
                    <p className="text-sm text-neutral-600 mt-2">{desc}</p>
                  </div>
                </Slide>
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      {/* Attachments gallery */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="heading-gradient text-2xl sm:text-3xl font-extrabold">Work Examples</h2>
        <div className="mt-6">
          <GalleryGrid images={[...ATTACHMENTS.slice(4, 12), ...ADDITIONAL_STOCK.slice(0, 3)].map((src) => ({ src }))} />
        </div>
      </section>

     
      <FullBleedImage src={USER_FEATURE} alt="Feature" />
      <section className="-mt-2 mx-auto max-w-7xl px-4">
        <FourUp images={[ATTACHMENTS[8], ATTACHMENTS[9], ATTACHMENTS[10], ATTACHMENTS[11]]} />
      </section>

    
      <section className="mx-auto max-w-7xl px-4 py-12">
        <Carousel>
          {SERVICES.map(({ title, desc, icon: Icon }) => (
            <Slide key={title}>
              <div className="rounded-xl border bg-white p-5 shadow-sm h-full">
                <div className="flex items-center gap-3">
                  <div className="size-9 grid place-items-center rounded-full bg-primary/20">
                    <Icon className="text-black" />
                  </div>
                  <h3 className="font-semibold">{title}</h3>
                </div>
                <p className="text-sm text-neutral-600 mt-2">{desc}</p>
              </div>
            </Slide>
          ))}
        </Carousel>
      </section>

      {/* Process timeline slider */}
      {/* <section className="mx-auto max-w-7xl px-4 pb-12">
        <h2 className="heading-gradient text-2xl sm:text-3xl font-extrabold">
          Process
        </h2>
        <Carousel>
          {["Consult", "Design", "3D", "Execution", "Handover"].map(
            (step, i) => (
              <Slide key={step}>
                <div className="relative rounded-xl border bg-white p-5 shadow-sm h-full">
                  <div className="absolute -top-3 left-5 size-6 grid place-items-center rounded-full bg-black text-white text-xs">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold">{step}</h3>
                  <p className="text-sm text-neutral-600 mt-1">
                    Step {i + 1} of 5
                  </p>
                </div>
              </Slide>
            ),
          )}
        </Carousel>
      </section> */}

      {/* CTA banner */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h3 className="text-xl font-extrabold">
            Ready to begin? We’ll craft a clear plan.
          </h3>
          <Link
            to="/contact"
            className="rounded-full bg-black text-white px-5 py-3 font-semibold"
          >
            Get Quote
          </Link>
        </div>
      </section>
    </main>
  );
}
