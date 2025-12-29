// PersonalitySlide - "You're a Listener First"
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fonts } from '../../../theme';
import { WrappedStats } from '../../../types';

interface SlideProps {
    stats: WrappedStats;
}

const PERSONALITY_DATA: Record<string, { title: string }> = {
    'LISTENER_FIRST': { title: 'Listener First' },
    'CATCH_UP_KING': { title: 'The Catch-Up King' },
    'NIGHT_OWL': { title: 'The Night Owl' },
    'PROBLEM_SOLVER': { title: 'The Problem Solver' },
    'CHECK_IN_FRIEND': { title: 'The Check-In Friend' },
    'SILENT_SUPPORTER': { title: 'The Silent Supporter' },
};

const PersonalitySlide: React.FC<SlideProps> = ({ stats }) => {
    const personality = PERSONALITY_DATA[stats.personality] || PERSONALITY_DATA['LISTENER_FIRST'];

    return (
        <View style={styles.container}>
            {/* Content positioned in upper portion */}
            <View style={styles.contentSection}>
                {/* Title - Two Lines */}
                <View style={styles.titleContainer}>
                    <Text style={styles.titleLabel}>You're a</Text>
                    <Text style={styles.titlePersona}>{personality.title}</Text>
                </View>

                {/* Stats Card */}
                {stats.longCallsCount > 0 && (
                    <View style={styles.statsCard}>
                        <View style={styles.statRow}>
                            <Text style={styles.statNumber}>{stats.longCallsCount}</Text>
                            <Text style={styles.statText}>calls went beyond 10 minutes</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.statRow}>
                            <Text style={styles.statNumber}>{stats.totalCallsCount}</Text>
                            <Text style={styles.statText}>total calls this year</Text>
                        </View>
                    </View>
                )}
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
    titleContainer: {
        alignItems: 'center',
        marginBottom: 48,
    },
    titleLabel: {
        fontSize: 24,
        fontFamily: fonts.medium,
        color: '#6B5344',
        textAlign: 'center',
        marginBottom: 8,
    },
    titlePersona: {
        fontSize: 36,
        fontFamily: fonts.bold,
        color: '#3B2415',
        textAlign: 'center',
        lineHeight: 44,
    },
    statsCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 28,
        marginHorizontal: 24,
        borderWidth: 1,
        borderColor: 'rgba(139, 105, 20, 0.15)',
    },
    statRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 8,
    },
    statNumber: {
        fontSize: 32,
        fontFamily: fonts.bold,
        color: '#8B6914',
    },
    statText: {
        fontSize: 14,
        fontFamily: fonts.medium,
        color: '#6B5344',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(139, 105, 20, 0.15)',
        marginVertical: 16,
    },
});

export default PersonalitySlide;

