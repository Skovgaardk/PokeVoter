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


export function processVotesByMinute(votes: Vote[]): Minute[] {
  const voteCounts = new Map<string, number>();

  votes.forEach((vote) => {
      const voteDate = new Date(vote.vote_date);

      const localVoteDate = new Date(voteDate.getTime() - voteDate.getTimezoneOffset() * 60000);
      
      const minuteKey = localVoteDate.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit', 
          hour12: false 
      });

      voteCounts.set(minuteKey, (voteCounts.get(minuteKey) || 0) + 1);
  });

  const result: Minute[] =  Array.from({ length: 60 }, (_, i) => {
      const pastMinute = new Date(Date.now() - i * 60 * 1000);
      const minuteKey = pastMinute.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit', 
          hour12: false 
      });

      return {
          minute: minuteKey,
          voteCount: voteCounts.get(minuteKey) || 0
      };
  }).reverse();

  return result;
}
  

type Hourly = {
  hour: string;
  voteCount: number;
};
export function processVotesByHour(votes: Vote[]): Hourly[] {
  const voteCounts = new Map<string, number>();

  votes.forEach((vote) => {
    const voteDate = new Date(vote.vote_date);
    
    const localVoteDate = new Date(voteDate.getTime() - voteDate.getTimezoneOffset() * 60000);
    
    const hourKey = localVoteDate.getHours().toString().padStart(2, '0');

    voteCounts.set(hourKey, (voteCounts.get(hourKey) || 0) + 1);
  });

  const processedHours: Hourly[] = Array.from({ length: 24 }, (_, i) => {
    const hourKey = i.toString().padStart(2, '0');

    return {
      hour: hourKey,
      voteCount: voteCounts.get(hourKey) || 0
    };
  });

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
      
      const localVoteDate = new Date(voteDate.getTime() - voteDate.getTimezoneOffset() * 60000);
      
      const dayKey = localVoteDate.toLocaleString('en-US', { 
          month: 'short', 
          day: '2-digit' 
      }).replace(',', '');

      voteCounts.set(dayKey, (voteCounts.get(dayKey) || 0) + 1);
  });

  const processedDays: Daily[] = Array.from({ length: 30 }, (_, i) => {
      const pastDay = new Date(Date.now() - i * 24 * 60 * 60000);
      const dayKey = pastDay.toLocaleString('en-US', { 
          month: 'short', 
          day: '2-digit' 
      }).replace(',', '');

      return {
          day: dayKey,
          voteCount: voteCounts.get(dayKey) || 0
      };
  }).reverse();

  return processedDays;
}
