import { MessageCircle } from "lucide-react";

export default function WhatsAppButton({
  href,
  children = "Order on WhatsApp",
  disabled,
}) {
  if (disabled) {
    return (
      <button
        disabled
        className="btn bg-gold/40 text-white border border-gold/20 cursor-not-allowed opacity-50"
        aria-disabled="true"
      >
        <MessageCircle size={18} />
        {children}
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-primary inline-flex items-center gap-2"
    >
      <MessageCircle size={18} />
      {children}
    </a>
  );
}
