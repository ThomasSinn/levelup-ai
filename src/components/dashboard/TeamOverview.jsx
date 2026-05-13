import { useMemo } from "react";
import { Users, TrendingUp, ShieldCheck, AlertTriangle } from "lucide-react";

const TIER_ORDER = ["Spark", "Builder", "Architect", "Operator", "Pioneer"];
const TIER_COLORS = {
  Spark:     "bg-slate-500",
  Builder:   "bg-cyan-500",
  Architect: "bg-purple-500",
  Operator:  "bg-amber-500",
  Pioneer:   "bg-pink-500",
};

export default function TeamOverview({ team, directReports }) {
  const avgScore = useMemo(() => {
    if (!team.length) return 0;
    return Math.round(team.reduce((s, m) => s + m.ai_score, 0) / team.length);
  }, [team]);

  const tierCounts = useMemo(() => {
    const counts = {};
    TIER_ORDER.forEach(t => (counts[t] = 0));
    team.forEach(m => { if (counts[m.ai_tier] !== undefined) counts[m.ai_tier]++; });
    return counts;
  }, [team]);

  const accessGaps = team.filter(m => {
    const tierIdx = TIER_ORDER.indexOf(m.ai_tier);
    const accessIdx = ["None","Basic","Standard","Advanced","Full"].indexOf(m.access_level);
    return accessIdx < tierIdx;
  }).length;

  const readyToCoach = directReports.filter(m =>
    TIER_ORDER.indexOf(m.ai_tier) >= 2
  ).length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
      <StatCard icon={Users} label="Total in Org" value={team.length} sub={`${directReports.length} direct reports`} color="text-primary" />
      <StatCard icon={TrendingUp} label="Avg AI Score" value={`${avgScore}`} sub="across your org" color="text-cyan-400" />
      <StatCard icon={ShieldCheck} label="Coach-Ready DRs" value={readyToCoach} sub="Architect tier or above" color="text-green-400" />
      <StatCard icon={AlertTriangle} label="Access Gaps" value={accessGaps} sub="tier ahead of access" color="text-amber-400" />

      {/* Tier distribution bar */}
      <div className="col-span-2 md:col-span-4 card-glow rounded-xl p-5 glass">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Tier Distribution</p>
        <div className="flex rounded-full overflow-hidden h-4 gap-0.5">
          {TIER_ORDER.map(tier => {
            const pct = team.length ? (tierCounts[tier] / team.length) * 100 : 0;
            return pct > 0 ? (
              <div
                key={tier}
                className={`${TIER_COLORS[tier]} transition-all`}
                style={{ width: `${pct}%` }}
                title={`${tier}: ${tierCounts[tier]}`}
              />
            ) : null;
          })}
        </div>
        <div className="flex flex-wrap gap-4 mt-3">
          {TIER_ORDER.map(tier => (
            <div key={tier} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className={`w-2.5 h-2.5 rounded-full ${TIER_COLORS[tier]}`} />
              {tier} <span className="text-foreground font-medium">{tierCounts[tier]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="card-glow rounded-xl p-5 glass">
      <Icon className={`w-5 h-5 ${color} mb-3`} />
      <div className="font-space text-2xl font-bold text-foreground">{value}</div>
      <div className="text-sm font-medium text-foreground mt-0.5">{label}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
    </div>
  );
}