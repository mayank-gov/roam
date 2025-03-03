// components/ui/Progress.tsx
'use client';

import React from 'react';

interface ProgressProps {
    value: number;
    max: number;
    label?: string;
    showValue?: boolean;
    size?: 'sm' | 'md' | 'lg';
    color?: 'blue' | 'green' | 'yellow' | 'red';
    className?: string;
}

const Progress: React.FC<ProgressProps> = ({
                                               value,
                                               max,
                                               label,
                                               showValue = false,
                                               size = 'md',
                                               color = 'blue',
                                               className = '',
                                           }) => {
    const percentage = Math.round((value / max) * 100);

    const colorClasses = {
        blue: 'bg-blue-600',
        green: 'bg-green-600',
        yellow: 'bg-yellow-500',
        red: 'bg-red-600',
    };

    const heightClasses = {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
    };

    return (
        <div className={`w-full ${className}`}>
    {(label || showValue) && (
        <div className="flex justify-between items-center mb-1">
        {label && <div className="text-sm font-medium text-gray-700">{label}</div>}
        {showValue && (
            <div className="text-sm font-medium text-gray-500">
                {value}/{max} ({percentage}%)
        </div>
        )}
        </div>
    )}
        <div className={`w-full bg-gray-200 rounded-full ${heightClasses[size]}`}>
        <div
            className={`${colorClasses[color]} rounded-full ${heightClasses[size]}`}
        style={{ width: `${percentage}%` }}
    ></div>
    </div>
    </div>
    );
    };

    export default Progress;