interface Row {
  name: string;
  score: number;
}

const rankStyle = (i: number) => {
  if (i === 0) return "text-gold font-bold";
  if (i === 1) return "text-silver font-bold";
  if (i === 2) return "text-bronze font-bold";
  return "text-muted-foreground";
};

export default function LeaderboardTable({ rows }: { rows: Row[] }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
            <th className="py-3 px-4 w-16">Rank</th>
            <th className="py-3 px-4">Participant</th>
            <th className="py-3 px-4 text-right">Score</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={r.name}
              className="border-b border-border/50 hover:bg-secondary/50 transition-colors animate-slide-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <td className={`py-3 px-4 font-display ${rankStyle(i)}`}>
                #{i + 1}
              </td>
              <td className="py-3 px-4 font-medium text-foreground">
                {r.name}
              </td>
              <td className="py-3 px-4 text-right font-display font-semibold text-foreground">
                {r.score}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
