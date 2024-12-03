"use server";

import { fetchAllPokemons } from "@/app/lib/data";
import PokemonGame from "@/components/game/game";

export default async function GamePage() {
  const pokemons = await fetchAllPokemons();

  return (
    <main className="flex justify-center overflow-auto">
      <div className="flex flex-col space-y-6">
        <div className="text-center pt-8">
          <h1 className="text-6xl font-pokeFontSolid italic bg-gradient-to-r from-pokemon-red to-pokemon-blue inline-block text-transparent bg-clip-text pb-4 pr-4 ">
            Pokemon Battle
          </h1>
        </div>
        <div className="text-center ">
          <p className="text-2xl font-bold italic bg-gradient-to-r from-pokemon-red to-pokemon-blue inline-block text-transparent bg-clip-text ">
            Vote for the coolest pokemon!
          </p>
        </div>
        <div className="flex justify-center items-center text-amber-50">
          <PokemonGame pokemons={pokemons} />
        </div>
      </div>
    </main>
  );
}
