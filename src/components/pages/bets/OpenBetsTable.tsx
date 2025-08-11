'use client'

import React, { useState, useMemo } from 'react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card'
import TableContainer from '@/components/ui/table/TableContainer'
import TableData from '@/components/ui/table/TableData'
import useTableData from '@/hooks/use-table-data'
import { getBetHistory, BetHistoryItem } from '@/services/bets/bet-service-client'
import { openBetsColumns } from '@/table-config/open-bets-columns'
import OpenBetsFilters from './OpenBetsFilters'

export default function OpenBetsTable() {
  const [filters, setFilters] = useState<{
    search?: string
    league?: string
    timeframe?: string
  }>({})

  const queryFn = () => getBetHistory({ 
    status: 'Open',
    pageNumber: 1,
    pageSize: 100
  })

  const { items: openBets, isLoading } = useTableData<BetHistoryItem>({
    queryKey: ['open-bets'],
    queryFn,
  })

  const filteredBets = useMemo(() => {
    if (!openBets) return []

    return openBets.filter(bet => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        const matchesSearch = 
          bet.team1.toLowerCase().includes(searchTerm) ||
          bet.team2.toLowerCase().includes(searchTerm) ||
          bet.league.toLowerCase().includes(searchTerm) ||
          bet.selectedOutcomeDescription.toLowerCase().includes(searchTerm)
        
        if (!matchesSearch) return false
      }

      // League filter
      if (filters.league && bet.league !== filters.league) {
        return false
      }

      // Timeframe filter
      if (filters.timeframe) {
        const eventDate = new Date(bet.eventDateTime)
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
        const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
        const monthFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)

        switch (filters.timeframe) {
          case 'today':
            if (eventDate < today || eventDate >= tomorrow) return false
            break
          case 'tomorrow':
            if (eventDate < tomorrow || eventDate >= new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000)) return false
            break
          case 'week':
            if (eventDate >= weekFromNow) return false
            break
          case 'month':
            if (eventDate >= monthFromNow) return false
            break
        }
      }

      return true
    })
  }, [openBets, filters])

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Open Bets</CardTitle>
          <div className="text-sm text-muted-foreground">
            {filteredBets.length} of {openBets?.length || 0} bets
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <OpenBetsFilters onFiltersChange={setFilters} />
        
        <TableContainer className="!grid-rows-auto-1fr p-0">
          <TableData
            columns={openBetsColumns}
            data={filteredBets}
            isLoading={isLoading}
            noDataMessage="No open bets found. Place some bets from the dashboard to see them here!"
          />
        </TableContainer>
      </CardContent>
    </Card>
  )
}