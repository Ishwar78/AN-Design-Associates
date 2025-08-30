import { useState } from "react";
import { toast } from "@/hooks/use-toast";

import Carousel, { Slide } from "@/components/Carousel";
import { FEATURED_IMAGES } from "@/lib/data";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      toast({ title: "Thanks! We'll get back shortly." });
      const msg = `Hello, I'm ${payload.name || "a client"}. I need a quote. Phone: ${payload.phone || ""}.`;
      window.open(
        `https://wa.me/919812815401?text=${encodeURIComponent(msg)}`,
        "_blank",
      );
      (e.currentTarget as HTMLFormElement).reset();
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      {/* Hero slider */}



      
      <section>
        <h1 className="heading-gradient text-3xl sm:text-4xl font-extrabold">
          Contact
        </h1>
      
      </section>

      {/* Form + Map */}
      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <form
          onSubmit={onSubmit}
          className="rounded-xl border bg-white p-6 shadow-sm"
        >
          <div className="grid grid-cols-1 gap-4">
            <input
              name="name"
              required
              placeholder="Your name"
              className="w-full rounded-lg border px-4 py-2"
            />
            <input
              name="phone"
              required
              placeholder="Phone"
              className="w-full rounded-lg border px-4 py-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full rounded-lg border px-4 py-2"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={5}
              className="w-full rounded-lg border px-4 py-2"
            />
            <button
              disabled={loading}
              className="rounded-lg bg-black text-white px-5 py-2 font-semibold disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
          <p className="mt-4 text-sm">
            Or WhatsApp us at
            <a
              className="ml-1 underline"
              href="https://wa.me/919812815401"
              target="_blank"
              rel="noreferrer"
            >
              +91 9812815401
            </a>
          </p>
        </form>
        <div className="rounded-xl overflow-hidden border shadow-sm">
          <iframe
            title="Map"
            className="w-full h-80 md:h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Mapsko%20City%20Sonipat&output=embed"
          />
        </div>
      </div>

      {/* Trust slider */}
      <section className="mt-12">
        <h2 className="heading-gradient text-2xl font-extrabold">
          Why Choose Us
        </h2>
        <div className="mt-4">
          <Carousel>
            {[
              "On-time Delivery",
              "Vaastu Compliance",
              "Budget Control",
              "Quality Assurance",
            ].map((t) => (
              <Slide key={t}>
                <div className="rounded-xl border bg-white p-6 shadow-sm h-full">
                  <h3 className="font-semibold">{t}</h3>
                  <p className="text-sm text-neutral-600 mt-2">
                    Trusted by homeowners across NCR.
                  </p>
                </div>
              </Slide>
            ))}
          </Carousel>
        </div>
      </section>

     
    </main>
  );
}
