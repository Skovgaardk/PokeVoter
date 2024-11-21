"use server";

import { fetchAllPokemons } from "@/app/lib/data";
import PokemonGame from "@/components/game";

export default async function GamePage() {
  const pokemons = await fetchAllPokemons();

  return (
    <main>
      <div className="flex flex-col items-center">
        <div className="relative text-center pt-8">
          <h1 className="text-3xl">Pokemon Battle</h1>
        </div>
        <div className="relative text-center">
          <p className="text-2xl">Vote for the coolest pokemon!</p>
        </div>
        <div className="absolute h-screen w-screen justify-center items-center">
          <PokemonGame pokemons={pokemons} />
        </div>
      </div>
    </main>
  );
}
