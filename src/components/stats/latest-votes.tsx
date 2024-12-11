"use client";

import LatestVotesSkeleton from "./latest-votes-skeleton";
import { useEffect, useState } from "react";
import { createClient } from "../../../utils/supabase/client";
import type { LatestVoteResult } from "@/models/poke-api-results";

const supabase = createClient();
export default function LatestVotes() {
  const [data, setData] = useState<LatestVoteResult>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestVotes() {
      const { data: newestvotes, error } = await supabase
        .from("votes")
        .select(
          `
        id,
        username,
        pokemon_1_id,
        pokemon_2_id,
        vote_date,
        pokemon_1: pokemon_1_id(name),
        pokemon_2: pokemon_2_id(name)
          `
        )
        .order("vote_date", { ascending: false })
        .limit(4);

      if (error) {
        console.error("Error fetching latest votes: ", error);
        setError("Error fetching latest votes: " + error);
      } else {
        //TODO: make it so this error doesnt show
        setData(newestvotes);
      }
    }

    setIsLoading(true);
    fetchLatestVotes();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setIsLoading(false);
    }
  }, [data]);

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
        {data.map((vote) => {
          return (
            <div
              key={vote.id}
              className="flex h-1/5 rounded-2xl shadow-lg p-3 border border-[#423e47] bg-[#292f38]"
            >
              <div className="w-1/2 text-pretty break-words flex justify-center items-center">
                <h1 className="text-2xl">{vote.username}</h1>
              </div>

              <div className="w-96 ml-6 flex-col">
                <div className="flex justify-center text-center text-lg">
                  <h1 className="flex">
                    <span className="inline-block max-w-[10ch] truncate">
                      {vote.pokemon_1.name}
                    </span>
                    (won) vs
                    <span className="inline-block max-w-[10ch] truncate ml-2">
                      {vote.pokemon_2.name}
                    </span>
                  </h1>
                </div>
                <div className="flex justify-center text-lg">
                  <h1>
                    {new Date(vote.vote_date).toDateString()} at{" "}
                    {vote.vote_date.slice(11, 16)}
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
