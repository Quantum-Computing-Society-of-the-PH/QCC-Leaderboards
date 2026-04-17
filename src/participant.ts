export type Round = "easy" | "medium" | "hard";

export interface Participant {
  name: string;
  scores: Record<Round, number>;
}

export const participants: Participant[] = [];

export function getParticipants() {
  fetch(
    `https://docs.google.com/spreadsheets/d/1fbP6cAe33PF3VRhfmpsMuGiyIkQYCdIariZU-H0xedg/export?format=csv&gid=89917680`,
  ).then((res) => {
    res.text().then((data) => {
      const lines = data.split("\r\n").slice(1);
      const newParticipants: Participant[] = lines.map((line) => {
        const [name, easy, medium, hard] = line.split(",");
        return {
          name,
          scores: {
            easy: parseInt(easy),
            medium: parseInt(medium),
            hard: parseInt(hard),
          },
        };
      });
      participants.push(...newParticipants);
    });
  });
}

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
