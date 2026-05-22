import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function SlideToConfirm({ onConfirm, disabled, loading }) {
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const [maxDrag, setMaxDrag] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  const THUMB = 48;
  const PAD = 4;

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setMaxDrag(containerRef.current.offsetWidth - THUMB - PAD * 2);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const handleDragEnd = () => {
    if (disabled) return;
    if (x.get() >= maxDrag * 0.75) {
      animate(x, maxDrag, { duration: 0.15 });
      setConfirmed(true);
      onConfirm();
    } else {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 30 });
    }
  };

  /* ── Confirmed state ── */
  if (confirmed && !loading) {
    return (
      <div className="h-14 rounded-full bg-gold flex items-center justify-center gap-2 text-white text-sm font-medium tracking-wider">
        <Check size={18} />
        Order Confirmed!
      </div>
    );
  }

  /* ── Loading state ── */
  if (loading) {
    return (
      <div className="h-14 rounded-full bg-gold flex items-center justify-center gap-2 text-white text-sm font-medium tracking-wider">
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        Processing...
      </div>
    );
  }

  /* ── Slide track ── */
  return (
    <div
      ref={containerRef}
      className={`relative h-14 rounded-full border overflow-hidden select-none touch-none ${
        disabled ? "bg-ink/5 border-ink/10" : "bg-gold/8 border-gold/20"
      }`}
      style={{ padding: PAD }}
    >
      {/* Track label */}
      <span
        className={`absolute inset-0 flex items-center justify-center text-sm font-medium tracking-wider pointer-events-none ${
          disabled ? "text-ink/20" : "text-gold/40"
        }`}
      >
        {disabled ? "Fill all fields to order" : "Slide to Confirm →"}
      </span>

      {/* Draggable thumb */}
      <motion.div
        drag={disabled ? false : "x"}
        dragConstraints={{ left: 0, right: maxDrag || 0 }}
        dragElastic={0}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        style={{ x }}
        className={`relative z-10 flex items-center justify-center rounded-full ${
          disabled
            ? "w-12 h-[46px] bg-ink/15 text-ink/25 cursor-not-allowed"
            : "w-12 h-[46px] bg-gold text-white cursor-grab active:cursor-grabbing shadow-gold"
        }`}
      >
        <ArrowRight size={20} />
      </motion.div>
    </div>
  );
}
