import { Menu, MessageCircle, Search, X } from "lucide-react";
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
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-mist/95 backdrop-blur">
      <nav className="shell flex h-16 items-center justify-between">
        <Link to="/" className="font-display text-2xl font-bold tracking-normal text-rosewood">
          Menk.in
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-semibold ${isActive ? "text-rosewood" : "text-stone-700 hover:text-rosewood"}`
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
        <div className="border-t border-stone-200 bg-mist md:hidden">
          <div className="shell flex flex-col gap-2 py-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm font-semibold text-stone-800 hover:bg-white"
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
