// OpeningSlide - "This year, you made your voice count"
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fonts } from '../../../theme';
import { WrappedStats } from '../../../types';

interface SlideProps {
    stats: WrappedStats;
}

const OpeningSlide: React.FC<SlideProps> = () => {
    return (
        <View style={styles.container}>
            {/* Main content positioned in upper half */}
            <View style={styles.contentSection}>
                {/* Year Label */}
                <Text style={styles.yearLabel}>2025</Text>
                
                {/* Typography */}
                <View style={styles.textContainer}>
                    <Text style={styles.headline}>
                        This year, you made your{' '}
                        <Text style={styles.headlineAccent}>voice count.</Text>
                    </Text>
                    <Text style={styles.subheadline}>
                        Here's what your calls say about your life.
                    </Text>
                </View>

                {/* Hint - positioned right below text */}
                <View style={styles.hintContainer}>
                    <Text style={styles.hintText}>Tap to continue</Text>
                    <Text style={styles.hintArrow}>→</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentSection: {
        flex: 0.6, // Takes upper 60% of screen
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },
    yearLabel: {
        fontSize: 14,
        fontFamily: fonts.bold,
        color: '#8B6914',
        letterSpacing: 4,
        marginBottom: 24,
    },
    textContainer: {
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    headline: {
        fontSize: 34,
        fontFamily: fonts.bold,
        color: '#3B2415',
        textAlign: 'center',
        marginBottom: 12,
        lineHeight: 44,
    },
    headlineAccent: {
        color: '#8B6914',
    },
    subheadline: {
        fontSize: 16,
        fontFamily: fonts.medium,
        color: '#6B5344',
        textAlign: 'center',
        lineHeight: 24,
    },
    hintContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 40,
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: 'rgba(139, 105, 20, 0.1)',
        borderRadius: 24,
    },
    hintText: {
        fontSize: 14,
        fontFamily: fonts.medium,
        color: '#6B5344',
    },
    hintArrow: {
        fontSize: 16,
        color: '#8B6914',
    },
});

export default OpeningSlide;


