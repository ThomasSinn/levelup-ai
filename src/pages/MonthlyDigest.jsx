import { FAKE_TEAM_MEMBERS } from "@/lib/fakeCompanyData";
import DigestTab from "@/components/dashboard/DigestTab.jsx";

const CURRENT_MANAGER_ID = "sm1";

export default function MonthlyDigestPage() {
  const me = FAKE_TEAM_MEMBERS.find(m => m.id === CURRENT_MANAGER_ID);
  const directReports = FAKE_TEAM_MEMBERS.filter(m => m.manager_id === CURRENT_MANAGER_ID);
  const directReportIds = directReports.map(r => r.id);
  const skipLevel = FAKE_TEAM_MEMBERS.filter(m => directReportIds.includes(m.manager_id));
  const allMyTeam = [...directReports, ...skipLevel];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="font-space text-3xl font-bold text-foreground mb-1">Monthly Digest</h1>
          <p className="text-muted-foreground text-sm">
            AI-written team insights, sent to managers on the 1st of each month.
          </p>
        </div>
        <DigestTab me={me} allMyTeam={allMyTeam} />
      </div>
    </div>
  );
}