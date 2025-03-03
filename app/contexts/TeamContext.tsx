// contexts/TeamContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TeamMember, TeamMemberFormData } from '@/lib/types';

interface TeamContextProps {
    teamMembers: TeamMember[];
    loading: boolean;
    error: string | null;
    addTeamMember: (member: TeamMemberFormData) => Promise<void>;
    updateTeamMember: (member: TeamMember) => Promise<void>;
    deleteTeamMember: (id: string) => Promise<void>;
    updateOnboardingStatus: (id: string, field: keyof TeamMember['onboardingStatus'], value: boolean) => Promise<void>;
}

const TeamContext = createContext<TeamContextProps | undefined>(undefined);

export const TeamProvider = ({ children }: { children: ReactNode }) => {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch team members on initial load
    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const response = await fetch('/api/team');
                if (!response.ok) {
                    throw new Error('Failed to fetch team data');
                }
                const data = await response.json();
                setTeamMembers(data.teamMembers);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchTeamMembers();
    }, []);

    // Add a new team member
    const addTeamMember = async (member: TeamMemberFormData) => {
        try {
            setLoading(true);
            const response = await fetch('/api/team', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(member),
            });

            if (!response.ok) {
                throw new Error('Failed to add team member');
            }

            const newMember = await response.json();
            setTeamMembers((prev) => [...prev, newMember]);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    // Update a team member
    const updateTeamMember = async (member: TeamMember) => {
        try {
            setLoading(true);
            const response = await fetch('/api/team', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(member),
            });

            if (!response.ok) {
                throw new Error('Failed to update team member');
            }

            const updatedMember = await response.json();
            setTeamMembers((prev) =>
                prev.map((m) => (m.id === updatedMember.id ? updatedMember : m))
            );
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    // Delete a team member
    const deleteTeamMember = async (id: string) => {
        try {
            setLoading(true);
            const response = await fetch('/api/team', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete team member');
            }

            setTeamMembers((prev) => prev.filter((m) => m.id !== id));
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    // Update onboarding status for a specific field
    const updateOnboardingStatus = async (
        id: string,
        field: keyof TeamMember['onboardingStatus'],
        value: boolean
    ) => {
        const member = teamMembers.find((m) => m.id === id);
        if (!member) return;

        const updatedMember = {
            ...member,
            onboardingStatus: {
                ...member.onboardingStatus,
                [field]: value,
            },
        };

        await updateTeamMember(updatedMember);
    };

    return (
        <TeamContext.Provider
            value={{
        teamMembers,
            loading,
            error,
            addTeamMember,
            updateTeamMember,
            deleteTeamMember,
            updateOnboardingStatus,
    }}
>
    {children}
    </TeamContext.Provider>
);
};

export const useTeam = () => {
    const context = useContext(TeamContext);
    if (context === undefined) {
        throw new Error('useTeam must be used within a TeamProvider');
    }
    return context;
};