// components/DashboardHeader.tsx
'use client';

import React, { useState } from 'react';
import Button from './Button';
import AddMemberModal from '../onboarding/AddMemberModal';



interface DashboardHeaderProps {
    title: string;
    subtitle?: string;
}

const SectionHeader: React.FC<DashboardHeaderProps> = ({ title, subtitle }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="py-5 border-b border-gray-200 mb-8">
            <div className="flex justify-between items-top">
                <div>
                    <h2>{title}</h2>
                    {subtitle && <p className="text-gray-500">{subtitle}</p>}
                </div>
                <div className="py-1">
                    <Button variant="primary" onClick={() => setIsModalOpen(true)}>Add New Team Member</Button>
                </div>
            </div>

            <AddMemberModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default SectionHeader;