import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Collections" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();

  /* Close mobile menu on route change */
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  /* Glass effect on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/85 backdrop-blur-xl shadow-soft border-b border-gold/8"
          : "bg-transparent"
      }`}
    >
      <nav className="shell flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="logo-shimmer" aria-label="Menk home">
          <span className="logo-text text-2xl">menk</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right side: Cart + Mobile menu */}
        <div className="flex items-center gap-3">
          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative p-2 text-ink/50 hover:text-gold transition-colors"
            aria-label="Shopping cart"
          >
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-gold text-white text-[10px] font-bold flex items-center justify-center leading-none">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-ink/60 hover:text-gold transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="shell pb-6 flex flex-col gap-1 bg-cream/95 backdrop-blur-xl">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `py-3 px-4 text-sm font-medium tracking-wider uppercase transition-colors rounded-lg ${
                  isActive
                    ? "text-gold bg-gold/5"
                    : "text-ink/50 hover:text-gold hover:bg-gold/5"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/cart"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `py-3 px-4 text-sm font-medium tracking-wider uppercase transition-colors rounded-lg flex items-center gap-2 ${
                isActive
                  ? "text-gold bg-gold/5"
                  : "text-ink/50 hover:text-gold hover:bg-gold/5"
              }`
            }
          >
            Cart
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-gold text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
}
