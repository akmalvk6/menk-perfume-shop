import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-ink text-white">
      <div className="shell grid gap-8 py-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-bold text-white">Menk.in</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-stone-300">
            Perfumes, attars, and oudh selected for daily wear, gifting, and special occasions.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-stone-400">Shop</p>
          <div className="mt-3 grid gap-2 text-sm text-stone-300">
            <Link to="/products" className="hover:text-white">All products</Link>
            <Link to="/about" className="hover:text-white">About</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-stone-400">Support</p>
          <p className="mt-3 text-sm leading-6 text-stone-300">
            Orders are confirmed manually on WhatsApp. Payment can be collected through UPI or cash on delivery.
          </p>
        </div>
      </div>
    </footer>
  );
}
