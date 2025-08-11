'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/shadcn/badge'
import { BetHistoryItem } from '@/services/bets/bet-service-client'
import { formatCurrency, formatOdds } from '@/utils/format'

const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'won':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'lost':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'open':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'void':
      return 'bg-gray-100 text-gray-800 border-gray-200'
    case 'cashed out':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getProfitColor = (profit: number): string => {
  if (profit > 0) return 'text-green-600 font-semibold'
  if (profit < 0) return 'text-red-600 font-semibold'
  return 'text-gray-600'
}

export const betHistoryColumns: ColumnDef<BetHistoryItem>[] = [
  {
    accessorKey: 'placedAt',
    header: 'Date',
    cell: (info) => {
      const date = new Date(info.getValue() as string)
      return (
        <div className="text-sm">
          <div>{date.toLocaleDateString('pt-BR')}</div>
          <div className="text-xs text-gray-500">
            {date.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      )
    },
    size: 15,
    minSize: 15,
    maxSize: 15,
  },
  {
    accessorKey: 'team1',
    header: 'Event',
    cell: (info) => (
      <div className="max-w-[200px]">
        <div className="truncate text-sm font-medium">
          {info.row.original.team1} vs {info.row.original.team2}
        </div>
        <div className="truncate text-xs text-gray-500">
          {info.row.original.league}
        </div>
      </div>
    ),
    size: 25,
    minSize: 25,
    maxSize: 25,
  },
  {
    accessorKey: 'selectedOutcomeDescription',
    header: 'Bet',
    cell: (info) => (
      <div className="text-sm">
        <div className="font-medium">{info.getValue() as string}</div>
        <div className="text-xs text-gray-500">
          {info.row.original.marketType}
        </div>
      </div>
    ),
    size: 15,
    minSize: 15,
    maxSize: 15,
  },
  {
    accessorKey: 'amount',
    header: 'Stake',
    cell: (info) => (
      <span className="font-medium">
        {formatCurrency(info.getValue() as number)}
      </span>
    ),
    size: 10,
    minSize: 10,
    maxSize: 10,
  },
  {
    accessorKey: 'odds',
    header: 'Odds',
    cell: (info) => (
      <span className="font-semibold">
        {formatOdds(info.getValue() as number)}
      </span>
    ),
    size: 8,
    minSize: 8,
    maxSize: 8,
  },
  {
    accessorKey: 'potentialReturn',
    header: 'Potential',
    cell: (info) => (
      <span className="text-gray-600">
        {formatCurrency(info.getValue() as number)}
      </span>
    ),
    size: 10,
    minSize: 10,
    maxSize: 10,
  },
  {
    accessorKey: 'profit',
    header: 'Profit/Loss',
    cell: (info) => {
      const profit = info.getValue() as number
      return (
        <span className={getProfitColor(profit)}>
          {profit > 0 ? '+' : ''}
          {formatCurrency(Math.abs(profit))}
        </span>
      )
    },
    size: 12,
    minSize: 12,
    maxSize: 12,
  },
  {
    accessorKey: 'statusDescription',
    header: 'Status',
    cell: (info) => {
      const status = info.getValue() as string
      return (
        <Badge
          variant="outline"
          className={`text-xs ${getStatusColor(status)}`}
        >
          {status}
        </Badge>
      )
    },
    size: 10,
    minSize: 10,
    maxSize: 10,
  },
]
