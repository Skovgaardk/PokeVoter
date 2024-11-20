"use client";

import { Pokemon } from "@/models/pokemon";
import { useEffect, useState } from "react";
import PokemonView from "./pokemon-view";
import { sendVoteResult } from "@/hooks/pokemon-hook";
import axios from "axios";

type GameProps = {
  pokemons: {
    results: { name: string; url: string }[];
  };
};

const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

export default function PokemonGame(props: Readonly<GameProps>) {
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
    
    const winnderid = id;


    const firstPokemonId = pokemonUrls.firstPokemonUrl.split("/")[6];
    const secondPokemonId = pokemonUrls.secondPokemonUrl.split("/")[6];

    console.log("id returned from pokemon view " + id);
    console.log("first pokemon id " + firstPokemonId);
    console.log("second pokemon id " + secondPokemonId);

    if (winnderid === parseInt(firstPokemonId)) {
      axios.post("/api/vote", { winnerId: firstPokemonId, loserId: secondPokemonId });
    } else {
      axios.post("/api/vote", { winnerId: parseInt(secondPokemonId), loserId: parseInt(firstPokemonId) });
    }
    



  };

  return (
    <div className="h-screen w-screen flex flex-row justify-center items-center gap-6">
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
