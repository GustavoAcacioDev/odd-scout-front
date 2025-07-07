import { AuthBackground } from '../../components/pages/auth/AuthBackground';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-gray-50 h-dvh w-screen flex">
      {children}
      <AuthBackground />
    </main>
  );
}
