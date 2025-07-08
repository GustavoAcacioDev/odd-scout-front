import { Activity, DollarSign, Target, TrendingUp } from 'lucide-react'
import React from 'react'

import PageContainer from '@/components/layout/PageContainer'
import InformationCard from '@/components/pages/dashboard/InformationCard'

function DashboardPage() {
  return (
    <PageContainer>
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <InformationCard
          Icon={Target}
          title="Total Bets"
          content={
            <>
              <div className="text-2xl font-bold">247</div>
              <p className="text-muted-foreground text-xs">
                +12% from last month
              </p>
            </>
          }
        />

        <InformationCard
          Icon={TrendingUp}
          title="Win Rate"
          content={
            <>
              <div className="text-2xl font-bold">68.4%</div>
              <p className="text-positive-pure text-xs">
                +2.1% from last month
              </p>
            </>
          }
        />

        <InformationCard
          Icon={DollarSign}
          title="Total Profit"
          content={
            <>
              <div className="text-2xl font-bold">$2,847</div>
              <p className="text-positive-pure text-xs">
                +18.2% from last month
              </p>
            </>
          }
        />

        <InformationCard
          Icon={Activity}
          title="Active Bets"
          content={
            <>
              <div className="text-2xl font-bold">12</div>
              <p className="text-muted-foreground text-xs">3 ending today</p>
            </>
          }
        />
      </div>
    </PageContainer>
  )
}

export default DashboardPage
