const fallbackNumber = "919999999999";

export function getWhatsAppNumber() {
  return (import.meta.env.VITE_WHATSAPP_NUMBER || fallbackNumber).replace(/\D/g, "");
}

export function buildWhatsAppUrl({ customerName, customerPhone, customerEmail, address, items, totalAmount }) {
  const itemLines = items
    .map((item) => {
      const sizeLabel = item.size ? ` (${item.size})` : "";
      return `- ${item.name}${sizeLabel} x ${item.qty} = INR ${item.price * item.qty}`;
    })
    .join("\n");

  const lines = [
    "Assalamu alaikum, I want to place an order from Menk.in.",
    "",
    `Name: ${customerName}`,
    `Phone: ${customerPhone}`,
  ];

  if (customerEmail) {
    lines.push(`Email: ${customerEmail}`);
  }

  lines.push(
    `Address: ${address}`,
    "",
    "Items:",
    itemLines,
    "",
    `Total: INR ${totalAmount}`,
  );

  const message = lines.join("\n");

  return `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
}
