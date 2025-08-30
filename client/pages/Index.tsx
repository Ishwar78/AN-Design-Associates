import { FEATURED_IMAGES } from "@/lib/data";
import { Link } from "react-router-dom";
import Marquee from "@/components/Marquee";
import ProjectsSlider from "@/components/ProjectsSlider";
import Carousel, { Slide } from "@/components/Carousel";
import { CheckCircle, Building2, HandCoins, ShieldCheck } from "lucide-react";

const STAT_ITEMS = [
  { label: "Years of Experience", value: 12 },
  { label: "Projects Completed", value: 250 },
  { label: "Cities Served", value: 18 },
];

const SERVICES = [
  "Architectural Design",
  "Interior Design",
  "3D Visualisation",
  "Working Drawings",
  "Approvals",
  "Site Supervision",
  "Renovation",
  "Turnkey",
];

import { useState, useEffect } from "react";
// About.tsx (sirf naya section)
const BANNERS = [
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600",
  "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600",
];





export default function Index() {



  const [current, setCurrent] = useState(0);
  
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrent((prev) => (prev + 1) % BANNERS.length);
      }, 2000);
      return () => clearInterval(timer);
    }, []);
  
  





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
            Designing Spaces with Precision & Elegance
          </h1>
          <p className="mt-2 text-neutral-300">
            Architecture • Interiors • Turnkey
          </p>
          <div className="mt-6">
            <HeroCarousel />
          </div>
        </div>
      </section>

      <Marquee />

      {/* Featured projects slider */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="heading-gradient text-2xl sm:text-3xl font-extrabold">
          Featured Projects
        </h2>
        <p className="mt-2 text-neutral-700">
          Kitchen details, bedroom details, elevations and more.
        </p>
        <div className="mt-6">
          <ProjectsSlider />
        </div>
      </section>

      {/* Quick counters */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {STAT_ITEMS.map((s) => (
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

      {/* Services slider */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="heading-gradient text-2xl sm:text-3xl font-extrabold">
          Our Services
        </h2>
        <div className="mt-6">
          <ServicesCarousel />
        </div>
      </section>

      {/* Process timeline */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="heading-gradient text-2xl sm:text-3xl font-extrabold">
          Our Process
        </h2>
        <ol className="mt-6 grid grid-cols-1 sm:grid-cols-5 gap-4">
          {["Consult", "Design", "3D", "Execution", "Handover"].map(
            (step, i) => (
              <li
                key={step}
                className="relative rounded-xl border bg-white p-5 shadow-sm"
              >
                <div className="absolute -top-3 left-5 size-6 grid place-items-center rounded-full bg-black text-white text-xs">
                  {i + 1}
                </div>
                <h3 className="font-semibold">{step}</h3>
                <p className="text-sm text-neutral-600 mt-1">
                  Step {i + 1} of 5
                </p>
              </li>
            ),
          )}
        </ol>
      </section>

      {/* Why clients choose us */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="heading-gradient text-2xl sm:text-3xl font-extrabold">
          Why Clients Choose Us
        </h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Feature
            icon={<CheckCircle className="text-black" />}
            title="On-time Delivery"
            desc="Committed schedules with site supervision"
          />
          <Feature
            icon={<Building2 className="text-black" />}
            title="Vaastu Compliance"
            desc="Practical solutions aligned with principles"
          />
          <Feature
            icon={<HandCoins className="text-black" />}
            title="Budget Control"
            desc="Value engineering at every stage"
          />
          <Feature
            icon={<ShieldCheck className="text-black" />}
            title="Quality Assurance"
            desc="Detailed drawings for flawless execution"
          />
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h3 className="text-xl font-extrabold">Start Your Project Today</h3>
          <div className="flex gap-3">
            <a
              href="tel:+919812815401"
              className="rounded-full bg-white text-black px-5 py-3 font-semibold"
            >
              Call Now
            </a>
            <Link
              to="/contact"
              className="rounded-full bg-black text-white px-5 py-3 font-semibold"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Feature({
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

function HeroCarousel() {
  const slides = [
    {
      title: "Architecture",
      img: FEATURED_IMAGES[1].src,
      alt: FEATURED_IMAGES[1].alt,
    },
    {
      title: "Interiors",
      img: FEATURED_IMAGES[2].src,
      alt: FEATURED_IMAGES[2].alt,
    },
    {
      title: "Turnkey",
      img: FEATURED_IMAGES[0].src,
      alt: FEATURED_IMAGES[0].alt,
    },
  ];
  return (
    <Carousel autoplay={4500} controls pauseOnHover>
      {slides.map((s) => (
        <Slide key={s.title}>
          <div className="relative overflow-hidden rounded-2xl border shadow-sm">
            <img
              src={s.img}
              alt={s.alt}
              className="w-full object-cover h-[48vh] sm:h-[55vh] lg:h-[70vh]"
              loading="eager"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
              <h3 className="font-semibold text-xl sm:text-2xl">{s.title}</h3>
              <p className="text-sm text-neutral-200">
                Design • Approvals • Execution
              </p>
              <div className="mt-3 flex gap-2">
                <a
                  href="tel:+919812815401"
                  className="rounded-full bg-white text-black px-3 py-1 text-sm font-semibold"
                >
                  Call
                </a>
                <a
                  href="https://wa.me/919812815401"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#1ABC9C] text-black px-3 py-1 text-sm font-semibold"
                >
                  WhatsApp
                </a>
                <Link
                  to="/contact"
                  className="rounded-full bg-[#C8A94B] text-black px-3 py-1 text-sm font-semibold"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </div>
        </Slide>
      ))}
    </Carousel>
  );
}

function ServicesCarousel() {
  return (
    <Carousel>
      {SERVICES.map((s) => (
        <Slide key={s}>
          <div className="rounded-xl border bg-white p-5 shadow-sm h-full">
            <h3 className="font-semibold">{s}</h3>
            <p className="text-sm text-neutral-600 mt-1">
              Tailored to your brief with drawings and approvals.
            </p>
          </div>
        </Slide>
      ))}
    </Carousel>
  );
}
