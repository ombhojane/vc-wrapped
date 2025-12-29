// OnboardingScreen - Matches reference design
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../theme';

interface OnboardingScreenProps {
    onOpenWrapped: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onOpenWrapped }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handlePress = () => {
        setIsLoading(true);
        // Use setTimeout to ensure UI renders before async call
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
                {/* Main Content */}
                <View style={styles.content}>
                    {/* Headline */}
                    <Text style={styles.headline}>
                        This year you made{'\n'}your voice count
                    </Text>
                    
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
        paddingBottom: 180, // Push content up to avoid bottom illustrations
    },
    headline: {
        fontSize: 32,
        fontFamily: fonts.bold,
        color: '#7B2D26',
        textAlign: 'center',
        lineHeight: 42,
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
        borderColor: '#7B2D26',
        backgroundColor: 'transparent',
    },
    ctaText: {
        fontSize: 16,
        fontFamily: fonts.semiBold,
        color: '#7B2D26',
    },
});

export default OnboardingScreen;
