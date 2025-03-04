// components/AddMemberModal.tsx
'use client';

import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Select from '../ui/Select';
import { TeamMemberFormData, PreviousCompany } from '@/lib/types';
import { useTeam } from '@/app/contexts/TeamContext';

interface AddMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ isOpen, onClose }) => {
    const { addTeamMember, loading } = useTeam();

    const [formData, setFormData] = useState<TeamMemberFormData>({
        name: '',
        flextrackNumber: '',
        startDate: '',
        endDate: '',
        hiringManager: '',
        isDeveloper: false,
        isIncumbent: false,
        previousCompany: undefined,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Resource name is required';
        }

        if (!formData.flextrackNumber.trim()) {
            newErrors.flextrackNumber = 'Flextrack number is required';
        }

        if (!formData.startDate) {
            newErrors.startDate = 'Start date is required';
        }

        if (!formData.endDate) {
            newErrors.endDate = 'End date is required';
        } else if (formData.startDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
            newErrors.endDate = 'End date must be after start date';
        }

        if (formData.isIncumbent && !formData.previousCompany) {
            newErrors.previousCompany = 'Please select where the incumbent is joining from';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({
                ...prev,
                [name]: checked,
                // Reset previousCompany if isIncumbent is unchecked
                ...(name === 'isIncumbent' && !checked ? { previousCompany: undefined } : {})
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            await addTeamMember(formData);
            // Reset form and close modal on success
            setFormData({
                name: '',
                flextrackNumber: '',
                startDate: '',
                endDate: '',
                hiringManager: '',
                isDeveloper: false,
                isIncumbent: false,
                previousCompany: undefined,
            });
            onClose();
        } catch (error) {
            console.error('Failed to add team member:', error);
        }
    };

    const previousCompanyOptions = [
        { value: 'Internal Transfer', label: 'Internal Transfer' },
        { value: 'Contractor Conversion', label: 'Contractor Conversion' },
        { value: 'Other', label: 'Other' }
    ];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Add New Team Member"
            size="lg"
            footer={
                <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} isLoading={loading}>
                        Add Team Member
                    </Button>
                </div>
            }
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Resource Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Resource Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm
                ${errors.name ? 'border-red-300' : 'border-gray-300'}`}
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    {/* Flextrack Number */}
                    <div>
                        <label htmlFor="flextrackNumber" className="block text-sm font-medium text-gray-700">
                            Flextrack Number *
                        </label>
                        <input
                            type="text"
                            id="flextrackNumber"
                            name="flextrackNumber"
                            value={formData.flextrackNumber}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm
                ${errors.flextrackNumber ? 'border-red-300' : 'border-gray-300'}`}
                        />
                        {errors.flextrackNumber && <p className="mt-1 text-sm text-red-600">{errors.flextrackNumber}</p>}
                    </div>

                    {/* Start Date */}
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                            Start Date *
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm
                ${errors.startDate ? 'border-red-300' : 'border-gray-300'}`}
                        />
                        {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
                    </div>

                    {/* End Date */}
                    <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                            End Date *
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm
                ${errors.endDate ? 'border-red-300' : 'border-gray-300'}`}
                        />
                        {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>}
                    </div>

                    {/* Hiring Manager */}
                    <div>
                        <label htmlFor="hiringManager" className="block text-sm font-medium text-gray-700">
                            Hiring Manager
                        </label>
                        <input
                            type="text"
                            id="hiringManager"
                            name="hiringManager"
                            value={formData.hiringManager}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div className="mt-4 space-y-4">
                    {/* Developer Resource Checkbox */}
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="isDeveloper"
                                name="isDeveloper"
                                type="checkbox"
                                checked={formData.isDeveloper}
                                onChange={handleChange}
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="isDeveloper" className="font-medium text-gray-700">
                                Is a Developer Resource
                            </label>
                            <p className="text-gray-500">This resource will need developer access</p>
                        </div>
                    </div>

                    {/* Incumbent Checkbox */}
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="isIncumbent"
                                name="isIncumbent"
                                type="checkbox"
                                checked={formData.isIncumbent}
                                onChange={handleChange}
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="isIncumbent" className="font-medium text-gray-700">
                                Is an Incumbent
                            </label>
                            <p className="text-gray-500">This resource is already with the company</p>
                        </div>
                    </div>

                    {/* Previous Company (shown only if isIncumbent is true) */}
                    {formData.isIncumbent && (
                        <div className="mt-4 pl-7">
                            <Select
                                id="previousCompany"
                                name="previousCompany"
                                label="Where are they joining from?"
                                value={formData.previousCompany}
                                options={previousCompanyOptions}
                                onChange={handleChange}
                                error={errors.previousCompany}
                            />
                        </div>
                    )}
                </div>
            </form>
        </Modal>
    );
};

export default AddMemberModal;