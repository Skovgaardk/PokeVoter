"use client";

import * as React from "react";
import VoteChartSkeleton from "./vote-chart-skeleton";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  RetrieveLastDayVotes,
  RetrieveLastHourVotes,
  RetrieveLastMonthVotes,
} from "@/hooks/pokemon-hook";
import {
  processVotesByMinute,
  processVotesByHour,
  processVotesByDay,
} from "@/app/lib/process-votes";

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
  hour: {
    label: "Hour",
    color: "hsl(var(--chart-3))",
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
    case "hour":
      return `${value}:00-${value}:59`;
    default:
      return value;
  }
};

export default function VoteChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("month");


  //TODO: make it so that it only uses a single call to the API, and then filters the data on the client side.
  // It was done this way becouse i initially wanted it to only call the api when the user changed the chart, but then i would not be able to show the total amount of votes on the top.
  const hourlyData = RetrieveLastHourVotes();
  const dailyData = RetrieveLastDayVotes();
  const monthlyData = RetrieveLastMonthVotes();

  const isLoading =
    hourlyData.isLoading || dailyData.isLoading || monthlyData.isLoading;
  const isError =
    hourlyData.isError || dailyData.isError || monthlyData.isError;

  const chartData = React.useMemo(() => {
    if (isLoading || isError) return [];

    switch (activeChart) {
      case "hour":
        return processVotesByMinute(hourlyData?.data.votes || []);
      case "day":
        return processVotesByHour(dailyData?.data.votes || []);
      case "month":
        return processVotesByDay(monthlyData?.data.votes || []);
    }
  }, [activeChart, hourlyData, dailyData, monthlyData, isLoading, isError]);

  const totalVotes = React.useMemo(() => {
    if (isLoading || isError) return { hour: 0, day: 0, month: 0 };
  
    return {
      hour: processVotesByMinute(hourlyData?.data.votes || [])
        .reduce((acc, entry) => acc + entry.voteCount, 0),
      day: processVotesByHour(dailyData?.data.votes || [])
        .reduce((acc, entry) => acc + entry.voteCount, 0),
      month: processVotesByDay(monthlyData?.data.votes || [])
        .reduce((acc, entry) => acc + entry.voteCount, 0),
    };
  }, [hourlyData, dailyData, monthlyData, isLoading, isError]);

  if (isLoading) {
    return (
      <VoteChartSkeleton/>
    );
  }

  if (isError) {
    return (
      <div className="flex w-full place-content-evenly">
        <div className="h-full w-1/3 rounded-xl border text-card-foreground shadow p-4">
          <h1 className="text-3xl">Error</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-1/3 rounded-xl text-card-foreground shadow p-4 bg-[#292f38] shadow-sm border border-[#423e47]">
      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-10 py-5 sm:py-6 text-lg text-[#FFFFFF]">
            <CardTitle>Votes</CardTitle>
            <CardDescription>
              Showing total votes for the last month/day/hour
            </CardDescription>
          </div>
          <div className="flex">
            {["month", "day", "hour"].map((key) => {
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
                dataKey={
                  activeChart === "hour"
                    ? "minute"
                    : activeChart === "day"
                    ? "hour"
                    : "day"
                }
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
