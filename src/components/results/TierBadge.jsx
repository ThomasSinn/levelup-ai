import { motion } from "framer-motion";
import { TIERS } from "@/lib/quizData";
import { Star } from "lucide-react";

const TIER_ORDER = ["Spark", "Builder", "Architect", "Operator", "Pioneer"];

export default function TierBadge({ tier, large = false }) {
  const t = TIERS[tier];
  const tierIndex = TIER_ORDER.indexOf(tier);

  if (large) {
    return (
      <div className="flex flex-col items-center gap-3">
        <motion.div
          className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl border ${t.borderColor} ${t.bgColor}`}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-5xl">{t.emoji}</span>
          <div className="text-left">
            <div className="text-muted-foreground text-xs uppercase tracking-widest mb-1">AI Tier</div>
            <div className={`font-space text-4xl font-bold ${t.textColor}`}>{t.name}</div>
          </div>
        </motion.div>
        <div className="flex gap-1.5">
          {TIER_ORDER.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i <= tierIndex ? `bg-gradient-to-r ${t.color} w-8` : "bg-secondary w-4"
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${t.borderColor} ${t.bgColor}`}>
      <span className="text-base">{t.emoji}</span>
      <span className={`font-space font-semibold text-sm ${t.textColor}`}>{t.name}</span>
    </div>
  );
}