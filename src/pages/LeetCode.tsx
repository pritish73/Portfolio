import { useEffect, useMemo, useState } from "react";
import { ExternalLink, RefreshCw, Trophy, Flame, CheckCircle2 } from "lucide-react";
import ScrollFadeIn from "@/components/ScrollFadeIn";

const USERNAME = "PritishDutta";
const API_URL = `https://leetinfo-api.vercel.app/api/user?username=${USERNAME}`;

interface CountItem { difficulty: string; count: number; submissions?: number; }
interface LeetCodeStats {
  allQuestionsCount?: CountItem[];
  matchedUser?: {
    username?: string;
    firstName?: string;
    lastName?: string;
    profile?: { ranking?: number; realName?: string };
    submissionCalendar?: string;
    submitStatsGlobal?: { acSubmissionNum?: CountItem[] };
  };
}

export default function LeetCode() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadStats = async () => {
    setLoading(true); setError(false);
    try {
      const response = await fetch(`${API_URL}&_=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Unable to load LeetCode stats");
      const data = await response.json();
      setStats(data?.data ?? data);
    } catch { setError(true); } finally { setLoading(false); }
  };

  useEffect(() => { loadStats(); }, []);

  // leetinfo-api returns accepted-problem counts under submitStatsGlobal.acSubmissionNum.
  const solved = (difficulty: string) =>
    stats?.matchedUser?.submitStatsGlobal?.acSubmissionNum?.find((x) => x.difficulty === difficulty)?.count ?? 0;
  const total = (difficulty: string) =>
    stats?.allQuestionsCount?.find((x) => x.difficulty === difficulty)?.count ?? 0;
  const totalSolved = solved("All");
  const ranking = stats?.matchedUser?.profile?.ranking;
  const displayName = stats?.matchedUser?.profile?.realName || `${stats?.matchedUser?.firstName ?? ""} ${stats?.matchedUser?.lastName ?? ""}`.trim() || USERNAME;

  const heatmap = useMemo(() => {
    let activity: Record<string, number> = {};
    try { activity = JSON.parse(stats?.matchedUser?.submissionCalendar || "{}"); } catch { activity = {}; }
    return Array.from({ length: 364 }, (_, i) => {
      const date = new Date(); date.setHours(0, 0, 0, 0); date.setDate(date.getDate() - (363 - i));
      return { date, count: activity[String(Math.floor(date.getTime() / 1000))] || 0 };
    });
  }, [stats]);

  const heatLevel = (count: number) => count === 0 ? "bg-secondary" : count < 3 ? "bg-accent/30" : count < 7 ? "bg-accent/50" : count < 15 ? "bg-accent/75" : "bg-accent";

  return (
    <section id="leetcode" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollFadeIn>
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Problem Solving (Live Stats)</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">LeetCode Stats</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Live coding progress pulled from my public LeetCode profile.</p>
          </div>
        </ScrollFadeIn>

        {loading ? (
          <div className="min-h-[300px] flex items-center justify-center border border-border rounded-2xl bg-card/50"><div className="flex items-center gap-3 text-muted-foreground"><RefreshCw className="w-5 h-5 animate-spin" /> Loading live stats...</div></div>
        ) : error || !stats ? (
          <div className="text-center border border-border rounded-2xl p-10 bg-card/50"><p className="text-muted-foreground mb-5">Live LeetCode stats are temporarily unavailable.</p><button onClick={loadStats} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-accent hover:text-accent transition-colors"><RefreshCw className="w-4 h-4" /> Try again</button></div>
        ) : (
          <div className="space-y-6">
            <ScrollFadeIn><section className="bg-card border border-border rounded-2xl p-6 md:p-8"><div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"><div className="flex items-center gap-5"><div className="w-20 h-20 rounded-full border-4 border-accent/30 flex items-center justify-center text-2xl font-serif font-bold">{totalSolved}</div><div><h3 className="font-serif text-2xl font-bold">{displayName}</h3><p className="text-sm text-muted-foreground">@{USERNAME}</p></div></div><div className="flex flex-wrap gap-3">{ranking && <div className="px-4 py-3 rounded-xl bg-secondary/60"><Trophy className="w-4 h-4 text-accent inline mr-2" /><span className="text-sm">Rank #{ranking.toLocaleString()}</span></div>}<div className="px-4 py-3 rounded-xl bg-secondary/60"><Flame className="w-4 h-4 text-accent inline mr-2" /><span className="text-sm">Live Profile</span></div></div></div></section></ScrollFadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">{["Easy", "Medium", "Hard"].map((difficulty, index) => { const value = solved(difficulty); const max = total(difficulty); const pct = max ? Math.round((value / max) * 100) : 0; return <ScrollFadeIn key={difficulty} delay={index * 100}><div className="bg-card border border-border rounded-2xl p-6 h-full hover:border-accent/50 hover:-translate-y-1 transition-all duration-300"><div className="flex justify-between items-end mb-5"><div><p className="text-sm text-muted-foreground">{difficulty}</p><p className="font-serif text-3xl font-bold mt-1">{value}</p></div><span className="text-xs text-muted-foreground">{value} / {max}</span></div><div className="h-2 rounded-full bg-secondary overflow-hidden"><div className="h-full bg-accent rounded-full transition-all duration-1000" style={{ width: `${pct}%` }} /></div><p className="text-xs text-muted-foreground mt-3">{pct}% of available {difficulty.toLowerCase()} problems</p></div></ScrollFadeIn>; })}</div>

            <ScrollFadeIn delay={200}><section className="bg-card border border-border rounded-2xl p-6 md:p-8"><div className="flex items-center justify-between mb-5"><div><h3 className="font-serif text-xl font-bold">Activity</h3><p className="text-xs text-muted-foreground mt-1">Last 52 weeks</p></div><span className="text-xs text-muted-foreground">Less&nbsp; <span className="inline-block w-2.5 h-2.5 rounded-sm bg-secondary" /> <span className="inline-block w-2.5 h-2.5 rounded-sm bg-accent/30" /> <span className="inline-block w-2.5 h-2.5 rounded-sm bg-accent/50" /> <span className="inline-block w-2.5 h-2.5 rounded-sm bg-accent" /> &nbsp;More</span></div><div className="overflow-x-auto pb-1"><div className="grid grid-rows-7 grid-flow-col gap-1 min-w-[620px]">{heatmap.map((day) => <div key={day.date.toISOString()} title={`${day.count} submissions — ${day.date.toLocaleDateString()}`} className={`w-2.5 h-2.5 rounded-sm ${heatLevel(day.count)}`} />)}</div></div></section></ScrollFadeIn>

            <ScrollFadeIn delay={300}><section className="bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5"><div><div className="flex items-center gap-2 mb-2"><CheckCircle2 className="w-5 h-5 text-accent" /><h3 className="font-serif text-xl font-bold">Keep solving.</h3></div><p className="text-sm text-muted-foreground">Stats and activity update from the public profile when this section loads.</p></div><div className="flex gap-3"><button onClick={loadStats} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-accent hover:text-accent transition-colors"><RefreshCw className="w-4 h-4" /> Refresh</button><a href={`https://leetcode.com/u/${USERNAME}/`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition-opacity">View LeetCode <ExternalLink className="w-4 h-4" /></a></div></section></ScrollFadeIn>
          </div>
        )}
      </div>
    </section>
  );
}
