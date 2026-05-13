import { TIER_CONFIG } from "@/lib/tierConfig";
import { ShieldAlert } from "lucide-react";

const ACCESS_ORDER = ["None","Basic","Standard","Advanced","Full"];
const TIER_ORDER   = ["Spark","Builder","Architect","Operator","Pioneer"];

export default function TeamMemberRow({ member, selected, onClick, compact = false }) {
  const tier = TIER_CONFIG[member.ai_tier] || {};
  const accessGap = ACCESS_ORDER.indexOf(member.access_level) < TIER_ORDER.indexOf(member.ai_tier);

  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-xl px-4 transition-all border ${
        compact ? "py-2.5" : "py-3.5"
      } ${
        selected
          ? "border-primary/50 bg-primary/10"
          : "border-border bg-card hover:border-primary/30 hover:bg-card/80"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Avatar + name */}
        <div className="flex items-center gap-3 min-w-0">
          <div className={`${compact ? "w-7 h-7 text-xs" : "w-9 h-9 text-sm"} rounded-full bg-secondary flex items-center justify-center font-semibold text-foreground shrink-0`}>
            {member.full_name.split(" ").map(n => n[0]).join("").slice(0,2)}
          </div>
          <div className="min-w-0">
            <div className={`font-medium text-foreground truncate ${compact ? "text-sm" : ""}`}>
              {member.full_name}
            </div>
            <div className="text-xs text-muted-foreground truncate">{member.role}</div>
          </div>
        </div>

        {/* Right side: tier + score + access gap */}
        <div className="flex items-center gap-3 shrink-0">
          {accessGap && (
            <ShieldAlert className="w-4 h-4 text-amber-400" title="Access gap" />
          )}
          <div className="text-right">
            <div className={`text-xs font-semibold ${tier.textColor || "text-foreground"}`}>
              {member.ai_tier}
            </div>
            <div className="text-xs text-muted-foreground">{member.ai_score}/100</div>
          </div>
          {/* Mini score bar */}
          <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${tier.barColor || "bg-primary"}`}
              style={{ width: `${member.ai_score}%` }}
            />
          </div>
        </div>
      </div>
    </button>
  );
}