// app/layout.tsx
import '@/styles/globals.css';
import { Metadata } from 'next';
import {TeamProvider} from "@/app/contexts/TeamContext";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import '../public/ODS/styles/ds-theme.css';
import '../public/ODS/styles/ds-theme.min.css';


export const metadata: Metadata = {
    title: 'Resource Management System',
    description: 'Track and manage team members onboarding process',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className="bg-white">
        <TeamProvider>
            <div className="min-h-screen flex flex-col">
                {/* Top Navigation Bar */}
                <Header />

                <div className="ontario-columns m-auto grid grid-cols-12 flex-1">
                    {/* Sidebar for desktop */}
                    <div className="md:block md:col-span-2 bg-white border-r">
                        <Sidebar />
                    </div>
                    <main className="py-6 px-4 sm:px-6 lg:px-8 col-span-10">
                        {children}
                    </main>
                </div>
            </div>
        </TeamProvider>
        </body>
        </html>
    );
}