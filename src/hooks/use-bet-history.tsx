import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTableContext } from "@/contexts/TableContext";
import {
  getBetHistory,
  BetHistoryItem,
  BetHistoryFilters,
} from "@/services/bets/bet-service-client";

const ITEMS_PER_PAGE = 20;

export function useBetHistory() {
  const { currentPage, searchInput, handleSetTotalItems } = useTableContext();

  const filters: BetHistoryFilters = useMemo(() => {
    const queryFilters: BetHistoryFilters = {
      pageNumber: currentPage,
      pageSize: ITEMS_PER_PAGE,
    };

    // Add filters from search input
    if (searchInput.status && searchInput.status !== "all") {
      queryFilters.status = searchInput.status;
    }

    if (searchInput.fromDate) {
      queryFilters.fromDate = searchInput.fromDate;
    }

    if (searchInput.toDate) {
      queryFilters.toDate = searchInput.toDate;
    }

    if (searchInput.marketType && searchInput.marketType !== "all") {
      queryFilters.marketType = searchInput.marketType;
    }

    return queryFilters;
  }, [currentPage, searchInput]);

  const queryKey = useMemo(
    () => [
      "get-bet-history",
      filters.pageNumber,
      filters.pageSize,
      filters.status,
      filters.fromDate,
      filters.toDate,
      filters.marketType,
    ],
    [filters],
  );

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => getBetHistory(filters),
    staleTime: 30000, // 30 seconds
  });

  useEffect(() => {
    if (data?.items !== undefined) {
      handleSetTotalItems(data.items.length);
    }
  }, [data?.items, handleSetTotalItems]);

  return {
    items: data?.items || [],
    totalCount: data?.items.length || 0,
    pageNumber: 1,
    pageSize: ITEMS_PER_PAGE,
    isLoading,
    error,
    refetch,
  };
}
