import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, Users, ArrowRight, Star, Trophy, Target } from "lucide-react";

const floatingOrbs = [
  { size: 300, x: "10%", y: "15%", color: "hsl(262 83% 68% / 0.15)", delay: 0 },
  { size: 200, x: "75%", y: "25%", color: "hsl(196 100% 55% / 0.12)", delay: 1 },
  { size: 250, x: "60%", y: "70%", color: "hsl(320 90% 65% / 0.10)", delay: 2 },
];

const tiers = [
  { name: "Spark", emoji: "✨", color: "text-slate-300" },
  { name: "Builder", emoji: "🔨", color: "text-cyan-300" },
  { name: "Architect", emoji: "🏗️", color: "text-purple-300" },
  { name: "Operator", emoji: "⚡", color: "text-amber-300" },
  { name: "Pioneer", emoji: "🚀", color: "text-pink-300" },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background orbs */}
      {floatingOrbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: orb.color,
            filter: "blur(60px)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4 + orb.delay, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
        />
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            AI Skills Ladder — Find your level
          </div>

          <h1 className="font-space text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Where are you on the{" "}
            <span className="gradient-text-purple">AI Skills Ladder?</span>
          </h1>

          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Take a 3-minute assessment. Get clustered into your tier. Receive a
            personalized roadmap of exactly what to learn next — powered by AI.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quiz?type=ic">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-space font-semibold text-lg glow-purple transition-all hover:bg-primary/90"
              >
                <Zap className="w-5 h-5" />
                I'm an Individual Contributor
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link to="/quiz?type=manager">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 px-8 py-4 border border-accent/50 text-accent bg-accent/10 rounded-xl font-space font-semibold text-lg transition-all hover:bg-accent/20"
              >
                <Users className="w-5 h-5" />
                I'm a Manager / Leader
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Tier Ladder Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-center text-muted-foreground text-sm font-medium uppercase tracking-widest mb-8">
            The 5 Tiers
          </h2>
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="flex-1 card-glow rounded-xl p-5 text-center glass"
              >
                <div className="text-3xl mb-2">{tier.emoji}</div>
                <div className={`font-space font-bold text-lg ${tier.color}`}>{tier.name}</div>
                <div className="flex justify-center mt-2 gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`w-3 h-3 ${j <= i ? tier.color : "text-muted"}`}
                      fill={j <= i ? "currentColor" : "none"}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            { icon: Target, title: "Personalized Tier", desc: "Get clustered into one of 5 AI skill tiers based on your real usage patterns" },
            { icon: Trophy, title: "AI-Generated Roadmap", desc: "Receive specific next steps for Claude Code, MCPs, Cursor, prompting & more" },
            { icon: Users, title: "IC & Manager Paths", desc: "Separate tracks for individual contributors and people leaders" },
          ].map((f, i) => (
            <div key={i} className="glass rounded-xl p-6 border border-border">
              <f.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-space font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}