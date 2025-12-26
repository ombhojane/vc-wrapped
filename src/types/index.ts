// TypeScript interfaces for VC Wrapped

export interface CallLog {
    id: string;
    phoneNumber: string;
    name: string | null;
    duration: number;        // seconds
    timestamp: number;       // epoch ms
    type: 'INCOMING' | 'OUTGOING' | 'MISSED' | 'UNKNOWN';
    dateString: string;      // formatted date
}

export interface ContactStats {
    phoneNumber: string;
    name: string;
    avatar: string | null;
    totalCalls: number;
    totalDuration: number;   // seconds
    incomingCalls: number;
    outgoingCalls: number;
    missedCalls: number;
    lastCalled: number;      // epoch ms
}

export interface DashboardStats {
    totalContacts: number;
    totalCalls: number;
    totalDuration: number;   // seconds
    longestCall: CallLog | null;
    mostTalked: ContactStats | null;
    callsByType: {
        incoming: number;
        outgoing: number;
        missed: number;
    };
    peakHour: number;        // 0-23
    averageCallDuration: number; // seconds
}

export interface DateGroup {
    title: string;
    data: CallLog[];
}

// Filter types
export type CallTypeFilter = 'ALL' | 'INCOMING' | 'OUTGOING' | 'MISSED';
export type SortOption = 'MOST_CALLED' | 'MOST_TIME' | 'RECENT';
