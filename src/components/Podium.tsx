import { Trophy } from "lucide-react";

interface PodiumProps {
  top3: { name: string; score: number }[];
}

const medalColors = ["text-gold", "text-silver", "text-bronze"];

const podiumHeights = ["h-28", "h-20", "h-14"];
const podiumBgs = [
  "bg-gold/20 border-gold/40",
  "bg-silver/10 border-silver/30",
  "bg-bronze/10 border-bronze/30",
];

export default function Podium({ top3 }: PodiumProps) {
  // Display order: 2nd, 1st, 3rd
  const order = [top3[1], top3[0], top3[2]].filter(Boolean);
  const displayIndices = [1, 0, 2];

  return (
    <div className="flex items-end justify-center gap-3 sm:gap-6 mb-8">
      {order.map((p, i) => {
        const rank = displayIndices[i];
        return (
          <div
            key={p.name}
            className="flex flex-col items-center gap-2 animate-slide-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <Trophy className={`w-6 h-6 ${medalColors[rank]}`} />
            <span className="font-display font-bold text-sm sm:text-base text-foreground text-center leading-tight max-w-[90px]">
              {p.name}
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              {p.score} pts
            </span>
            <div
              className={`w-20 sm:w-24 ${podiumHeights[rank]} rounded-t-lg border-t-2 ${podiumBgs[rank]} flex items-center justify-center`}
            >
              <span
                className={`font-display text-2xl font-bold ${medalColors[rank]}`}
              >
                #{rank + 1}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
