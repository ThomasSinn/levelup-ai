import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { TIERS } from "@/lib/quizData";
import TierBadge from "@/components/results/TierBadge";
import NextStepsPanel from "@/components/results/NextStepsPanel";
import ScoreRing from "@/components/results/ScoreRing";
import { Sparkles, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

export default function Results() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [nextSteps, setNextSteps] = useState(null);

  useEffect(() => {
    loadAssessment();
  }, [id]);

  const loadAssessment = async () => {
    const data = await base44.entities.UserAssessment.filter({ id });
    if (data && data.length > 0) {
      const a = data[0];
      setAssessment(a);
      if (a.next_steps && a.next_steps.length > 0) {
        setNextSteps(a.next_steps);
      } else {
        generateNextSteps(a);
      }
    }
  };

  const generateNextSteps = async (a) => {
    setGenerating(true);
    const tier = TIERS[a.tier];
    const isIC = a.user_type === "ic";

    const prompt = `You are an expert AI skills coach. A user has just completed an AI skills assessment.

CONTEXT:
- Role type: ${isIC ? "Individual Contributor (IC)" : "Manager / Team Lead"}
- Tier: ${a.tier} (${tier.tagline})
- Score: ${a.score}/100
- Tier description: ${tier.description}
- Their quiz answers: ${JSON.stringify(a.answers)}

Generate 6 specific, actionable next steps to help this person level up their AI skills. 
Each step should reference real tools, techniques, or resources.

For the "${a.tier}" tier at ${isIC ? "IC" : "Manager"} level, focus on:
${isIC ? `
- Spark (0-20): Basic ChatGPT/Claude usage, simple prompting, first automation
- Builder (21-45): Cursor IDE, GitHub Copilot, prompt templates, basic MCPs  
- Architect (46-65): Claude Code, MCP servers, CLAUDE.md files, workflow automation
- Operator (66-82): Autonomous agents, custom MCP builds, multi-model pipelines, API usage
- Pioneer (83-100): Contributing to AI tools, building AI products, advanced agent architectures
` : `
- Spark (0-20): Personal AI adoption, sharing with team, basic policy
- Builder (21-45): Team AI guidelines, usage tracking, regular learning sessions
- Architect (46-65): AI strategy, ROI measurement, structured tooling evaluation
- Operator (66-82): AI-native workflows, hiring for AI skills, cross-team AI programs
- Pioneer (83-100): Org-level AI transformation, building AI centers of excellence
`}

Return a JSON array of exactly 6 objects with this schema:
{
  "steps": [
    {
      "title": "Short action title (max 8 words)",
      "category": "one of: Tools, Prompting, Automation, Strategy, Learning, Building",
      "difficulty": "one of: Quick Win, This Week, This Month, Long Game",
      "description": "2-3 sentence description of what to do and why it matters",
      "specific_actions": ["3-4 very specific bullet actions they can take immediately"],
      "resources": [
        { "name": "Resource name", "url": "actual real URL if known, else empty string", "type": "one of: Course, Tool, Docs, Tutorial, Community" }
      ],
      "impact": "One sentence on the measurable impact of completing this"
    }
  ]
}`;

    const result = await base44.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: {
        type: "object",
        properties: {
          steps: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                category: { type: "string" },
                difficulty: { type: "string" },
                description: { type: "string" },
                specific_actions: { type: "array", items: { type: "string" } },
                resources: { type: "array", items: { type: "object" } },
                impact: { type: "string" }
              }
            }
          }
        }
      }
    });

    const steps = result.steps || [];
    setNextSteps(steps);

    await base44.entities.UserAssessment.update(a.id, {
      next_steps: steps,
      completed: true
    });

    setGenerating(false);
  };

  if (!assessment) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const tier = TIERS[assessment.tier];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero section */}
      <div className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, hsl(var(--primary)) 0%, transparent 70%)`
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 py-16 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <TierBadge tier={assessment.tier} large />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <p className={`font-space text-lg font-medium mt-4 mb-2 ${tier.textColor}`}>
              {tier.tagline}
            </p>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {tier.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-8"
          >
            <ScoreRing score={assessment.score} tier={assessment.tier} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground"
          >
            <span className="capitalize">{assessment.user_type === "ic" ? "Individual Contributor" : "Manager"} Track</span>
            <span>·</span>
            <Link to="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
              <RotateCcw className="w-3 h-3" />
              Retake
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-3 mb-8"
        >
          <Sparkles className="w-6 h-6 text-primary" />
          <h2 className="font-space text-2xl font-bold text-foreground">
            Your Personalized Roadmap
          </h2>
        </motion.div>

        <NextStepsPanel
          steps={nextSteps}
          generating={generating}
          tier={assessment.tier}
          userType={assessment.user_type}
        />
      </div>
    </div>
  );
}