import { Menu, MessageCircle, Search, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getWhatsAppNumber } from "../utils/whatsapp.js";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const whatsappUrl = `https://wa.me/${getWhatsAppNumber()}`;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-velvet/70 backdrop-blur-xl">
      <nav className="shell flex h-20 items-center justify-between">
        <Link to="/" className="group inline-flex items-center gap-3 text-white">
          <span className="grid size-10 place-items-center rounded-md border border-white/15 bg-white/10 shadow-neon">
            <Sparkles size={19} />
          </span>
          <span className="font-display text-2xl font-semibold tracking-normal">Menk.in</span>
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-semibold transition ${isActive ? "text-white" : "text-white/58 hover:text-white"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Link to="/products" className="btn-secondary" aria-label="Search catalog">
            <Search size={17} />
            Browse
          </Link>
          <a href={whatsappUrl} className="btn-primary" target="_blank" rel="noreferrer">
            <MessageCircle size={17} />
            WhatsApp
          </a>
        </div>
        <button
          type="button"
          className="btn-secondary px-3 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Open menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-white/10 bg-velvet/95 backdrop-blur md:hidden">
          <div className="shell flex flex-col gap-2 py-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </NavLink>
            ))}
            <a href={whatsappUrl} className="btn-primary mt-2" target="_blank" rel="noreferrer">
              <MessageCircle size={17} />
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
