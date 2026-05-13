export const TIER_CONFIG = {
  Spark:     { emoji: "✨", textColor: "text-slate-300",  barColor: "bg-slate-400",  borderColor: "border-slate-500/40",  bgColor: "bg-slate-500/10",  nextTier: "Builder"   },
  Builder:   { emoji: "🔨", textColor: "text-cyan-300",   barColor: "bg-cyan-400",   borderColor: "border-cyan-500/40",   bgColor: "bg-cyan-500/10",   nextTier: "Architect" },
  Architect: { emoji: "🏗️", textColor: "text-purple-300", barColor: "bg-purple-400", borderColor: "border-purple-500/40", bgColor: "bg-purple-500/10", nextTier: "Operator"  },
  Operator:  { emoji: "⚡", textColor: "text-amber-300",  barColor: "bg-amber-400",  borderColor: "border-amber-500/40",  bgColor: "bg-amber-500/10",  nextTier: "Pioneer"   },
  Pioneer:   { emoji: "🚀", textColor: "text-pink-300",   barColor: "bg-pink-400",   borderColor: "border-pink-500/40",   bgColor: "bg-pink-500/10",   nextTier: null        },
};

export const NEXT_TIER_REQUIREMENTS = {
  Builder: [
    "Start using a dedicated AI coding tool (Cursor or GitHub Copilot) daily",
    "Write 5 complex, multi-step prompts this week",
    "Automate one repetitive task end-to-end using AI",
  ],
  Architect: [
    "Set up a local MCP server or use an existing one",
    "Build a multi-step AI workflow with context passing between steps",
    "Evaluate 3 different models for a task and document findings",
  ],
  Operator: [
    "Integrate AI into a production system or team workflow",
    "Create a prompt library or AI playbook for your team",
    "Experiment with AI agents that can run autonomously",
  ],
  Pioneer: [
    "Build and deploy an AI-powered feature used by others",
    "Contribute to team's AI strategy or best-practices doc",
    "Mentor a colleague to the Architect tier",
  ],
};

export const ACCESS_RECOMMENDATIONS = {
  Spark:     "None — Basic",
  Builder:   "Basic — Standard",
  Architect: "Standard",
  Operator:  "Advanced",
  Pioneer:   "Full",
};