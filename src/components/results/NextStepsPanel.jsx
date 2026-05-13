import { motion } from "framer-motion";
import { TIERS } from "@/lib/quizData";
import NextStepCard from "./NextStepCard";
import { Loader2, Sparkles } from "lucide-react";

export default function NextStepsPanel({ steps, generating, tier, userType }) {
  const t = tier ? TIERS[tier] : null;

  if (generating) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-6">
        <div className="relative">
          <div className={`w-20 h-20 rounded-full border-2 ${t?.borderColor || "border-primary/30"} flex items-center justify-center`}>
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-primary-foreground" />
          </div>
        </div>
        <div className="text-center">
          <h3 className="font-space font-semibold text-foreground mb-2">Generating your roadmap...</h3>
          <p className="text-muted-foreground text-sm">
            AI is crafting personalized next steps for a {tier} {userType === "ic" ? "IC" : "Manager"}
          </p>
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!steps || steps.length === 0) return null;

  const quickWins = steps.filter(s => s.difficulty === "Quick Win");
  const thisWeek = steps.filter(s => s.difficulty === "This Week");
  const thisMonth = steps.filter(s => s.difficulty === "This Month");
  const longGame = steps.filter(s => s.difficulty === "Long Game");

  const groups = [
    { label: "⚡ Quick Wins", items: quickWins, color: "text-green-400" },
    { label: "📅 This Week", items: thisWeek, color: "text-cyan-400" },
    { label: "🗓️ This Month", items: thisMonth, color: "text-purple-400" },
    { label: "🎯 Long Game", items: longGame, color: "text-amber-400" },
  ].filter(g => g.items.length > 0);

  return (
    <div className="space-y-12">
      {groups.map((group, gi) => (
        <div key={group.label}>
          <h3 className={`font-space font-semibold text-lg mb-5 ${group.color}`}>
            {group.label}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {group.items.map((step, i) => (
              <NextStepCard
                key={i}
                step={step}
                index={gi * 10 + i}
                tier={tier}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}