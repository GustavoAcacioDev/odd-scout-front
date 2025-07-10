import { AuthBackground } from '../../components/pages/auth/AuthBackground'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex h-dvh w-screen bg-gray-50">
      {children}
      <AuthBackground />
    </main>
  )
}
