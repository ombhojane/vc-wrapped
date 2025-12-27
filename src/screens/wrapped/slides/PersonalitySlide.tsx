// PersonalitySlide - "You're a Listener First"
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { wrappedColors, fonts, wrappedGlassPanel } from '../../../theme';
import { WrappedStats } from '../../../types';
import { GlassCard } from '../../../components/wrapped';

interface SlideProps {
    stats: WrappedStats;
}

const PERSONALITY_DATA: Record<string, { title: string; emoji: string }> = {
    'LISTENER_FIRST': { title: 'Listener First', emoji: '👂' },
    'CATCH_UP_KING': { title: 'The Catch-Up King', emoji: '👑' },
    'NIGHT_OWL': { title: 'The Night Owl', emoji: '🦉' },
    'PROBLEM_SOLVER': { title: 'The Problem Solver', emoji: '🧠' },
    'CHECK_IN_FRIEND': { title: 'The Check-In Friend', emoji: '💛' },
    'SILENT_SUPPORTER': { title: 'The Silent Supporter', emoji: '🤝' },
};

const PersonalitySlide: React.FC<SlideProps> = ({ stats }) => {
    const personality = PERSONALITY_DATA[stats.personality] || PERSONALITY_DATA['LISTENER_FIRST'];

    return (
        <View style={styles.container}>
            {/* Chip Label */}
            <View style={styles.chip}>
                <Text style={styles.chipIcon}>🧠</Text>
                <Text style={styles.chipText}>Your Call Persona</Text>
            </View>

            {/* Hero Visual */}
            <View style={styles.heroContainer}>
                <View style={styles.ringOuter} />
                <View style={styles.ringInner} />
                <View style={styles.heroCircle}>
                    <Text style={styles.heroEmoji}>{personality.emoji}</Text>
                </View>
                <View style={styles.floatingBadge}>
                    <Text style={styles.floatingBadgeIcon}>👂</Text>
                </View>
            </View>

            {/* Title */}
            <View style={styles.textContainer}>
                <Text style={styles.headline}>
                    You're a{' '}
                    <Text style={styles.headlineAccent}>{personality.title}</Text>
                </Text>
            </View>

            {/* Description */}
            <Text style={styles.description}>
                {stats.personalityDescription}
            </Text>

            {/* Stats Detail */}
            {stats.longCallsCount > 0 && (
                <GlassCard style={styles.statsCard}>
                    <Text style={styles.statsText}>
                        <Text style={styles.statsHighlight}>{stats.longCallsCount}</Text> of your calls went beyond 10 minutes
                    </Text>
                </GlassCard>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: 'rgba(75, 43, 238, 0.15)',
        borderWidth: 1,
        borderColor: 'rgba(75, 43, 238, 0.3)',
        marginBottom: 32,
    },
    chipIcon: {
        fontSize: 14,
    },
    chipText: {
        fontSize: 11,
        fontFamily: fonts.semiBold,
        color: wrappedColors.primary,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    heroContainer: {
        position: 'relative',
        width: 240,
        height: 240,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    ringOuter: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 120,
        borderWidth: 1,
        borderColor: 'rgba(75, 43, 238, 0.1)',
    },
    ringInner: {
        position: 'absolute',
        width: '75%',
        height: '75%',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'rgba(75, 43, 238, 0.25)',
    },
    heroCircle: {
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: 'rgba(75, 43, 238, 0.15)',
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroEmoji: {
        fontSize: 80,
    },
    floatingBadge: {
        position: 'absolute',
        bottom: 10,
        right: 20,
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: wrappedColors.surface,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '6deg' }],
    },
    floatingBadgeIcon: {
        fontSize: 24,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    headline: {
        fontSize: 30,
        fontFamily: fonts.bold,
        color: wrappedColors.textPrimary,
        textAlign: 'center',
    },
    headlineAccent: {
        color: wrappedColors.primary,
    },
    description: {
        fontSize: 18,
        fontFamily: fonts.medium,
        color: wrappedColors.textSecondary,
        textAlign: 'center',
        paddingHorizontal: 20,
        marginBottom: 24,
        lineHeight: 28,
    },
    statsCard: {
        paddingVertical: 16,
        paddingHorizontal: 24,
    },
    statsText: {
        fontSize: 14,
        fontFamily: fonts.medium,
        color: wrappedColors.textSecondary,
        textAlign: 'center',
    },
    statsHighlight: {
        color: wrappedColors.primary,
        fontFamily: fonts.bold,
    },
});

export default PersonalitySlide;
