export const IC_QUESTIONS = [
  {
    id: "daily_usage",
    question: "How often do you use AI tools in your daily work?",
    emoji: "📅",
    options: [
      { label: "Rarely or never", value: 0 },
      { label: "A few times a week", value: 1 },
      { label: "Every day for specific tasks", value: 2 },
      { label: "All day, deeply integrated into my workflow", value: 3 }
    ]
  },
  {
    id: "chat_tools",
    question: "Which AI chat tools have you used seriously?",
    emoji: "💬",
    multi: true,
    options: [
      { label: "ChatGPT (basic web)", value: "chatgpt", score: 1 },
      { label: "Claude (claude.ai)", value: "claude", score: 1 },
      { label: "Gemini", value: "gemini", score: 1 },
      { label: "Claude API / Claude Code CLI", value: "claude_api", score: 3 },
      { label: "OpenAI API with custom setup", value: "openai_api", score: 3 },
      { label: "Local models (Ollama, LM Studio)", value: "local", score: 3 }
    ]
  },
  {
    id: "coding_ai",
    question: "How do you use AI for coding?",
    emoji: "💻",
    options: [
      { label: "I don't code", value: 0 },
      { label: "I copy-paste snippets from ChatGPT", value: 1 },
      { label: "I use Cursor or GitHub Copilot actively", value: 2 },
      { label: "I use Cursor Agent mode, Claude Code, or write custom prompts", value: 3 },
      { label: "I build full apps with AI, write CLAUDE.md files, manage context", value: 4 }
    ]
  },
  {
    id: "prompt_skills",
    question: "How would you describe your prompting ability?",
    emoji: "✍️",
    options: [
      { label: "I type basic questions and take what I get", value: 0 },
      { label: "I iterate and refine prompts until I get what I want", value: 1 },
      { label: "I use system prompts, roles, chain-of-thought techniques", value: 2 },
      { label: "I write structured prompt templates, few-shot examples, XML tags", value: 3 },
      { label: "I design prompt architectures and evaluate outputs systematically", value: 4 }
    ]
  },
  {
    id: "mcp_tools",
    question: "Have you used MCP (Model Context Protocol) tools or AI agents?",
    emoji: "🔌",
    options: [
      { label: "What is MCP?", value: 0 },
      { label: "I've heard of it but never used it", value: 1 },
      { label: "I've connected 1-2 MCP servers (filesystem, browser, etc.)", value: 2 },
      { label: "I actively use MCPs for file, web, or API access in my workflow", value: 3 },
      { label: "I build or configure custom MCP servers for specific use cases", value: 4 }
    ]
  },
  {
    id: "context_management",
    question: "How do you manage AI context and memory?",
    emoji: "🧠",
    options: [
      { label: "I start fresh every conversation", value: 0 },
      { label: "I copy-paste relevant info at the start of sessions", value: 1 },
      { label: "I keep .md files (CLAUDE.md, context docs) or use Projects/memory", value: 2 },
      { label: "I architect multi-file context systems with structured documentation", value: 3 }
    ]
  },
  {
    id: "workflow_automation",
    question: "Do you automate workflows with AI?",
    emoji: "⚙️",
    options: [
      { label: "No, I use AI manually for one-off tasks", value: 0 },
      { label: "I use Zapier, Make, or n8n with AI steps", value: 1 },
      { label: "I've built multi-step AI pipelines or chains", value: 2 },
      { label: "I design autonomous agent workflows that run without me", value: 3 }
    ]
  },
  {
    id: "design_ai",
    question: "How do you use AI for design, content, or creative work?",
    emoji: "🎨",
    options: [
      { label: "I don't use AI for this", value: 0 },
      { label: "I generate images or text occasionally", value: 1 },
      { label: "I use AI in my design process (Figma AI, Midjourney, etc.)", value: 2 },
      { label: "I've built AI-powered creative workflows or design systems", value: 3 }
    ]
  }
];

