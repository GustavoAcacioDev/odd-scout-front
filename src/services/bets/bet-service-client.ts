import { fetchAuthClient } from '@/lib/fetchWrapperClient/fetch-auth-client'

import { ApiResponse, ApiResponseList } from '../../../global'

export interface PlaceBetResponse {
  bet: {
    id: string
    eventId: string
    league: string
    eventDateTime: string
    team1: string
    team2: string
    marketType: string
    selectedOutcome: number
    selectedOutcomeDescription: string
    amount: number
    odds: number
    potentialReturn: number
    actualReturn: number | null
    status: string
    statusDescription: string
    placedAt: string
    settledAt: string | null
    profit: number
  }
  valueBetInfo: {
    expectedValue: number
    impliedProbability: number
    confidenceScore: number
    pinnacleOdd: number
  }
}

export interface PlaceValueBetRequest {
  valueBetId: string
  amount: number
}

export type TAvaliableBets = {
  id: string
  league: string
  eventDateTime: string
  team1: string
  team2: string
  link: string
  bestOutcome: number
  betbyOdd: number
  pinnacleOdd: number
  impliedProbability: number
  expectedValue: number
  confidenceScore: number
  calculatedAt: string
}

export interface BetHistoryItem {
  id: string
  eventId: string
  league: string
  eventDateTime: string
  team1: string
  team2: string
  marketType: string
  selectedOutcome: number
  selectedOutcomeDescription: string
  amount: number
  odds: number
  potentialReturn: number
  profit: number
  status: string
  statusDescription: string
  placedAt: string
  settledAt: string | null
}

export interface BetHistoryFilters {
  pageNumber?: number
  pageSize?: number
  status?: string
  fromDate?: string
  toDate?: string
  marketType?: string
}

export interface BetHistoryStatistics {
  totalBets: number
  openBets: number
  wonBets: number
  lostBets: number
  voidBets: number
  totalStaked: number
  totalProfit: number
  winRate: number
  roi: number
  averageOdds: number
  biggestWin: number
  biggestLoss: number
  profitLoss: number
}

export default function getAvailableBets() {
  const fetch = fetchAuthClient()

  const res = fetch.get<ApiResponseList<TAvaliableBets>>(
    '/scraping/value-bets?pageNumber=1&pageSize=1000&minimumEV=0.001',
  )

  return res
}

export function placeValueBet(data: PlaceValueBetRequest) {
  const fetch = fetchAuthClient()

  const res = fetch.post<PlaceValueBetRequest, ApiResponse<PlaceBetResponse>>(
    '/betting/place-value-bet',
    data,
  )

  return res
}

export function getBetHistory(filters?: BetHistoryFilters) {
  const fetch = fetchAuthClient()

  const queryParams = new URLSearchParams()

  if (filters?.pageNumber)
    queryParams.append('pageNumber', filters.pageNumber.toString())
  if (filters?.pageSize)
    queryParams.append('pageSize', filters.pageSize.toString())
  if (filters?.status) queryParams.append('status', filters.status)
  if (filters?.fromDate) queryParams.append('fromDate', filters.fromDate)
  if (filters?.toDate) queryParams.append('toDate', filters.toDate)
  if (filters?.marketType) queryParams.append('marketType', filters.marketType)

  const res = fetch.get<ApiResponseList<BetHistoryItem>>(
    `/bets/history?${queryParams.toString()}`,
  )

  return res
}

export function getBetHistoryStatistics() {
  const fetch = fetchAuthClient()

  const res = fetch.get<ApiResponse<BetHistoryStatistics>>('/bets/statistics')

  return res
}
