"use server";

import { fetchAllPokemons } from "@/app/lib/data";
import PokemonView from "@/components/pokemon-view";

export default async function MainPage() {
  const pokemons = await fetchAllPokemons();
  
  //TODO: fix change of duplicates
  const getRamdomPokemonUrl = () => {
    const pokemonResults = pokemons.results
     return pokemonResults[Math.floor(Math.random()*pokemonResults.length)].url
}

  return (
    <main>
      <div className="h-screen w-screen flex flex-row justify-center items-center gap-6">
        <PokemonView url={getRamdomPokemonUrl()} />
        <div>
          <h1 className="justify-center items-center border border-pokemon-yellow rounded-2xl p-4">
            Vs
          </h1>
        </div>
        <PokemonView url={getRamdomPokemonUrl()} />
      </div>
    </main>
  );
}
