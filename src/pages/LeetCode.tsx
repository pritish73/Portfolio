import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, RefreshCw, Trophy, Flame, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollFadeIn from "@/components/ScrollFadeIn";

const USERNAME = "PritishDutta";
const API_URL = `https://leetinfo-api.vercel.app/api/user?username=${USERNAME}`;

interface LeetCodeStats {
  allQuestionsCount?: Array<{ difficulty: string; count: number }>;
  matchedUser?: {
    username?: string;
    profile?: { ranking?: number; realName?: string };
    submitStatsGlobal?: { acSubmissionNum?: Array<{ difficulty: string; count: number }> };
  };
  [key: string]: any;
}

export default function LeetCode() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadStats = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(API_URL, { cache: "no-store" });
      if (!response.ok) throw new Error("Unable to load LeetCode stats");
      const data = await response.json();
      setStats(data?.data ?? data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadStats(); }, []);

  const solved = (difficulty: string) =>
    stats?.matchedUser?.submitStatsGlobal?.acSubmissionNum?.find((x) => x.difficulty === difficulty)?.count ?? 0;
  const total = (difficulty: string) =>
    stats?.allQuestionsCount?.find((x) => x.difficulty === difficulty)?.count ?? 0;
  const totalSolved = solved("All");
  const ranking = stats?.matchedUser?.profile?.ranking;

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 md:py-20">
      <div className="max-w-5xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>

        <ScrollFadeIn>
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Problem Solving</p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">LeetCode Stats</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">Live coding progress pulled from my public LeetCode profile.</p>
          </div>
        </ScrollFadeIn>

        {loading ? (
          <div className="min-h-[360px] flex items-center justify-center border border-border rounded-2xl bg-card/50">
            <div className="flex items-center gap-3 text-muted-foreground"><RefreshCw className="w-5 h-5 animate-spin" /> Loading live stats...</div>
          </div>
        ) : error || !stats ? (
          <div className="text-center border border-border rounded-2xl p-10 bg-card/50">
            <p className="text-muted-foreground mb-5">Live LeetCode stats are temporarily unavailable.</p>
            <button onClick={loadStats} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-accent hover:text-accent transition-colors"><RefreshCw className="w-4 h-4" /> Try again</button>
          </div>
        ) : (
          <div className="space-y-6">
            <ScrollFadeIn>
              <section className="bg-card border border-border rounded-2xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <div className="w-20 h-20 rounded-full border-4 border-accent/30 flex items-center justify-center text-2xl font-serif font-bold">{totalSolved}</div>
                    <div><h2 className="font-serif text-2xl font-bold">{stats.matchedUser?.profile?.realName || USERNAME}</h2><p className="text-sm text-muted-foreground">@{USERNAME}</p></div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {ranking && <div className="px-4 py-3 rounded-xl bg-secondary/60"><Trophy className="w-4 h-4 text-accent inline mr-2" /><span className="text-sm">Rank #{ranking.toLocaleString()}</span></div>}
                    <div className="px-4 py-3 rounded-xl bg-secondary/60"><Flame className="w-4 h-4 text-accent inline mr-2" /><span className="text-sm">Live Profile</span></div>
                  </div>
                </div>
              </section>
            </ScrollFadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {["Easy", "Medium", "Hard"].map((difficulty, index) => {
                const value = solved(difficulty); const max = total(difficulty); const pct = max ? Math.round((value / max) * 100) : 0;
                return <ScrollFadeIn key={difficulty} delay={index * 100}><div className="bg-card border border-border rounded-2xl p-6 h-full hover:border-accent/50 hover:-translate-y-1 transition-all duration-300"><div className="flex justify-between items-end mb-5"><div><p className="text-sm text-muted-foreground">{difficulty}</p><p className="font-serif text-3xl font-bold mt-1">{value}</p></div><span className="text-xs text-muted-foreground">{value} / {max}</span></div><div className="h-2 rounded-full bg-secondary overflow-hidden"><div className="h-full bg-accent rounded-full transition-all duration-1000" style={{ width: `${pct}%` }} /></div><p className="text-xs text-muted-foreground mt-3">{pct}% of available {difficulty.toLowerCase()} problems</p></div></ScrollFadeIn>;
              })}
            </div>

            <ScrollFadeIn delay={300}>
              <section className="bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <div><div className="flex items-center gap-2 mb-2"><CheckCircle2 className="w-5 h-5 text-accent" /><h3 className="font-serif text-xl font-bold">Keep solving.</h3></div><p className="text-sm text-muted-foreground">These numbers update from the public profile when this page loads.</p></div>
                <div className="flex gap-3"><button onClick={loadStats} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-accent hover:text-accent transition-colors"><RefreshCw className="w-4 h-4" /> Refresh</button><a href={`https://leetcode.com/u/${USERNAME}/`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition-opacity">View LeetCode <ExternalLink className="w-4 h-4" /></a></div>
              </section>
            </ScrollFadeIn>
          </div>
        )}
      </div>
    </main>
  );
}
