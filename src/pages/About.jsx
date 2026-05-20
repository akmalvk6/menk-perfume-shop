export default function About() {
  return (
    <section className="shell grid gap-10 py-12 text-white lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-gold">About</p>
        <h1 className="font-display text-4xl font-semibold tracking-normal">Fragrance with a personal buying experience.</h1>
      </div>
      <div className="glass-panel rounded-lg p-6 text-base leading-8 text-white/65">
        <p>
          Menk.in brings perfumes, attars, and oudh into a simple online catalog where customers can explore products and place orders without a payment gateway.
        </p>
        <p>
          The shop owner receives every order on WhatsApp, confirms availability, collects payment through the preferred method, and updates the order status from the admin panel.
        </p>
      </div>
    </section>
  );
}
