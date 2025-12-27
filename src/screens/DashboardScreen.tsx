// Dashboard Screen - Your call stats summary (shown after Wrapped)
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../components/Icon';
import { colors, spacing, borderRadius, typography, wrappedColors, fonts } from '../theme';
import {
    StatCard,
    HeroStat,
    LoadingView,
    EmptyState,
    Avatar,
    SectionHeader,
} from '../components/common';
import { useCallData } from '../hooks/useCallData';
import { formatDuration, formatDurationLong } from '../utils/formatters';

const DashboardScreen: React.FC = () => {
    const {
        dashboardStats,
        isLoading,
        hasPermission,
        error,
        refresh,
        requestPermissions,
    } = useCallData();

    if (isLoading) {
        return <LoadingView message="Loading your call stats..." />;
    }

    if (!hasPermission) {
        return (
            <EmptyState
                icon="phone-lock"
                title="Permission Required"
                message="VC Wrapped needs access to your call logs to show your stats for this year."
                action={{ label: 'Grant Access', onPress: requestPermissions }}
            />
        );
    }

    if (error) {
        return (
            <EmptyState
                icon="alert-circle-outline"
                title="Something went wrong"
                message={error}
                action={{ label: 'Try Again', onPress: refresh }}
            />
        );
    }

    if (!dashboardStats || dashboardStats.totalCalls === 0) {
        return (
            <EmptyState
                icon="phone-off"
                title="No Calls This Year"
                message="Start making calls to see your stats here!"
            />
        );
    }

    const { 
        totalContacts, 
        totalCalls, 
        totalDuration, 
        longestCall, 
        mostTalked,
        callsByType,
        peakHour,
        averageCallDuration,
    } = dashboardStats;

    const formatHour = (hour: number): string => {
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour} ${period}`;
    };

    return (
        <View style={styles.container}>
            {/* Ambient glows */}
            <View style={styles.glowTop} />
            <View style={styles.glowBottom} />
            
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.logoIcon}>📊</Text>
                    <Text style={styles.logoText}>VC WRAPPED 2025</Text>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.content}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={refresh}
                            tintColor={wrappedColors.primary}
                        />
                    }
                >
                    {/* Hero Section */}
                    <View style={styles.heroSection}>
                        <Text style={styles.heroTitle}>Your Voice Story</Text>
                        <Text style={styles.heroSubtitle}>Here's your year in numbers</Text>
                        <HeroStat
                            value={formatDurationLong(totalDuration)}
                            label="Total time on calls"
                        />
                    </View>

                    {/* Quick Stats Grid */}
                    <View style={styles.statsGrid}>
                        <StatCard
                            title="Total Calls"
                            value={totalCalls}
                            icon="phone"
                            iconColor={wrappedColors.primary}
                            style={styles.halfCard}
                        />
                        <StatCard
                            title="Contacts"
                            value={totalContacts}
                            icon="account-group"
                            iconColor={wrappedColors.violet}
                            style={styles.halfCard}
                        />
                    </View>

                    {/* Call Type Breakdown */}
                    <SectionHeader title="Call Breakdown" />
                    <View style={styles.breakdownRow}>
                        <View style={styles.breakdownItem}>
                            <Icon name="phone-incoming" size={24} color={wrappedColors.teal} />
                            <Text style={styles.breakdownValue}>{callsByType.incoming}</Text>
                            <Text style={styles.breakdownLabel}>Incoming</Text>
                        </View>
                        <View style={styles.breakdownItem}>
                            <Icon name="phone-outgoing" size={24} color={wrappedColors.violet} />
                            <Text style={styles.breakdownValue}>{callsByType.outgoing}</Text>
                            <Text style={styles.breakdownLabel}>Outgoing</Text>
                        </View>
                        <View style={styles.breakdownItem}>
                            <Icon name="phone-missed" size={24} color={wrappedColors.coral} />
                            <Text style={styles.breakdownValue}>{callsByType.missed}</Text>
                            <Text style={styles.breakdownLabel}>Missed</Text>
                        </View>
                    </View>

                    {/* Top Contact */}
                    {mostTalked && (
                        <>
                            <SectionHeader title="Your #1 Person" />
                            <View style={styles.topContact}>
                                <Avatar name={mostTalked.name} size={64} />
                                <View style={styles.topContactInfo}>
                                    <Text style={styles.topContactName}>{mostTalked.name}</Text>
                                    <Text style={styles.topContactStats}>
                                        {mostTalked.totalCalls} calls • {formatDurationLong(mostTalked.totalDuration)}
                                    </Text>
                                </View>
                                <Text style={styles.trophyIcon}>🏆</Text>
                            </View>
                        </>
                    )}

                    {/* More Stats */}
                    <SectionHeader title="Insights" />
                    <View style={styles.insightsRow}>
                        <StatCard
                            title="Longest Call"
                            value={longestCall ? formatDuration(longestCall.duration) : '-'}
                            subtitle={longestCall?.name || 'No calls yet'}
                            icon="timer"
                            iconColor={wrappedColors.teal}
                            style={styles.halfCard}
                        />
                        <StatCard
                            title="Peak Hour"
                            value={formatHour(peakHour)}
                            subtitle="When you call most"
                            icon="clock-outline"
                            iconColor={wrappedColors.coral}
                            style={styles.halfCard}
                        />
                    </View>

                    <StatCard
                        title="Average Call"
                        value={formatDuration(averageCallDuration)}
                        subtitle="Per conversation"
                        icon="chart-line"
                        iconColor={wrappedColors.violet}
                        style={styles.fullCard}
                    />

                    <View style={styles.footer} />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: wrappedColors.background,
    },
    glowTop: {
        position: 'absolute',
        top: -100,
        left: -50,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: wrappedColors.ambientGlow1,
    },
    glowBottom: {
        position: 'absolute',
        bottom: -50,
        right: -50,
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: wrappedColors.ambientGlow2,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        gap: 8,
    },
    logoIcon: {
        fontSize: 18,
    },
    logoText: {
        fontSize: 12,
        fontFamily: fonts.bold,
        color: wrappedColors.textMuted,
        letterSpacing: 2,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        paddingHorizontal: spacing.md,
    },
    heroSection: {
        alignItems: 'center',
        paddingVertical: spacing.xl,
    },
    heroTitle: {
        fontSize: 28,
        fontFamily: fonts.bold,
        color: wrappedColors.textPrimary,
    },
    heroSubtitle: {
        fontSize: 16,
        fontFamily: fonts.regular,
        color: wrappedColors.textMuted,
        marginTop: 4,
        marginBottom: spacing.md,
    },
    statsGrid: {
        flexDirection: 'row',
        gap: spacing.md,
        marginTop: spacing.md,
    },
    halfCard: {
        flex: 1,
    },
    fullCard: {
        marginTop: spacing.md,
    },
    breakdownRow: {
        flexDirection: 'row',
        backgroundColor: wrappedColors.surface,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
    },
    breakdownItem: {
        flex: 1,
        alignItems: 'center',
    },
    breakdownValue: {
        fontSize: 24,
        fontFamily: fonts.bold,
        color: wrappedColors.textPrimary,
        marginTop: spacing.sm,
    },
    breakdownLabel: {
        fontSize: 12,
        fontFamily: fonts.regular,
        color: wrappedColors.textMuted,
        marginTop: spacing.xs,
    },
    topContact: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: wrappedColors.surface,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
    },
    topContactInfo: {
        flex: 1,
        marginLeft: spacing.md,
    },
    topContactName: {
        fontSize: 18,
        fontFamily: fonts.bold,
        color: wrappedColors.textPrimary,
    },
    topContactStats: {
        fontSize: 14,
        fontFamily: fonts.regular,
        color: wrappedColors.textMuted,
        marginTop: 4,
    },
    trophyIcon: {
        fontSize: 32,
    },
    insightsRow: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    footer: {
        height: spacing.xxl,
    },
});

export default DashboardScreen;
