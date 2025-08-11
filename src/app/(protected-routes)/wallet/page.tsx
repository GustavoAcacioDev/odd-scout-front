import React from 'react'

import PageContainer from '@/components/layout/PageContainer'
import WalletBalance from '@/components/pages/wallet/WalletBalance'
import WalletActions from '@/components/pages/wallet/WalletActions'
import WalletTransactions from '@/components/pages/wallet/WalletTransactions'

function WalletPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <WalletBalance />
        <WalletActions />
        <WalletTransactions />
      </div>
    </PageContainer>
  )
}

export default WalletPage
