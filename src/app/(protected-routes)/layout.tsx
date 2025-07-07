import SideMenuSheet from '@/components/layout/Menu/SideMenuSheet';

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="bg-gray-50 h-dvh w-screen grid grid-cols-auto-1fr">
            <SideMenuSheet />
            {children}
        </main>
    );
}
