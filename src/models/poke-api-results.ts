export type PokeApiResult<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};


export type LatestVoteApiResult = {
  id: number;
  username: string;
  pokemon_1_id: number;
  pokemon_2_id: number;
  winner_id: number;
  vote_date: string;
}