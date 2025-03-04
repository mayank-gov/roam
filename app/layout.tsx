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
        <body className="bg-gray-50">
        <TeamProvider>
            <div className="min-h-screen flex flex-col">
                {/* Top Navigation Bar */}
                <Header />

                <div className="flex flex-1">
                    {/* Sidebar for desktop */}
                    <Sidebar />

                    {/* Main Content */}
                    <div className="flex-1 overflow-auto">
                        {/* Mobile Navigation */}

                        <main className="">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </TeamProvider>
        </body>
        </html>
    );
}