export default function VoteChartSkeleton() {
  return (
    <div className="h-full w-1/3 rounded-xl text-card-foreground shadow p-4 bg-[#292f38] shadow-sm border border-[#423e47] animate-pulse pb-8">
      <div className="flex flex-row items-begin gap-2">
        <div className="flex flex-col items-begin gap-2 mb-6 items-begin justify-center">
          <div className="h-6 w-32 bg-gray-600 rounded"></div>
          <div className="h-4 w-48 bg-gray-600 rounded"></div>
        </div>
        <div className="h-28 w-28 bg-gray-600 rounded"></div>
        <div className="h-28 w-28 bg-gray-600 rounded"></div>
        <div className="h-28 w-28 bg-gray-600 rounded"></div>
      </div>
      <div className="flex gap-4 mb-6 items-end"></div>
      <div className="h-[260px] w-full bg-gray-600 rounded"></div>
    </div>
  );
}
