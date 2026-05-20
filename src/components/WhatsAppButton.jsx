import { MessageCircle } from "lucide-react";

export default function WhatsAppButton({ href, children = "Order on WhatsApp", disabled }) {
  return (
    <a
      href={disabled ? undefined : href}
      target="_blank"
      rel="noreferrer"
      className={`btn-primary ${disabled ? "pointer-events-none opacity-60" : ""}`}
    >
      <MessageCircle size={18} />
      {children}
    </a>
  );
}
