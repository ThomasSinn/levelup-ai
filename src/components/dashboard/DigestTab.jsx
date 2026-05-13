import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Mail, RefreshCw, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DigestTab({ me, allMyTeam }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    const response = await base44.functions.invoke("sendMonthlyDigest", {
      manager_id: me?.id,
      team: allMyTeam,
    });
    setResult(response.data);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="card-glow rounded-xl p-6 glass">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Mail className="w-5 h-5 text-primary" />
              <h2 className="font-space font-semibold text-foreground">Generate Monthly Digest</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Sends an AI-written team performance digest to{" "}
              <span className="text-foreground font-medium">{me?.email ?? "your email"}</span>.
            </p>
          </div>
          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Mail className="w-4 h-4 mr-2" />
            )}
            {loading ? "Generating…" : "Send Now"}
          </Button>
        </div>

        {result && (
          <div className="mt-5 flex items-start gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
            <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{result.message ?? "Digest sent successfully."}</span>
          </div>
        )}
      </div>

      {/* Team snapshot */}
      <div className="card-glow rounded-xl p-6 glass">
        <h3 className="font-space font-semibold text-foreground mb-4">Team Snapshot ({allMyTeam.length} members)</h3>
        <div className="divide-y divide-border">
          {allMyTeam.map(m => (
            <div key={m.id} className="flex items-center justify-between py-3 text-sm">
              <div>
                <span className="text-foreground font-medium">{m.full_name}</span>
                <span className="text-muted-foreground ml-2">{m.role}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">{m.ai_tier ?? "—"}</span>
                <span className="text-foreground font-medium">{m.ai_score ?? "—"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}