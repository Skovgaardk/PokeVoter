import ThreeMostPopular from "@/components/three-most-popular";
import VoteChart from "@/components/vote-chart";

export default function StatsPage() {
  return (
    <main>
      <div className="flex flex-col h-screen place-content-evenly">
        <div className="flex h-1/3 w-full place-content-evenly mt-24">
          <ThreeMostPopular />
        </div>
        <div className="flex h-1/3 w-full place-content-evenly">
          <VoteChart />
          <div className="h-full w-1/3 rounded-xl border text-card-foreground shadow p-4">
            <h1 className="text-3xl">Stats</h1>
          </div>
        </div>
      </div>
    </main>
  );
}
