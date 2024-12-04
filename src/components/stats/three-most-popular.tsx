"use client";

import { GetPokemon, RetrieveMostPopular } from "@/hooks/pokemon-hook";
import { PopularVoteApiResult } from "@/models/poke-api-results";
import { Pokemon } from "@/models/pokemon";
import Image from "next/image";
import ThreeMostPopularSkeleton from "./three-most-popularSkeleton";

export default function ThreeMostPopular() {
  const {
    data: dataFromDB,
    isLoading: isLoadingFromDB,
    isError: isErrorFromDB,
  } = RetrieveMostPopular();

  const [poke1, poke2, poke3] = dataFromDB?.mostPopular || [];

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

  if (isLoadingFromDB || poke1Loading || poke2Loading || poke3Loading) {
    return (
      <ThreeMostPopularSkeleton/>
    );
  }

  if (isErrorFromDB || isErrorPoke1 || isErrorPoke2 || isErrorPoke3) {
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
