import { Sidebar } from "@/components/layout/sidebar/Sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-gray-50 h-dvh w-screen flex">
      <Sidebar />
      {children}
    </main>
  );
}
