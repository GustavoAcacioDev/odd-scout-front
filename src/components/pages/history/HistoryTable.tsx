"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import TableContainer from "@/components/ui/table/TableContainer";
import TableData from "@/components/ui/table/TableData";
import useCustomToast from "@/hooks/use-custom-toast";
import HistoryFilters from "./HistoryFilters";
import { useBetHistory } from "@/hooks/use-bet-history";
import { betHistoryColumns } from "@/table-config/bet-history-columns";

function HistoryTable() {
  const [isExporting, setIsExporting] = useState(false);
  const { successToast, errorToast } = useCustomToast();

  const {
    items: historyList,
    isLoading: isLoadingHistory,
    totalCount,
  } = useBetHistory();

  const handleExportCSV = async () => {
    setIsExporting(true);

    try {
      const headers = [
        "Date",
        "Time",
        "Event",
        "League",
        "Bet",
        "Market Type",
        "Stake",
        "Odds",
        "Potential Payout",
        "Profit/Loss",
        "Status",
      ];

      const csvContent = [
        headers.join(","),
        ...historyList.map((bet) => {
          const date = new Date(bet.placedAt);
          return [
            date.toLocaleDateString("pt-BR"),
            date.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            `"${bet.team1} vs ${bet.team2}"`,
            `"${bet.league}"`,
            `"${bet.selectedOutcomeDescription}"`,
            `"${bet.marketType}"`,
            bet.amount.toFixed(2),
            bet.odds.toFixed(2),
            bet.potentialReturn.toFixed(2),
            bet.profit.toFixed(2),
            `"${bet.statusDescription}"`,
          ].join(",");
        }),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `bet-history-${new Date().toISOString().split("T")[0]}.csv`,
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      successToast(
        "Export Successful",
        `${historyList.length} bet records exported to CSV.`,
      );
    } catch (error) {
      console.error("Error exporting CSV:", error);
      errorToast(
        "Export Failed",
        "There was an error exporting your bet history. Please try again.",
      );
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <HistoryFilters onExport={handleExportCSV} isExporting={isExporting} />

      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Bet History</CardTitle>
            <div className="text-sm text-gray-600">
              {totalCount} total bet{totalCount !== 1 ? "s" : ""}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <TableContainer className="!grid-rows-auto-1fr p-0">
            <TableData
              columns={betHistoryColumns}
              data={historyList || []}
              isLoading={isLoadingHistory}
              emptyText={
                <div className="py-8 text-center">
                  <p className="mb-2 text-gray-500">No bet history found</p>
                  <p className="text-sm text-gray-400">
                    Try adjusting your filters or place your first bet to see it
                    here.
                  </p>
                </div>
              }
            />
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default HistoryTable;
