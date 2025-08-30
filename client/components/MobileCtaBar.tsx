export function MobileCtaBar() {
  const phone = "+919812815401";
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70 md:hidden">
      <div className="mx-auto max-w-7xl px-3 py-2 grid grid-cols-3 gap-2 text-sm">
        <a href={`tel:${phone}`} className="rounded-lg bg-black text-white px-3 py-2 text-center font-semibold">Call</a>
        <a href={`https://wa.me/${phone.replace('+','')}?text=${encodeURIComponent('Hi, I need an architecture/interiors quote.')}`} target="_blank" rel="noreferrer" className="rounded-lg bg-[#25D366] text-black px-3 py-2 text-center font-semibold">WhatsApp</a>
        <a href="/contact" className="rounded-lg bg-primary text-primary-foreground px-3 py-2 text-center font-semibold">Get Quote</a>
      </div>
    </div>
  );
}

export function StickyWhatsApp() {
  const phone = "+919812815401";
  return (
    <a
      href={`https://wa.me/${phone.replace('+','')}?text=${encodeURIComponent('Hello! I would like to discuss a project.')}`}
      target="_blank"
      rel="noreferrer"
      className="hidden md:flex fixed bottom-6 right-6 z-40 size-12 items-center justify-center rounded-full bg-[#25D366] text-black shadow-lg ring-1 ring-black/10 hover:scale-105 transition"
      aria-label="Chat on WhatsApp"
    >
      WA
    </a>
  );
}

export default MobileCtaBar;
