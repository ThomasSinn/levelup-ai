import { useState, useMemo } from "react";
import { FAKE_TEAM_MEMBERS } from "@/lib/fakeCompanyData";
import TeamOverview from "@/components/dashboard/TeamOverview";
import TeamMemberRow from "@/components/dashboard/TeamMemberRow";
import MemberDetailPanel from "@/components/dashboard/MemberDetailPanel";
import { Users, ChevronDown } from "lucide-react";

// The "logged-in" manager — change this id to switch perspective
const CURRENT_MANAGER_ID = "sm1";

export default function ManagerDashboard() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [expandedManagerId, setExpandedManagerId] = useState(CURRENT_MANAGER_ID);

  const me = useMemo(() => FAKE_TEAM_MEMBERS.find(m => m.id === CURRENT_MANAGER_ID), []);
  const directReports = useMemo(
    () => FAKE_TEAM_MEMBERS.filter(m => m.manager_id === CURRENT_MANAGER_ID),
    []
  );

  // Also pull skip-level (reports of reports) for context
  const directReportIds = directReports.map(r => r.id);
  const skipLevel = useMemo(
    () => FAKE_TEAM_MEMBERS.filter(m => directReportIds.includes(m.manager_id)),
    [directReportIds]
  );

  const allMyTeam = [...directReports, ...skipLevel];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-space text-3xl font-bold text-foreground mb-1">
            Team AI Dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            Viewing as <span className="text-foreground font-medium">{me?.full_name}</span> — {me?.role}, {me?.department}
          </p>
        </div>

        {/* Overview stats */}
        <TeamOverview team={allMyTeam} directReports={directReports} />

        {/* Two-panel layout */}
        <div className="mt-8 flex gap-6">
          {/* Left: team list */}
          <div className="flex-1 min-w-0">
            {/* Direct Reports */}
            <section className="mb-6">
              <div
                className="flex items-center justify-between mb-3 cursor-pointer group"
                onClick={() => setExpandedManagerId(prev => prev === CURRENT_MANAGER_ID ? null : CURRENT_MANAGER_ID)}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <h2 className="font-space font-semibold text-foreground">Direct Reports</h2>
                  <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                    {directReports.length}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expandedManagerId === CURRENT_MANAGER_ID ? "rotate-180" : ""}`} />
              </div>

              {expandedManagerId === CURRENT_MANAGER_ID && (
                <div className="space-y-2">
                  {directReports.map(member => (
                    <div key={member.id}>
                      <TeamMemberRow
                        member={member}
                        selected={selectedMember?.id === member.id}
                        onClick={() => setSelectedMember(prev => prev?.id === member.id ? null : member)}
                      />
                      {/* Skip-level under this TL */}
                      {FAKE_TEAM_MEMBERS.filter(m => m.manager_id === member.id).length > 0 && (
                        <div className="ml-6 mt-1 space-y-1 border-l border-border pl-4">
                          {FAKE_TEAM_MEMBERS.filter(m => m.manager_id === member.id).map(sub => (
                            <TeamMemberRow
                              key={sub.id}
                              member={sub}
                              selected={selectedMember?.id === sub.id}
                              onClick={() => setSelectedMember(prev => prev?.id === sub.id ? null : sub)}
                              compact
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right: detail panel */}
          {selectedMember && (
            <div className="w-[420px] shrink-0">
              <MemberDetailPanel
                member={selectedMember}
                onClose={() => setSelectedMember(null)}
                allMembers={FAKE_TEAM_MEMBERS}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}