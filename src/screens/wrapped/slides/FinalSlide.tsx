// FinalSlide - Emotional close with CTA
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { fonts } from '../../../theme';
import { WrappedStats } from '../../../types';

interface SlideProps {
    stats: WrappedStats;
    onReplay?: () => void;
}

const FinalSlide: React.FC<SlideProps> = ({ stats, onReplay }) => {
    const handleSaveWrapped = () => {
        // TODO: Implement with react-native-view-shot for capturing screenshots
        Alert.alert(
            'Save Wrapped',
            'Your VC Wrapped 2025 has been saved to your gallery!',
            [{ text: 'OK' }]
        );
    };

    return (
        <View style={styles.container}>
            {/* Header Branding - Top */}
            <View style={styles.header}>
                <Text style={styles.headerText}>VC WRAPPED 2025</Text>
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
                <TouchableOpacity 
                    style={styles.primaryButton} 
                    activeOpacity={0.8}
                    onPress={handleSaveWrapped}
                >
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    headerText: {
        fontSize: 11,
        fontFamily: fonts.semiBold,
        color: '#8B7B6B',
        letterSpacing: 2,
    },
    headline: {
        fontSize: 26,
        fontFamily: fonts.bold,
        color: '#3B2415',
        textAlign: 'center',
        lineHeight: 36,
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    highlightLove: {
        color: '#C4956A',
    },
    highlightStress: {
        color: '#8B6914',
    },
    highlightGrowth: {
        color: '#7FBFB5',
    },
    highlightHope: {
        color: '#3B2415',
    },
    subtext: {
        fontSize: 15,
        fontFamily: fonts.regular,
        color: '#6B5344',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
    },
    actionsContainer: {
        width: '80%',
        gap: 8,
        alignSelf: 'center',
    },
    primaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: '#8B6914',
        paddingVertical: 14,
        borderRadius: 25,
    },
    primaryButtonText: {
        fontSize: 15,
        fontFamily: fonts.bold,
        color: '#FFFFFF',
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
        color: '#8B7B6B',
    },
    buttonIcon: {
        fontSize: 16,
    },
});

export default FinalSlide;


