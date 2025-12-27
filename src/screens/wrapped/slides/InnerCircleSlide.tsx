// InnerCircleSlide - Your top contacts
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { wrappedColors, fonts, wrappedGlassPanel } from '../../../theme';
import { WrappedStats } from '../../../types';
import { formatDuration } from '../../../utils/formatters';

interface SlideProps {
    stats: WrappedStats;
}

const InnerCircleSlide: React.FC<SlideProps> = ({ stats }) => {
    const topContact = stats.topContacts[0];
    const runners = stats.topContacts.slice(1, 3);

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.headline}>Your Inner Circle</Text>
            <Text style={styles.subheadline}>You kept these people closest.</Text>

            {/* #1 Hero */}
            {topContact && (
                <View style={styles.heroContainer}>
                    <View style={styles.heroGlow} />
                    <View style={styles.heroAvatar}>
                        <Text style={styles.avatarText}>
                            {topContact.name.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                    <View style={styles.rankBadge}>
                        <Text style={styles.rankBadgeIcon}>🏆</Text>
                        <Text style={styles.rankBadgeText}>#1 {topContact.name}</Text>
                    </View>
                </View>
            )}

            {/* Quote */}
            {topContact && (
                <View style={styles.quoteContainer}>
                    <Text style={styles.quoteText}>"{topContact.quote}"</Text>
                </View>
            )}

            {/* Stats Chips */}
            {topContact && (
                <View style={styles.statsRow}>
                    <View style={styles.statChip}>
                        <Text style={styles.statValue}>{formatDuration(topContact.totalDuration)}</Text>
                        <Text style={styles.statLabel}>TIME</Text>
                    </View>
                    <View style={styles.statChip}>
                        <Text style={styles.statValue}>{topContact.totalCalls}</Text>
                        <Text style={styles.statLabel}>CALLS</Text>
                    </View>
                </View>
            )}

            {/* Runners Up */}
            <View style={styles.runnersContainer}>
                {runners.map((contact, index) => (
                    <View key={contact.name} style={styles.runnerCard}>
                        <View style={styles.runnerAvatarContainer}>
                            <View style={styles.runnerAvatar}>
                                <Text style={styles.runnerAvatarText}>
                                    {contact.name.charAt(0).toUpperCase()}
                                </Text>
                            </View>
                            <View style={styles.runnerRank}>
                                <Text style={styles.runnerRankText}>#{index + 2}</Text>
                            </View>
                        </View>
                        <View style={styles.runnerInfo}>
                            <Text style={styles.runnerName}>{contact.name}</Text>
                            <Text style={styles.runnerQuote}>"{contact.quote}"</Text>
                        </View>
                        <View style={styles.runnerStats}>
                            <Text style={styles.runnerStatsValue}>{contact.totalCalls}</Text>
                            <Text style={styles.runnerStatsLabel}>Calls</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    headline: {
        fontSize: 28,
        fontFamily: fonts.bold,
        color: wrappedColors.textPrimary,
        textAlign: 'center',
        marginBottom: 8,
    },
    subheadline: {
        fontSize: 16,
        fontFamily: fonts.regular,
        color: wrappedColors.textMuted,
        textAlign: 'center',
        marginBottom: 24,
    },
    heroContainer: {
        position: 'relative',
        width: 140,
        height: 140,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    heroGlow: {
        position: 'absolute',
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: wrappedColors.primaryGlow,
    },
    heroAvatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: wrappedColors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: wrappedColors.background,
    },
    avatarText: {
        fontSize: 48,
        fontFamily: fonts.bold,
        color: wrappedColors.textPrimary,
    },
    rankBadge: {
        position: 'absolute',
        bottom: -12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: wrappedColors.primary,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: wrappedColors.background,
    },
    rankBadgeIcon: {
        fontSize: 12,
    },
    rankBadgeText: {
        fontSize: 12,
        fontFamily: fonts.bold,
        color: wrappedColors.textPrimary,
    },
    quoteContainer: {
        marginTop: 20,
        marginBottom: 16,
    },
    quoteText: {
        fontSize: 18,
        fontFamily: fonts.medium,
        fontStyle: 'italic',
        color: wrappedColors.textSecondary,
        textAlign: 'center',
    },
    statsRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    statChip: {
        ...wrappedGlassPanel,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
        minWidth: 100,
    },
    statValue: {
        fontSize: 22,
        fontFamily: fonts.bold,
        color: wrappedColors.textPrimary,
    },
    statLabel: {
        fontSize: 10,
        fontFamily: fonts.bold,
        color: wrappedColors.primary,
        letterSpacing: 1,
        marginTop: 2,
    },
    runnersContainer: {
        width: '100%',
        gap: 10,
    },
    runnerCard: {
        ...wrappedGlassPanel,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 50,
    },
    runnerAvatarContainer: {
        position: 'relative',
    },
    runnerAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(75, 43, 238, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    runnerAvatarText: {
        fontSize: 18,
        fontFamily: fonts.bold,
        color: wrappedColors.textPrimary,
    },
    runnerRank: {
        position: 'absolute',
        top: -4,
        right: -4,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: wrappedColors.surface,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    runnerRankText: {
        fontSize: 8,
        fontFamily: fonts.bold,
        color: wrappedColors.textPrimary,
    },
    runnerInfo: {
        flex: 1,
        marginLeft: 12,
    },
    runnerName: {
        fontSize: 14,
        fontFamily: fonts.semiBold,
        color: wrappedColors.textPrimary,
    },
    runnerQuote: {
        fontSize: 12,
        fontFamily: fonts.regular,
        fontStyle: 'italic',
        color: wrappedColors.textMuted,
    },
    runnerStats: {
        alignItems: 'flex-end',
    },
    runnerStatsValue: {
        fontSize: 16,
        fontFamily: fonts.bold,
        color: wrappedColors.primary,
    },
    runnerStatsLabel: {
        fontSize: 10,
        fontFamily: fonts.medium,
        color: wrappedColors.textMuted,
        textTransform: 'uppercase',
    },
});

export default InnerCircleSlide;
