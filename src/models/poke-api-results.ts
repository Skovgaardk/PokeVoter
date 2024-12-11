export type PokeApiResult<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};


export type LatestVoteResult = {
  id: number;
  username: string;
  pokemon_1_id: number;
  pokemon_2_id: number;
  vote_date: string;
  pokemon_1: {
    name: string;
  };
  pokemon_2: {
    name: string;
  };
}[];

export type PopularVoteApiResult = {
  id: number;
  name: string;
  popularity: number;
}

export type RecentVotesResult = {
  id: number;
  username: string;
  pokemon_1_id: number;
  pokemon_2_id: number;
  winner_id: number;
  vote_date: string;
}[];