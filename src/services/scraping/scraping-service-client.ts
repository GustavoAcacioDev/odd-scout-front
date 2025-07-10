import { fetchAuthClient } from "@/lib/fetchWrapperClient/fetch-auth-client";
import { ApiResponseList } from "../../../global";
import { TAvaliableBets } from "../bets/bet-service-client";

export default function runFullScrapingCycle() {
  const fetch = fetchAuthClient();

  const res = fetch.post<null, ApiResponseList<TAvaliableBets>>(
    "/scraping/run-complete-cycle",
    null,
  );

  return res;
}
