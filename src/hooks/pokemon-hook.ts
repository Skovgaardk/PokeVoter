import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export function getPokemon(url: string) {
  const pokemon = useQuery({
    queryKey: [url],
    queryFn: async () => {
      const response = await fetch(url);
      return await response.json();
    },
  });
  return pokemon;
}

export function sendVoteResult(winnerId: number, loserId: number) {
  const vote = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/vote", { winnerId, loserId });
      return res.data;
    },
  });
  return vote;
}
