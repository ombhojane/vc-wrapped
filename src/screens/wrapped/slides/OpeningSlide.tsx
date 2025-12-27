// OpeningSlide - "This year, you made your voice count"
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { wrappedColors, fonts } from '../../../theme';
import { WrappedStats } from '../../../types';

interface SlideProps {
    stats: WrappedStats;
}

const OpeningSlide: React.FC<SlideProps> = () => {
    return (
        <View style={styles.container}>
            {/* Hero Visual */}
            <View style={styles.heroContainer}>
                <View style={styles.heroGlow} />
                <View style={styles.heroCircle}>
                    <Text style={styles.heroEmoji}>🎙️</Text>
                </View>
                <View style={[styles.floatingBadge, styles.floatingBadgeTop]}>
                    <Text style={styles.floatingBadgeIcon}>📞</Text>
                </View>
                <View style={[styles.floatingBadge, styles.floatingBadgeBottom]}>
                    <Text style={styles.floatingBadgeIcon}>🎤</Text>
                </View>
            </View>

            {/* Typography */}
            <View style={styles.textContainer}>
                <Text style={styles.headline}>
                    This year, you made your{' '}
                    <Text style={styles.headlineAccent}>voice count.</Text>
                </Text>
                <Text style={styles.subheadline}>
                    Here's what your calls say about your life in 2025.
                </Text>
            </View>

            {/* Hint */}
            <View style={styles.hintContainer}>
                <Text style={styles.hintText}>Tap to continue</Text>
                <Text style={styles.hintArrow}>→</Text>
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
    heroContainer: {
        position: 'relative',
        width: 280,
        height: 280,
        marginBottom: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroGlow: {
        position: 'absolute',
        width: '80%',
        height: '80%',
        borderRadius: 140,
        backgroundColor: wrappedColors.primaryGlow,
    },
    heroCircle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(75, 43, 238, 0.15)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroEmoji: {
        fontSize: 80,
    },
    floatingBadge: {
        position: 'absolute',
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingBadgeTop: {
        top: 20,
        right: 10,
    },
    floatingBadgeBottom: {
        bottom: 40,
        left: 0,
    },
    floatingBadgeIcon: {
        fontSize: 20,
    },
    textContainer: {
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    headline: {
        fontSize: 34,
        fontFamily: fonts.bold,
        color: wrappedColors.textPrimary,
        textAlign: 'center',
        marginBottom: 16,
        lineHeight: 42,
    },
    headlineAccent: {
        color: wrappedColors.primary,
    },
    subheadline: {
        fontSize: 18,
        fontFamily: fonts.medium,
        color: wrappedColors.textMuted,
        textAlign: 'center',
        lineHeight: 28,
    },
    hintContainer: {
        position: 'absolute',
        bottom: 40,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    hintText: {
        fontSize: 14,
        fontFamily: fonts.regular,
        color: wrappedColors.textMuted,
    },
    hintArrow: {
        fontSize: 16,
        color: wrappedColors.textMuted,
    },
});

export default OpeningSlide;
