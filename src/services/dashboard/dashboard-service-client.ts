import { fetchAuthClient } from "@/lib/fetchWrapperClient/fetch-auth-client";
import { ApiResponse } from "../../../global";

export type DashboardMetric = {
  title: string
  value: number
  unit: 'currency' | 'percentage' | 'count' | 'text'
  changeValue?: number | null
  changeUnit: 'percentage' | 'percentage_points' | 'absolute' | 'text'
  changeText: string
};

export type TDashboardCardsValue = {
  total: DashboardMetric;
  winRate: DashboardMetric;
  profit: DashboardMetric;
  active: DashboardMetric;
};

export default function getDashboardCards() {
  const fetch = fetchAuthClient();

  const res =
    fetch.get<ApiResponse<TDashboardCardsValue>>("/dashboard/metrics");

  return res;
}
