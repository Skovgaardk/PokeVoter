"use client";

import { GetPokemon } from "@/hooks/pokemon-hook";
import Image from "next/image";
import PokemonViewSkeleton from "./pokemon-view-skeleton";

type PokemonViewProps = {
  url: string;
  onVote: (id: number) => void;
};

export default function PokemonView(props: Readonly<PokemonViewProps>) {
  const { url, onVote } = props;

  const { data, isError, isLoading, refetch } = GetPokemon(url);

  if (isLoading) {
    return (
      <PokemonViewSkeleton/>
    );
  }

  if (isError) {
    return (
      <div className="w-[350px] h-[600px] flex flex-col border border-pokemon-red rounded-2xl justify-evenly items-center">
        <div>Error</div>
      </div>
    );
  }

  const onClickHandler = () => {
    onVote(data.id);
    refetch();
  };

  return (
    <div className="w-[345px] h-[470px] flex flex-col rounded-3xl justify-evenly items-center bg-gradient-to-br from-pokemon-red to-pokemon-blue">
      <div className="w-[315px] flex flex-col justify-evenly items-center bg-[#222831] p-5 rounded-2xl">
        <div>
          <Image
            src={data.sprites.front_default}
            width={256}
            height={256}
            alt="Picture of the pokemon"
          />
        </div>
        <h1 className="max-w-[300px] p-4 overflow-hidden truncate text-pokemon-yellow text-2xl text-transform: capitalize font-bold italic [text-shadow:_0_6px_6px_rgb(0_0_0)]">
          {data.name}
        </h1>
        {/* TODO: change this to use form instead for optimization*/}
        <div className=" rounded-3xl justify-evenly items-center bg-gradient-to-br from-pokemon-blue to-pokemon-red p-2">
          <div className="items-center justify-center bg-[#222831] rounded-2xl">
            <button
              className="text-pokemon-yellow text-3xl p-4 rounded-2xl font-bold [text-shadow:_0_6px_6px_rgb(34_40_49)] "
              onClick={onClickHandler}
            >
              Vote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
