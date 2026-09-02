import { useEffect, useState } from "react";
import { ExternalLink, RefreshCw, Trophy, Flame } from "lucide-react";
import { ScrollFadeIn } from "@/components/ScrollFadeIn";

const USERNAME = "PritishDutta";
const API_URL = `https://leetinfo-api.vercel.app/api/user?username=${USERNAME}`;

interface CountItem { difficulty?: string; count?: number; submissions?: number; }
interface LeetCodeStats { allQuestionsCount?: CountItem[]; matchedUser?: { username?: string; firstName?: string; lastName?: string; profile?: { ranking?: number; realName?: string }; submitStatsGlobal?: { acSubmissionNum?: CountItem[] } } }

function findNestedValue(obj: unknown, key: string): any {
  if (!obj || typeof obj !== "object") return undefined;
  const record = obj as Record<string, any>;
  if (record[key] !== undefined) return record[key];
  for (const value of Object.values(record)) {
    const found = findNestedValue(value, key);
    if (found !== undefined) return found;
  }
  return undefined;
}

export default function LeetCode() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadStats = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`${API_URL}&_=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Failed to load LeetCode stats");
      const json = await response.json();
      setStats(json?.data ?? json);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadStats(); }, []);

  const accepted = (findNestedValue(stats, "acSubmissionNum") ?? []) as CountItem[];
  const questions = (findNestedValue(stats, "allQuestionsCount") ?? []) as CountItem[];
  const profile = (findNestedValue(stats, "profile") ?? {}) as { ranking?: number; realName?: string };

  const solved = (difficulty: string) => {
    const item = accepted.find(
      x => String(x?.difficulty ?? "").toLowerCase() === difficulty.toLowerCase()
    );
    return Number(item?.count ?? item?.submissions ?? 0);
  };

  const total = (difficulty: string) => {
    const item = questions.find(
      x => String(x?.difficulty ?? "").toLowerCase() === difficulty.toLowerCase()
    );
    return Number(item?.count ?? 0);
  };

  const totalSolved = solved("All") || solved("Easy") + solved("Medium") + solved("Hard");
  const name = profile.realName || USERNAME;

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
          <div className="min-h-[300px] flex items-center justify-center border border-border rounded-2xl bg-card/50">
            <div className="flex items-center gap-3 text-muted-foreground"><RefreshCw className="w-5 h-5 animate-spin" />Loading live stats...</div>
          </div>
        ) : error || !stats ? (
          <div className="text-center border border-border rounded-2xl p-10 bg-card/50">
            <p className="text-muted-foreground mb-5">Live LeetCode stats are temporarily unavailable.</p>
            <button onClick={loadStats} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-accent hover:text-accent transition-colors"><RefreshCw className="w-4 h-4" />Try again</button>
          </div>
        ) : (
          <div className="space-y-6">
            <ScrollFadeIn>
              <section className="bg-card border border-border rounded-2xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <div className="w-20 h-20 rounded-full border-4 border-accent/30 flex items-center justify-center text-2xl font-serif font-bold">{totalSolved}</div>
                    <div><h3 className="font-serif text-2xl font-bold">{name}</h3><p className="text-sm text-muted-foreground">@{USERNAME}</p></div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {profile.ranking && <div className="px-4 py-3 rounded-xl bg-secondary/60"><Trophy className="w-4 h-4 text-accent inline mr-2" /><span className="text-sm">Rank #{profile.ranking.toLocaleString()}</span></div>}
                    <div className="px-4 py-3 rounded-xl bg-secondary/60"><Flame className="w-4 h-4 text-accent inline mr-2" /><span className="text-sm">Live Profile</span></div>
                  </div>
                </div>
              </section>
            </ScrollFadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {["Easy", "Medium", "Hard"].map((difficulty, index) => {
                const value = solved(difficulty);
                const maximum = total(difficulty);
                const percentage = maximum ? Math.round((value / maximum) * 100) : 0;
                return (
                  <ScrollFadeIn key={difficulty} delay={index * 100}>
                    <div className="bg-card border border-border rounded-2xl p-6 h-full hover:border-accent/50 hover:-translate-y-1 transition-all duration-300">
                      <div className="flex justify-between items-end mb-5"><div><p className="text-sm text-muted-foreground">{difficulty}</p><p className="font-serif text-3xl font-bold mt-1">{value}</p></div><span className="text-xs text-muted-foreground">{value} / {maximum}</span></div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden"><div className="h-full bg-accent" style={{ width: `${percentage}%` }} /></div>
                    </div>
                  </ScrollFadeIn>
                );
              })}
            </div>

            <ScrollFadeIn delay={200}>
              <section className="bg-card border border-border rounded-2xl p-6 md:p-8 flex justify-end gap-3">
                <button onClick={loadStats} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-accent hover:text-accent transition-colors"><RefreshCw className="w-4 h-4" />Refresh</button>
                <a href={`https://leetcode.com/u/${USERNAME}/`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition-opacity">View LeetCode <ExternalLink className="w-4 h-4" /></a>
              </section>
            </ScrollFadeIn>
          </div>
        )}
      </div>
    </section>
  );
}
