import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TIERS } from "@/lib/quizData";
import { ChevronDown, ExternalLink, Zap, Code2, Bot, BookOpen, Target, Wrench } from "lucide-react";

const CATEGORY_CONFIG = {
  Tools: { icon: Wrench, color: "text-cyan-400", bg: "bg-cyan-400/10" },
  Prompting: { icon: Zap, color: "text-purple-400", bg: "bg-purple-400/10" },
  Automation: { icon: Bot, color: "text-amber-400", bg: "bg-amber-400/10" },
  Strategy: { icon: Target, color: "text-pink-400", bg: "bg-pink-400/10" },
  Learning: { icon: BookOpen, color: "text-green-400", bg: "bg-green-400/10" },
  Building: { icon: Code2, color: "text-blue-400", bg: "bg-blue-400/10" },
};

const DIFFICULTY_COLORS = {
  "Quick Win": "text-green-400 bg-green-400/10 border-green-400/20",
  "This Week": "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  "This Month": "text-purple-400 bg-purple-400/10 border-purple-400/20",
  "Long Game": "text-amber-400 bg-amber-400/10 border-amber-400/20",
};

export default function NextStepCard({ step, index, tier }) {
  const [expanded, setExpanded] = useState(false);
  const t = tier ? TIERS[tier] : null;
  const cat = CATEGORY_CONFIG[step.category] || CATEGORY_CONFIG.Tools;
  const Icon = cat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className={`rounded-xl border border-border bg-card hover:border-primary/30 transition-all cursor-pointer overflow-hidden`}
      onClick={() => setExpanded(e => !e)}
    >
      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className={`flex-shrink-0 w-9 h-9 rounded-lg ${cat.bg} flex items-center justify-center`}>
            <Icon className={`w-4 h-4 ${cat.color}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${DIFFICULTY_COLORS[step.difficulty] || "text-muted-foreground bg-muted border-border"}`}>
                {step.difficulty}
              </span>
              <span className={`text-xs ${cat.color}`}>{step.category}</span>
            </div>
            <h4 className="font-space font-semibold text-foreground text-sm leading-snug">
              {step.title}
            </h4>
          </div>
          <ChevronDown
            className={`flex-shrink-0 w-4 h-4 text-muted-foreground transition-transform mt-1 ${expanded ? "rotate-180" : ""}`}
          />
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
          {step.description}
        </p>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-border pt-4 space-y-4">
              {/* Specific Actions */}
              {step.specific_actions?.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Action Steps
                  </div>
                  <ul className="space-y-1.5">
                    {step.specific_actions.map((action, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <span className={`mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full ${t?.textColor || "text-primary"} bg-current`} />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Impact */}
              {step.impact && (
                <div className={`px-3 py-2 rounded-lg ${t?.bgColor || "bg-primary/10"} border ${t?.borderColor || "border-primary/20"}`}>
                  <span className="text-xs font-semibold text-muted-foreground">Impact: </span>
                  <span className="text-sm text-foreground">{step.impact}</span>
                </div>
              )}

              {/* Resources */}
              {step.resources?.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Resources
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {step.resources.map((r, i) => (
                      r.url ? (
                        <a
                          key={i}
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-secondary/40 hover:border-primary/40 hover:bg-secondary/60 transition-all text-xs font-medium text-foreground"
                        >
                          {r.name}
                          <ExternalLink className="w-3 h-3 text-muted-foreground" />
                        </a>
                      ) : (
                        <span
                          key={i}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-secondary/40 text-xs font-medium text-muted-foreground"
                        >
                          {r.name}
                        </span>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}