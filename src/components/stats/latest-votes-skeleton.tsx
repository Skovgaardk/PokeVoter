export default function LatestVotesSkeleton() {
  return (
    <div className="h-full w-1/2 rounded-xl border text-card-foreground shadow p-4 border-[#423e47] animate-pulse">
      <div className="h-8 w-40 bg-gray-600 rounded mb-4"></div>
      <div className="h-96 flex flex-col justify-evenly gap-y-4 mt-2">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="flex rounded-2xl shadow-lg p-3 border border-[#423e47] bg-[#292f38] h-1/4"
          >
            <div className="w-1/2 h-8 bg-gray-600 rounded mr-4"></div>
            <div className="flex flex-col flex-grow justify-center items-center">
              <div className="h-4 w-3/4 bg-gray-600 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-600 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
