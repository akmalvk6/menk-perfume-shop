import { ArrowRight, MessageCircle, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import { fallbackProducts } from "../data/fallbackProducts.js";
import { getFeaturedProducts } from "../firebase/products.js";
import { getWhatsAppNumber } from "../utils/whatsapp.js";

export default function Home() {
  const [featured, setFeatured] = useState(fallbackProducts);

  useEffect(() => {
    getFeaturedProducts().then(setFeatured).catch(() => setFeatured(fallbackProducts));
  }, []);

  return (
    <>
      <section className="relative overflow-hidden px-4 py-8 text-white sm:py-12">
        <div className="shell scene-shell relative min-h-[620px] overflow-hidden rounded-lg px-5 py-10 sm:px-10 lg:px-16">
          <div className="relative z-10 mx-auto max-w-3xl pt-8 text-center sm:pt-14">
            <span className="badge">Perfume & Oudh Atelier</span>
            <h1 className="mt-7 font-display text-5xl font-semibold leading-[1.04] tracking-normal md:text-7xl">
              Fragrance, suspended in motion.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-white/68 md:text-lg">
              Curated attars, oudh, and perfumes with a cinematic catalog experience and instant WhatsApp ordering.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/products" className="btn-primary bg-saffron hover:bg-saffron/90">
                Shop catalog
                <ArrowRight size={18} />
              </Link>
              <a
                href={`https://wa.me/${getWhatsAppNumber()}`}
                target="_blank"
                rel="noreferrer"
                className="btn border border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="fragrance-orbit pointer-events-none absolute inset-x-0 bottom-20 z-0 mx-auto h-56 max-w-5xl">
            <span className="scent-disc" style={{ "--x": "3%", "--y": "56px", "--ry": "-64deg", "--rz": "-20deg", "--disc-a": "#203a3c", "--disc-b": "#ee8c42", "--speed": "4.6s" }} />
            <span className="scent-disc" style={{ "--x": "18%", "--y": "8px", "--ry": "-35deg", "--rz": "-10deg", "--disc-a": "#7d4333", "--disc-b": "#4f1cff", "--speed": "5.4s" }} />
            <span className="scent-disc" style={{ "--x": "34%", "--y": "14px", "--ry": "-8deg", "--rz": "4deg", "--disc-a": "#2e624c", "--disc-b": "#26334e", "--speed": "4.9s" }} />
            <span className="perfume-bottle" style={{ "--x": "50%", "--y": "-8px", "--ry": "18deg", "--rz": "-4deg", "--speed": "5.8s" }} />
            <span className="scent-disc" style={{ "--x": "66%", "--y": "18px", "--ry": "36deg", "--rz": "14deg", "--disc-a": "#f44263", "--disc-b": "#f5b443", "--speed": "4.8s" }} />
            <span className="perfume-bottle" style={{ "--x": "80%", "--y": "28px", "--ry": "64deg", "--rz": "12deg", "--speed": "5.2s" }} />
          </div>

          <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/15 bg-white px-5 py-2 text-xs font-bold text-velvet shadow-neon">
            Scroll Down
          </div>
        </div>
      </section>

      <section className="shell grid gap-4 py-10 md:grid-cols-3">
        {[
          { icon: Sparkles, title: "Curated fragrance", text: "Focused selection across attar, oudh, and perfume." },
          { icon: MessageCircle, title: "WhatsApp orders", text: "Customers send pre-filled order details instantly." },
          { icon: Truck, title: "Manual fulfilment", text: "Confirm payment and delivery directly with each buyer." },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="glass-panel rounded-lg p-5 transition hover:-translate-y-1">
              <Icon className="text-cyan" size={24} />
              <h2 className="mt-4 font-bold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/58">{item.text}</p>
            </div>
          );
        })}
      </section>

      <section className="shell pb-14">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gold">Featured</p>
            <h2 className="font-display text-3xl font-semibold tracking-normal">Popular picks</h2>
          </div>
          <Link to="/products" className="btn-secondary">
            View all
            <ArrowRight size={17} />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.04] py-12">
        <div className="shell flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-cyan">
              <ShieldCheck size={20} />
              <span className="text-sm font-semibold uppercase tracking-wide">MVP ready</span>
            </div>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-normal">
              Browse, order, confirm, ship.
            </h2>
          </div>
          <Link to="/contact" className="btn-primary">
            Contact shop
          </Link>
        </div>
      </section>
    </>
  );
}
