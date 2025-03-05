// components/ui/Button.tsx
'use client';

import React, { ButtonHTMLAttributes } from 'react';
import {IconType} from "react-icons";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    // Extended variant types to match ontario classes
    variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    fullWidth?: boolean;
    color?: 'default' | 'blue' | 'green' | 'red' | 'yellow' | 'purple';
    icon?: IconType;
    iconPosition?: 'start' | 'end';
}

const Button: React.FC<ButtonProps> = ({
                                           children,
                                           className = '',
                                           variant = 'primary',
                                           size = 'md',
                                           isLoading = false,
                                           disabled,
                                           fullWidth = false,
                                           color = 'default',
                                           icon: Icon,
                                           iconPosition = 'end',
                                           ...props
                                       }) => {
    // Base styles with Tailwind
    const baseStyles = 'inline-flex items-center justify-center rounded font-medium focus:outline-none transition-colors ';

    // Width styles
    const widthStyles = fullWidth ? 'w-full' : '';

    // Ontario class mapping
    const ontarioBaseClass = 'ontario-button';

    // Variant styles combining both approaches
    const variantStyles = {
        primary: `${ontarioBaseClass} ${ontarioBaseClass}--primary`,
        secondary: `${ontarioBaseClass} ${ontarioBaseClass}--secondary`,
        tertiary: `${ontarioBaseClass} ${ontarioBaseClass}--tertiary`,
        outline: `${ontarioBaseClass} border border-gray-300 hover:bg-gray-100 text-gray-700`,
        danger: `bg-red-600 hover:bg-red-700 text-white`,
    };

    // Size styles
    const sizeStyles = {
        sm: 'text-sm px-3 py-1.5',
        md: 'text-base px-4 py-2',
        lg: 'text-lg px-6 py-3',
    };

    // Color override styles - will be applied on top of variant styles
    const colorStyles = {
        default: '',
        blue: 'bg-blue-600 hover:bg-blue-700 text-white',
        green: 'bg-green-600 hover:bg-green-700 text-white',
        red: 'bg-red-600 hover:bg-red-700 text-white',
        yellow: 'bg-yellow-500 hover:bg-yellow-600 text-white',
        purple: 'bg-purple-600 hover:bg-purple-700 text-white',
    };

    // Only apply color override if it's not the default
    const appliedColorStyle = color === 'default' ? '' : colorStyles[color];

    // Disabled styles
    const disabledStyles = (disabled || isLoading) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

    // Icon styles
    const iconStyles = Icon ? 'gap-2' : '';

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${widthStyles} ${appliedColorStyle} ${iconStyles} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                </>
            ) : (
                <>
                    {Icon && iconPosition === 'start' && <Icon className="h-5 w-5" />}
                    {children}
                    {Icon && iconPosition === 'end' && <Icon className="h-5 w-5" />}
                </>
            )}
        </button>
    );
};

export default Button;