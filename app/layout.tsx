// app/layout.tsx
import '@/styles/globals.css';
import { Metadata } from 'next';
import { TeamProvider } from '@/app/contexts/TeamContext';

export const metadata: Metadata = {
    title: 'Team Onboarding Dashboard',
    description: 'Track and manage new team members onboarding process',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
        <TeamProvider>
            <div className="min-h-screen bg-gray-50">
                <main className="py-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </TeamProvider>
        </body>
        </html>
    );
}