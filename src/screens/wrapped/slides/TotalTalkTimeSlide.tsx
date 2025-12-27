// TotalTalkTimeSlide - Big stat: total hours on calls
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { wrappedColors, fonts, wrappedGlassPanel } from '../../../theme';
import { WrappedStats } from '../../../types';

interface SlideProps {
    stats: WrappedStats;
}

const TotalTalkTimeSlide: React.FC<SlideProps> = ({ stats }) => {
    return (
        <View style={styles.container}>
            {/* Hero Icon */}
            <View style={styles.heroIcon}>
                <View style={styles.iconGlow} />
                <View style={styles.iconCircle}>
                    <Text style={styles.iconEmoji}>🎙️</Text>
                </View>
                <View style={styles.pingDot} />
            </View>

            {/* Label */}
            <Text style={styles.label}>TOTAL TALK TIME</Text>

            {/* Big Number */}
            <Text style={styles.bigNumber}>{stats.totalTalkTimeHours}</Text>
            <Text style={styles.unit}>HOURS</Text>

            {/* Insight Pill */}
            <View style={styles.insightPill}>
                <Text style={styles.insightIcon}>📅</Text>
                <Text style={styles.insightText}>
                    That's <Text style={styles.insightHighlight}>{stats.totalTalkTimeDays} full days</Text> of conversations.
                </Text>
            </View>

            {/* Narrative */}
            <View style={styles.narrativeContainer}>
                <Text style={styles.narrative}>Some calls were short.</Text>
                <Text style={styles.narrativeHighlight}>Some changed everything.</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroIcon: {
        position: 'relative',
        marginBottom: 32,
    },
    iconGlow: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: wrappedColors.primaryGlow,
        top: -5,
        left: -5,
    },
    iconCircle: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: 'rgba(42, 38, 64, 0.8)',
        borderWidth: 1,
        borderColor: 'rgba(75, 43, 238, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconEmoji: {
        fontSize: 40,
    },
    pingDot: {
        position: 'absolute',
        top: -2,
        right: -2,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: wrappedColors.primary,
    },
    label: {
        fontSize: 12,
        fontFamily: fonts.semiBold,
        color: wrappedColors.primary,
        letterSpacing: 2,
        marginBottom: 8,
    },
    bigNumber: {
        fontSize: 96,
        fontFamily: fonts.bold,
        color: wrappedColors.textPrimary,
        textAlign: 'center',
        lineHeight: 96,
    },
    unit: {
        fontSize: 28,
        fontFamily: fonts.bold,
        color: wrappedColors.textMuted,
        textAlign: 'center',
        letterSpacing: 8,
        marginTop: -8,
    },
    insightPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 24,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        backgroundColor: 'rgba(26, 22, 46, 0.9)',
        borderWidth: 1,
        borderColor: 'rgba(75, 43, 238, 0.3)',
    },
    insightIcon: {
        fontSize: 16,
    },
    insightText: {
        fontSize: 14,
        fontFamily: fonts.medium,
        color: wrappedColors.textSecondary,
    },
    insightHighlight: {
        color: wrappedColors.primary,
        fontFamily: fonts.bold,
    },
    narrativeContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
    narrative: {
        fontSize: 18,
        fontFamily: fonts.regular,
        color: wrappedColors.textMuted,
        textAlign: 'center',
    },
    narrativeHighlight: {
        fontSize: 18,
        fontFamily: fonts.medium,
        color: wrappedColors.textPrimary,
        textAlign: 'center',
        marginTop: 4,
    },
});

export default TotalTalkTimeSlide;
