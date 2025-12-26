// Stats Processor - Calculates statistics from call logs
import { CallLog, ContactStats, DashboardStats, DateGroup, WrappedStats, TopContact, CallPersonality } from '../types';

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

/**
 * Personality quotes for emotional messaging
 */
const CONTACT_QUOTES = [
    "Some conversations don't need a reason.",
    "Late nights, honest talks.",
    "Growth doesn't always happen quietly.",
    "The voice that always picks up.",
    "Distance means nothing when someone means everything.",
];

/**
 * Determine call personality based on patterns
 */
const determinePersonality = (logs: CallLog[], contactStats: ContactStats[]): { type: CallPersonality; description: string } => {
    const totalCalls = logs.length;
    const nightCalls = logs.filter(l => {
        const hour = new Date(l.timestamp).getHours();
        return hour >= 22 || hour < 6;
    }).length;

    const longCalls = logs.filter(l => l.duration > 600).length; // > 10 min
    const avgDuration = logs.reduce((sum, l) => sum + l.duration, 0) / (totalCalls || 1);
    const incomingRatio = logs.filter(l => l.type === 'INCOMING').length / (totalCalls || 1);

    // Night owl: > 30% calls after 10pm
    if (nightCalls / (totalCalls || 1) > 0.3) {
        return {
            type: 'NIGHT_OWL',
            description: "The world sleeps, but you're still talking. Your best conversations happen after dark."
        };
    }

    // Listener first: mostly incoming, long duration
    if (incomingRatio > 0.6 && avgDuration > 300) {
        return {
            type: 'LISTENER_FIRST',
            description: "You talk less, but stay longer. People don't call you for updates — they call you to think."
        };
    }

    // Catch up king: many calls, shorter duration
    if (totalCalls > 50 && avgDuration < 180) {
        return {
            type: 'CATCH_UP_KING',
            description: "Quick check-ins, constant connections. You keep everyone in the loop."
        };
    }

    // Problem solver: long calls, fewer contacts
    if (longCalls / (totalCalls || 1) > 0.4) {
        return {
            type: 'PROBLEM_SOLVER',
            description: "When phones ring, problems get solved. Your calls have purpose."
        };
    }

    // Check-in friend: regular pattern, many contacts
    if (contactStats.length > 10) {
        return {
            type: 'CHECK_IN_FRIEND',
            description: "You don't forget anyone. Every connection matters to you."
        };
    }

    // Default: silent supporter
    return {
        type: 'SILENT_SUPPORTER',
        description: "Fewer calls, deeper meaning. Quality over quantity, always."
    };
};

/**
 * Calculate wrapped stats for the year review feature
 */
export const calculateWrappedStats = (logs: CallLog[]): WrappedStats => {
    const contactStats = calculateContactStats(logs);

    // Total talk time
    const totalSeconds = logs.reduce((sum, l) => sum + l.duration, 0);
    const totalHours = Math.round(totalSeconds / 3600);
    const totalDays = Math.round((totalSeconds / 3600 / 24) * 10) / 10;

    // Personality
    const { type: personality, description: personalityDescription } = determinePersonality(logs, contactStats);

    // Top contacts with quotes
    const topContactStats = [...contactStats]
        .sort((a, b) => b.totalDuration - a.totalDuration)
        .slice(0, 3);

    const topContacts: TopContact[] = topContactStats.map((contact, index) => {
        const contactLogs = logs.filter(l =>
            l.phoneNumber.replace(/\D/g, '').slice(-10) === contact.phoneNumber.replace(/\D/g, '').slice(-10)
        );
        const nightCalls = contactLogs.filter(l => new Date(l.timestamp).getHours() >= 22).length;

        return {
            name: contact.name,
            totalCalls: contact.totalCalls,
            totalDuration: contact.totalDuration,
            averageDuration: Math.round(contact.totalDuration / contact.totalCalls),
            mostlyAfter10PM: nightCalls / contactLogs.length > 0.3,
            quote: CONTACT_QUOTES[index % CONTACT_QUOTES.length],
        };
    });

    // Peak hour with minute precision
    const hourMinuteCounts: Record<string, number> = {};
    logs.forEach((log) => {
        const date = new Date(log.timestamp);
        const key = `${date.getHours()}:${Math.floor(date.getMinutes() / 15) * 15}`;
        hourMinuteCounts[key] = (hourMinuteCounts[key] || 0) + 1;
    });
    const peakTime = Object.entries(hourMinuteCounts)
        .sort((a, b) => b[1] - a[1])[0]?.[0] || '12:0';
    const [peakHour, peakMinute] = peakTime.split(':').map(Number);

    // Busiest day
    const dayCounts: Record<string, number> = {};
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    logs.forEach((log) => {
        const day = dayNames[new Date(log.timestamp).getDay()];
        dayCounts[day] = (dayCounts[day] || 0) + 1;
    });
    const busiestDay = Object.entries(dayCounts)
        .sort((a, b) => b[1] - a[1])[0]?.[0] || 'Thursday';

    // Call type percentages (simulated categories based on time/duration)
    const workHourCalls = logs.filter(l => {
        const hour = new Date(l.timestamp).getHours();
        return hour >= 9 && hour < 18;
    }).length;
    const personalCalls = logs.filter(l => {
        const hour = new Date(l.timestamp).getHours();
        return hour >= 18 || hour < 9;
    }).length;
    const longCalls = logs.filter(l => l.duration > 600).length;
    const shortFunCalls = logs.filter(l => l.duration < 120 && l.duration > 0).length;

    const total = logs.length || 1;
    const callTypePercentages = {
        work: Math.round((workHourCalls / total) * 100),
        personal: Math.round((personalCalls / total) * 100),
        problemSolving: Math.round((longCalls / total) * 100),
        fun: Math.round((shortFunCalls / total) * 100),
    };

    // Normalize to 100%
    const sum = callTypePercentages.work + callTypePercentages.personal + callTypePercentages.problemSolving + callTypePercentages.fun;
    if (sum > 0) {
        callTypePercentages.work = Math.round((callTypePercentages.work / sum) * 100);
        callTypePercentages.personal = Math.round((callTypePercentages.personal / sum) * 100);
        callTypePercentages.problemSolving = Math.round((callTypePercentages.problemSolving / sum) * 100);
        callTypePercentages.fun = 100 - callTypePercentages.work - callTypePercentages.personal - callTypePercentages.problemSolving;
    }

    // Missed calls
    const missedCallsCount = logs.filter(l => l.type === 'MISSED').length;

    // Average duration
    const answeredCalls = logs.filter(l => l.duration > 0);
    const averageCallDuration = answeredCalls.length > 0
        ? Math.round(totalSeconds / answeredCalls.length)
        : 0;

    return {
        totalTalkTimeSeconds: totalSeconds,
        totalTalkTimeHours: totalHours,
        totalTalkTimeDays: totalDays,
        personality,
        personalityDescription,
        topContacts,
        peakHour,
        peakMinute,
        busiestDay,
        callTypePercentages,
        missedCallsCount,
        totalCallsCount: logs.length,
        averageCallDuration,
        longCallsCount: longCalls,
    };
};
