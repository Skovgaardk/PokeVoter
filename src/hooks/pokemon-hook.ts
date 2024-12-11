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

export function GetThreeMostPopular() {
  const popular = useQuery({
    queryKey: ["popular"],
    queryFn: async () => {
      const response = await fetch("/api/stats/popular");
      return await response.json();
    },
  });
  return popular;
}

export function GetDailyVotes() {
  const dailyVotes = useQuery({
    queryKey: ["dailyVotes"],
    queryFn: async () => {
      const response = await fetch("/api/stats/daily-votes");
      return await response.json();
    },
  });
  return dailyVotes;
}

export function GetMonthlyVotes() {
  const monthlyVotes = useQuery({
    queryKey: ["monthlyVotes"],
    queryFn: async () => {
      const response = await fetch("/api/stats/monthly-votes");
      return await response.json();
    },
  });
  return monthlyVotes;
}

export function GetLatestVotes() {
  const latestVotes = useQuery({
    queryKey: ["latestVotes"],
    queryFn: async () => {
      const response = await fetch("/api/stats/latest-votes");
      return await response.json();
    },
  });
  return latestVotes;
}