"use server";

import { PokeApiResult } from "@/models/poke-api-results";

type PokemonResult = {
    name: string,
    url: string,
}

export async function fetchAllPokemons(): Promise<PokeApiResult<PokemonResult>> {
  try {
    console.log("Fetching pokemon data...");
    const res = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
    );
    const data = await res.json();

    console.log("Fetched pokemon data");

    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw new Error("Failed to fetch pokemon data.");
  }
}


