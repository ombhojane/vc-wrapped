// GrowthSlide - What this year taught you
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fonts } from '../../../theme';
import { WrappedStats } from '../../../types';
import { formatDuration } from '../../../utils/formatters';

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
                <View style={styles.heroCard}>
                    <Text style={styles.heroEmoji}>📈</Text>
                </View>
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
        paddingTop: 16,
    },
    yearLabel: {
        fontSize: 10,
        fontFamily: fonts.medium,
        color: '#8B7B6B',
        letterSpacing: 2,
        textAlign: 'center',
        marginBottom: 12,
    },
    headline: {
        fontSize: 28,
        fontFamily: fonts.bold,
        color: '#3B2415',
        textAlign: 'center',
        lineHeight: 36,
        marginBottom: 20,
    },
    headlineAccent: {
        color: '#8B6914',
    },
    heroContainer: {
        position: 'relative',
        width: '100%',
        height: 140,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    heroCard: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(245, 230, 211, 0.6)',
        borderWidth: 1,
        borderColor: 'rgba(139, 105, 20, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroEmoji: {
        fontSize: 48,
    },
    floatingBadge: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
        backgroundColor: 'rgba(245, 230, 211, 0.7)',
        borderWidth: 1,
        borderColor: 'rgba(139, 105, 20, 0.15)',
    },
    floatingBadgeRight: {
        top: 10,
        right: 20,
        transform: [{ rotate: '3deg' }],
    },
    floatingBadgeLeft: {
        bottom: 10,
        left: 20,
        transform: [{ rotate: '-3deg' }],
        opacity: 0.7,
    },
    floatingIcon: {
        fontSize: 14,
    },
    floatingText: {
        fontSize: 11,
        fontFamily: fonts.bold,
        color: '#3B2415',
    },
    floatingTextMuted: {
        fontSize: 11,
        fontFamily: fonts.medium,
        color: '#6B5344',
    },
    insightContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    insightText: {
        fontSize: 16,
        fontFamily: fonts.medium,
        color: '#5A4332',
        textAlign: 'center',
        lineHeight: 24,
    },
    insightHighlight: {
        color: '#3B2415',
        fontFamily: fonts.bold,
    },
    highlightBox: {
        backgroundColor: '#8B6914',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 30,
    },
    highlightText: {
        fontSize: 15,
        fontFamily: fonts.bold,
        color: '#FFFFFF',
        textAlign: 'center',
    },
});

export default GrowthSlide;

