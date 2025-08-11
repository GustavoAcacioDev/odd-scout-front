'use client'

import { Download, RotateCcw } from 'lucide-react'
import React from 'react'

import { TSelectOptions } from '@/components/ui/select/SelectUncontrolled'
import { Button } from '@/components/ui/shadcn/button'
import { Input } from '@/components/ui/shadcn/input'
import { Label } from '@/components/ui/shadcn/label'
import TableFilterSelect from '@/components/ui/table/TableFilterSelect'
import { useTableContext } from '@/contexts/TableContext'

const statusOptions: TSelectOptions[] = [
  { value: 'all', content: 'All Status' },
  { value: 'open', content: 'Open' },
  { value: 'won', content: 'Won' },
  { value: 'lost', content: 'Lost' },
  { value: 'void', content: 'Void' },
  { value: 'cashed out', content: 'Cashed Out' },
]

const marketTypeOptions: TSelectOptions[] = [
  { value: 'all', content: 'All Markets' },
  { value: 'winner', content: 'Match Winner' },
  { value: 'over_under', content: 'Over/Under' },
  { value: 'both_teams_score', content: 'Both Teams to Score' },
]

interface HistoryFiltersProps {
  onExport: () => void
  isExporting: boolean
}

export default function HistoryFilters({
  onExport,
  isExporting,
}: HistoryFiltersProps) {
  const { searchInput, handleSetSearchInput, handleClearSearchInput } =
    useTableContext()

  const handleDateChange = (field: string, value: string) => {
    handleSetSearchInput(field, value)
  }

  const handleClearFilters = () => {
    handleClearSearchInput()
  }

  return (
    <div className="mb-6 space-y-4 rounded-lg border bg-white p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearFilters}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Clear Filters
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            disabled={isExporting}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            {isExporting ? 'Exporting...' : 'Export CSV'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Status Filter */}
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <TableFilterSelect
            name="status"
            placeholder="Select status"
            items={statusOptions}
            defaultValue="all"
          />
        </div>

        {/* Market Type Filter */}
        <div className="space-y-2">
          <Label htmlFor="marketType">Market Type</Label>
          <TableFilterSelect
            name="marketType"
            placeholder="Select market"
            items={marketTypeOptions}
            defaultValue="all"
          />
        </div>

        {/* From Date Filter */}
        <div className="space-y-2">
          <Label htmlFor="fromDate">From Date</Label>
          <Input
            type="date"
            id="fromDate"
            name="fromDate"
            value={searchInput.fromDate || ''}
            onChange={(e) => handleDateChange('fromDate', e.target.value)}
          />
        </div>

        {/* To Date Filter */}
        <div className="space-y-2">
          <Label htmlFor="toDate">To Date</Label>
          <Input
            type="date"
            id="toDate"
            name="toDate"
            value={searchInput.toDate || ''}
            onChange={(e) => handleDateChange('toDate', e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
