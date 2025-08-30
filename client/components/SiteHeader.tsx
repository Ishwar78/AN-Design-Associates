import { Link, NavLink } from "react-router-dom";
import Logo, { LOGO_URL } from "./Logo";
import MobileMenu from "./MobileMenu";

const phone1 = "+919812815401";
const phone2 = "+919910578630";
const email = "andesignassociates@gmail.com";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/drawings", label: "Drawings" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b">
      {/* Top bar */}
      <div className="w-full bg-black text-white text-xs sm:text-sm">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4">
            <a className="hover:underline" href={`tel:${phone1}`}>
              9812815401
            </a>
            <span className="opacity-60">/</span>
            <a className="hover:underline" href={`tel:${phone2}`}>
              9910578630
            </a>
            <span className="hidden sm:inline opacity-60">|</span>
            <a
              className="hidden sm:inline hover:underline"
              href={`mailto:${email}`}
            >
              {email}
            </a>
          </div>
          <a
            href={`https://wa.me/${phone1.replace("+", "")}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-3 py-1 text-black font-medium"
          >
            WhatsApp
          </a>
        </div>
      </div>
      {/* Main nav */}
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <Logo className="h-8 w-auto" size={32} />
          <div className="leading-tight">
          <div className="font-extrabold tracking-tight heading-gradient text-lg sm:text-xl text-blue-500">
  AN Design Associates
</div>

            <div className="text-xs text-neutral-600">
              Architecture • Interiors • Turnkey
            </div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `hover:text-black/80 transition-colors ${isActive ? "text-black" : "text-neutral-700"}`
              }
            >
              {n.label}
            </NavLink>
          ))}
          <a
            href={`tel:${phone1}`}
            className="rounded-full bg-primary/90 px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary"
          >
            Call Now
          </a>
        </nav>
      </div>
      {/* Mobile menu */}
      <MobileMenu />
    </header>
  );
}

export default SiteHeader;
