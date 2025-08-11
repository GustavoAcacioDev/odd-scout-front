'use client'

import { Calendar, Filter, Search } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/shadcn/button'
import { Input } from '@/components/ui/shadcn/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn/select'

interface OpenBetsFiltersProps {
  onFiltersChange: (filters: {
    search?: string
    league?: string
    timeframe?: string
  }) => void
}

export default function OpenBetsFilters({
  onFiltersChange,
}: OpenBetsFiltersProps) {
  const [search, setSearch] = useState('')
  const [league, setLeague] = useState<string>('')
  const [timeframe, setTimeframe] = useState<string>('')

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onFiltersChange({ search: value, league, timeframe })
  }

  const handleLeagueChange = (value: string) => {
    setLeague(value)
    onFiltersChange({ search, league: value, timeframe })
  }

  const handleTimeframeChange = (value: string) => {
    setTimeframe(value)
    onFiltersChange({ search, league, timeframe: value })
  }

  const clearFilters = () => {
    setSearch('')
    setLeague('')
    setTimeframe('')
    onFiltersChange({})
  }

  return (
    <div className="mb-6 flex flex-col gap-4 rounded-lg bg-gray-50 p-4 sm:flex-row">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <Input
            placeholder="Search events or teams..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Select value={league} onValueChange={handleLeagueChange}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="All Leagues" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">All Leagues</SelectItem>
          <SelectItem value="Premier League">Premier League</SelectItem>
          <SelectItem value="La Liga">La Liga</SelectItem>
          <SelectItem value="Serie A">Serie A</SelectItem>
          <SelectItem value="Bundesliga">Bundesliga</SelectItem>
          <SelectItem value="Ligue 1">Ligue 1</SelectItem>
          <SelectItem value="Champions League">Champions League</SelectItem>
        </SelectContent>
      </Select>

      <Select value={timeframe} onValueChange={handleTimeframeChange}>
        <SelectTrigger className="w-full sm:w-48">
          <Calendar className="mr-2 h-4 w-4" />
          <SelectValue placeholder="All Events" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">All Events</SelectItem>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="tomorrow">Tomorrow</SelectItem>
          <SelectItem value="week">This Week</SelectItem>
          <SelectItem value="month">This Month</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        onClick={clearFilters}
        disabled={!search && !league && !timeframe}
      >
        <Filter className="mr-2 h-4 w-4" />
        Clear
      </Button>
    </div>
  )
}
