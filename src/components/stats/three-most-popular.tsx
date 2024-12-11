"use client";

import { GetPokemon } from "@/hooks/pokemon-hook";
import { PopularVoteApiResult } from "@/models/poke-api-results";
import { Pokemon } from "@/models/pokemon";
import Image from "next/image";
import ThreeMostPopularSkeleton from "./three-most-popularSkeleton";
import { useEffect, useState } from "react";
import { createClient } from "../../../utils/supabase/client";

const supabase = createClient();

export default function ThreeMostPopular() {
  const [data, setData] = useState<PopularVoteApiResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMostPopular() {
      const { data: dbData, error } = await supabase
        .from("pokemon")
        .select("*")
        .order("popularity", { ascending: false })
        .limit(3);

      if (error) {
        console.error("Error fetching most popular: ", error);
        setError("Error fetching most popular: " + error);
      } else {
        //TODO: make it so this error doesnt show
        setData(dbData);
      }
    }
    fetchMostPopular();
  }, []);

  const [poke1, poke2, poke3] = Array.isArray(data) ? data : [];

  const {
    data: poke1Data,
    isLoading: poke1Loading,
    isError: isErrorPoke1,
  } = GetPokemon(`https://pokeapi.co/api/v2/pokemon/${poke1?.id}`);
  const {
    data: poke2Data,
    isLoading: poke2Loading,
    isError: isErrorPoke2,
  } = GetPokemon(`https://pokeapi.co/api/v2/pokemon/${poke2?.id}`);
  const {
    data: poke3Data,
    isLoading: poke3Loading,
    isError: isErrorPoke3,
  } = GetPokemon(`https://pokeapi.co/api/v2/pokemon/${poke3?.id}`);

  const PopularPokemonCard = ({
    title,
    pokeData,
    pokeDetails,
  }: {
    title: string;
    pokeData: Pokemon;
    pokeDetails: PopularVoteApiResult;
  }) => (
    <div className="flex flex-col h-full w-1/4 rounded-xl border text-card-foreground shadow p-4 items-center bg-[#292f38] shadow-sm border-[#423e47]">
      <div>
        <h1 className="text-3xl text-[#FFFFFF]">{title}</h1>
      </div>
      <div>
        <Image
          src={pokeData?.sprites?.front_default}
          width={160}
          height={160}
          alt="Picture of the pokemon"
        />
      </div>
      <h1 className="max-w-[300px] p-4 truncate text-card-foreground text-xl capitalize text-[#FFFFFF]">
        {pokeData?.name}
      </h1>
      <h1 className="max-w-[300px] p-4 truncate text-card-foreground text-xl capitalize text-[#FFFFFF]">
        With {pokeDetails?.popularity} votes
      </h1>
    </div>
  );

  if (poke1Loading || poke2Loading || poke3Loading) {
    return <ThreeMostPopularSkeleton />;
  }

  if (error || isErrorPoke1 || isErrorPoke2 || isErrorPoke3) {
    return (
      <div className="flex w-full place-content-evenly">
        <h1>Error...</h1>
        <h1>Error...</h1>
        <h1>Error...</h1>
      </div>
    );
  }

  return (
    <div className="flex w-full place-content-evenly">
      <PopularPokemonCard
        title="Most popular"
        pokeData={poke1Data}
        pokeDetails={poke1}
      />
      <PopularPokemonCard
        title="Second most popular"
        pokeData={poke2Data}
        pokeDetails={poke2}
      />
      <PopularPokemonCard
        title="Third most popular"
        pokeData={poke3Data}
        pokeDetails={poke3}
      />
    </div>
  );
}
