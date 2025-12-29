// Dashboard Screen - Your call stats summary (shown after Wrapped)
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../components/Icon';
import { spacing, borderRadius, fonts } from '../theme';
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
import WrappedModal from './wrapped/WrappedModal';

// Chocolatey color scheme (matching wrapped theme)
const dashboardColors = {
    primary: '#8B6914',
    secondary: '#C4956A',
    teal: '#7FBFB5',
    coral: '#D4A574',
    textPrimary: '#3B2415',
    textSecondary: '#5A4332',
    textMuted: '#8B7B6B',
    surface: 'rgba(245, 230, 211, 0.6)',
};

const DashboardScreen: React.FC = () => {
    const [showWrapped, setShowWrapped] = useState(false);
    const {
        dashboardStats,
        wrappedStats,
        isLoading,
        hasPermission,
        error,
        refresh,
        requestPermissions,
    } = useCallData();

    if (isLoading) {
        return <LoadingView message="Loading your stats..." />;
    }

    if (!hasPermission) {
        return (
            <ImageBackground
                source={require('../../assets/designs/back5.png')}
                style={styles.container}
                resizeMode="cover"
            >
                <SafeAreaView style={styles.permissionContainer}>
                    <Text style={styles.permissionTitle}>Almost There!</Text>
                    <Text style={styles.permissionMessage}>
                        VC Wrapped needs access to your call logs to show your year in review.
                    </Text>
                    <TouchableOpacity 
                        style={styles.permissionButton}
                        onPress={requestPermissions}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.permissionButtonText}>Grant Access</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ImageBackground>
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
        <ImageBackground
            source={require('../../assets/designs/back5.png')}
            style={styles.container}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.logoText}>VC WRAPPED 2025</Text>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.content}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={refresh}
                            tintColor={dashboardColors.primary}
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
                        
                        {/* Rewatch Wrapped Button */}
                        <TouchableOpacity 
                            style={styles.rewatchButton}
                            onPress={() => setShowWrapped(true)}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.rewatchButtonText}>Rewatch Wrapped</Text>
                            <Text style={styles.rewatchIcon}>🔄</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Quick Stats Grid */}
                    <View style={styles.statsGrid}>
                        <StatCard
                            title="Total Calls"
                            value={totalCalls}
                            icon="phone"
                            iconColor={dashboardColors.primary}
                            style={styles.halfCard}
                        />
                        <StatCard
                            title="Contacts"
                            value={totalContacts}
                            icon="account-group"
                            iconColor={dashboardColors.secondary}
                            style={styles.halfCard}
                        />
                    </View>

                    {/* Call Type Breakdown */}
                    <SectionHeader title="Call Breakdown" />
                    <View style={styles.breakdownRow}>
                        <View style={styles.breakdownItem}>
                            <Icon name="phone-incoming" size={24} color={dashboardColors.teal} />
                            <Text style={styles.breakdownValue}>{callsByType.incoming}</Text>
                            <Text style={styles.breakdownLabel}>Incoming</Text>
                        </View>
                        <View style={styles.breakdownItem}>
                            <Icon name="phone-outgoing" size={24} color={dashboardColors.secondary} />
                            <Text style={styles.breakdownValue}>{callsByType.outgoing}</Text>
                            <Text style={styles.breakdownLabel}>Outgoing</Text>
                        </View>
                        <View style={styles.breakdownItem}>
                            <Icon name="phone-missed" size={24} color={dashboardColors.coral} />
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
                            iconColor={dashboardColors.teal}
                            style={styles.halfCard}
                        />
                        <StatCard
                            title="Peak Hour"
                            value={formatHour(peakHour)}
                            subtitle="When you call most"
                            icon="clock-outline"
                            iconColor={dashboardColors.coral}
                            style={styles.halfCard}
                        />
                    </View>

                    <StatCard
                        title="Average Call"
                        value={formatDuration(averageCallDuration)}
                        subtitle="Per conversation"
                        icon="chart-line"
                        iconColor={dashboardColors.secondary}
                        style={styles.fullCard}
                    />

                    <View style={styles.footer} />
                </ScrollView>
            </SafeAreaView>
            
            {/* Wrapped Modal */}
            {wrappedStats && (
                <WrappedModal
                    visible={showWrapped}
                    onClose={() => setShowWrapped(false)}
                    stats={wrappedStats}
                />
            )}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
    },
    logoText: {
        fontSize: 12,
        fontFamily: fonts.bold,
        color: dashboardColors.textMuted,
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
        color: dashboardColors.textPrimary,
    },
    heroSubtitle: {
        fontSize: 16,
        fontFamily: fonts.regular,
        color: dashboardColors.textMuted,
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
        backgroundColor: dashboardColors.surface,
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
        color: dashboardColors.textPrimary,
        marginTop: spacing.sm,
    },
    breakdownLabel: {
        fontSize: 12,
        fontFamily: fonts.regular,
        color: dashboardColors.textMuted,
        marginTop: spacing.xs,
    },
    topContact: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: dashboardColors.surface,
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
        color: dashboardColors.textPrimary,
    },
    topContactStats: {
        fontSize: 14,
        fontFamily: fonts.regular,
        color: dashboardColors.textMuted,
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
    rewatchButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: dashboardColors.primary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        marginTop: spacing.md,
    },
    rewatchButtonText: {
        fontSize: 14,
        fontFamily: fonts.semiBold,
        color: '#FFFFFF',
    },
    rewatchIcon: {
        fontSize: 14,
    },
    permissionContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.xl,
    },
    permissionTitle: {
        fontSize: 28,
        fontFamily: fonts.bold,
        color: dashboardColors.textPrimary,
        textAlign: 'center',
        marginBottom: spacing.md,
    },
    permissionMessage: {
        fontSize: 16,
        fontFamily: fonts.regular,
        color: dashboardColors.textSecondary,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: spacing.xl,
    },
    permissionButton: {
        backgroundColor: dashboardColors.primary,
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 30,
    },
    permissionButtonText: {
        fontSize: 16,
        fontFamily: fonts.bold,
        color: '#FFFFFF',
    },
});

export default DashboardScreen;
