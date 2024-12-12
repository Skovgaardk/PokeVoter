"use client";

import { useEffect, useState } from "react";
import PokemonView from "./pokemon-view";
import Image from "next/image";
import { createClient } from "../../../utils/supabase/client";
import { Session } from "@supabase/supabase-js";

type GameProps = {
  pokemons: {
    results: { name: string; url: string }[];
  };
};

const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

export default function PokemonGame(props: Readonly<GameProps>) {
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUserSession = async () => {
      const { data: session, error: sessionError } =
        await supabase.auth.getSession();
      setSession(session.session);
      if (sessionError) {
        console.log("Error getting session");
        console.error(sessionError);
      }
    };
    getUserSession();
  }, []);

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

  const handleVote = async (id: number) => {
    setPokemonUrls(getRandomPokemonUrls());
    if (pokemonUrls.firstPokemonUrl === pokemonUrls.secondPokemonUrl) {
      setPokemonUrls(getRandomPokemonUrls());
      return;
    }

    const firstPokemonId = pokemonUrls.firstPokemonUrl.split("/")[6];
    const secondPokemonId = pokemonUrls.secondPokemonUrl.split("/")[6];

    const winnerId = id;
    const loserId =
      winnerId === parseInt(firstPokemonId) ? secondPokemonId : firstPokemonId;

    const vote = {
      username: session?.user.email || null,
      pokemon_1_id: winnerId,
      pokemon_2_id: loserId,
      winner_id: winnerId,
    };

    try {
      const reponse = await fetch("/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vote),
      });

      if (!reponse.ok) {
        console.error("Error inserting vote: ", reponse.statusText);
      }
    } catch (error) {
      console.error("Error inserting vote: ", error);
    }
  };

  return (
    <div className="h-full w-full flex flex-row justify-center items-center gap-6">
      <PokemonView url={pokemonUrls.firstPokemonUrl} onVote={handleVote} />
      <div>
        <h1 className="justify-center items-center text-pokemon-yellow [text-shadow:_0_6px_6px_rgb(34_40_49)]">
          <div>
            <Image
              src="/PokeBattleLogo-removebg-preview.png"
              width={60}
              height={60}
              alt="Pokemon battle image"
            />
          </div>
        </h1>
      </div>
      <PokemonView url={pokemonUrls.secondPokemonUrl} onVote={handleVote} />
    </div>
  );
}
