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
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1619994403073-2cec844b8e63?auto=format&fit=crop&w=1800&q=80"
            alt=""
            className="h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/30" />
        </div>
        <div className="shell relative grid min-h-[560px] items-center py-16 md:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <span className="badge border-white/20 bg-white/10 text-white">Perfume & Oudh</span>
            <h1 className="mt-5 font-display text-5xl font-bold leading-tight tracking-normal md:text-7xl">
              Menk.in
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-stone-100">
              Curated attars, oudh, and perfumes for customers in India and the Middle East, ordered directly through WhatsApp.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
            <div key={item.title} className="rounded-lg border border-stone-200 bg-white p-5">
              <Icon className="text-rosewood" size={24} />
              <h2 className="mt-4 font-bold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-stone-600">{item.text}</p>
            </div>
          );
        })}
      </section>

      <section className="shell pb-14">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-saffron">Featured</p>
            <h2 className="font-display text-3xl font-bold tracking-normal">Popular picks</h2>
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

      <section className="bg-white py-12">
        <div className="shell flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-leaf">
              <ShieldCheck size={20} />
              <span className="text-sm font-semibold uppercase tracking-wide">MVP ready</span>
            </div>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-normal">
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
