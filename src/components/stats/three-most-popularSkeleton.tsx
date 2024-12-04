const PopularPokemonCardSkeleton = () => (
  <div className="flex flex-col h-full w-1/4 rounded-xl border shadow p-4 items-center bg-[#292f38] shadow-sm border-[#423e47] animate-pulse pb-14">
    <div className="h-8 w-32 bg-gray-600 rounded mb-4"></div>
    <div className="h-40 w-40 bg-gray-600 rounded-full mb-4"></div>
    <div className="h-6 w-48 bg-gray-600 rounded mb-2"></div>
    <div className="h-6 w-40 bg-gray-600 rounded"></div>
  </div>
);

export default function ThreeMostPopularSkeleton() {
  return (
    <div className="flex w-full place-content-evenly">
      <PopularPokemonCardSkeleton />
      <PopularPokemonCardSkeleton />
      <PopularPokemonCardSkeleton />
    </div>
  );
}
