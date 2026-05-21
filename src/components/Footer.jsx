import { Link } from "react-router-dom";
import { getWhatsAppNumber } from "../utils/whatsapp";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = `https://wa.me/${getWhatsAppNumber()}`;

  return (
    <footer className="bg-ink text-white/80">
      {/* Newsletter */}
      <div className="shell py-16 border-b border-white/8">
        <div className="max-w-lg mx-auto text-center">
          <h3 className="font-serif text-3xl text-white mb-3">Stay in Touch</h3>
          <p className="text-sm text-white/40 mb-6 leading-relaxed">
            Be the first to discover new fragrances and exclusive collections.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 outline-none focus:border-gold/50 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gold text-white text-xs font-medium tracking-widest uppercase rounded-lg hover:bg-gold-dark transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Grid */}
      <div className="shell py-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <span className="font-logo text-xl text-gold tracking-wider">menk</span>
            <p className="mt-3 text-sm text-white/35 leading-relaxed max-w-xs">
              Luxury perfume & oudh, crafted for presence. Each fragrance tells a
              story of elegance and refinement.
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-gold mb-4">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/products", label: "Collections" },
                { to: "/about", label: "Our Story" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/45 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-gold mb-4">
              Support
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/45 hover:text-gold transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li className="text-sm text-white/35">UPI & COD available</li>
              <li className="text-sm text-white/35">Manual confirmation</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-gold mb-4">
              Connect
            </h4>
            <div className="flex gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/35 hover:text-gold hover:border-gold/30 transition-all"
                aria-label="WhatsApp"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/35 hover:text-gold hover:border-gold/30 transition-all"
                aria-label="Instagram"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/8 text-center">
          <p className="text-xs text-white/25 tracking-wider">
            © {currentYear} Menk. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
