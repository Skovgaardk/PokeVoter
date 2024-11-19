"use client";

import { Pokemon } from "@/models/pokemon";
import { useEffect, useState } from "react";
import Image from "next/image";

type PokemonViewProps = {
  url: string;
};

export default function PokemonView(props: Readonly<PokemonViewProps>) {
  const { url } = props;

  const [data, setData] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataForPosts = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const pokemonData = await response.json();
        setData(pokemonData);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDataForPosts();
  }, [url]);

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-[350px] h-[600px] flex flex-col border border-pokemon-red rounded-2xl justify-evenly items-center">
      {/* <div className="h-32 w-32 bg-pokemon-red rounded-md" /> */}
      <div>
        <Image
          src={data!.sprites.front_default}
          width={256}
          height={256}
          alt="Picture of the pokemon"
        />
      </div>
      <h1 className="max-w-[300px] rounded-lg p-4 overflow-hidden truncate text-pokemon-yellow text-xl text-transform: capitalize">
        {data?.name}
      </h1>
      <button className="text-pokemon-blue text-3xl border p-4 rounded-2xl border-pokemon-red">
        Vote
      </button>
    </div>
  );
}
