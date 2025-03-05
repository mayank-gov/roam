// app/page.tsx
'use client';

import React, { useState } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import MemberCard from '@/components/onboarding/MemberCard';
import { useTeam } from '@/app/contexts/TeamContext';
import TeamMembersTable from "@/components/onboarding/TeamMemebersTable";

export default function Home() {
  const { teamMembers, loading, error } = useTeam();
  const [filterDeveloper, setFilterDeveloper] = useState<boolean | null>(null);
  const [filterIncumbent, setFilterIncumbent] = useState<boolean | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter team members based on filters and search query
  const filteredMembers = teamMembers.filter((member) => {
    // Filter by developer status
    if (filterDeveloper !== null && member.isDeveloper !== filterDeveloper) {
      return false;
    }

    // Filter by incumbent status
    if (filterIncumbent !== null && member.isIncumbent !== filterIncumbent) {
      return false;
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
          member.name.toLowerCase().includes(query) ||
          member.flextrackNumber.toLowerCase().includes(query) ||
          (member.hiringManager && member.hiringManager.toLowerCase().includes(query))
      );
    }

    return true;
  });

  // Sort members by start date (most recent first)
  const sortedMembers = [...filteredMembers].sort((a, b) =>
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  // Calculate onboarding statistics
  const calculateStats = () => {
    const total = teamMembers.length;
    const inProgress = teamMembers.filter(member => {
      const status = member.onboardingStatus;
      const completed = Object.values(status).filter(val => val === true).length;
      const total = Object.values(status).filter(val => val !== null).length;
      return completed > 0 && completed < total;
    }).length;

    const completed = teamMembers.filter(member => {
      const status = member.onboardingStatus;
      const completed = Object.values(status).filter(val => val === true).length;
      const total = Object.values(status).filter(val => val !== null).length;
      return completed === total && total > 0;
    }).length;

    const notStarted = total - inProgress - completed;

    return { total, inProgress, completed, notStarted };
  };

  const stats = calculateStats();

  return (
      <div className="m-auto">
        <SectionHeader
            title="Team Onboarding Dashboard"
            subtitle={`Track and manage onboarding progress for ${teamMembers.length} team members`}
        />

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-lg border border-gray-300">
            <p className="text-gray-500 mb-1">Total Members</p>
            <h4 className="m-0">{stats.total}</h4>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-300">
            <p className="text-gray-500 mb-1">Not Started</p>
            <h4 className="text-red-600 m-0">{stats.notStarted}</h4>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-300">
            <p className="text-gray-500 mb-1">In Progress</p>
            <h4 className="text-yellow-600 m-0">{stats.inProgress}</h4>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-300">
            <p className="text-gray-500 mb-1">Completed</p>
            <h4 className="text-green-600 m-0">{stats.completed}</h4>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="mt-2 text-gray-600">Loading team members...</p>
            </div>
        )}

        {/* Error State */}
        {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                       fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    Error loading team data: {error}
                  </p>
                </div>
              </div>
            </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredMembers.length === 0 && (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
              >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No team members</h3>
              <p className="mt-1 text-sm text-gray-500">
                {teamMembers.length === 0
                    ? 'Get started by adding a new team member'
                    : 'No team members match your current filters'}
              </p>
            </div>
        )}

        {/* Team Members Grid */}
        {!loading && !error && filteredMembers.length > 0 && (
            <div className="flex flex-wrap gap-6">
              {sortedMembers.map((member) => (
                  <MemberCard key={member.id} member={member}/>
              ))}
            </div>
        )}

        <div className="mt-2">
          <TeamMembersTable/>
        </div>
      </div>
  );
}