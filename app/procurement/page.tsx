// app/procurement/page.tsx
'use client';

import React from 'react';

export default function Procurement() {
    return (
        <div>
            <div className="pb-5 border-b border-gray-200 mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Procurement</h1>
                <p className="mt-1 text-sm text-gray-500">Manage procurement requests and orders</p>
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
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Procurement Module Coming Soon</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        This section is under development. Check back later for procurement management features.
                    </p>
                </div>
            </div>
        </div>
    );
}