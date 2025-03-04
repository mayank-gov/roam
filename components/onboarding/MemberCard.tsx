// components/MemberCard.tsx
'use client';

import React from 'react';
import { TeamMember } from '@/lib/types';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '../ui/Card';
import OnboardingProgress from './OnboardingProgress';
import Button from '../ui/Button';
import { useTeam } from '@/app/contexts/TeamContext';

interface MemberCardProps {
    member: TeamMember;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
    const { deleteTeamMember } = useTeam();

    // Format dates for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Calculate days since start or until start
    const getDaysInfo = () => {
        const today = new Date();
        const startDate = new Date(member.startDate);
        const endDate = new Date(member.endDate);
        const diffTime = startDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 0) {
            return `Starts in ${diffDays} day${diffDays === 1 ? '' : 's'}`;
        } else if (diffDays < 0) {
            const daysSinceStart = Math.abs(diffDays);
            return `Started ${daysSinceStart} day${daysSinceStart === 1 ? '' : 's'} ago`;
        } else {
            return 'Starts today';
        }
    };

    // Calculate remaining contract duration
    const getRemainingDuration = () => {
        const today = new Date();
        const endDate = new Date(member.endDate);

        if (today > endDate) {
            return 'Contract ended';
        }

        const diffTime = endDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffMonths = Math.floor(diffDays / 30);

        if (diffMonths > 0) {
            return `${diffMonths} month${diffMonths === 1 ? '' : 's'} remaining`;
        } else {
            return `${diffDays} day${diffDays === 1 ? '' : 's'} remaining`;
        }
    };

    // Calculate badge color based on start date
    const getBadgeColor = () => {
        const today = new Date();
        const startDate = new Date(member.startDate);
        const diffTime = startDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 0) return 'bg-green-100 text-green-800'; // Already started
        if (diffDays <= 7) return 'bg-yellow-100 text-yellow-800'; // Starting soon
        return 'bg-blue-100 text-blue-800'; // Starting in the future
    };

    return (
        <Card className="h-full flex-1 basis-0 max-w-[450px]">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle>{member.name}</CardTitle>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeColor()}`}>
            {getDaysInfo()}
          </span>
                </div>
                <p className="text-gray-500 m-0">Flextrack: {member.flextrackNumber}</p>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-500 mb-1">Start Date</p>
                        <p className="text-gray-900 m-0">{formatDate(member.startDate)}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 mb-1">End Date</p>
                        <p className="text-gray-900 m-0">{formatDate(member.endDate)}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 mb-1">Hiring Manager</p>
                        <p className="text-gray-900 m-0">{member.hiringManager || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 mb-1">Duration</p>
                        <p className="text-gray-900 m-0">{getRemainingDuration()}</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                    {member.isDeveloper && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-s font-medium bg-purple-100 text-purple-800">
              Developer
            </span>
                    )}
                    {member.isIncumbent && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-s font-medium bg-teal-100 text-teal-800">
              Incumbent
            </span>
                    )}
                    {member.isIncumbent && member.previousCompany && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-s font-medium bg-gray-100 text-gray-800">
              {member.previousCompany}
            </span>
                    )}
                </div>

                <div className="pt-4 border-t border-gray-200 mt-4">
                    <OnboardingProgress
                        memberId={member.id}
                        status={member.onboardingStatus}
                        isDeveloper={member.isDeveloper}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default MemberCard;