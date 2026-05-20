const fallbackNumber = "919999999999";

export function getWhatsAppNumber() {
  return (import.meta.env.VITE_WHATSAPP_NUMBER || fallbackNumber).replace(/\D/g, "");
}

export function buildWhatsAppUrl({ customerName, customerPhone, address, items, totalAmount }) {
  const itemLines = items
    .map((item) => `- ${item.name} x ${item.qty} = INR ${item.price * item.qty}`)
    .join("\n");
  const message = [
    "Assalamu alaikum, I want to place an order from Menk.in.",
    "",
    `Name: ${customerName}`,
    `Phone: ${customerPhone}`,
    `Address: ${address}`,
    "",
    "Items:",
    itemLines,
    "",
    `Total: INR ${totalAmount}`,
  ].join("\n");

  return `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
}
