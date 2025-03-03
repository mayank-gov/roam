// components/ui/Select.tsx
'use client';

import React, { SelectHTMLAttributes } from 'react';

interface Option {
    value: string;
    label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
    label: string;
    options: Option[];
    error?: string;
    className?: string;
    fullWidth?: boolean;
}

const Select: React.FC<SelectProps> = ({
                                           label,
                                           options,
                                           error,
                                           className = '',
                                           fullWidth = true,
                                           ...props
                                       }) => {
    return (
        <div className={`${fullWidth ? 'w-full' : ''}`}>
            <label
                htmlFor={props.id}
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                {label}
            </label>
            <select
                className={`
          ${fullWidth ? 'w-full' : ''}
          rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500
          ${error ? 'border-red-300' : 'border-gray-300'}
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${className}
        `}
                {...props}
            >
                <option value="">Select an option</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default Select;