import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

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

export function SendVoteResult(winnerId: number, loserId: number) {
  const vote = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/vote", { winnerId, loserId });
      return res.data;
    },
  });
  return vote;
}


export function RetrieveMostPopular() {
  const stats = useQuery({
    queryKey: ["mostPopular"],
    queryFn: async () => {
      const response = await fetch("/api/stats/most-popular");
      return await response.json();
    },
  });
  return stats;
}

export function RetrieveLastHourVotes() {
  const stats = useQuery({
    queryKey: ["votesHourly"],
    queryFn: async () => {
      const response = await fetch("/api/stats/votes-hourly");
      return await response.json();
    },
  });
  return stats;
}

export function RetrieveLastDayVotes() {
  const stats = useQuery({
    queryKey: ["votesDaily"],
    queryFn: async () => {
      const response = await fetch("/api/stats/votes-daily");
      return await response.json();
    },
  });
  return stats;
}

export function RetrieveLastMonthVotes() {
  const stats = useQuery({
    queryKey: ["votesWeekly"],
    queryFn: async () => {
      const response = await fetch("/api/stats/votes-monthly");
      return await response.json();
    },
  });
  return stats;
}

export function RetrieveLatestVotes() {
  const stats = useQuery({
    queryKey: ["latestVotes"],
    queryFn: async () => {
      const response = await fetch("/api/stats/latest-votes");
      return await response.json();
    },
  });
  return stats;
}