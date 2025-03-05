// lib/types.ts

export type PreviousCompany = 'Internal Transfer' | 'Contractor Conversion' | 'Other';

export interface TeamMember {
    id: string;
    name: string;
    flextrackNumber: string;
    startDate: string;
    endDate: string;
    hiringManager: string;
    isDeveloper: boolean;
    isIncumbent: boolean;
    previousCompany?: PreviousCompany;
    onboardingStatus: OnboardingStatus;
    assets?: string[]; // Added assets field
}

export interface OnboardingStatus {
    opsLoginCreated: boolean;
    assetsAssigned: boolean;
    accessCardSubmitted: boolean;
    developerAccessGranted: boolean | null; // null if not applicable
}

export interface TeamMemberFormData extends Omit<TeamMember, 'id' | 'onboardingStatus' | 'assets'> {}

// Interface for assets
export interface Asset {
    id: string;
    name: string;
    type: 'Hardware' | 'Software' | 'Other';
    status: 'Available' | 'Assigned' | 'Maintenance' | 'Retired';
    assignedTo?: string; // Team member ID
    purchaseDate: string;
    serialNumber?: string;
    notes?: string;
}