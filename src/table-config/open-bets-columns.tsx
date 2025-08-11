'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ExternalLink, Clock } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/shadcn/badge'
import { Button } from '@/components/ui/shadcn/button'
import { BetHistoryItem } from '@/services/bets/bet-service-client'
import { formatCurrency } from '@/utils/format'
import { renderBestOutcome } from '@/utils/bet-utils'

export const openBetsColumns: ColumnDef<BetHistoryItem>[] = [
  {
    accessorKey: 'team1',
    header: 'Event',
    cell: ({ row }) => {
      const bet = row.original
      return (
        <div>
          <div className="font-medium">
            {bet.team1} vs {bet.team2}
          </div>
          <div className="text-sm text-gray-500">{bet.league}</div>
          <div className="text-xs text-gray-400">
            {new Date(bet.eventDateTime).toLocaleDateString()} at{' '}
            {new Date(bet.eventDateTime).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      )
    },
    size: 200,
  },
  {
    accessorKey: 'selectedOutcomeDescription',
    header: 'Bet',
    cell: (info) => {
      return (
        <div>
          <div className="font-medium">
            {info.getValue() as string}
          </div>
          <div className="text-sm text-gray-500">
            {info.row.original.marketType}
          </div>
        </div>
      )
    },
    size: 150,
  },
  {
    accessorKey: 'amount',
    header: 'Stake',
    cell: (info) => (
      <span className="font-mono font-semibold">
        {formatCurrency(info.getValue() as number)}
      </span>
    ),
    size: 100,
  },
  {
    accessorKey: 'odds',
    header: 'Odds',
    cell: (info) => (
      <span className="font-mono font-semibold text-blue-600">
        {(info.getValue() as number).toFixed(2)}
      </span>
    ),
    size: 80,
  },
  {
    accessorKey: 'potentialReturn',
    header: 'Potential Return',
    cell: (info) => {
      const potential = info.getValue() as number
      const stake = info.row.original.amount
      const profit = potential - stake
      return (
        <div>
          <div className="font-mono font-semibold text-green-600">
            {formatCurrency(potential)}
          </div>
          <div className="text-xs text-gray-500">
            +{formatCurrency(profit)} profit
          </div>
        </div>
      )
    },
    size: 130,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const bet = row.original
      const timeUntilEvent = new Date(bet.eventDateTime).getTime() - new Date().getTime()
      const hoursUntil = Math.max(0, Math.floor(timeUntilEvent / (1000 * 60 * 60)))
      
      return (
        <div className="flex flex-col gap-1">
          <Badge variant="secondary" className="w-fit">
            <Clock className="w-3 h-3 mr-1" />
            Open
          </Badge>
          {timeUntilEvent > 0 ? (
            <div className="text-xs text-gray-500">
              {hoursUntil > 24 
                ? `${Math.floor(hoursUntil / 24)}d ${hoursUntil % 24}h` 
                : `${hoursUntil}h left`
              }
            </div>
          ) : (
            <div className="text-xs text-orange-500">
              Event started
            </div>
          )}
        </div>
      )
    },
    size: 100,
  },
  {
    accessorKey: 'placedAt',
    header: 'Placed',
    cell: (info) => {
      const date = new Date(info.getValue() as string)
      return (
        <div className="text-sm">
          <div>{date.toLocaleDateString()}</div>
          <div className="text-gray-500">
            {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      )
    },
    size: 100,
  },
]