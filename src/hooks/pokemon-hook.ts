import { useQuery } from "@tanstack/react-query";

export function GetPokemon(url: string) {
  const pokemon = useQuery({
    queryKey: [url],
    queryFn: async () => {
      const response = await fetch(url);
      return await response.json();
    },
  });
  return pokemon;
}