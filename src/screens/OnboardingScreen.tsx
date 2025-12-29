// OnboardingScreen - Matches reference design
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { fonts } from '../theme';

interface OnboardingScreenProps {
    onOpenWrapped: () => void;
}

// Gradient Text Component
const GradientText: React.FC<{ children: React.ReactNode; style?: any }> = ({ children, style }) => {
    return (
        <MaskedView
            maskElement={
                <Text style={[style, { backgroundColor: 'transparent' }]}>{children}</Text>
            }
        >
            <LinearGradient
                colors={['#8B2332', '#6B1B28']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Text style={[style, { opacity: 0 }]}>{children}</Text>
            </LinearGradient>
        </MaskedView>
    );
};

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onOpenWrapped }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handlePress = () => {
        setIsLoading(true);
        setTimeout(() => {
            onOpenWrapped();
        }, 300);
    };

    return (
        <ImageBackground
            source={require('../../assets/designs/back1.png')}
            style={styles.container}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.content}>
                    {/* Headline */}
                    <Text style={styles.headline}>
                        This year you made
                    </Text>
                    <View style={styles.gradientLine}>
                        <Text style={styles.headline}>your </Text>
                        <GradientText style={styles.headline}>voice count</GradientText>
                    </View>
                    
                    {/* Subtitle */}
                    <Text style={styles.subheadline}>
                        Here's what your calls tell about{'\n'}your life in 2025
                    </Text>

                    {/* CTA Button */}
                    <TouchableOpacity 
                        style={styles.ctaButton}
                        onPress={handlePress}
                        activeOpacity={0.8}
                        disabled={isLoading}
                    >
                        <Text style={styles.ctaText}>
                            {isLoading ? 'Loading...' : 'Replay my Year'}
                        </Text>
                    </TouchableOpacity>
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
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
        paddingBottom: 180,
    },
    headline: {
        fontSize: 32,
        fontFamily: fonts.bold,
        color: '#8B2332',
        textAlign: 'center',
        lineHeight: 42,
    },
    gradientLine: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    subheadline: {
        fontSize: 16,
        fontFamily: fonts.regular,
        color: '#6B6B6B',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
    },
    ctaButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#8B2332',
        backgroundColor: 'transparent',
    },
    ctaText: {
        fontSize: 16,
        fontFamily: fonts.semiBold,
        color: '#8B2332',
    },
});

export default OnboardingScreen;

