import ThreeMostPopular from "@/components/three-most-popular";
import VoteChart from "@/components/vote-chart";
import LatestVotes from "@/components/latest-votes";

export default function StatsPage() {
  return (
    <main>
      <div className="flex flex-col h-full">
        <div className="flex h-1/3 w-full place-content-evenly mt-24">
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
