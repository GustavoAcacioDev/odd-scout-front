'use client'
import React, { useState } from 'react'

import SelectUncontrolled, {
  TSelectOptions,
} from '@/components/ui/select/SelectUncontrolled'
import { Card, CardHeader, CardTitle } from '@/components/ui/shadcn/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn/select'

const filterOptions: TSelectOptions = [
  {
    id: 1,
    value: '1',
    content: 'Janeiro',
  },
]

function DashboardTable() {
  const [selectedFilter, setSelectedFilter] = useState(undefined)

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Available Bets</CardTitle>

            <div className="flex items-center gap-2">
              <SelectUncontrolled
                items={filterOptions}
                placeholder="Selecione um filtro"
              />
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sports</SelectItem>
                  <SelectItem value="nba">NBA</SelectItem>
                  <SelectItem value="nfl">NFL</SelectItem>
                  <SelectItem value="soccer">Soccer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}

export default DashboardTable
