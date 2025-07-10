import { fetchAuthClient } from "@/lib/fetchWrapperClient/fetch-auth-client";

import { ApiResponseList } from "../../../global";

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