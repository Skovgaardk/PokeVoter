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
        username: session?.user?.name,
        winnerId: parseInt(secondPokemonId),
        loserId: parseInt(firstPokemonId),
      });
    }
  };

  return (
    <div className="h-full w-full flex flex-row justify-center items-center gap-6">
      <PokemonView url={pokemonUrls.firstPokemonUrl!} onVote={handleVote} />
      <div>
        <h1 className="justify-center items-center border border-pokemon-yellow rounded-full p-4 text-pokemon-yellow [text-shadow:_0_6px_6px_rgb(34_40_49)]">
          Vs.
        </h1>
      </div>
      <PokemonView url={pokemonUrls.secondPokemonUrl!} onVote={handleVote} />
    </div>
  );
}
