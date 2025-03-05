// components/TeamMembersTable.tsx
'use client';

import React, { useState } from 'react';
import { useTeam } from '@/app/contexts/TeamContext';
import { TeamMember } from '@/lib/types';
import { formatDate } from '@/lib/utils';

const TeamMembersTable: React.FC = () => {
    const { teamMembers, loading, error } = useTeam();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState<keyof TeamMember>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // Filter team members based on search query
    const filteredMembers = teamMembers.filter((member) => {
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

    // Sort team members based on sort field and direction
    const sortedMembers = [...filteredMembers].sort((a, b) => {
        let valueA = a[sortField];
        let valueB = b[sortField];

        // Handle string comparison
        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return sortDirection === 'asc'
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA);
        }

        // Handle boolean comparison
        if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
            return sortDirection === 'asc'
                ? Number(valueA) - Number(valueB)
                : Number(valueB) - Number(valueA);
        }

        // Handle numeric comparison
        if (typeof valueA === 'number' && typeof valueB === 'number') {
            return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
        }

        return 0;
    });

    const handleSort = (field: keyof TeamMember) => {
        if (field === sortField) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const SortIcon = ({ field }: { field: keyof TeamMember }) => {
        if (field !== sortField) return null;

        return (
            <span className="ml-1">
        {sortDirection === 'asc' ? '▲' : '▼'}
      </span>
        );
    };

    return (
        <div>
            {/* Search Box */}
            <div className="ontario-search__container" style={{ marginBottom: '0' }} >
                <label htmlFor="search-team-members" className="ontario-label">Search team members</label>
                <div className="ontario-search__input-container">
                    <input
                        type="search"
                        name="search"
                        id="search-team-members"
                        autoComplete="off"
                        aria-autocomplete="none"
                        className="ontario-input ontario-search__input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        className="ontario-search__submit"
                        id="search-team-members-submit-button"
                        type="button"
                    >
                        <span className="ontario-show-for-sr">Submit</span>
                        <svg className="ontario-icon" focusable="false" viewBox="0 0 24 24"
                             preserveAspectRatio="xMidYMid meet">
                            <path
                                d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="ontario-table-scroll--wrapper">
                <div className="ontario-table-scroll--div"></div>
            </div>
            <div className="ontario-table-div">
                <table tabIndex={0}>
                    <caption>Team Members List</caption>
                    <thead>
                    <tr>
                        <th
                            scope="col"
                            onClick={() => handleSort('name')}
                            style={{cursor: 'pointer'}}
                        >
                            <div className="flex items-center">
                                Name
                                <SortIcon field="name"/>
                            </div>
                        </th>
                        <th
                            scope="col"
                            onClick={() => handleSort('id')}
                            style={{cursor: 'pointer'}}
                        >
                            <div className="flex items-center">
                                ID
                                <SortIcon field="id"/>
                            </div>
                        </th>
                        <th
                            scope="col"
                            onClick={() => handleSort('hiringManager')}
                            style={{cursor: 'pointer'}}
                        >
                            <div className="flex items-center">
                                Manager
                                <SortIcon field="hiringManager" />
                            </div>
                        </th>
                        <th
                            scope="col"
                            onClick={() => handleSort('startDate')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="flex items-center">
                                Start Date
                                <SortIcon field="startDate" />
                            </div>
                        </th>
                        <th
                            scope="col"
                            onClick={() => handleSort('endDate')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="flex items-center">
                                End Date
                                <SortIcon field="endDate" />
                            </div>
                        </th>
                        <th
                            scope="col"
                            onClick={() => handleSort('isDeveloper')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="flex items-center">
                                Developer
                                <SortIcon field="isDeveloper" />
                            </div>
                        </th>
                        <th scope="col">
                            Assets
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={7} style={{ textAlign: 'center' }}>
                                <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                                <span className="ml-2">Loading...</span>
                            </td>
                        </tr>
                    ) : error ? (
                        <tr>
                            <td colSpan={7} style={{ textAlign: 'center', color: 'red' }}>
                                Error: {error}
                            </td>
                        </tr>
                    ) : sortedMembers.length === 0 ? (
                        <tr>
                            <td colSpan={7} style={{ textAlign: 'center' }}>
                                No team members found.
                            </td>
                        </tr>
                    ) : (
                        sortedMembers.map((member) => (
                            <tr key={member.id}>
                                <th scope="row">
                                    {member.name}
                                </th>
                                <td>
                                    {member.flextrackNumber}
                                </td>
                                <td>
                                    {member.hiringManager}
                                </td>
                                <td>
                                    {formatDate(member.startDate)}
                                </td>
                                <td>
                                    {member.endDate ? formatDate(member.endDate) : '-'}
                                </td>
                                <td>
                                    {member.isDeveloper ? (
                                        <span className="badge badge-success">
                        Yes
                      </span>
                                    ) : (
                                        <span className="badge badge-info">
                        No
                      </span>
                                    )}
                                </td>
                                <td>
                                    {member.assets ? member.assets.join(', ') : 'None'}
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeamMembersTable;