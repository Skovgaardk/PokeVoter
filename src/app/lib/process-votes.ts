type Vote = {
  id: number;
  username: string;
  pokemon_1_id: number;
  pokemon_2_id: number;
  winner_id: number;
  vote_date: string;
};

type Minute = {
  minute: string;
  voteCount: number;
};


//This function does not work due to time zone issues
export function processVotesByMinute(votes: Vote[]): Minute[] {
    const voteCounts: { [minute: string]: number } = {};
  
    console.log("Votes per minute:", votes);
  
    votes.forEach((vote) => {
      const voteDate = new Date(vote.vote_date);
  

      const roundedMinute = new Date(voteDate.getTime() - voteDate.getTimezoneOffset() * 60000);
      const minuteKeyRounded = roundedMinute.toISOString().slice(11, 16);  
  
      voteCounts[minuteKeyRounded] = (voteCounts[minuteKeyRounded] || 0) + 1;
    });
    
    console.log("Vote counts per minute:", voteCounts);

    const result: Minute[] = [];
    const now = new Date();
  

    for (let i = 0; i < 60; i++) {
      const pastMinute = new Date(now.getTime() - i * 60 * 1000);
      

      const roundedPastMinute = new Date(pastMinute.getTime() - pastMinute.getTimezoneOffset() * 60000);
      const minuteKey = roundedPastMinute.toISOString().slice(11, 16); 
  
      result.unshift({
        minute: minuteKey,
        voteCount: voteCounts[minuteKey] || 0,
      });
    }
    
    console.log("Result per minute:", result);
    return result;
  }
  

type Hourly = {
  hour: string;
  voteCount: number;
};
export function processVotesByHour(votes: Vote[]): Hourly[] {
  const voteCounts: { [hour: string]: number } = {};

  votes.forEach((vote) => {
    const voteDate = new Date(vote.vote_date);
    const hourKey = voteDate.toISOString().slice(0, 13) + ":00";
    voteCounts[hourKey] = (voteCounts[hourKey] || 0) + 1;
  });

  const result: Hourly[] = [];
  const now = new Date();

  for (let i = 0; i < 24; i++) {
    const pastHour = new Date(now.getTime() - i * 60 * 60000);
    const hourKey = pastHour.toISOString().slice(0, 13) + ":00";

    result.unshift({
      hour: hourKey.replace("T", " "),
      voteCount: voteCounts[hourKey] || 0,
    });
  }

  return result;
}

type Daily = {
  day: string;
  voteCount: number;
};

export function processVotesByDay(votes: Vote[]): Daily[] {
  const voteCounts: { [day: string]: number } = {};

  votes.forEach((vote) => {
    const voteDate = new Date(vote.vote_date);
    const dayKey = voteDate.toISOString().slice(0, 10);
    voteCounts[dayKey] = (voteCounts[dayKey] || 0) + 1;
  });

  const result: Daily[] = [];
  const now = new Date();

  for (let i = 0; i < 30; i++) {
    const pastDay = new Date(now.getTime() - i * 24 * 60 * 60000);
    const dayKey = pastDay.toISOString().slice(0, 10);

    result.unshift({
      day: dayKey,
      voteCount: voteCounts[dayKey] || 0,
    });
  }

  return result;
}