export const MANAGER_QUESTIONS = [
  {
    id: "team_ai_usage",
    question: "How would you describe your team's current AI adoption?",
    emoji: "👥",
    options: [
      { label: "Most people don't use AI at work", value: 0 },
      { label: "A few enthusiasts use it on their own", value: 1 },
      { label: "We encourage it but there's no structure", value: 2 },
      { label: "We have shared practices and regular sharing sessions", value: 3 },
      { label: "AI is embedded in our team processes and OKRs", value: 4 }
    ]
  },
  {
    id: "personal_ai",
    question: "Personally, how deeply do you use AI in your own work?",
    emoji: "🤔",
    options: [
      { label: "I mostly delegate AI work to others", value: 0 },
      { label: "I use ChatGPT/Claude for drafting and brainstorming", value: 1 },
      { label: "I actively use AI for strategy, analysis, and planning", value: 2 },
      { label: "I use advanced tools (API, agents, Claude Code) personally", value: 3 }
    ]
  },
  {
    id: "roi_measurement",
    question: "How does your team measure the ROI of AI usage?",
    emoji: "📊",
    options: [
      { label: "We don't measure it", value: 0 },
      { label: "We track it informally (gut feel, anecdotes)", value: 1 },
      { label: "We track time saved on specific tasks", value: 2 },
      { label: "We have dashboards and defined metrics for AI impact", value: 3 }
    ]
  },
  {
    id: "ai_strategy",
    question: "Does your team have an AI strategy or guiding principles?",
    emoji: "🗺️",
    options: [
      { label: "No formal strategy exists", value: 0 },
      { label: "We have informal guidelines", value: 1 },
      { label: "We have a written AI usage policy", value: 2 },
      { label: "We have a comprehensive AI strategy tied to business goals", value: 3 }
    ]
  },
  {
    id: "tooling_decisions",
    question: "How do you make decisions about which AI tools your team uses?",
    emoji: "🛠️",
    options: [
      { label: "People use whatever they want", value: 0 },
      { label: "I recommend tools I've heard are good", value: 1 },
      { label: "We evaluate tools with trials and compare options", value: 2 },
      { label: "We have a structured evaluation framework with security/privacy checks", value: 3 }
    ]
  },
  {
    id: "upskilling",
    question: "How do you upskill your team on AI?",
    emoji: "📚",
    options: [
      { label: "I don't — people figure it out themselves", value: 0 },
      { label: "I share articles and links occasionally", value: 1 },
      { label: "We do dedicated AI learning sessions or workshops", value: 2 },
      { label: "We have a structured AI learning curriculum and mentorship", value: 3 }
    ]
  },
  {
    id: "ai_in_hiring",
    question: "How does AI factor into your team's work and hiring?",
    emoji: "🤝",
    options: [
      { label: "It's not a consideration yet", value: 0 },
      { label: "It's a nice-to-have in job descriptions", value: 1 },
      { label: "AI skills are a real differentiator in hiring decisions", value: 2 },
      { label: "AI fluency is a core competency we assess and develop", value: 3 }
    ]
  },
  {
    id: "future_vision",
    question: "What's your vision for AI in your team in 12 months?",
    emoji: "🚀",
    options: [
      { label: "I haven't thought about it specifically", value: 0 },
      { label: "I want the team to be more comfortable with AI tools", value: 1 },
      { label: "I want AI to measurably improve team output by 20-30%", value: 2 },
      { label: "I'm building toward an AI-native team with autonomous workflows", value: 3 }
    ]
  }
];

export const TIERS = {
  Spark: {
    name: "Spark",
    emoji: "✨",
    color: "from-slate-400 to-slate-600",
    glowClass: "glow-muted",
    textColor: "text-slate-300",
    borderColor: "border-slate-500/40",
    bgColor: "bg-slate-500/10",
    range: [0, 20],
    tagline: "The fire is lit — now let it burn",
    description: "You're at the beginning of an exciting journey. You've started exploring AI but haven't yet unlocked its transformative potential."
  },
  Builder: {
    name: "Builder",
    emoji: "🔨",
    color: "from-blue-400 to-cyan-500",
    glowClass: "glow-cyan",
    textColor: "text-cyan-300",
    borderColor: "border-cyan-500/40",
    bgColor: "bg-cyan-500/10",
    range: [21, 45],
    tagline: "You're building momentum — go deeper",
    description: "You're actively using AI tools and seeing real value. You understand the basics and are ready to level up your skills significantly."
  },
  Architect: {
    name: "Architect",
    emoji: "🏗️",
    color: "from-purple-400 to-violet-600",
    glowClass: "glow-purple",
    textColor: "text-purple-300",
    borderColor: "border-purple-500/40",
    bgColor: "bg-purple-500/10",
    range: [46, 65],
    tagline: "You design systems, not just use tools",
    description: "You're integrating AI deeply into your work and building repeatable patterns. You think in workflows, not just individual prompts."
  },
  Operator: {
    name: "Operator",
    emoji: "⚡",
    color: "from-amber-400 to-orange-500",
    glowClass: "glow-amber",
    textColor: "text-amber-300",
    borderColor: "border-amber-500/40",
    bgColor: "bg-amber-500/10",
    range: [66, 82],
    tagline: "AI is your superpower — now scale it",
    description: "You operate at a high level with AI. You've built sophisticated workflows, understand the tools deeply, and drive real outcomes."
  },
  Pioneer: {
    name: "Pioneer",
    emoji: "🚀",
    color: "from-pink-400 to-rose-600",
    glowClass: "glow-pink",
    textColor: "text-pink-300",
    borderColor: "border-pink-500/40",
    bgColor: "bg-pink-500/10",
    range: [83, 100],
    tagline: "You're at the frontier — lead the way",
    description: "You're operating at the cutting edge of AI capability. You build, contribute, teach, and push boundaries that others haven't discovered yet."
  }
};

export function calculateScore(answers, userType) {
  const questions = userType === 'ic' ? IC_QUESTIONS : MANAGER_QUESTIONS;
  let totalPoints = 0;
  let maxPoints = 0;

  questions.forEach(q => {
    maxPoints += q.multi ? q.options.reduce((a, o) => a + o.score, 0) : Math.max(...q.options.map(o => o.value));
    const answer = answers[q.id];
    if (q.multi && Array.isArray(answer)) {
      answer.forEach(val => {
        const opt = q.options.find(o => o.value === val);
        if (opt) totalPoints += opt.score;
      });
    } else if (answer !== undefined) {
      totalPoints += answer;
    }
  });

  return Math.round((totalPoints / maxPoints) * 100);
}

export function getTierFromScore(score) {
  return Object.entries(TIERS).find(([, t]) => score >= t.range[0] && score <= t.range[1])?.[0] || 'Spark';
}