// components/OnboardingProgress.tsx
'use client';

import React from 'react';
import { OnboardingStatus } from '@/lib/types';
import Checkbox from './ui/Checkbox';
import Progress from './ui/Progress';
import {useTeam} from "@/app/contexts/TeamContext";


interface OnboardingProgressProps {
    memberId: string;
    status: OnboardingStatus;
    isDeveloper: boolean;
}

const OnboardingProgress: React.FC<OnboardingProgressProps> = ({
                                                                   memberId,
                                                                   status,
                                                                   isDeveloper
                                                               }) => {
    const { updateOnboardingStatus } = useTeam();

    // Calculate completion percentage
    const calculateProgress = () => {
        let completed = 0;
        let total = 0;

        // Count required steps
        if (status.opsLoginCreated !== null) {
            total++;
            if (status.opsLoginCreated) completed++;
        }

        if (status.assetsAssigned !== null) {
            total++;
            if (status.assetsAssigned) completed++;
        }

        if (status.accessCardSubmitted !== null) {
            total++;
            if (status.accessCardSubmitted) completed++;
        }

        // Developer access is only relevant for developers
        if (isDeveloper && status.developerAccessGranted !== null) {
            total++;
            if (status.developerAccessGranted) completed++;
        }

        return {
            completed,
            total,
            percentage: total > 0 ? Math.round((completed / total) * 100) : 0
        };
    };

    const progress = calculateProgress();

    // Get color based on progress
    const getProgressColor = (percentage: number) => {
        if (percentage < 25) return 'red';
        if (percentage < 75) return 'yellow';
        return 'green';
    };

    const handleStatusChange = (field: keyof OnboardingStatus, checked: boolean) => {
        updateOnboardingStatus(memberId, field, checked);
    };

    return (
        <div className="space-y-4">
            <Progress
                value={progress.completed}
                max={progress.total}
                color={getProgressColor(progress.percentage)}
                label="Onboarding Progress"
                showValue={true}
            />

            <div className="space-y-2 pt-2">
                <Checkbox
                    id={`ops-login-${memberId}`}
                    label="OPS Login Account Creation"
                    checked={status.opsLoginCreated}
                    onChange={(e) => handleStatusChange('opsLoginCreated', e.target.checked)}
                />

                <Checkbox
                    id={`assets-${memberId}`}
                    label="Assets Assignment"
                    checked={status.assetsAssigned}
                    onChange={(e) => handleStatusChange('assetsAssigned', e.target.checked)}
                />

                <Checkbox
                    id={`access-card-${memberId}`}
                    label="Access Card Form Submission"
                    checked={status.accessCardSubmitted}
                    onChange={(e) => handleStatusChange('accessCardSubmitted', e.target.checked)}
                />

                {isDeveloper && (
                    <Checkbox
                        id={`dev-access-${memberId}`}
                        label="Developer Access"
                        checked={status.developerAccessGranted || false}
                        onChange={(e) => handleStatusChange('developerAccessGranted', e.target.checked)}
                    />
                )}
            </div>
        </div>
    );
};

export default OnboardingProgress;