// GrowthSlide - What this year taught you
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { wrappedColors, fonts } from '../../../theme';
import { WrappedStats } from '../../../types';
import { formatDuration } from '../../../utils/formatters';
import { GlassCard } from '../../../components/wrapped';

interface SlideProps {
    stats: WrappedStats;
}

const GrowthSlide: React.FC<SlideProps> = ({ stats }) => {
    return (
        <View style={styles.container}>
            {/* Label */}
            <Text style={styles.yearLabel}>2025 VC WRAPPED</Text>

            {/* Headline */}
            <Text style={styles.headline}>
                What This Year{'\n'}
                <Text style={styles.headlineAccent}>Taught You</Text>
            </Text>

            {/* Hero Visual */}
            <View style={styles.heroContainer}>
                <View style={styles.heroGlow} />
                <GlassCard style={styles.heroCard}>
                    <Text style={styles.heroEmoji}>📈</Text>
                </GlassCard>
                <View style={[styles.floatingBadge, styles.floatingBadgeRight]}>
                    <Text style={styles.floatingIcon}>📊</Text>
                    <Text style={styles.floatingText}>Depth +200%</Text>
                </View>
                <View style={[styles.floatingBadge, styles.floatingBadgeLeft]}>
                    <Text style={styles.floatingIcon}>🔇</Text>
                    <Text style={styles.floatingTextMuted}>Noise -12%</Text>
                </View>
            </View>

            {/* Insight Text */}
            <View style={styles.insightContainer}>
                <Text style={styles.insightText}>
                    You made <Text style={styles.insightHighlight}>{stats.totalCallsCount} calls</Text> this year — 
                    with an average of <Text style={styles.insightHighlight}>{formatDuration(stats.averageCallDuration)}</Text> per call.
                </Text>
            </View>

            {/* Highlight Box */}
            <View style={styles.highlightBox}>
                <Text style={styles.highlightText}>
                    You're choosing quality over noise.
                </Text>
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
    yearLabel: {
        fontSize: 10,
        fontFamily: fonts.medium,
        color: wrappedColors.textMuted,
        letterSpacing: 2,
        textAlign: 'center',
        marginBottom: 16,
    },
    headline: {
        fontSize: 30,
        fontFamily: fonts.bold,
        color: wrappedColors.textPrimary,
        textAlign: 'center',
        lineHeight: 38,
        marginBottom: 24,
    },
    headlineAccent: {
        color: wrappedColors.primary,
    },
    heroContainer: {
        position: 'relative',
        width: '100%',
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    heroGlow: {
        position: 'absolute',
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: wrappedColors.primaryGlow,
    },
    heroCard: {
        width: 140,
        height: 140,
        borderRadius: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroEmoji: {
        fontSize: 60,
    },
    floatingBadge: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
        backgroundColor: wrappedColors.surface,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    floatingBadgeRight: {
        top: 20,
        right: 10,
        transform: [{ rotate: '3deg' }],
    },
    floatingBadgeLeft: {
        bottom: 20,
        left: 10,
        transform: [{ rotate: '-3deg' }],
        opacity: 0.6,
    },
    floatingIcon: {
        fontSize: 14,
    },
    floatingText: {
        fontSize: 11,
        fontFamily: fonts.bold,
        color: wrappedColors.textPrimary,
    },
    floatingTextMuted: {
        fontSize: 11,
        fontFamily: fonts.medium,
        color: wrappedColors.textMuted,
    },
    insightContainer: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    insightText: {
        fontSize: 17,
        fontFamily: fonts.medium,
        color: wrappedColors.textSecondary,
        textAlign: 'center',
        lineHeight: 26,
    },
    insightHighlight: {
        color: wrappedColors.textPrimary,
        fontFamily: fonts.bold,
    },
    highlightBox: {
        backgroundColor: wrappedColors.primary,
        paddingVertical: 16,
        paddingHorizontal: 28,
        borderRadius: 30,
    },
    highlightText: {
        fontSize: 16,
        fontFamily: fonts.bold,
        color: wrappedColors.textPrimary,
        textAlign: 'center',
    },
});

export default GrowthSlide;
