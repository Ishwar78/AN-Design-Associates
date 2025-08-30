import { Link } from "react-router-dom";
import { ShieldCheck, Clock, Ruler } from "lucide-react";
import Carousel, { Slide } from "@/components/Carousel";

import { useState, useEffect } from "react";
// About.tsx (sirf naya section)
const BANNERS = [
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600", // architect drawing on desk
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600", // modern building exterior
  "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600", // blueprint and tools
 
];

const PROFILE_URL =
  "https://cdn.builder.io/api/v1/image/assets%2Fe9a77209c0ab4c10a9cc4ef22c9de513%2F14e98984688c45de99cfaf27a6ca5743?format=webp&width=800";

export default function About() {

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % BANNERS.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);





  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      {/* Hero split */}



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







      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="overflow-hidden rounded-2xl border shadow-sm">
          <img
            src={PROFILE_URL}
            alt="Profile portrait"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div>
          <h1 className="heading-gradient text-3xl sm:text-4xl font-extrabold">
            Meet Ar. S.M. Amir
          </h1>

          <p className="mt-2 text-neutral-700 font-semibold">
            Founder & Principal Architect
          </p>
          <p className="mt-4 text-neutral-700">
            AN Design Associates leads residential, commercial and interior
            projects across Sonipat, Rohtak and the Delhi–NCR region. We blend
            contemporary aesthetics with functionality, Vaastu-sensitive
            planning and budget control to deliver buildable, approval-ready
            designs backed by detailed working drawings and on-site supervision.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mt-12 grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-lg">Our Mission</h2>

          <p className="mt-2 text-neutral-700">
            To design enduring spaces that improve everyday life—delivered with
            precision, transparency and care from concept to handover.
          </p>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-lg">Our Vision</h2>

          <p className="mt-2 text-neutral-700">
            To be the most trusted studio in Sonipat–Rohtak–NCR for thoughtful
            architecture and interiors that balance beauty, practicality and
            cost.
          </p>
        </div>
      </section>

      {/* Highlights slider */}
      <section className="mt-12">
        <h2 className="heading-gradient text-2xl font-extrabold">Highlights</h2>

        <div className="mt-6">
          <Carousel>
            {["Residential", "Commercial", "Interiors", "Landscape"].map(
              (t) => (
                <Slide key={t}>
                  <div className="rounded-xl border bg-white p-6 shadow-sm h-full">
                    <h3 className="font-semibold">{t}</h3>
                    <p className="text-sm text-neutral-600 mt-2">
                      Selected works in {t.toLowerCase()} design.
                    </p>
                  </div>
                </Slide>
              ),
            )}
          </Carousel>
        </div>
      </section>

      {/* Team/Values slider */}
      <section className="mt-12">
        <h2 className="heading-gradient text-2xl font-extrabold">
          Team & Values
        </h2>

        <div className="mt-6">
          <Carousel>
            {[
              { t: "On-time Delivery", d: "Clear schedules with coordination" },
              { t: "Precision", d: "Detailed drawings and BOQs" },
              { t: "Quality", d: "Built-to-last detailing" },
              { t: "Support", d: "From approvals to handover" },
            ].map((v) => (
              <Slide key={v.t}>
                <div className="rounded-xl border bg-white p-6 shadow-sm h-full">
                  <h3 className="font-semibold">{v.t}</h3>
                  <p className="text-sm text-neutral-600 mt-2">{v.d}</p>
                </div>
              </Slide>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Gallery slider */}
      <section className="mt-12">
        <h2 className="heading-gradient text-2xl font-extrabold">
          Studio Gallery
        </h2>

        <div className="mt-6">
          <Carousel>
            {[
              "https://cdn.builder.io/api/v1/image/assets%2Fe9a77209c0ab4c10a9cc4ef22c9de513%2F18a43c88d1fa46f1842980425be7369c?format=webp&width=800",
              "https://cdn.builder.io/api/v1/image/assets%2Fe9a77209c0ab4c10a9cc4ef22c9de513%2F841074a8b7b848f1bf883bc3adb05a5d?format=webp&width=1200",
              "https://cdn.builder.io/api/v1/image/assets%2Fe9a77209c0ab4c10a9cc4ef22c9de513%2Fee9dc9332cbd4c1b8432291046af7440?format=webp&width=1200",
            ].map((src, i) => (
              <Slide key={i}>
                <img
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="h-56 w-full rounded-2xl border object-cover shadow-sm"
                  loading="lazy"
                />
              </Slide>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Achievements */}
      <section className="mt-12">
        <h2 className="heading-gradient text-2xl font-extrabold">
          Achievements
        </h2>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto">
          {[
            { label: "Projects", value: 250 },
            { label: "Cities", value: 18 },
            { label: "Clients", value: 180 },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border bg-white p-6 text-center shadow-sm"
            >
              <div className="text-3xl font-extrabold">{s.value}+</div>
              <div className="text-xs uppercase tracking-wide text-neutral-600">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="mt-12 bg-primary text-primary-foreground rounded-2xl">
        <div className="px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h3 className="text-xl font-extrabold">
            Let’s design your dream project together
          </h3>
          <Link
            to="/contact"
            className="rounded-full bg-black text-white px-5 py-3 font-semibold"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}

function ValueCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="size-9 grid place-items-center rounded-full bg-primary/20">
          {icon}
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-neutral-600 mt-2">{desc}</p>
    </div>
  );
}
