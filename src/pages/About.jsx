import { Link } from "react-router-dom";
import AnimatedSection from "../components/AnimatedSection";

export default function About() {
  return (
    <div className="pt-28 pb-20">
      <div className="shell">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="badge mb-4">About Us</span>
          <h1 className="font-serif text-4xl md:text-5xl text-ink font-light mt-4">
            The Art of Fragrance
          </h1>
          <div className="gold-line mt-6" />
        </AnimatedSection>

        {/* Content Grid */}
        <div className="grid gap-16 lg:grid-cols-2 items-start max-w-5xl mx-auto">
          <AnimatedSection>
            <h2 className="font-serif text-3xl text-ink font-light mb-6">
              A Personal Buying Experience
            </h2>
            <p className="text-ink-light leading-relaxed text-lg font-light mb-6">
              Menk.in is a curated fragrance catalog — a place to discover your
              next signature scent. We don't rush you through a checkout.
              Instead, we believe in conversation.
            </p>
            <p className="text-ink-light leading-relaxed text-lg font-light">
              Every fragrance we offer is hand-selected for its character,
              longevity, and the impression it leaves. We connect with you
              personally to guide you toward your perfect scent.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="glass-card p-8">
              <h3 className="font-serif text-xl text-ink mb-6">How It Works</h3>
              <ul className="space-y-5">
                {[
                  "Browse our curated collection of perfumes, attars & oudh",
                  "Place your order directly through WhatsApp",
                  "Receive personal confirmation and shipping updates",
                  "Pay via UPI or Cash on Delivery — simple and secure",
                ].map((text, i) => (
                  <li key={i} className="flex gap-4 text-ink-light text-sm leading-relaxed">
                    <span className="text-gold font-serif text-lg leading-none mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {text}
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-gold/10">
                <Link to="/products" className="btn-outline-gold w-full justify-center">
                  Explore Collection
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
