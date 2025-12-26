// Custom hook for loading and managing call data
import { useState, useEffect, useCallback } from 'react';
import { CallLog, ContactStats, DashboardStats } from '../types';
import {
    requestCallLogPermission,
    fetchCallLogs,
    hasCallLogPermission
} from '../services/callLogService';
import {
    requestContactsPermission,
    fetchContacts,
    hasContactsPermission
} from '../services/contactsService';
import {
    calculateDashboardStats,
    calculateContactStats
} from '../services/statsProcessor';

interface UseCallDataResult {
    callLogs: CallLog[];
    contactStats: ContactStats[];
    dashboardStats: DashboardStats | null;
    isLoading: boolean;
    hasPermission: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    requestPermissions: () => Promise<boolean>;
}

export const useCallData = (): UseCallDataResult => {
    const [callLogs, setCallLogs] = useState<CallLog[]>([]);
    const [contactStats, setContactStats] = useState<ContactStats[]>([]);
    const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasPermission, setHasPermission] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Check permissions
            const callLogPerm = await hasCallLogPermission();
            const contactsPerm = await hasContactsPermission();

            if (!callLogPerm) {
                setHasPermission(false);
                setIsLoading(false);
                return;
            }

            setHasPermission(true);

            // Fetch call logs
            const logs = await fetchCallLogs();

            // Fetch contacts to enrich call logs with names
            let enrichedLogs = logs;
            if (contactsPerm) {
                const contactMap = await fetchContacts();
                enrichedLogs = logs.map((log) => {
                    if (!log.name) {
                        const normalized = log.phoneNumber.replace(/\D/g, '').slice(-10);
                        const contact = contactMap.get(normalized);
                        return contact ? { ...log, name: contact.name } : log;
                    }
                    return log;
                });
            }

            setCallLogs(enrichedLogs);

            // Calculate stats
            const stats = calculateDashboardStats(enrichedLogs);
            setDashboardStats(stats);

            const contactStatsData = calculateContactStats(enrichedLogs);
            setContactStats(contactStatsData);
        } catch (err) {
            setError('Failed to load call data');
            console.error('Error loading call data:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const requestPermissions = useCallback(async (): Promise<boolean> => {
        const callLogGranted = await requestCallLogPermission();
        if (!callLogGranted) {
            setError('Call log permission is required');
            return false;
        }

        // Also request contacts permission (optional but helpful)
        await requestContactsPermission();

        setHasPermission(true);
        await loadData();
        return true;
    }, [loadData]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return {
        callLogs,
        contactStats,
        dashboardStats,
        isLoading,
        hasPermission,
        error,
        refresh: loadData,
        requestPermissions,
    };
};
