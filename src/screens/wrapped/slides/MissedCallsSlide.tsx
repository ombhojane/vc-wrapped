// MissedCallsSlide - The calls that got away
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { wrappedColors, fonts, wrappedGlassPanel } from '../../../theme';
import { WrappedStats } from '../../../types';

interface SlideProps {
    stats: WrappedStats;
}

const MissedCallsSlide: React.FC<SlideProps> = ({ stats }) => {
    return (
        <View style={styles.container}>
            {/* Headline */}
            <Text style={styles.headline}>The ones that got away</Text>

            {/* Hero Graphic */}
            <View style={styles.heroContainer}>
                <View style={styles.ringOuter} />
                <View style={styles.ringMiddle} />
                <View style={styles.iconCircle}>
                    <Text style={styles.iconEmoji}>📵</Text>
                    <View style={styles.pingDot} />
                </View>
            </View>

            {/* Big Number */}
            <Text style={styles.bigNumber}>{stats.missedCallsCount}</Text>
            <Text style={styles.label}>MISSED CALLS</Text>

            {/* Narrative */}
            <View style={styles.narrativeContainer}>
                <Text style={styles.narrative}>Most were busy moments.</Text>
                <Text style={styles.narrativeSecond}>A few… you wish you picked up.</Text>
            </View>

            {/* Share Button Placeholder */}
            <TouchableOpacity style={styles.shareButton} activeOpacity={0.7}>
                <Text style={styles.shareIcon}>📤</Text>
                <Text style={styles.shareText}>Share this stat</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headline: {
        fontSize: 20,
        fontFamily: fonts.medium,
        color: wrappedColors.textSecondary,
        textAlign: 'center',
        marginBottom: 32,
    },
    heroContainer: {
        position: 'relative',
        width: 160,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    ringOuter: {
        position: 'absolute',
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    ringMiddle: {
        position: 'absolute',
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    iconCircle: {
        ...wrappedGlassPanel,
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconEmoji: {
        fontSize: 48,
    },
    pingDot: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#f87171',
    },
    bigNumber: {
        fontSize: 100,
        fontFamily: fonts.bold,
        color: wrappedColors.textPrimary,
        textAlign: 'center',
        lineHeight: 100,
    },
    label: {
        fontSize: 16,
        fontFamily: fonts.bold,
        color: wrappedColors.primary,
        letterSpacing: 4,
        textAlign: 'center',
        marginTop: 8,
    },
    narrativeContainer: {
        marginTop: 32,
        alignItems: 'center',
    },
    narrative: {
        fontSize: 15,
        fontFamily: fonts.regular,
        color: wrappedColors.textMuted,
        textAlign: 'center',
    },
    narrativeSecond: {
        fontSize: 15,
        fontFamily: fonts.regular,
        color: wrappedColors.textMuted,
        textAlign: 'center',
        marginTop: 4,
    },
    shareButton: {
        position: 'absolute',
        bottom: 40,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    shareIcon: {
        fontSize: 16,
    },
    shareText: {
        fontSize: 14,
        fontFamily: fonts.semiBold,
        color: wrappedColors.textPrimary,
    },
});

export default MissedCallsSlide;
