// OnboardingScreen - "Tap here to open your wrapped"
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../theme';

interface OnboardingScreenProps {
    onOpenWrapped: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onOpenWrapped }) => {
    return (
        <ImageBackground
            source={require('../../assets/designs/back1.png')}
            style={styles.container}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.safeArea}>
                {/* Header Logo */}
                <View style={styles.header}>
                    <Text style={styles.logoIcon}>📊</Text>
                    <Text style={styles.logoText}>VC WRAPPED</Text>
                </View>

                {/* Main Content - positioned higher to avoid bottom illustrations */}
                <View style={styles.content}>
                    {/* Typography */}
                    <Text style={styles.headline}>
                        Your 2025{'\n'}
                        <Text style={styles.headlineAccent}>Voice Journey</Text>
                    </Text>
                    <Text style={styles.subheadline}>
                        Discover what your calls say about you this year.
                    </Text>
                </View>

                {/* CTA Button - positioned above illustrations */}
                <View style={styles.ctaContainer}>
                    <TouchableOpacity 
                        style={styles.ctaButton}
                        onPress={onOpenWrapped}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.ctaIcon}>🎁</Text>
                        <Text style={styles.ctaText}>Open Your Wrapped</Text>
                        <Text style={styles.ctaArrow}>→</Text>
                    </TouchableOpacity>

                    {/* Footer */}
                    <Text style={styles.footer}>Tap to begin your journey</Text>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        color: '#6B5344',
        letterSpacing: 3,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
        paddingBottom: 80, // Push content up to avoid bottom illustrations
    },
    headline: {
        fontSize: 40,
        fontFamily: fonts.bold,
        color: '#3B2415',
        textAlign: 'center',
        lineHeight: 50,
        marginBottom: 16,
    },
    headlineAccent: {
        color: '#8B6914',
    },
    subheadline: {
        fontSize: 16,
        fontFamily: fonts.regular,
        color: '#6B5344',
        textAlign: 'center',
        lineHeight: 24,
    },
    ctaContainer: {
        paddingBottom: 140, // Extra padding to position above illustrations
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
        backgroundColor: '#8B6914',
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
        color: '#8B7B6B',
        textAlign: 'center',
    },
});

export default OnboardingScreen;
