// app/asset-management/page.tsx
'use client';

import React from 'react';

export default function AssetManagement() {
    return (
        <div>
            <div className="pb-5 border-b border-gray-200 mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Asset Management</h1>
                <p className="mt-1 text-sm text-gray-500">Manage hardware and software assets</p>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
                <div className="text-center py-20">
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
                            d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                        />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Asset Management Coming Soon</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        This section is under development. Check back later for asset tracking capabilities.
                    </p>
                </div>
            </div>
        </div>
    );
}
