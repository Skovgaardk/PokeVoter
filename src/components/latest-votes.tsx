"use client";

import { RetrieveLatestVotes } from "@/hooks/pokemon-hook";
import { LatestVoteApiResult } from "@/models/poke-api-results";
export default function LatestVotes() {
  const { data, isLoading, isError } = RetrieveLatestVotes();

  if (isLoading) {
    return (
      <div className="h-full w-1/3 rounded-xl border text-card-foreground shadow p-4">
        <h1 className="text-3xl">Loading...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-full w-1/3 rounded-xl border text-card-foreground shadow p-4">
        <h1 className="text-3xl">Error</h1>
      </div>
    );
  }

  //TODO: make the height of the div dynamic based on the size of other divs
  return (
    <div className="h-full w-1/3 rounded-xl border text-card-foreground shadow p-4">
      <h2 className="text-2xl">Latest Votes</h2>
      <div className="h-96 flex flex-col justify-evenly gap-y-4 mt-2">
        {data.latestVotes.map((votes: LatestVoteApiResult) => {
          return (
            <div
              key={votes.id}
              className="flex border rounded-2xl shadow-lg p-4"
            >
              <h1 className="text-3xl">{votes.username}</h1>

              <div className="w-96 border ml-6 flex-col">
                <div className="flex justify-center">
                    <h1> {votes.pokemon_1_id} vs {votes.pokemon_2_id}</h1>
                </div>
                <div className="flex justify-center">
                    <h1>{votes.vote_date}</h1>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
