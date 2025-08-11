import React from 'react'

import PageContainer from '@/components/layout/PageContainer'
import HistoryCards from '@/components/pages/history/HistoryCards'
import HistoryTable from '@/components/pages/history/HistoryTable'
import { TableProvider } from '@/contexts/TableContext'

function HistoryPage() {
  return (
    <PageContainer>
      <HistoryCards />

      <TableProvider>
        <HistoryTable />
      </TableProvider>
    </PageContainer>
  )
}

export default HistoryPage
