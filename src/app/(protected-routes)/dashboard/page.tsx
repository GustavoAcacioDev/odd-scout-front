import React from "react";

import PageContainer from "@/components/layout/PageContainer";
import DashboardTable from "@/components/pages/dashboard/DashboardTable";
import { TableProvider } from "@/contexts/TableContext";
import DashboardCards from "@/components/pages/dashboard/DashboardCards";

function DashboardPage() {
  return (
    <PageContainer>
      <DashboardCards />

      <TableProvider>
        <DashboardTable />
      </TableProvider>
    </PageContainer>
  );
}

export default DashboardPage;
