// Stats Processor - Calculates statistics from call logs
import { CallLog, ContactStats, DashboardStats, DateGroup } from '../types';

/**
 * Normalize phone number for consistent comparison
 */
const normalizePhone = (phone: string): string => {
    return phone.replace(/\D/g, '').slice(-10);
};

/**
 * Calculate dashboard stats from call logs
 */
export const calculateDashboardStats = (logs: CallLog[]): DashboardStats => {
    if (logs.length === 0) {
        return {
            totalContacts: 0,
            totalCalls: 0,
            totalDuration: 0,
            longestCall: null,
            mostTalked: null,
            callsByType: { incoming: 0, outgoing: 0, missed: 0 },
            peakHour: 12,
            averageCallDuration: 0,
        };
    }

    // Unique contacts
    const uniqueContacts = new Set(logs.map((l) => normalizePhone(l.phoneNumber)));

    // Total duration
    const totalDuration = logs.reduce((sum, l) => sum + l.duration, 0);

    // Longest call
    const longestCall = logs.reduce((max, log) =>
        log.duration > (max?.duration || 0) ? log : max
        , logs[0]);

    // Calls by type
    const callsByType = {
        incoming: logs.filter((l) => l.type === 'INCOMING').length,
        outgoing: logs.filter((l) => l.type === 'OUTGOING').length,
        missed: logs.filter((l) => l.type === 'MISSED').length,
    };

    // Most talked (by duration)
    const contactStatsMap = calculateContactStats(logs);
    const mostTalked = contactStatsMap.length > 0
        ? contactStatsMap.sort((a, b) => b.totalDuration - a.totalDuration)[0]
        : null;

    // Peak hour
    const hourCounts: Record<number, number> = {};
    logs.forEach((log) => {
        const hour = new Date(log.timestamp).getHours();
        hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });
    const peakHour = Object.entries(hourCounts)
        .sort((a, b) => b[1] - a[1])[0]?.[0] || '12';

    // Average duration (excluding missed calls)
    const answeredCalls = logs.filter((l) => l.duration > 0);
    const averageCallDuration = answeredCalls.length > 0
        ? Math.round(totalDuration / answeredCalls.length)
        : 0;

    return {
        totalContacts: uniqueContacts.size,
        totalCalls: logs.length,
        totalDuration,
        longestCall,
        mostTalked,
        callsByType,
        peakHour: parseInt(peakHour, 10),
        averageCallDuration,
    };
};

/**
 * Calculate statistics per contact
 */
export const calculateContactStats = (logs: CallLog[]): ContactStats[] => {
    const statsMap = new Map<string, ContactStats>();

    logs.forEach((log) => {
        const normalizedPhone = normalizePhone(log.phoneNumber);
        const existing = statsMap.get(normalizedPhone);

        if (existing) {
            existing.totalCalls += 1;
            existing.totalDuration += log.duration;
            existing.incomingCalls += log.type === 'INCOMING' ? 1 : 0;
            existing.outgoingCalls += log.type === 'OUTGOING' ? 1 : 0;
            existing.missedCalls += log.type === 'MISSED' ? 1 : 0;
            if (log.timestamp > existing.lastCalled) {
                existing.lastCalled = log.timestamp;
                // Update name if this call has one
                if (log.name) {
                    existing.name = log.name;
                }
            }
        } else {
            statsMap.set(normalizedPhone, {
                phoneNumber: log.phoneNumber,
                name: log.name || log.phoneNumber,
                avatar: null,
                totalCalls: 1,
                totalDuration: log.duration,
                incomingCalls: log.type === 'INCOMING' ? 1 : 0,
                outgoingCalls: log.type === 'OUTGOING' ? 1 : 0,
                missedCalls: log.type === 'MISSED' ? 1 : 0,
                lastCalled: log.timestamp,
            });
        }
    });

    return Array.from(statsMap.values());
};

/**
 * Group call logs by date
 */
export const groupLogsByDate = (logs: CallLog[]): DateGroup[] => {
    const groups = new Map<string, CallLog[]>();

    // Sort by timestamp descending (newest first)
    const sortedLogs = [...logs].sort((a, b) => b.timestamp - a.timestamp);

    sortedLogs.forEach((log) => {
        const dateKey = log.dateString;
        if (groups.has(dateKey)) {
            groups.get(dateKey)!.push(log);
        } else {
            groups.set(dateKey, [log]);
        }
    });

    return Array.from(groups.entries()).map(([title, data]) => ({
        title,
        data,
    }));
};

/**
 * Get all unique months from logs
 */
export const getUniqueMonths = (logs: CallLog[]): string[] => {
    const months = new Set<string>();

    logs.forEach((log) => {
        const date = new Date(log.timestamp);
        const monthKey = date.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });
        months.add(monthKey);
    });

    return Array.from(months);
};

/**
 * Filter logs by month
 */
export const filterLogsByMonth = (logs: CallLog[], monthYear: string): CallLog[] => {
    return logs.filter((log) => {
        const date = new Date(log.timestamp);
        const logMonthYear = date.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });
        return logMonthYear === monthYear;
    });
};
