import "./App.css";
import { type Round } from "./participant";
import { Atom } from "lucide-react";
import { useEffect, useState } from "react";
import Podium from "./components/Podium";
import LeaderboardTable from "./components/LeaderboardTable";

type Tab = Round | "overall";

export interface Participant {
  name: string;
  scores: Record<Tab, number>;
}

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
  const path = window.location.pathname.split("/")[2];
  const [active, setActive] = useState<Tab>((path as Tab) || "easy");
  const [isLoading, setIsLoading] = useState(true);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [rows, setRows] = useState<{ name: string; score: number }[]>([]);

  useEffect(() => {
    fetch(
      `https://docs.google.com/spreadsheets/d/1fbP6cAe33PF3VRhfmpsMuGiyIkQYCdIariZU-H0xedg/export?format=csv&gid=89917680`,
    )
      .then((res) => {
        res.text().then((data) => {
          const lines = data.split("\r\n").slice(1);
          const newParticipants: Participant[] = lines.map((line) => {
            const [name, easy, medium, hard, overall] = line.split(",");
            return {
              name,
              scores: {
                easy: parseInt(easy),
                medium: parseInt(medium),
                hard: parseInt(hard),
                overall: parseInt(overall),
              },
            };
          });
          setParticipants(newParticipants);
          setRows(
            newParticipants
              .map((p) => ({ name: p.name, score: p.scores[active] }))
              .sort((a, b) => b.score - a.score),
          );
        });
      })
      .catch((err) => {
        console.error("Failed to fetch participant data:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
              onClick={() => {
                window.history.pushState({}, "", `/QCC-Leaderboards/${t.key}`);
                setActive(t.key);
                setRows(
                  participants
                    .map((p) => ({ name: p.name, score: p.scores[t.key] }))
                    .sort((a, b) => b.score - a.score),
                );
              }}
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

        {isLoading ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : (
          <div className={`${isLoading ? "opacity-0" : "opacity-100"}`}>
            {/* Podium */}
            {rows.length >= 3 && <Podium top3={rows.slice(0, 3)} />}

            {/* Table */}
            <div className="w-full max-w-2xl bg-card rounded-xl border border-border overflow-hidden">
              <LeaderboardTable rows={rows} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
