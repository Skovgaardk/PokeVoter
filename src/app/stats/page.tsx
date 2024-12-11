import ThreeMostPopular from "@/components/stats/three-most-popular";
import VoteChart from "@/components/stats/vote-chart";
import LatestVotes from "@/components/stats/latest-votes";

export default function StatsPage() {
  return (
    <main>
      <div className="flex flex-col h-full gap-4">
        <div className="flex h-1/3 w-full place-content-evenly mt-16">
          <ThreeMostPopular />
        </div>
        <div className="flex h-1/2 w-full place-content-evenly">
          <VoteChart />
          <LatestVotes />
        </div>
      </div>
    </main>
  );
}
