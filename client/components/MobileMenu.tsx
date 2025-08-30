import { NavLink } from "react-router-dom";
import { useState } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/drawings", label: "Drawings" },
  { to: "/contact", label: "Contact" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden border-t">
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
        <span className="text-sm font-semibold">Menu</span>
        <button
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border px-3 py-1 text-sm"
        >
          {open ? "Close" : "Open"}
        </button>
      </div>
      {open && (
        <nav className="px-4 pb-3 grid gap-2">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm border ${isActive ? "bg-black text-white" : "bg-white text-black"}`
              }
              onClick={() => setOpen(false)}
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  );
}
