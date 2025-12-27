// FinalSlide - Emotional close with CTA
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { wrappedColors, fonts } from '../../../theme';
import { WrappedStats } from '../../../types';

interface SlideProps {
    stats: WrappedStats;
    onReplay?: () => void;
}

const FinalSlide: React.FC<SlideProps> = ({ stats, onReplay }) => {
    return (
        <View style={styles.container}>
            {/* Hero Visual */}
            <View style={styles.heroContainer}>
                <View style={styles.heroGlow} />
                <View style={styles.heroCircle}>
                    <Text style={styles.heroEmoji}>🎙️</Text>
                </View>
            </View>

            {/* Headline */}
            <Text style={styles.headline}>
                Your voice carried{' '}
                <Text style={styles.highlightLove}>love</Text>,{' '}
                <Text style={styles.highlightStress}>stress</Text>,{' '}
                <Text style={styles.highlightGrowth}>growth</Text>, and{' '}
                <Text style={styles.highlightHope}>hope</Text> this year.
            </Text>

            {/* Subtext */}
            <Text style={styles.subtext}>
                Wherever you're headed next —{'\n'}keep calling the people who matter.
            </Text>

            {/* Action Buttons */}
            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
                    <Text style={styles.primaryButtonText}>Save My Wrapped</Text>
                    <Text style={styles.buttonIcon}>⬇️</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.secondaryButton}
                    onPress={onReplay}
                    activeOpacity={0.7}
                >
                    <Text style={styles.secondaryButtonText}>Replay Highlights</Text>
                    <Text style={styles.buttonIcon}>🔄</Text>
                </TouchableOpacity>
            </View>

            {/* Footer Branding */}
            <View style={styles.footer}>
                <Text style={styles.footerIcon}>📊</Text>
                <Text style={styles.footerText}>VC WRAPPED 2025</Text>
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
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    heroGlow: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: wrappedColors.primaryGlow,
    },
    heroCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(42, 42, 62, 0.8)',
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroEmoji: {
        fontSize: 48,
    },
    headline: {
        fontSize: 28,
        fontFamily: fonts.bold,
        color: wrappedColors.textPrimary,
        textAlign: 'center',
        lineHeight: 38,
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    highlightLove: {
        color: wrappedColors.primary,
    },
    highlightStress: {
        color: 'rgba(124, 102, 245, 0.9)',
    },
    highlightGrowth: {
        color: 'rgba(124, 102, 245, 0.8)',
    },
    highlightHope: {
        color: wrappedColors.textPrimary,
    },
    subtext: {
        fontSize: 16,
        fontFamily: fonts.regular,
        color: wrappedColors.textMuted,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 40,
    },
    actionsContainer: {
        width: '100%',
        gap: 12,
    },
    primaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        backgroundColor: wrappedColors.primary,
        paddingVertical: 18,
        borderRadius: 30,
    },
    primaryButtonText: {
        fontSize: 17,
        fontFamily: fonts.bold,
        color: wrappedColors.textPrimary,
    },
    secondaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        backgroundColor: 'transparent',
        paddingVertical: 14,
    },
    secondaryButtonText: {
        fontSize: 15,
        fontFamily: fonts.medium,
        color: wrappedColors.textMuted,
    },
    buttonIcon: {
        fontSize: 16,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        opacity: 0.4,
    },
    footerIcon: {
        fontSize: 14,
    },
    footerText: {
        fontSize: 10,
        fontFamily: fonts.semiBold,
        color: wrappedColors.textPrimary,
        letterSpacing: 2,
    },
});

export default FinalSlide;
