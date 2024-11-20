"use client";

import { getPokemon } from "@/hooks/pokemon-hook";
import Image from "next/image";


type PokemonViewProps = {
  url: string;
  onVote: (id: number) => void;
};

export default function PokemonView(props: Readonly<PokemonViewProps>) {
  const { url, onVote } = props;

  const { data, isError, isLoading, refetch } = getPokemon(url);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  const onClickHandler = () => {
    onVote(data.id);
    refetch();
  }

  return (
    <div className="w-[350px] h-[600px] flex flex-col border border-pokemon-red rounded-2xl justify-evenly items-center">
      <div>
        <Image
          src={data.sprites.front_default}
          width={256}
          height={256}
          alt="Picture of the pokemon"
        />
      </div>
      <h1 className="max-w-[300px] rounded-lg p-4 overflow-hidden truncate text-pokemon-yellow text-xl text-transform: capitalize">
        {data.name}
      </h1>
      {/* TODO: change this to use form instead for optimization*/}
      <button 
        className="text-pokemon-blue text-3xl border p-4 rounded-2xl border-pokemon-red"
        onClick={onClickHandler}
      >
        Vote
      </button>
    </div>
  );
}