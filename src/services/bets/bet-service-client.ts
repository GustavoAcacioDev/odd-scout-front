import { fetchAuthClient } from "@/lib/fetchWrapperClient/fetch-auth-client";

import { ApiResponseList } from "../../../global";
import { ApiResponse } from "../../../global";

export interface PlaceBetResponse {
  bet: {
    id: string;
    eventId: string;
    league: string;
    eventDateTime: string;
    team1: string;
    team2: string;
    marketType: string;
    selectedOutcome: number;
    selectedOutcomeDescription: string;
    amount: number;
    odds: number;
    potentialReturn: number;
    actualReturn: number | null;
    status: string;
    statusDescription: string;
    placedAt: string;
    settledAt: string | null;
    profit: number;
  };
  valueBetInfo: {
    expectedValue: number;
    impliedProbability: number;
    confidenceScore: number;
    pinnacleOdd: number;
  };
}

export interface PlaceValueBetRequest {
  valueBetId: string;
  amount: number;
}

export type TAvaliableBets = {
  id: string;
  league: string;
  eventDateTime: string;
  team1: string;
  team2: string;
  link: string;
  bestOutcome: number;
  betbyOdd: number;
  pinnacleOdd: number;
  impliedProbability: number;
  expectedValue: number;
  confidenceScore: number;
  calculatedAt: string;
};

export default function getAvailableBets() {
  const fetch = fetchAuthClient();

  const res = fetch.get<ApiResponseList<TAvaliableBets>>(
    "/scraping/value-bets?pageNumber=1&pageSize=1000&minimumEV=0.001",
  );

  return res;
}

export function placeValueBet(data: PlaceValueBetRequest) {
  const fetch = fetchAuthClient();

  const res = fetch.post<PlaceValueBetRequest, ApiResponse<PlaceBetResponse>>(
    "/betting/place-value-bet",
    data,
  );

  return res;
}
