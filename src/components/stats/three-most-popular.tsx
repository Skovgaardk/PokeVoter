"use client";

import { GetPokemon, RetrieveMostPopular } from "@/hooks/pokemon-hook";
import Image from "next/image";

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
  } = GetPokemon(
    `https://pokeapi.co/api/v2/pokemon/${poke1?.id}`
  );
  const {
    data: poke2Data,
    isLoading: poke2Loading,
    isError: isErrorPoke2,
  } = GetPokemon(
    `https://pokeapi.co/api/v2/pokemon/${poke2?.id}`
  );
  const {
    data: poke3Data,
    isLoading: poke3Loading,
    isError: isErrorPoke3,
  } = GetPokemon(
    `https://pokeapi.co/api/v2/pokemon/${poke3?.id}`
  );

  const Card = ({ name }: { name: string }) => (
    <div className="flex flex-col h-full w-1/4 rounded-xl border text-card-foreground shadow p-4">
      <h1 className="text-3xl">{name}</h1>
    </div>
  );

  if (isLoadingFromDB || poke1Loading || poke2Loading || poke3Loading) {
    return (
      <div className="flex w-full place-content-evenly">
        <Card name="loading..." />
        <Card name="loading..." />
        <Card name="loading..." />
      </div>
    );
  }

  if (isErrorFromDB || isErrorPoke1 || isErrorPoke2 || isErrorPoke3) {
    return (
      <div className="flex w-full place-content-evenly">
        <Card name="Error" />
        <Card name="Error" />
        <Card name="Error" />
      </div>
    );
  }

  return (
    <div className="flex w-full place-content-evenly">
        <div className="flex flex-col h-full w-1/4 rounded-xl border text-card-foreground shadow p-4 items-center">
        <div>
            <h1 className="text-3xl">Most popular</h1>
        </div>
            <div>
            <Image
                src={poke1Data.sprites.front_default}
                width={160}
                height={160}
                alt="Picture of the pokemon"
            />
            </div>
            <h1 className="max-w-[300px] p-4 truncate text-pokemon-yellow text-xl text-transform: capitalize">
            {poke1Data.name}
            </h1>
            <h1 className="max-w-[300px] p-4 truncate text-pokemon-yellow text-xl text-transform: capitalize">
            {poke1?.popularity}
            </h1>
        </div>
        <div className="flex flex-col h-full w-1/4 rounded-xl border text-card-foreground shadow p-4 items-center">
        <div>
            <h1 className="text-3xl">Second most popular</h1>
        </div>
            <div>
            <Image
                src={poke2Data.sprites.front_default}
                width={160}
                height={160}
                alt="Picture of the pokemon"
            />
            </div>
            <h1 className="max-w-[300px] p-4 truncate text-pokemon-yellow text-xl text-transform: capitalize">
            {poke2Data.name}
            </h1>
            <h1 className="max-w-[300px] p-4 truncate text-pokemon-yellow text-xl text-transform: capitalize">
            {poke2?.popularity}
            </h1>
        </div>
        <div className="flex flex-col h-full w-1/4 rounded-xl border text-card-foreground shadow p-4 items-center">
        <div>
            <h1 className="text-3xl">Third most popular</h1>
        </div>
            <div>
            <Image
                src={poke3Data.sprites.front_default}
                width={160}
                height={160}
                alt="Picture of the pokemon"
            />
            </div>
            <h1 className="max-w-[300px] p-4 truncate text-pokemon-yellow text-xl text-transform: capitalize">
            {poke3Data.name}
            </h1>
            <h1 className="max-w-[300px] p-4 truncate text-pokemon-yellow text-xl text-transform: capitalize">
            {poke3?.popularity}
            </h1>
        </div>
    </div>
  );
}
