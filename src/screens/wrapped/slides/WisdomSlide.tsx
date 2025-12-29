// WisdomSlide - Voice wisdom quote
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fonts } from '../../../theme';
import { WrappedStats } from '../../../types';

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
            <View style={styles.statsCard}>
                <Text style={styles.statsText}>
                    You spent <Text style={styles.statsHighlight}>42 hours</Text> on calls after 10 PM this year.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 24,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 20,
        backgroundColor: 'rgba(245, 230, 211, 0.6)',
        borderWidth: 1,
        borderColor: 'rgba(139, 105, 20, 0.15)',
        marginBottom: 20,
    },
    chipIcon: {
        fontSize: 12,
    },
    chipText: {
        fontSize: 10,
        fontFamily: fonts.bold,
        color: '#8B6914',
        letterSpacing: 2,
    },
    heroContainer: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    heroCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(245, 230, 211, 0.6)',
        borderWidth: 1,
        borderColor: 'rgba(139, 105, 20, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroIcon: {
        fontSize: 48,
    },
    quoteContainer: {
        position: 'relative',
        paddingHorizontal: 24,
        marginBottom: 20,
    },
    quoteMarkOpen: {
        position: 'absolute',
        top: -16,
        left: 8,
        fontSize: 50,
        fontFamily: fonts.bold,
        color: 'rgba(139, 105, 20, 0.2)',
        lineHeight: 50,
    },
    quoteText: {
        fontSize: 22,
        fontFamily: fonts.bold,
        color: '#3B2415',
        textAlign: 'center',
        lineHeight: 32,
    },
    quoteMarkClose: {
        position: 'absolute',
        bottom: -30,
        right: 8,
        fontSize: 50,
        fontFamily: fonts.bold,
        color: 'rgba(139, 105, 20, 0.2)',
        lineHeight: 50,
    },
    statsCard: {
        backgroundColor: 'rgba(245, 230, 211, 0.5)',
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 20,
        marginTop: 16,
        borderWidth: 1,
        borderColor: 'rgba(139, 105, 20, 0.15)',
    },
    statsText: {
        fontSize: 14,
        fontFamily: fonts.regular,
        color: '#5A4332',
        textAlign: 'center',
    },
    statsHighlight: {
        fontSize: 15,
        fontFamily: fonts.bold,
        color: '#3B2415',
    },
});

export default WisdomSlide;

