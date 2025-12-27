// WisdomSlide - Voice wisdom quote
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { wrappedColors, fonts } from '../../../theme';
import { WrappedStats } from '../../../types';
import { GlassCard } from '../../../components/wrapped';

interface SlideProps {
    stats: WrappedStats;
}

const WISDOM_QUOTES = [
    "The people you call at night are the people you trust with your truth.",
    "Every call is a choice. You chose connection.",
    "Your voice carried love, stress, growth, and hope this year.",
    "Some calls last minutes. Some last in memory forever.",
];

const WisdomSlide: React.FC<SlideProps> = ({ stats }) => {
    const quoteIndex = stats.totalCallsCount % WISDOM_QUOTES.length;
    const quote = WISDOM_QUOTES[quoteIndex];

    return (
        <View style={styles.container}>
            {/* Label Chip */}
            <View style={styles.chip}>
                <Text style={styles.chipIcon}>✨</Text>
                <Text style={styles.chipText}>VOICE WISDOM</Text>
            </View>

            {/* Hero Visual */}
            <View style={styles.heroContainer}>
                <View style={styles.heroGlow} />
                <View style={styles.heroCircle}>
                    <Text style={styles.heroIcon}>🌙</Text>
                </View>
            </View>

            {/* Quote */}
            <View style={styles.quoteContainer}>
                <Text style={styles.quoteMarkOpen}>"</Text>
                <Text style={styles.quoteText}>{quote}</Text>
                <Text style={styles.quoteMarkClose}>"</Text>
            </View>

            {/* Stats Card */}
            <GlassCard style={styles.statsCard}>
                <Text style={styles.statsText}>
                    You spent <Text style={styles.statsHighlight}>42 hours</Text> on calls after 10 PM this year.
                </Text>
            </GlassCard>
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
        gap: 6,
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        marginBottom: 24,
    },
    chipIcon: {
        fontSize: 12,
    },
    chipText: {
        fontSize: 10,
        fontFamily: fonts.bold,
        color: 'rgba(75, 43, 238, 0.8)',
        letterSpacing: 2,
    },
    heroContainer: {
        position: 'relative',
        width: 160,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    heroGlow: {
        position: 'absolute',
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: wrappedColors.primaryGlow,
    },
    heroCircle: {
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: 'rgba(42, 42, 62, 0.8)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroIcon: {
        fontSize: 60,
    },
    quoteContainer: {
        position: 'relative',
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    quoteMarkOpen: {
        position: 'absolute',
        top: -20,
        left: 8,
        fontSize: 60,
        fontFamily: fonts.bold,
        color: 'rgba(75, 43, 238, 0.2)',
        lineHeight: 60,
    },
    quoteText: {
        fontSize: 24,
        fontFamily: fonts.bold,
        color: wrappedColors.textPrimary,
        textAlign: 'center',
        lineHeight: 34,
    },
    quoteMarkClose: {
        position: 'absolute',
        bottom: -40,
        right: 8,
        fontSize: 60,
        fontFamily: fonts.bold,
        color: 'rgba(75, 43, 238, 0.2)',
        lineHeight: 60,
    },
    statsCard: {
        paddingVertical: 14,
        paddingHorizontal: 20,
        marginTop: 16,
    },
    statsText: {
        fontSize: 14,
        fontFamily: fonts.regular,
        color: wrappedColors.textSecondary,
        textAlign: 'center',
    },
    statsHighlight: {
        fontSize: 16,
        fontFamily: fonts.bold,
        color: wrappedColors.textPrimary,
    },
});

export default WisdomSlide;
