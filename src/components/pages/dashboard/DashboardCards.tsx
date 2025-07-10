"use client";

import React from "react";
import {
  Activity,
  DollarSign,
  Target,
  TrendingUp,
  LucideIcon,
} from "lucide-react";
import InformationCard from "@/components/pages/dashboard/InformationCard";
import getDashboardCards, {
  DashboardMetric,
} from "@/services/dashboard/dashboard-service-client";
import { useQuery } from "@tanstack/react-query";
import { processMetric } from "@/utils/format";

// Mapping de títulos para ícones
const getIconByTitle = (title: string): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    "Total Bets": Target,
    "Win Rate": TrendingUp,
    "Total Profit": DollarSign,
    "Active Bets": Activity,
  };

  return iconMap[title] || Target;
};

// Componente para renderizar um card individual
const MetricCard: React.FC<{ metric: DashboardMetric }> = ({ metric }) => {
  const Icon = getIconByTitle(metric.title);
  const processed = processMetric(metric);

  return (
    <InformationCard
      Icon={Icon}
      title={metric.title}
      content={
        <>
          <div className={`text-2xl ${processed.mainColor}`}>
            {processed.formattedValue}
          </div>
          <p className={`text-xs ${processed.changeColor}`}>
            {processed.formattedChange}
          </p>
        </>
      }
    />
  );
};

// Loading skeleton
const LoadingSkeleton: React.FC = () => (
  <div className="bg-muted h-32 animate-pulse rounded-lg" />
);

// Error state
const ErrorState: React.FC<{ error: Error }> = ({ error }) => (
  <div className="bg-destructive/10 border-destructive/20 mb-8 rounded-lg border p-4">
    <p className="text-destructive text-sm">
      Error loading dashboard data: {error.message}
    </p>
  </div>
);

// No data state
const NoDataState: React.FC = () => (
  <div className="bg-muted/50 border-muted mb-8 rounded-lg border p-4">
    <p className="text-muted-foreground text-sm">
      No dashboard data available.
    </p>
  </div>
);

function DashboardCards() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-dashboard-cards"],
    queryFn: () => getDashboardCards(),
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
  if (!data) {
    return <NoDataState />;
  }

  // Convert data object to array for mapping
  const metrics: DashboardMetric[] = [
    data.value.total,
    data.value.winRate,
    data.value.profit,
    data.value.active,
  ];

  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} metric={metric} />
      ))}
    </div>
  );
}

export default DashboardCards;
