'use client'
import React from 'react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card'
import { TableFooter } from '@/components/ui/shadcn/table'
import TableContainer from '@/components/ui/table/TableContainer'
import TableData from '@/components/ui/table/TableData'
import TableEntries from '@/components/ui/table/TableEntries'
import TablePagination from '@/components/ui/table/TablePagination'
import TableSizeSelect from '@/components/ui/table/TableSizeSelect'
import { availableBetsColumns } from '@/table-config/available-bets-columns'

function DashboardTable() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Available Bets</CardTitle>
          </div>
          <CardContent className="px-0">
            <TableContainer className="p-0">
              <TableData
                columns={availableBetsColumns}
                data={[]}
                isLoading={false}
              />
            </TableContainer>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  )
}

export default DashboardTable
