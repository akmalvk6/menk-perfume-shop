import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/35 text-white backdrop-blur">
      <div className="shell grid gap-8 py-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-semibold text-white">Menk.in</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/55">
            Perfumes, attars, and oudh selected for daily wear, gifting, and special occasions.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold">Shop</p>
          <div className="mt-3 grid gap-2 text-sm text-white/55">
            <Link to="/products" className="hover:text-white">All products</Link>
            <Link to="/about" className="hover:text-white">About</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold">Support</p>
          <p className="mt-3 text-sm leading-6 text-white/55">
            Orders are confirmed manually on WhatsApp. Payment can be collected through UPI or cash on delivery.
          </p>
        </div>
      </div>
    </footer>
  );
}
