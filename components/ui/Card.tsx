// components/ui/Card.tsx
import React, { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
        <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
            {children}
        </div>
    );
};

interface CardHeaderProps {
    children: ReactNode;
    className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
    return (
        <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
            {children}
        </div>
    );
};

interface CardContentProps {
    children: ReactNode;
    className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
    return (
        <div className={`px-6 py-4 ${className}`}>
            {children}
        </div>
    );
};

interface CardFooterProps {
    children: ReactNode;
    className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
    return (
        <div className={`px-6 py-4 border-t border-gray-200 bg-gray-50 ${className}`}>
            {children}
        </div>
    );
};

interface CardTitleProps {
    children: ReactNode;
    className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className = '' }) => {
    return (
        <h4 className={`text-gray-900 ${className}`}>
            {children}
        </h4>
    );
};

export default { Card, CardHeader, CardContent, CardFooter, CardTitle };