"use client";

import { useState } from "react";
import PokemonView from "./pokemon-view";
import axios from "axios";
import { useSession } from "next-auth/react";

type GameProps = {
  pokemons: {
    results: { name: string; url: string }[];
  };
};

const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

export default function PokemonGame(props: Readonly<GameProps>) {
  const { data: session} = useSession();
  const { pokemons } = props;

  const getRandomPokemonUrls = () => {
    const pokemonResults = pokemons.results;
    const randomIndex1 = getRandomNumber(pokemonResults.length);
    const randomIndex2 = getRandomNumber(pokemonResults.length);

    return {
      firstPokemonUrl: pokemonResults[randomIndex1].url,
      secondPokemonUrl: pokemonResults[randomIndex2].url,
    };
  };

  const [pokemonUrls, setPokemonUrls] = useState(getRandomPokemonUrls());

  const handleVote = (id: number) => {
    setPokemonUrls(getRandomPokemonUrls());
    if (pokemonUrls.firstPokemonUrl === pokemonUrls.secondPokemonUrl) {
      setPokemonUrls(getRandomPokemonUrls());
      return;
    }

    const winnderId = id;

    const firstPokemonId = pokemonUrls.firstPokemonUrl.split("/")[6];
    const secondPokemonId = pokemonUrls.secondPokemonUrl.split("/")[6];

    if (winnderId === parseInt(firstPokemonId)) {
      axios.post("/api/vote", {
        username: session?.user?.email,
        winnerId: parseInt(firstPokemonId),
        loserId: parseInt(secondPokemonId),
      });
    } else {
      axios.post("/api/vote", {
        username: session?.user?.email,
        winnerId: parseInt(secondPokemonId),
        loserId: parseInt(firstPokemonId),
      });
    }
  };

  return (
    <div className="w-full h-full flex flex-row justify-center items-center gap-6">
      <PokemonView url={pokemonUrls.firstPokemonUrl!} onVote={handleVote} />
      <div>
        <h1 className="justify-center items-center border border-pokemon-yellow rounded-2xl p-4">
          Vs
        </h1>
      </div>
      <PokemonView url={pokemonUrls.secondPokemonUrl!} onVote={handleVote} />
    </div>
  );
}
