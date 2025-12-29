// InnerCircleSlide - Your top contacts
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fonts } from '../../../theme';
import { WrappedStats } from '../../../types';
import { formatDuration } from '../../../utils/formatters';

interface SlideProps {
    stats: WrappedStats;
}

const InnerCircleSlide: React.FC<SlideProps> = ({ stats }) => {
    const topContact = stats.topContacts[0];
    const runners = stats.topContacts.slice(1, 3);

    // Format total talk time in hours and minutes
    const formatTalkTime = () => {
        const totalSeconds = stats.totalTalkTimeSeconds;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerSection}>
                <Text style={styles.headline}>Your Inner Circle</Text>
                <Text style={styles.subheadline}>The people who matter most</Text>
            </View>

            {/* #1 Contact - Large Center */}
            {topContact && (
                <View style={styles.heroSection}>
                    <View style={styles.heroAvatarContainer}>
                        <View style={styles.heroAvatar}>
                            <Text style={styles.heroAvatarText}>
                                {topContact.name.charAt(0).toUpperCase()}
                            </Text>
                        </View>
                        {/* Badge at top-right */}
                        <View style={styles.heroBadge}>
                            <Text style={styles.heroBadgeIcon}>🏆</Text>
                            <Text style={styles.heroBadgeText}>#1</Text>
                        </View>
                    </View>
                    <Text style={styles.heroName}>{topContact.name}</Text>
                    <Text style={styles.heroDuration}>
                        {formatDuration(topContact.totalDuration)}
                    </Text>
                </View>
            )}

            {/* #2 and #3 Contacts - Row Below */}
            <View style={styles.runnersRow}>
                {runners.map((contact, index) => (
                    <View key={contact.name} style={styles.runnerCard}>
                        <View style={styles.runnerAvatarContainer}>
                            <View style={styles.runnerAvatar}>
                                <Text style={styles.runnerAvatarText}>
                                    {contact.name.charAt(0).toUpperCase()}
                                </Text>
                            </View>
                            {/* Badge at top-right */}
                            <View style={styles.runnerBadge}>
                                <Text style={styles.runnerBadgeText}>#{index + 2}</Text>
                            </View>
                        </View>
                        <Text style={styles.runnerName} numberOfLines={1}>
                            {contact.name}
                        </Text>
                        <Text style={styles.runnerDuration}>
                            {formatDuration(contact.totalDuration)}
                        </Text>
                    </View>
                ))}
            </View>

            {/* Bottom Stats - Centered, Cream Colors */}
            <View style={styles.statsRow}>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{stats.totalCallsCount}</Text>
                    <Text style={styles.statLabel}>Total Calls</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{formatTalkTime()}</Text>
                    <Text style={styles.statLabel}>Talk Time</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    headerSection: {
        alignItems: 'center',
        paddingTop: 20,
        marginBottom: 20,
    },
    headline: {
        fontSize: 28,
        fontFamily: fonts.bold,
        color: '#3B2415',
        textAlign: 'center',
        marginBottom: 8,
    },
    subheadline: {
        fontSize: 14,
        fontFamily: fonts.regular,
        color: '#6B5344',
        textAlign: 'center',
    },
    // Hero Section (#1 Contact)
    heroSection: {
        alignItems: 'center',
        marginBottom: 24,
    },
    heroAvatarContainer: {
        position: 'relative',
        marginBottom: 12,
    },
    heroAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#8B6914',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroAvatarText: {
        fontSize: 42,
        fontFamily: fonts.bold,
        color: '#FFFFFF',
    },
    heroBadge: {
        position: 'absolute',
        top: -4,
        right: -8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        backgroundColor: '#8B6914',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    heroBadgeIcon: {
        fontSize: 10,
    },
    heroBadgeText: {
        fontSize: 11,
        fontFamily: fonts.bold,
        color: '#FFFFFF',
    },
    heroName: {
        fontSize: 22,
        fontFamily: fonts.bold,
        color: '#3B2415',
        textAlign: 'center',
        marginBottom: 4,
    },
    heroDuration: {
        fontSize: 16,
        fontFamily: fonts.medium,
        color: '#8B6914',
    },
    // Runners Row (#2 and #3)
    runnersRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        marginBottom: 24,
        paddingHorizontal: 24,
    },
    runnerCard: {
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 20,
        minWidth: 120,
        borderWidth: 1,
        borderColor: 'rgba(139, 105, 20, 0.1)',
    },
    runnerAvatarContainer: {
        position: 'relative',
        marginBottom: 8,
    },
    runnerAvatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#C4956A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    runnerAvatarText: {
        fontSize: 24,
        fontFamily: fonts.bold,
        color: '#FFFFFF',
    },
    runnerBadge: {
        position: 'absolute',
        top: -4,
        right: -8,
        backgroundColor: '#8B6914',
        paddingVertical: 3,
        paddingHorizontal: 6,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    runnerBadgeText: {
        fontSize: 10,
        fontFamily: fonts.bold,
        color: '#FFFFFF',
    },
    runnerName: {
        fontSize: 14,
        fontFamily: fonts.semiBold,
        color: '#3B2415',
        textAlign: 'center',
        marginBottom: 2,
    },
    runnerDuration: {
        fontSize: 12,
        fontFamily: fonts.medium,
        color: '#6B5344',
    },
    // Stats Row - Positioned at bottom over mobile illustration
    statsRow: {
        position: 'absolute',
        bottom: 130, // Position over mobile illustration
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 18,
        fontFamily: fonts.bold,
        color: '#F5E6D3', // Cream
    },
    statLabel: {
        fontSize: 9,
        fontFamily: fonts.medium,
        color: '#C9B8A0', // Muted cream
        marginTop: 2,
    },
    statDivider: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(245, 230, 211, 0.3)', // Cream with opacity
    },
});

export default InnerCircleSlide;



