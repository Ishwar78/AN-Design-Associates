import { Link } from "react-router-dom";
import Logo, { LOGO_URL } from "./Logo";

export default function SiteFooter() {
  return (
    <footer className="border-t bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-start gap-3">
            <Logo className="h-10 w-auto" size={40} />
            <div>
              <h3 className="font-bold text-primary">AN Design Associates</h3>
              <p className="text-sm text-neutral-300">
                Designing spaces with precision and elegance across Sonipat,
                Rohtak and NCR.
              </p>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-primary">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[
              ["/", "Home"],
              ["/about", "About"],
              ["/services", "Services"],
              ["/projects", "Projects"],
              ["/drawings", "Drawings"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link className="hover:underline" to={to}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-primary">Contact</h4>
          <p className="text-sm">
            SCO-40, Sec-27, Mapsko City, Sonipat – 131001
          </p>
          <p className="text-sm mt-1">andesignassociates@gmail.com</p>
          <p className="text-sm mt-1">+91 9812815401 / +91 9910578630</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-primary">Social</h4>
          <div className="flex gap-4 text-sm">
            <a
              href="https://wa.me/919812815401"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              WhatsApp
            </a>
            <a href="#" className="hover:underline">
              Facebook
            </a>
            <a href="#" className="hover:underline">
              Instagram
            </a>
            <a href="#" className="hover:underline">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <div className="w-full h-1 bg-primary" />
      <div className="mx-auto max-w-7xl px-4 py-4 text-xs text-neutral-300 flex items-center justify-between">
        <span>© 2025 AN Design Associates</span>
        {/* <span>Designed by Satya Web Technology</span> */}
      </div>
    </footer>
  );
}
