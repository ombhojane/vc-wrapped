// Contacts Service - Simplified for call log app
// Since call logs already contain cached contact names, this service
// is primarily for permission handling and future enhancements

import { PermissionsAndroid, Platform } from 'react-native';

export interface Contact {
    name: string;
    phoneNumbers: string[];
    thumbnail: string | null;
}

/**
 * Request contacts permission
 */
export const requestContactsPermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') {
        return false;
    }

    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                title: 'Contacts Permission',
                message: 'VC Wrapped uses contacts to show contact names.',
                buttonPositive: 'Allow',
                buttonNegative: 'Deny',
            }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
        console.error('Contacts permission request error:', err);
        return false;
    }
};

/**
 * Check if we have contacts permission
 */
export const hasContactsPermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') {
        return false;
    }

    try {
        const granted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS
        );
        return granted;
    } catch (err) {
        console.error('Contacts permission check error:', err);
        return false;
    }
};

/**
 * Fetch contacts - returns empty map
 * Note: Call logs already include cached contact names from Android
 * This can be enhanced later with a native contacts module if needed
 */
export const fetchContacts = async (): Promise<Map<string, Contact>> => {
    // Call logs include CACHED_NAME which already has contact names
    // No need for separate contacts lookup for basic functionality
    return new Map();
};
