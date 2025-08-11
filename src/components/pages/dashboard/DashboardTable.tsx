'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'

import { Button } from '@/components/ui/shadcn/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card'
import TableContainer from '@/components/ui/table/TableContainer'
import TableData from '@/components/ui/table/TableData'
import useTableData from '@/hooks/use-table-data'
import getAvailableBets, {
  TAvaliableBets,
} from '@/services/bets/bet-service-client'
import runFullScrapingCycle from '@/services/scraping/scraping-service-client'
import { availableBetsColumns } from '@/table-config/available-bets-columns'

function DashboardTable() {
  const queryClient = useQueryClient()

  const queryFn = () => getAvailableBets()

  const { items: availableBetsList, isLoading: isLoadingBets } =
    useTableData<TAvaliableBets>({
      queryKey: ['get-available-bets'],
      queryFn,
    })

  const scrapingMutation = useMutation({
    mutationFn: () => runFullScrapingCycle(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-available-bets'] })
    },
    onError: (error) => {
      console.error('Erro durante o scraping:', error)
    },
  })

  const handleFetchAvailableBets = () => {
    scrapingMutation.mutate()
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Available Bets</CardTitle>
            <Button
              size="sm"
              variant={'outline'}
              disabled={scrapingMutation.isPending}
              onClick={handleFetchAvailableBets}
            >
              {scrapingMutation.isPending ? 'Finding Bets...' : 'Find Bets'}
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <TableContainer className="!grid-rows-auto-1fr p-0">
            <TableData
              columns={availableBetsColumns}
              data={availableBetsList || []}
              isLoading={isLoadingBets || scrapingMutation.isPending}
            />
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardTable
