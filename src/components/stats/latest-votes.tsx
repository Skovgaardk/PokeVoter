"use client";

import LatestVotesSkeleton from "./latest-votes-skeleton";
import { GetLatestVotes } from "@/hooks/pokemon-hook";
import { LatestVoteResult } from "@/models/poke-api-results";

export default function LatestVotes() {
  const { data, isLoading, error } = GetLatestVotes();

  if (isLoading) {
    return <LatestVotesSkeleton />;
  }

  if (error) {
    return (
      <div className="h-full w-1/3 rounded-xl border text-card-foreground shadow p-4">
        <h1 className="text-3xl">Error</h1>
      </div>
    );
  }

  return (
    <div className="h-full w-1/2 rounded-xl border text-card-foreground shadow p-4 border-[#423e47]">
      <h2 className="text-2xl">Latest Votes</h2>
      {/* fix it so that this doesnt truncate but actually fits inside every time */}
      <div className="h-96 flex flex-col justify-evenly gap-y-4 mt-2">
        {data.map((vote: LatestVoteResult) => {
          return (
            <div
              key={vote.vote_id}
              className="flex h-1/5 rounded-2xl shadow-lg p-3 border border-[#423e47] bg-[#292f38]"
            >
              <div className="w-1/2 text-pretty break-words flex justify-center items-center ml-2">
                <h1 className="text-2xl">{vote.username}</h1>
              </div>

              <div className="w-96 ml-6 flex-col">
                <div className="flex justify-center text-center text-lg">
                  <h1 className="flex">
                    <span className="inline-block max-w-[10ch] truncate">
                      {vote.pokemon_1_name}
                    </span>
                    (won) vs
                    <span className="inline-block max-w-[10ch] truncate ml-2">
                      {vote.pokemon_2_name}
                    </span>
                  </h1>
                </div>
                <div className="flex justify-center text-lg">
                  <h1>
                    {vote.vote_date} at{" "}
                    {vote.vote_time}
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
