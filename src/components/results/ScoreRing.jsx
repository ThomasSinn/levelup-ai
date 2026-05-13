import { motion } from "framer-motion";
import { TIERS } from "@/lib/quizData";
import { useEffect, useState } from "react";

export default function ScoreRing({ score, tier }) {
  const [displayScore, setDisplayScore] = useState(0);
  const t = TIERS[tier];
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (displayScore / 100) * circumference;

  useEffect(() => {
    let start = 0;
    const step = () => {
      start += 2;
      if (start <= score) {
        setDisplayScore(start);
        requestAnimationFrame(step);
      } else {
        setDisplayScore(score);
      }
    };
    requestAnimationFrame(step);
  }, [score]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="140" height="140" className="-rotate-90">
        <circle cx="70" cy="70" r="54" fill="none" stroke="hsl(var(--secondary))" strokeWidth="10" />
        <motion.circle
          cx="70"
          cy="70"
          r="54"
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          stroke={`url(#grad-${tier})`}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        />
        <defs>
          <linearGradient id={`grad-${tier}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={`hsl(var(--primary))`} />
            <stop offset="100%" stopColor={`hsl(var(--accent))`} />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <div className={`font-space text-3xl font-bold ${t.textColor}`}>{displayScore}</div>
        <div className="text-muted-foreground text-xs">/ 100</div>
      </div>
    </div>
  );
}