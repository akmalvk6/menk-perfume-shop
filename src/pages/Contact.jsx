import { Mail, MapPin, MessageCircle } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import { getWhatsAppNumber } from "../utils/whatsapp";

export default function Contact() {
  const phone = getWhatsAppNumber();
  const email = import.meta.env.VITE_STORE_EMAIL || "hello@menk.in";
  const address = import.meta.env.VITE_STORE_ADDRESS || "India";

  const cards = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: `+${phone}`,
      href: `https://wa.me/${phone}`,
      external: true,
    },
    {
      icon: Mail,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      external: false,
    },
    {
      icon: MapPin,
      label: "Visit Us",
      value: address,
      href: null,
      external: false,
    },
  ];

  return (
    <div className="pt-28 pb-20">
      <div className="shell">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="badge mb-4">Contact</span>
          <h1 className="font-serif text-4xl md:text-5xl text-ink font-light mt-4">
            Get in Touch
          </h1>
          <div className="gold-line mt-6" />
          <p className="mt-4 text-ink-light max-w-md mx-auto">
            We'd love to hear from you. Reach out through any of these channels.
          </p>
        </AnimatedSection>

        {/* Contact Cards */}
        <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
          {cards.map((card, i) => (
            <AnimatedSection key={card.label} delay={i * 0.1}>
              {card.href ? (
                <a
                  href={card.href}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noopener noreferrer" : undefined}
                  className="glass-card p-8 text-center block group"
                >
                  <div className="w-14 h-14 rounded-full border border-gold/20 flex items-center justify-center mx-auto mb-4 group-hover:border-gold/50 group-hover:bg-gold/5 transition-all">
                    <card.icon size={22} className="text-gold" />
                  </div>
                  <h3 className="font-serif text-lg text-ink mb-2">
                    {card.label}
                  </h3>
                  <p className="text-sm text-ink-light">{card.value}</p>
                </a>
              ) : (
                <div className="glass-card p-8 text-center">
                  <div className="w-14 h-14 rounded-full border border-gold/20 flex items-center justify-center mx-auto mb-4">
                    <card.icon size={22} className="text-gold" />
                  </div>
                  <h3 className="font-serif text-lg text-ink mb-2">
                    {card.label}
                  </h3>
                  <p className="text-sm text-ink-light">{card.value}</p>
                </div>
              )}
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
