"use client";

import { Pokemon } from "@/models/pokemon";
import Image from "next/image";

type PokemonViewProps = {
  pokemon: Pokemon;
  onVote: () => void;
};

export default function PokemonView(props: Readonly<PokemonViewProps>) {
  const { pokemon, onVote } = props;

  return (
    <div className="w-[350px] h-[600px] flex flex-col border border-pokemon-red rounded-2xl justify-evenly items-center">
      <div>
        <Image
          src={pokemon.sprites.front_default}
          width={256}
          height={256}
          alt="Picture of the pokemon"
        />
      </div>
      <h1 className="max-w-[300px] rounded-lg p-4 overflow-hidden truncate text-pokemon-yellow text-xl text-transform: capitalize">
        {pokemon.name}
      </h1>
      <button 
        className="text-pokemon-blue text-3xl border p-4 rounded-2xl border-pokemon-red"
        onClick={onVote}
      >
        Vote
      </button>
    </div>
  );
}