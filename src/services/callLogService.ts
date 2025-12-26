// Call Log Service - Fetches real call logs from Android device
import { PermissionsAndroid, Platform, NativeModules } from 'react-native';
import { CallLog } from '../types';
import { formatDate } from '../utils/formatters';

const { CallLogModule } = NativeModules;

/**
 * Map native call type to our type
 */
const mapCallType = (type: string): CallLog['type'] => {
    switch (type) {
        case 'INCOMING':
            return 'INCOMING';
        case 'OUTGOING':
            return 'OUTGOING';
        case 'MISSED':
            return 'MISSED';
        default:
            return 'UNKNOWN';
    }
};

/**
 * Request call log permission
 */
export const requestCallLogPermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') {
        return false;
    }

    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
            {
                title: 'Call Log Permission',
                message: 'VC Wrapped needs access to your call logs to show your stats.',
                buttonPositive: 'Allow',
                buttonNegative: 'Deny',
            }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
        console.error('Permission request error:', err);
        return false;
    }
};

/**
 * Check if we have call log permission
 */
export const hasCallLogPermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') {
        return false;
    }

    try {
        const granted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_CALL_LOG
        );
        return granted;
    } catch (err) {
        console.error('Permission check error:', err);
        return false;
    }
};

/**
 * Fetch call logs from device using custom native module
 */
export const fetchCallLogs = async (): Promise<CallLog[]> => {
    if (Platform.OS !== 'android') {
        return [];
    }

    if (!CallLogModule) {
        console.error('CallLogModule not found');
        return [];
    }

    try {
        // Fetch all call logs (-1 for no limit)
        const logs = await CallLogModule.getCallLogs(-1);

        // Map to our CallLog interface
        return logs.map((log: any, index: number) => ({
            id: log.id || `${index}-${log.timestamp}`,
            phoneNumber: log.phoneNumber || 'Unknown',
            name: log.name || null,
            duration: log.duration || 0,
            timestamp: log.timestamp || Date.now(),
            type: mapCallType(log.type),
            dateString: formatDate(log.timestamp || Date.now()),
        }));
    } catch (err) {
        console.error('Error fetching call logs:', err);
        return [];
    }
};
