import { motion } from "framer-motion";
import { Check, Circle } from "lucide-react";

export default function QuizOption({ label, selected, onSelect, multi, index }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onSelect}
      className={`w-full text-left flex items-center gap-4 px-5 py-4 rounded-xl border transition-all font-medium ${
        selected
          ? "border-primary/60 bg-primary/15 text-foreground glow-purple"
          : "border-border bg-secondary/30 text-muted-foreground hover:border-primary/30 hover:bg-secondary/50 hover:text-foreground"
      }`}
    >
      <div
        className={`flex-shrink-0 w-6 h-6 rounded-${multi ? "md" : "full"} border-2 flex items-center justify-center transition-all ${
          selected ? "border-primary bg-primary" : "border-muted-foreground/40"
        }`}
      >
        {selected && <Check className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={3} />}
      </div>
      <span className="text-sm md:text-base">{label}</span>
    </motion.button>
  );
}