// components/ui/Checkbox.tsx
'use client';

import React, { InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label: string;
    description?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
                                               label,
                                               description,
                                               className = '',
                                               disabled,
                                               ...props
                                           }) => {
    return (
        <div className="flex items-start">
            <div className="flex items-center h-5">
                <input
                    type="checkbox"
                    className={`h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${className}`}
                    disabled={disabled}
                    {...props}
                />
            </div>
            <div className="ml-3">
                <label
                    htmlFor={props.id}
                    className={`font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}
                >
                    {label}
                </label>
                {description && (
                    <p className={`text-xs ${disabled ? 'text-gray-300' : 'text-gray-500'}`}>
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Checkbox;