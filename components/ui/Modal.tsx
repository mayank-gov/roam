// components/ui/Modal.tsx
'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import Button from './Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    footer?: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    closeOnClickOutside?: boolean;
}

const Modal: React.FC<ModalProps> = ({
                                         isOpen,
                                         onClose,
                                         title,
                                         children,
                                         footer,
                                         size = 'md',
                                         closeOnClickOutside = true,
                                     }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            setTimeout(() => {
                setIsVisible(false);
                document.body.style.overflow = 'unset';
            }, 200);
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isVisible) return null;

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget && closeOnClickOutside) {
            onClose();
        }
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity ${
                isOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={handleBackdropClick}
        >
            <div
                className={`${
                    sizeClasses[size]
                } w-full bg-white rounded-lg shadow-xl transform transition-transform ${
                    isOpen ? 'scale-100' : 'scale-95'
                }`}
            >
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="px-6 py-4">{children}</div>
                {footer && (
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;