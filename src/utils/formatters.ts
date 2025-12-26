// Utility functions for formatting data

/**
 * Format seconds into human-readable duration
 * @param seconds - Duration in seconds
 * @returns Formatted string like "2h 15m" or "45s"
 */
export const formatDuration = (seconds: number): string => {
    if (seconds < 60) {
        return `${seconds}s`;
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
        return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }

    return secs > 0 ? `${minutes}m ${secs}s` : `${minutes}m`;
};

/**
 * Format duration for stats display (longer format)
 * @param seconds - Duration in seconds
 * @returns Formatted string like "2 hours 15 min"
 */
export const formatDurationLong = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
        return minutes > 0 ? `${hours} hr ${minutes} min` : `${hours} hr`;
    }

    return `${minutes} min`;
};

/**
 * Format timestamp to readable date
 * @param timestamp - Epoch timestamp in ms
 * @returns Formatted date string
 */
export const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

    if (date >= today) {
        return 'Today';
    } else if (date >= yesterday) {
        return 'Yesterday';
    } else {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
    }
};

/**
 * Format timestamp to time string
 * @param timestamp - Epoch timestamp in ms
 * @returns Formatted time like "2:30 PM"
 */
export const formatTime = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
};

/**
 * Get month name from date
 * @param timestamp - Epoch timestamp in ms
 * @returns Month name like "December"
 */
export const getMonthName = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString('en-US', { month: 'long' });
};

/**
 * Format phone number for display
 * @param phoneNumber - Raw phone number
 * @returns Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
    // Remove non-numeric characters
    const cleaned = phoneNumber.replace(/\D/g, '');

    // Format based on length
    if (cleaned.length === 10) {
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
        return `+1 ${cleaned.slice(1, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }

    return phoneNumber;
};

/**
 * Get initials from name
 * @param name - Full name
 * @returns Initials like "JD"
 */
export const getInitials = (name: string | null): string => {
    if (!name) return '?';

    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase();
    }

    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Check if timestamp is from this year
 * @param timestamp - Epoch timestamp in ms
 * @returns true if from current year
 */
export const isThisYear = (timestamp: number): boolean => {
    const date = new Date(timestamp);
    const now = new Date();
    return date.getFullYear() === now.getFullYear();
};
