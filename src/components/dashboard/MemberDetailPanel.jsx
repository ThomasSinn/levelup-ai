import { useState } from "react";
import { TIER_CONFIG, NEXT_TIER_REQUIREMENTS, ACCESS_RECOMMENDATIONS } from "@/lib/tierConfig";
import { base44 } from "@/api/base44Client";
import { X, Sparkles, ShieldCheck, ShieldAlert, Copy, Check, Loader2, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ACCESS_ORDER = ["None", "Basic", "Standard", "Advanced", "Full"];
const TIER_ORDER   = ["Spark", "Builder", "Architect", "Operator", "Pioneer"];

export default function MemberDetailPanel({ member, onClose }) {
  const [coachingTips, setCoachingTips] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const tier = TIER_CONFIG[member.ai_tier] || {};
  const tierIdx = TIER_ORDER.indexOf(member.ai_tier);
  const accessIdx = ACCESS_ORDER.indexOf(member.access_level);
  const accessGap = accessIdx < tierIdx;
  const requirements = NEXT_TIER_REQUIREMENTS[tier.nextTier] || [];

  const generateTips = async () => {
    setLoading(true);
    setActiveTab("tips");
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `You are an expert AI skills coach helping a manager prepare for a 1:1 with a team member.

Team member: ${member.full_name}
Role: ${member.role}, ${member.department}
Current AI Tier: ${member.ai_tier} (score: ${member.ai_score}/100)
Next Tier Target: ${tier.nextTier || "They are already at the top tier — Pioneer"}
AI Tools they use: ${member.tools_used.length ? member.tools_used.join(", ") : "None yet"}
Current AI Access Level: ${member.access_level}

Write a set of practical 1:1 talking points and coaching notes for their manager. Include:
1. One opening check-in question about their AI usage
2. Two specific coaching observations based on their tier and tools
3. Two actionable challenges to set for the next 2 weeks
4. One recommended resource (tool, tutorial, or practice)
5. A suggested access level upgrade if needed, with justification

Be specific, direct, and concise. Write in a tone suitable to paste directly into a 1:1 doc.`,
      response_json_schema: {
        type: "object",
        properties: {
          check_in_question: { type: "string" },
          coaching_observations: { type: "array", items: { type: "string" } },
          two_week_challenges: { type: "array", items: { type: "string" } },
          recommended_resource: { type: "string" },
          access_recommendation: { type: "string" },
          one_on_one_summary: { type: "string" },
        },
      },
    });
    setCoachingTips(result);
    setLoading(false);
  };

  const copyToClipboard = () => {
    if (!coachingTips) return;
    const text = `1:1 Notes — ${member.full_name} (${member.ai_tier} tier, score ${member.ai_score}/100)

CHECK-IN QUESTION
${coachingTips.check_in_question}

COACHING OBSERVATIONS
${coachingTips.coaching_observations.map((o, i) => `${i + 1}. ${o}`).join("\n")}

2-WEEK CHALLENGES
${coachingTips.two_week_challenges.map((c, i) => `${i + 1}. ${c}`).join("\n")}

RECOMMENDED RESOURCE
${coachingTips.recommended_resource}

ACCESS LEVEL NOTE
${coachingTips.access_recommendation}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="card-glow glass rounded-2xl overflow-hidden sticky top-20"
    >
      {/* Header */}
      <div className={`p-5 border-b border-border ${tier.bgColor}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center font-bold text-foreground">
              {member.full_name.split(" ").map(n => n[0]).join("").slice(0,2)}
            </div>
            <div>
              <div className="font-space font-bold text-foreground">{member.full_name}</div>
              <div className="text-xs text-muted-foreground">{member.role} · {member.department}</div>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tier + score */}
        <div className="flex items-center gap-4">
          <div>
            <div className={`font-space font-bold text-xl ${tier.textColor}`}>
              {tier.emoji} {member.ai_tier}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">Score: {member.ai_score}/100</div>
          </div>
          <div className="flex-1">
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${member.ai_score}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-full rounded-full ${tier.barColor}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border text-sm">
        {["overview", "tips"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 font-medium capitalize transition-colors ${
              activeTab === tab
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "tips" ? "1:1 Tips" : "Overview"}
          </button>
        ))}
      </div>

      <div className="p-5 max-h-[60vh] overflow-y-auto space-y-5">
        {activeTab === "overview" && (
          <>
            {/* Tools */}
            <Section title="Tools Used">
              {member.tools_used.length ? (
                <div className="flex flex-wrap gap-2">
                  {member.tools_used.map(tool => (
                    <span key={tool} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
                      {tool}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">No AI tools used yet</p>
              )}
            </Section>

            {/* Access */}
            <Section title="Access Level">
              <div className={`flex items-center gap-2 p-3 rounded-lg ${accessGap ? "bg-amber-500/10 border border-amber-500/30" : "bg-secondary"}`}>
                {accessGap
                  ? <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                  : <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
                }
                <div className="text-sm">
                  <span className="font-medium text-foreground">{member.access_level}</span>
                  {accessGap && (
                    <span className="text-amber-400 ml-2">→ Recommend upgrading to {ACCESS_RECOMMENDATIONS[member.ai_tier]}</span>
                  )}
                </div>
              </div>
            </Section>

            {/* Next tier path */}
            {tier.nextTier && (
              <Section title={`Path to ${tier.nextTier}`}>
                <div className="space-y-2">
                  {requirements.map((req, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {req}
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Generate CTA */}
            <button
              onClick={generateTips}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-space font-semibold glow-purple hover:bg-primary/90 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Generate 1:1 Coaching Tips
            </button>
          </>
        )}

        {activeTab === "tips" && (
          <>
            {loading && (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="text-sm text-muted-foreground">Crafting coaching tips...</p>
              </div>
            )}

            {!loading && !coachingTips && (
              <div className="text-center py-12">
                <Sparkles className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-4">No tips generated yet.</p>
                <button
                  onClick={generateTips}
                  className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all"
                >
                  Generate Now
                </button>
              </div>
            )}

            <AnimatePresence>
              {!loading && coachingTips && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <TipBlock label="Check-In Question" content={coachingTips.check_in_question} />
                  <TipBlock label="Coaching Observations" items={coachingTips.coaching_observations} />
                  <TipBlock label="2-Week Challenges" items={coachingTips.two_week_challenges} />
                  <TipBlock label="Recommended Resource" content={coachingTips.recommended_resource} />
                  {coachingTips.access_recommendation && (
                    <TipBlock label="Access Level Note" content={coachingTips.access_recommendation} highlight={accessGap} />
                  )}

                  <button
                    onClick={copyToClipboard}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-secondary transition-all"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied!" : "Copy to 1:1 Doc"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </motion.div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{title}</p>
      {children}
    </div>
  );
}

function TipBlock({ label, content, items, highlight }) {
  return (
    <div className={`rounded-lg p-3 ${highlight ? "bg-amber-500/10 border border-amber-500/30" : "bg-secondary"}`}>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{label}</p>
      {content && <p className="text-sm text-foreground leading-relaxed">{content}</p>}
      {items && (
        <ul className="space-y-1.5">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground">
              <span className="text-primary font-bold shrink-0">{i + 1}.</span>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}