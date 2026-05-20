import { Mail, MapPin, MessageCircle } from "lucide-react";
import { getWhatsAppNumber } from "../utils/whatsapp.js";

export default function Contact() {
  const email = import.meta.env.VITE_STORE_EMAIL || "hello@menk.in";
  const address = import.meta.env.VITE_STORE_ADDRESS || "India";

  return (
    <section className="shell py-12">
      <p className="text-sm font-semibold uppercase tracking-wide text-saffron">Contact</p>
      <h1 className="font-display text-4xl font-bold tracking-normal">Talk to the shop</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <a href={`https://wa.me/${getWhatsAppNumber()}`} target="_blank" rel="noreferrer" className="rounded-lg border border-stone-200 bg-white p-5 hover:shadow-soft">
          <MessageCircle className="text-rosewood" size={26} />
          <h2 className="mt-4 font-bold">WhatsApp</h2>
          <p className="mt-2 text-sm text-stone-600">Fastest way to confirm orders and availability.</p>
        </a>
        <a href={`mailto:${email}`} className="rounded-lg border border-stone-200 bg-white p-5 hover:shadow-soft">
          <Mail className="text-rosewood" size={26} />
          <h2 className="mt-4 font-bold">Email</h2>
          <p className="mt-2 text-sm text-stone-600">{email}</p>
        </a>
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <MapPin className="text-rosewood" size={26} />
          <h2 className="mt-4 font-bold">Address</h2>
          <p className="mt-2 text-sm text-stone-600">{address}</p>
        </div>
      </div>
    </section>
  );
}
