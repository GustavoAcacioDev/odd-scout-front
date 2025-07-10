'use client'
import { usePathname } from 'next/navigation'

import { getHeaderTitle } from '@/utils/get-header-title'

export function PageHeader() {
  const pathname = usePathname()
  const titleElement = getHeaderTitle(pathname)

  return (
    <div className="border-b border-gray-200 bg-white px-6 py-4">
      <h1 className="text-primary-900 text-2xl font-bold">
        {titleElement.title}
      </h1>
    </div>
  )
}
