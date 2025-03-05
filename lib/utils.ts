// lib/utils.ts

/**
 * Formats a date string into a localized format
 * @param dateString - Date string in ISO format (YYYY-MM-DD)
 * @returns Formatted date string (e.g., "Mar 5, 2025")
 */
export const formatDate = (dateString: string): string => {
    if (!dateString) return '';

    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch (error) {
        console.error('Invalid date format', error);
        return dateString;
    }
};

/**
 * Calculates the onboarding completion percentage
 * @param status - The onboarding status object
 * @returns Percentage of completed onboarding steps
 */
export const calculateOnboardingProgress = (status: {
    [key: string]: boolean | null;
}): number => {
    const totalSteps = Object.values(status).filter(val => val !== null).length;
    if (totalSteps === 0) return 0;

    const completedSteps = Object.values(status).filter(val => val === true).length;
    return Math.round((completedSteps / totalSteps) * 100);
};

/**
 * Returns a status badge color based on completion percentage
 * @param percentage - Completion percentage
 * @returns Tailwind CSS color class
 */
export const getStatusColor = (percentage: number): string => {
    if (percentage === 0) return 'bg-gray-100 text-gray-800';
    if (percentage < 50) return 'bg-red-100 text-red-800';
    if (percentage < 100) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
};