import { Zap, Users } from "lucide-react";

export default function QuizProgress({ current, total, userType }) {
  const pct = ((current) / total) * 100;

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {userType === "ic" ? <Zap className="w-3.5 h-3.5 text-primary" /> : <Users className="w-3.5 h-3.5 text-accent" />}
          <span className="font-medium">{userType === "ic" ? "Individual Contributor" : "Manager"} Track</span>
        </div>
        <span className="text-xs text-muted-foreground">{current}/{total}</span>
      </div>
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}