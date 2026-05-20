import { Mail, MapPin, MessageCircle } from "lucide-react";
import { getWhatsAppNumber } from "../utils/whatsapp.js";

export default function Contact() {
  const email = import.meta.env.VITE_STORE_EMAIL || "hello@menk.in";
  const address = import.meta.env.VITE_STORE_ADDRESS || "India";

  return (
    <section className="shell py-12 text-white">
      <p className="text-sm font-semibold uppercase tracking-wide text-gold">Contact</p>
      <h1 className="font-display text-4xl font-semibold tracking-normal">Talk to the shop</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <a href={`https://wa.me/${getWhatsAppNumber()}`} target="_blank" rel="noreferrer" className="glass-panel rounded-lg p-5 transition hover:-translate-y-1">
          <MessageCircle className="text-cyan" size={26} />
          <h2 className="mt-4 font-bold">WhatsApp</h2>
          <p className="mt-2 text-sm text-white/58">Fastest way to confirm orders and availability.</p>
        </a>
        <a href={`mailto:${email}`} className="glass-panel rounded-lg p-5 transition hover:-translate-y-1">
          <Mail className="text-cyan" size={26} />
          <h2 className="mt-4 font-bold">Email</h2>
          <p className="mt-2 text-sm text-white/58">{email}</p>
        </a>
        <div className="glass-panel rounded-lg p-5">
          <MapPin className="text-cyan" size={26} />
          <h2 className="mt-4 font-bold">Address</h2>
          <p className="mt-2 text-sm text-white/58">{address}</p>
        </div>
      </div>
    </section>
  );
}
