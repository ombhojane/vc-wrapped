// OnboardingScreen - "Tap here to open your wrapped"
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { wrappedColors, fonts } from '../theme';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
    onOpenWrapped: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onOpenWrapped }) => {
    return (
        <View style={styles.container}>
            {/* Ambient Glows */}
            <View style={styles.glowTop} />
            <View style={styles.glowBottom} />

            <SafeAreaView style={styles.safeArea}>
                {/* Header Logo */}
                <View style={styles.header}>
                    <Text style={styles.logoIcon}>📊</Text>
                    <Text style={styles.logoText}>VC WRAPPED</Text>
                </View>

                {/* Main Content */}
                <View style={styles.content}>
                    {/* Hero Visual */}
                    <View style={styles.heroContainer}>
                        <View style={styles.heroGlow} />
                        <View style={styles.ringOuter} />
                        <View style={styles.ringMiddle} />
                        <View style={styles.heroCircle}>
                            <Text style={styles.heroEmoji}>🎙️</Text>
                        </View>
                        
                        {/* Floating badges */}
                        <View style={[styles.floatingBadge, styles.badgeTopRight]}>
                            <Text style={styles.badgeIcon}>📞</Text>
                        </View>
                        <View style={[styles.floatingBadge, styles.badgeBottomLeft]}>
                            <Text style={styles.badgeIcon}>❤️</Text>
                        </View>
                        <View style={[styles.floatingBadge, styles.badgeTopLeft]}>
                            <Text style={styles.badgeIcon}>✨</Text>
                        </View>
                    </View>

                    {/* Typography */}
                    <Text style={styles.headline}>
                        Your 2025{'\n'}
                        <Text style={styles.headlineAccent}>Voice Journey</Text>
                    </Text>
                    <Text style={styles.subheadline}>
                        Discover what your calls say about you this year.
                    </Text>
                </View>

                {/* CTA Button */}
                <TouchableOpacity 
                    style={styles.ctaButton}
                    onPress={onOpenWrapped}
                    activeOpacity={0.85}
                >
                    <View style={styles.ctaGlow} />
                    <Text style={styles.ctaIcon}>🎁</Text>
                    <Text style={styles.ctaText}>Open Your Wrapped</Text>
                    <Text style={styles.ctaArrow}>→</Text>
                </TouchableOpacity>

                {/* Footer */}
                <Text style={styles.footer}>Tap to begin your journey</Text>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: wrappedColors.background,
    },
    glowTop: {
        position: 'absolute',
        top: -height * 0.1,
        left: -width * 0.2,
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: width * 0.4,
        backgroundColor: wrappedColors.ambientGlow1,
    },
    glowBottom: {
        position: 'absolute',
        bottom: -height * 0.05,
        right: -width * 0.15,
        width: width * 0.7,
        height: width * 0.7,
        borderRadius: width * 0.35,
        backgroundColor: wrappedColors.ambientGlow2,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        gap: 8,
    },
    logoIcon: {
        fontSize: 20,
    },
    logoText: {
        fontSize: 12,
        fontFamily: fonts.bold,
        color: wrappedColors.textMuted,
        letterSpacing: 3,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    heroContainer: {
        position: 'relative',
        width: 280,
        height: 280,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    heroGlow: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: wrappedColors.primaryGlow,
    },
    ringOuter: {
        position: 'absolute',
        width: 260,
        height: 260,
        borderRadius: 130,
        borderWidth: 1,
        borderColor: 'rgba(75, 43, 238, 0.1)',
    },
    ringMiddle: {
        position: 'absolute',
        width: 220,
        height: 220,
        borderRadius: 110,
        borderWidth: 1,
        borderColor: 'rgba(75, 43, 238, 0.2)',
    },
    heroCircle: {
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: 'rgba(75, 43, 238, 0.15)',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroEmoji: {
        fontSize: 80,
    },
    floatingBadge: {
        position: 'absolute',
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeTopRight: {
        top: 30,
        right: 20,
    },
    badgeBottomLeft: {
        bottom: 50,
        left: 10,
    },
    badgeTopLeft: {
        top: 60,
        left: 20,
    },
    badgeIcon: {
        fontSize: 20,
    },
    headline: {
        fontSize: 36,
        fontFamily: fonts.bold,
        color: wrappedColors.textPrimary,
        textAlign: 'center',
        lineHeight: 44,
        marginBottom: 16,
    },
    headlineAccent: {
        color: wrappedColors.primary,
    },
    subheadline: {
        fontSize: 16,
        fontFamily: fonts.regular,
        color: wrappedColors.textMuted,
        textAlign: 'center',
        lineHeight: 24,
    },
    ctaButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        marginHorizontal: 32,
        marginBottom: 16,
        paddingVertical: 18,
        paddingHorizontal: 32,
        borderRadius: 30,
        backgroundColor: wrappedColors.primary,
        position: 'relative',
        overflow: 'hidden',
    },
    ctaGlow: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    ctaIcon: {
        fontSize: 22,
    },
    ctaText: {
        fontSize: 18,
        fontFamily: fonts.bold,
        color: '#FFFFFF',
    },
    ctaArrow: {
        fontSize: 20,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    footer: {
        fontSize: 13,
        fontFamily: fonts.regular,
        color: wrappedColors.textMuted,
        textAlign: 'center',
        marginBottom: 24,
    },
});

export default OnboardingScreen;
