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
    <div className="h-full w-1/2 rounded-xl border text-card-foreground shadow p-4 border-[#423e47]">
      <h2 className="text-2xl">Latest Votes</h2>
      {/* fix it so that this doesnt truncate but actually fits inside every time */}
      <div className="h-96 flex flex-col justify-evenly gap-y-4 mt-2">
        {data.latestVotes.map((votes: LatestVoteApiResult) => {
          return (
            <div key={votes.vote_id} className="flex rounded-2xl shadow-lg p-3 border border-[#423e47] bg-[#292f38]">
              <div className="w-1/2 text-pretty break-words flex justify-center items-center">
                <h1 className="text-2xl">{votes.username}</h1>
              </div>

              <div className="w-96 ml-6 flex-col">
                <div className="flex justify-center text-center text-lg">
                  <h1>
                    {votes.pokemon_1_name} (winner) vs {votes.pokemon_2_name}
                  </h1>
                </div>
                <div className="flex justify-center text-lg">
                  <h1>
                    {new Date(votes.vote_date).toDateString()}, {votes.vote_time} UTC
                  </h1>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
