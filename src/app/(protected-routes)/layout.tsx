import { PageHeader } from '@/components/layout/header/PageHeader'
import { Sidebar } from '@/components/layout/sidebar/Sidebar'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex h-dvh w-screen bg-gray-50">
      <Sidebar />
      <div className="grid-rows-auto-1fr grid h-dvh w-full">
        <PageHeader />
        {children}
      </div>
    </main>
  )
}
