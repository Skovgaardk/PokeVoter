"use client";

import { Pokemon } from "@/models/pokemon";
import { useEffect, useState } from "react";
import PokemonView from "./pokemon-view";

type GameProps = {
  pokemons: {
    results: { name: string; url: string }[];
  };
};

export default function PokemonGame(props: Readonly<GameProps>) {
  const { pokemons } = props;
  const [leftPokemon, setLeftPokemon] = useState<Pokemon | null>(null);
  const [rightPokemon, setRightPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getRandomPokemonUrl = () => {
    const pokemonResults = pokemons.results;
    return pokemonResults[Math.floor(Math.random() * pokemonResults.length)]
      .url;
  };

  const fetchNewPokemons = async () => {
    setLoading(true);
    try {
      const [leftResponse, rightResponse] = await Promise.all([
        fetch(getRandomPokemonUrl()),
        fetch(getRandomPokemonUrl()),
      ]);

      if (!leftResponse.ok || !rightResponse.ok) {
        throw new Error(
          `HTTP error: Status ${leftResponse.status} or ${rightResponse.status}`
        );
      }

      const [leftData, rightData] = await Promise.all([
        leftResponse.json(),
        rightResponse.json(),
      ]);

      setLeftPokemon(leftData);
      setRightPokemon(rightData);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setLeftPokemon(null);
      setRightPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = () => {
    fetchNewPokemons();
  };

  useEffect(() => {
    fetchNewPokemons();
  }, [pokemons]);

  if (loading) {
    return (
        <div className="h-screen w-screen flex flex-row justify-center items-center gap-6">
          Loading...
          <div>
            <h1 className="justify-center items-center border border-pokemon-yellow rounded-2xl p-4">
              Vs
            </h1>
          </div>
          Loading...
        </div>
      );
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="h-screen w-screen flex flex-row justify-center items-center gap-6">
      <PokemonView pokemon={leftPokemon!} onVote={handleVote} />
      <div>
        <h1 className="justify-center items-center border border-pokemon-yellow rounded-2xl p-4">
          Vs
        </h1>
      </div>
      <PokemonView pokemon={rightPokemon!} onVote={handleVote} />
    </div>
  );
}
