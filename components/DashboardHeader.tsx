// components/DashboardHeader.tsx
'use client';

import React, { useState } from 'react';
import Button from './ui/Button';
import AddMemberModal from './AddMemberModal';

interface DashboardHeaderProps {
    title: string;
    subtitle?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, subtitle }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="pb-5 border-b border-gray-200 mb-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                    {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
                </div>
                <div>
                    <Button onClick={() => setIsModalOpen(true)}>Add New Team Member</Button>
                </div>
            </div>

            <AddMemberModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default DashboardHeader;