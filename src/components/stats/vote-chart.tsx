"use client";

import * as React from "react";
import VoteChartSkeleton from "./vote-chart-skeleton";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { processVotesByHour, processVotesByDay } from "@/app/lib/process-votes";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { GetDailyVotes, GetMonthlyVotes } from "@/hooks/pokemon-hook";

const chartConfig = {
  views: {
    label: "Votes",
  },
  month: {
    label: "Month",
    color: "hsl(var(--chart-1))",
  },
  day: {
    label: "Day",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const toolTipFormatter = (
  value: string,
  activeChart: keyof typeof chartConfig
) => {
  switch (activeChart) {
    case "day":
      return `${value}:00-${value}:59`;
    case "month":
      return new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    default:
      return value;
  }
};

export default function VoteChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("month");
  const { data: dailyData, isLoading: dailyIsLoading, error: dailyDataError } = GetDailyVotes();
  const { data: monthlyData, isLoading: monthlyIsLoading, error: monthlyDataError } = GetMonthlyVotes();

  //TODO: make it so that it only uses a single call to the API, and then filters the data on the client side.
  // It was done this way becouse i initially wanted it to only call the api when the user changed the chart, but then i would not be able to show the total amount of votes on the top.

  const chartData = React.useMemo(() => {
    switch (activeChart) {
      case "day":
        return processVotesByHour(dailyData || []);
      case "month":
        return processVotesByDay(monthlyData || []);
    }
  }, [activeChart, dailyData, monthlyData]);

  const totalVotes = React.useMemo(() => {
    if (dailyDataError || monthlyDataError) return { day: 0, month: 0 };

    return {
      day: processVotesByHour(dailyData || []).reduce(
        (acc, entry) => acc + entry.voteCount,
        0
      ),
      month: processVotesByDay(monthlyData || []).reduce(
        (acc, entry) => acc + entry.voteCount,
        0
      ),
    };
  }, [dailyData, monthlyData, monthlyDataError, dailyDataError]);

  if (dailyDataError || monthlyDataError) {
    return (
      <div className="flex w-full place-content-evenly">
        <div className="h-full w-1/3 rounded-xl border text-card-foreground shadow p-4">
          <h1 className="text-3xl">Error</h1>
        </div>
      </div>
    );
  }

  if (dailyIsLoading || monthlyIsLoading) {
    return <VoteChartSkeleton />;
  }

  return (
      <div className="h-full w-1/3 rounded-xl text-card-foreground shadow p-4 bg-[#292f38] shadow-sm border border-[#423e47]">
        <Card>
          <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-8 py-5 sm:py-6 text-lg text-[#FFFFFF]">
              <CardTitle>Votes</CardTitle>
              <CardDescription>
                Showing total votes for the last month / day
              </CardDescription>
            </div>
            <div className="flex">
              {["month", "day"].map((key) => {
                const chart = key as keyof typeof chartConfig;
                return (
                  <button
                    key={chart}
                    data-active={activeChart === chart}
                    className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                    onClick={() => setActiveChart(chart)}
                  >
                    <span className="text-xs text-muted-foreground">
                      {chartConfig[chart].label}
                    </span>
                    <span className="text-lg font-bold leading-none sm:text-3xl text-[#FFFFFF] ">
                      {totalVotes[
                        key as keyof typeof totalVotes
                      ].toLocaleString()}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardHeader>
          <CardContent className="px-2 sm:p-6">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey={activeChart === "day" ? "hour" : "day"}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) =>
                    activeChart === "day" ? `${value}:00` : value
                  }
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[150px]"
                      nameKey="views"
                      labelFormatter={(value) => {
                        return toolTipFormatter(value, activeChart);
                      }}
                    />
                  }
                />
                <Bar dataKey="voteCount" fill={`var(--color-${activeChart})`} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
  );
}
