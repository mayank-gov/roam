// app/page.tsx
'use client';

import React, { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import MemberCard from '@/components/MemberCard';
import { useTeam } from '@/app/contexts/TeamContext';

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
      <div>
        <DashboardHeader
            title="Team Onboarding Dashboard"
            subtitle={`Track and manage onboarding progress for ${teamMembers.length} team members`}
        />

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm font-medium text-gray-500">Total Members</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm font-medium text-gray-500">Not Started</p>
            <p className="text-2xl font-bold text-red-600">{stats.notStarted}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm font-medium text-gray-500">In Progress</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm font-medium text-gray-500">Completed</p>
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          </div>
        </div>

        {/* Filters and Search Section */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div>
                <label htmlFor="search" className="sr-only">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                      id="search"
                      name="search"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Search by name or flextrack..."
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div>
                <label htmlFor="filterDeveloper" className="text-sm font-medium text-gray-700 mr-2">Developer:</label>
                <select
                    id="filterDeveloper"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={filterDeveloper === null ? '' : filterDeveloper ? 'true' : 'false'}
                    onChange={(e) => {
                      if (e.target.value === '') {
                        setFilterDeveloper(null);
                      } else {
                        setFilterDeveloper(e.target.value === 'true');
                      }
                    }}
                >
                  <option value="">All</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div>
                <label htmlFor="filterIncumbent" className="text-sm font-medium text-gray-700 mr-2">Incumbent:</label>
                <select
                    id="filterIncumbent"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={filterIncumbent === null ? '' : filterIncumbent ? 'true' : 'false'}
                    onChange={(e) => {
                      if (e.target.value === '') {
                        setFilterIncumbent(null);
                      } else {
                        setFilterIncumbent(e.target.value === 'true');
                      }
                    }}
                >
                  <option value="">All</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
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
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedMembers.map((member) => (
                  <MemberCard key={member.id} member={member} />
              ))}
            </div>
        )}
      </div>
  );
}