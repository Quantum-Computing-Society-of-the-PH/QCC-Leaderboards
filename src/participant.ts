export type Round = "easy" | "medium" | "hard";

export interface Participant {
  name: string;
  scores: Record<Round, number>;
}

export const participants: Participant[] = [
  { name: "Maria Santos", scores: { easy: 50, medium: 40, hard: 30 } },
  { name: "Juan Dela Cruz", scores: { easy: 45, medium: 45, hard: 35 } },
  { name: "Ana Reyes", scores: { easy: 50, medium: 35, hard: 25 } },
  { name: "Carlos Garcia", scores: { easy: 40, medium: 50, hard: 20 } },
  { name: "Bea Lim", scores: { easy: 35, medium: 30, hard: 45 } },
  { name: "David Cruz", scores: { easy: 30, medium: 25, hard: 40 } },
  { name: "Elena Torres", scores: { easy: 50, medium: 20, hard: 15 } },
  { name: "Francis Tan", scores: { easy: 25, medium: 35, hard: 30 } },
];

export function getRankedByRound(round: Round) {
  return [...participants]
    .map((p) => ({ name: p.name, score: p.scores[round] }))
    .sort((a, b) => b.score - a.score);
}

export function getOverallRanked() {
  return [...participants]
    .map((p) => ({
      name: p.name,
      score: p.scores.easy + p.scores.medium + p.scores.hard,
    }))
    .sort((a, b) => b.score - a.score);
}
