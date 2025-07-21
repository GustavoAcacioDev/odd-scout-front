"use client";

import React from "react";
import {
  Target,
  TrendingUp,
  DollarSign,
  Activity,
  LucideIcon,
} from "lucide-react";
import InformationCard from "@/components/pages/dashboard/InformationCard";
import { getBetHistoryStatistics } from "@/services/bets/bet-service-client";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency, formatPercentage } from "@/utils/format";

// Mapping de métricas para ícones
const getMetricIcon = (metric: string): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    "totalBets": Target,
    "winRate": TrendingUp,
    "totalProfit": DollarSign,
    "roi": Activity,
  };

  return iconMap[metric] || Target;
};

// Loading skeleton
const LoadingSkeleton: React.FC = () => (
  <div className="bg-muted h-32 animate-pulse rounded-lg" />
);

// Error state
const ErrorState: React.FC<{ error: Error }> = ({ error }) => (
  <div className="bg-destructive/10 border-destructive/20 mb-8 rounded-lg border p-4">
    <p className="text-destructive text-sm">
      Error loading statistics: {error.message}
    </p>
  </div>
);

// No data state
const NoDataState: React.FC = () => (
  <div className="bg-muted/50 border-muted mb-8 rounded-lg border p-4">
    <p className="text-muted-foreground text-sm">
      No betting statistics available yet. Place your first bet to see your stats!
    </p>
  </div>
);

function HistoryCards() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-bet-history-statistics"],
    queryFn: () => getBetHistoryStatistics(),
    refetchInterval: 30000, // Refresh every 30 seconds
    staleTime: 20000, // Consider data stale after 20 seconds
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return <ErrorState error={error as Error} />;
  }

  // No data state
  if (!data?.value) {
    return <NoDataState />;
  }

  const stats = data.value;

  // Prepare metrics for display
  const metrics = [
    {
      title: "Total Bets",
      value: stats.totalBets.toString(),
      change: stats.openBets > 0 ? `${stats.openBets} active` : "All settled",
      changeColor: "text-blue-600",
      icon: Target,
    },
    {
      title: "Win Rate",
      value: formatPercentage(stats.winRate / 100), // API retorna em decimal, converter para %
      change: `${stats.wonBets}W / ${stats.lostBets}L`,
      changeColor: stats.winRate >= 50 ? "text-green-600" : "text-red-600",
      icon: TrendingUp,
    },
    {
      title: "Total Profit",
      value: formatCurrency(stats.totalProfit),
      change: `Staked: ${formatCurrency(stats.totalStaked)}`,
      changeColor: stats.totalProfit >= 0 ? "text-green-600" : "text-red-600",
      icon: DollarSign,
    },
    {
      title: "ROI",
      value: formatPercentage(stats.roi / 100), // API retorna em decimal, converter para %
      change: `Avg odds: ${stats.averageOdds.toFixed(2)}`,
      changeColor: stats.roi >= 0 ? "text-green-600" : "text-red-600",
      icon: Activity,
    },
  ];

  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <InformationCard
          key={metric.title}
          Icon={metric.icon}
          title={metric.title}
          content={
            <>
              <div className={`text-2xl font-semibold ${metric.changeColor}`}>
                {metric.value}
              </div>
              <p className={`text-xs ${metric.changeColor}`}>
                {metric.change}
              </p>
            </>
          }
        />
      ))}
    </div>
  );
}

export default HistoryCards;