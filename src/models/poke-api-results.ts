export type PokeApiResult<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};


export type LatestVoteApiResult = {
  vote_id: number;
  username: string;
  pokemon_1_name: string;
  pokemon_2_name: string;
  vote_date: string;
  vote_time: string;
}

export type PopularVoteApiResult = {
  id: number;
  name: string;
  popularity: number;
}