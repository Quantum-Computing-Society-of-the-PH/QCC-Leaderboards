import "./App.css";
import { type Round, getOverallRanked, getRankedByRound } from "./participant";
import { Atom } from "lucide-react";
import { useState } from "react";
import Podium from "./components/Podium";
import LeaderboardTable from "./components/LeaderboardTable";

type Tab = Round | "overall";

const tabs: { key: Tab; label: string; color: string }[] = [
  { key: "easy", label: "Easy", color: "bg-easy/20 text-easy" },
  { key: "medium", label: "Medium", color: "bg-medium/20 text-medium" },
  { key: "hard", label: "Hard", color: "bg-hard/20 text-hard" },
  {
    key: "overall",
    label: "Overall",
    color: "bg-primary text-primary-foreground",
  },
];

function App() {
  const [active, setActive] = useState<Tab>("easy");
  const rows =
    active === "overall" ? getOverallRanked() : getRankedByRound(active);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center px-4 py-10 sm:py-16">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2 animate-slide-in">
          <Atom className="w-8 h-8 text-primary" />
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Circuit Crunch Leaderboard
          </h1>
        </div>
        <p
          className="text-muted-foreground text-sm mb-8 animate-slide-in"
          style={{ animationDelay: "100ms" }}
        >
          Live rankings across all rounds
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap justify-center">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`px-4 py-2 rounded-lg font-display text-sm font-semibold transition-all ${
                active === t.key
                  ? t.color
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Podium */}
        {rows.length >= 3 && <Podium top3={rows.slice(0, 3)} />}

        {/* Table */}
        <div className="w-full max-w-2xl bg-card rounded-xl border border-border overflow-hidden">
          <LeaderboardTable rows={rows} />
        </div>
      </div>
    </>
  );
}

export default App;
