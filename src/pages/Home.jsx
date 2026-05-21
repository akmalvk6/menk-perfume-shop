import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AnimatedSection from "../components/AnimatedSection";
import ParticleCanvas from "../components/ParticleCanvas";
import ProductCard from "../components/ProductCard";
import { fallbackProducts } from "../data/fallbackProducts";
import { getFeaturedProducts } from "../firebase/products";

/* ─── Testimonials Data ─── */

const testimonials = [
  {
    id: 1,
    quote:
      "The Rose Oudh Attar is simply exquisite. I've never experienced a fragrance that lingers so beautifully throughout the entire day.",
    name: "Ayesha R.",
    title: "Loyal Customer",
  },
  {
    id: 2,
    quote:
      "Menk's collection feels personal and curated. Every bottle tells a story. The WhatsApp ordering makes it effortless.",
    name: "Faizan K.",
    title: "Fragrance Enthusiast",
  },
  {
    id: 3,
    quote:
      "Finally, a brand that understands luxury without the pretension. The quality of the oudh is unmatched at this price.",
    name: "Priya M.",
    title: "First-Time Buyer",
  },
];

/* ─── Animation Variants ─── */

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ─── Home Page ─── */

export default function Home() {
  const [featured, setFeatured] = useState(fallbackProducts);

  useEffect(() => {
    getFeaturedProducts()
      .then((data) => data.length > 0 && setFeatured(data))
      .catch(() => setFeatured(fallbackProducts));
  }, []);

  return (
    <>
      {/* ═══ Hero ═══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleCanvas />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="logo-shimmer">
              <span className="logo-text text-7xl md:text-8xl lg:text-9xl">
                menk
              </span>
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <div className="gold-line mt-8 mb-6" />
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ink font-light leading-tight tracking-tight">
              Crafted for Presence
            </h1>
            <p className="mt-4 text-ink-light text-base md:text-lg max-w-md mx-auto leading-relaxed">
              Discover our curated collection of luxury perfumes, attars & oudh
              — each crafted for those who leave a lasting impression.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/products" className="btn-primary">
              Shop Collection
            </Link>
            <Link to="/products" className="btn-outline-gold">
              Discover Fragrance
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-ink-light/30">
            <span className="text-[10px] tracking-[0.3em] uppercase">
              Scroll
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-gold/30 to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* ═══ Featured Perfumes ═══ */}
      <section className="py-24 md:py-32">
        <div className="shell">
          <AnimatedSection className="text-center mb-16">
            <span className="badge mb-4">Collection</span>
            <h2 className="font-serif text-4xl md:text-5xl text-ink font-light mt-4">
              Featured Fragrances
            </h2>
            <div className="gold-line mt-6" />
          </AnimatedSection>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {featured.map((product) => (
              <motion.div key={product.id} variants={fadeUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

          <AnimatedSection className="text-center mt-12" delay={0.3}>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase text-gold hover:text-gold-dark transition-colors group"
            >
              View All Collections
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ Brand Story ═══ */}
      <section className="py-24 md:py-32 bg-warm-white">
        <div className="shell">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <AnimatedSection>
              <span className="badge mb-6">Our Story</span>
              <h2 className="font-serif text-4xl md:text-5xl text-ink font-light leading-tight mt-4">
                Where Tradition
                <br />
                Meets Elegance
              </h2>
              <div
                className="gold-line mx-0"
                style={{ margin: "24px 0", marginLeft: 0 }}
              />
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-ink-light leading-relaxed text-lg font-light mb-6">
                At Menk, we believe fragrance is an art form — a silent
                expression of personality that speaks before words do. Our
                collection is hand-curated from the finest attars, oudhs, and
                perfumes.
              </p>
              <p className="text-ink-light leading-relaxed text-lg font-light mb-8">
                Every scent in our catalog is selected for its character,
                longevity, and the story it tells. We bring you a personal
                buying experience — browse our catalog, connect on WhatsApp, and
                let us guide you to your signature scent.
              </p>
              <Link to="/about" className="btn-outline-gold">
                Learn More
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══ Testimonials ═══ */}
      <section className="py-24 md:py-32">
        <div className="shell">
          <AnimatedSection className="text-center mb-16">
            <span className="badge mb-4">Testimonials</span>
            <h2 className="font-serif text-4xl md:text-5xl text-ink font-light mt-4">
              What Our Clients Say
            </h2>
            <div className="gold-line mt-6" />
          </AnimatedSection>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-8 md:grid-cols-3"
          >
            {testimonials.map((t) => (
              <motion.div key={t.id} variants={fadeUp}>
                <div className="glass-card p-8 text-center h-full flex flex-col">
                  <span className="quote-icon">&ldquo;</span>
                  <p className="text-ink-light leading-relaxed text-sm flex-1 -mt-2">
                    {t.quote}
                  </p>
                  <div className="mt-6 pt-6 border-t border-gold/10">
                    <p className="font-serif text-lg text-ink">{t.name}</p>
                    <p className="text-xs text-gold tracking-wider uppercase mt-1">
                      {t.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-24 md:py-32 bg-ink text-white">
        <div className="shell text-center max-w-2xl mx-auto">
          <AnimatedSection>
            <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight">
              Experience the Essence
            </h2>
            <p className="mt-4 text-white/45 text-lg font-light">
              Find the fragrance that defines you. Browse our curated collection
              and place your order with ease.
            </p>
            <div className="mt-10">
              <Link
                to="/products"
                className="btn bg-gold text-white border border-gold hover:bg-gold-dark hover:-translate-y-0.5 transition-all shadow-gold"
              >
                Shop Collection
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
