'use client'

import { useQuery } from '@tanstack/react-query'
import { Clock, DollarSign, Target, TrendingUp } from 'lucide-react'
import React from 'react'

import InformationCard from '@/components/pages/dashboard/InformationCard'
import { getBetHistoryStatistics } from '@/services/bets/bet-service-client'

export default function OpenBetsStats() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['bet-statistics'],
    queryFn: getBetHistoryStatistics,
    refetchInterval: 30000,
  })

  if (isLoading) {
    return (
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-muted h-32 animate-pulse rounded-lg" />
        ))}
      </div>
    )
  }

  if (!stats?.value) {
    return null
  }

  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <InformationCard
        Icon={Clock}
        title="Open Bets"
        content={
          <>
            <div className="text-2xl font-bold text-blue-600">
              {stats.value.openBets}
            </div>
            <p className="text-muted-foreground text-xs">
              Currently active
            </p>
          </>
        }
      />

      <InformationCard
        Icon={DollarSign}
        title="Total Staked"
        content={
          <>
            <div className="text-2xl font-bold">
              ${stats.value.totalStaked.toFixed(2)}
            </div>
            <p className="text-muted-foreground text-xs">
              Across all open bets
            </p>
          </>
        }
      />

      <InformationCard
        Icon={Target}
        title="Potential Return"
        content={
          <>
            <div className="text-2xl font-bold text-green-600">
              ${(stats.value.totalStaked * stats.value.averageOdds).toFixed(2)}
            </div>
            <p className="text-positive-pure text-xs">
              If all bets win
            </p>
          </>
        }
      />

      <InformationCard
        Icon={TrendingUp}
        title="Average Odds"
        content={
          <>
            <div className="text-2xl font-bold">
              {stats.value.averageOdds.toFixed(2)}
            </div>
            <p className="text-muted-foreground text-xs">
              Across open positions
            </p>
          </>
        }
      />
    </div>
  )
}