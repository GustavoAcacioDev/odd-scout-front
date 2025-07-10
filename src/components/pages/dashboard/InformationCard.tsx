import { LucideIcon } from 'lucide-react'
import React from 'react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card'

function InformationCard({
  title,
  content,
  Icon,
}: {
  title: string
  content: string | React.ReactNode
  Icon: LucideIcon
}) {
  return (
    <Card className="gap-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  )
}

export default InformationCard
