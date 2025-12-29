// TotalTalkTimeSlide - Big stat: total hours on calls
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fonts } from '../../../theme';
import { WrappedStats } from '../../../types';

interface SlideProps {
    stats: WrappedStats;
}

const TotalTalkTimeSlide: React.FC<SlideProps> = ({ stats }) => {
    return (
        <View style={styles.container}>
            {/* Content positioned in upper portion */}
            <View style={styles.contentSection}>
                {/* Label */}
                <Text style={styles.label}>TOTAL TALK TIME</Text>

                {/* Big Number */}
                <Text style={styles.bigNumber}>{stats.totalTalkTimeHours}</Text>
                <Text style={styles.unit}>HOURS</Text>

                {/* Insight Pill */}
                <View style={styles.insightPill}>
                    <Text style={styles.insightIcon}>📅</Text>
                    <Text style={styles.insightText}>
                        That's <Text style={styles.insightHighlight}>{stats.totalTalkTimeDays} full days</Text> of conversations.
                    </Text>
                </View>

                {/* Narrative */}
                <View style={styles.narrativeContainer}>
                    <Text style={styles.narrative}>Some calls were short.</Text>
                    <Text style={styles.narrativeHighlight}>Some changed everything.</Text>
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
        flex: 0.65, // Takes upper 65% of screen
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    label: {
        fontSize: 12,
        fontFamily: fonts.semiBold,
        color: '#8B6914',
        letterSpacing: 2,
        marginBottom: 8,
    },
    bigNumber: {
        fontSize: 96,
        fontFamily: fonts.bold,
        color: '#3B2415',
        textAlign: 'center',
        lineHeight: 96,
    },
    unit: {
        fontSize: 28,
        fontFamily: fonts.bold,
        color: '#6B5344',
        textAlign: 'center',
        letterSpacing: 8,
        marginTop: -8,
    },
    insightPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 24,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        backgroundColor: 'rgba(139, 105, 20, 0.15)',
        borderWidth: 1,
        borderColor: 'rgba(139, 105, 20, 0.3)',
    },
    insightIcon: {
        fontSize: 16,
    },
    insightText: {
        fontSize: 14,
        fontFamily: fonts.medium,
        color: '#6B5344',
    },
    insightHighlight: {
        color: '#8B6914',
        fontFamily: fonts.bold,
    },
    narrativeContainer: {
        marginTop: 32,
        alignItems: 'center',
    },
    narrative: {
        fontSize: 16,
        fontFamily: fonts.regular,
        color: '#8B7B6B',
        textAlign: 'center',
    },
    narrativeHighlight: {
        fontSize: 16,
        fontFamily: fonts.medium,
        color: '#3B2415',
        textAlign: 'center',
        marginTop: 4,
    },
});

export default TotalTalkTimeSlide;


