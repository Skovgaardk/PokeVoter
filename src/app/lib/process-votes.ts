type Vote = {
  id: number;
  username: string;
  pokemon_1_id: number;
  pokemon_2_id: number;
  winner_id: number;
  vote_date: string;
};

type Hourly = {
  hour: string;
  voteCount: number;
};

export function processVotesByHour(votes: Vote[]): Hourly[] {
  if (votes.length === 0) return [];

  // Find the latest vote time to calculate the 24-hour window
  const latestVote = new Date(
    votes.reduce((latest, current) =>
      new Date(current.vote_date) > new Date(latest.vote_date)
        ? current
        : latest
    ).vote_date
  );

  const startTime = new Date(latestVote);
  startTime.setHours(startTime.getHours() - 24);

  const voteCounts = new Map<string, number>();

  // Count votes within the 24-hour window
  votes.forEach((vote) => {
    const voteDate = new Date(vote.vote_date);
    const localVoteDate = new Date(
      voteDate.getTime() - voteDate.getTimezoneOffset() * 60000
    );
    const hourKey = localVoteDate.getHours().toString().padStart(2, "0");
    voteCounts.set(hourKey, (voteCounts.get(hourKey) || 0) + 1);
  });

  const processedHours: Hourly[] = [];

  // This is a bit weird way of doing it, since it is actually not the last 24 hours, but the last 26 hours, but it works so fuck it.
  for (let i = 2; i < 26; i++) {
    const currentHour = new Date(startTime);
    currentHour.setHours(startTime.getHours() + i);

    const hourKey = currentHour.getHours().toString().padStart(2, "0");
    processedHours.push({
      hour: hourKey,
      voteCount: voteCounts.get(hourKey) || 0,
    });
  }

  return processedHours;
}

type Daily = {
  day: string;
  voteCount: number;
};

export function processVotesByDay(votes: Vote[]): Daily[] {
  const voteCounts = new Map<string, number>();

  votes.forEach((vote) => {
    const voteDate = new Date(vote.vote_date);

    const localVoteDate = new Date(
      voteDate.getTime() - voteDate.getTimezoneOffset() * 60000
    );

    const dayKey = localVoteDate
      .toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
      })
      .replace(",", "");

    voteCounts.set(dayKey, (voteCounts.get(dayKey) || 0) + 1);
  });

  const processedDays: Daily[] = Array.from({ length: 30 }, (_, i) => {
    const pastDay = new Date(Date.now() - i * 24 * 60 * 60000);
    const dayKey = pastDay
      .toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
      })
      .replace(",", "");

    return {
      day: dayKey,
      voteCount: voteCounts.get(dayKey) || 0,
    };
  }).reverse();

  return processedDays;
}
