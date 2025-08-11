import React from 'react'

import PageContainer from '@/components/layout/PageContainer'
import OpenBetsTable from '@/components/pages/bets/OpenBetsTable'
import OpenBetsStats from '@/components/pages/bets/OpenBetsStats'
import { TableProvider } from '@/contexts/TableContext'

function BetsPage() {
  return (
    <PageContainer>
      <OpenBetsStats />
      
      <TableProvider>
        <OpenBetsTable />
      </TableProvider>
    </PageContainer>
  )
}

export default BetsPage
