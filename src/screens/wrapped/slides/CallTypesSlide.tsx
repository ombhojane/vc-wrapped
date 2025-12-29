// CallTypesSlide - The Breakdown (Spotify-like layout)
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { fonts } from '../../../theme';
import { WrappedStats } from '../../../types';
import { formatDuration } from '../../../utils/formatters';

interface SlideProps {
    stats: WrappedStats;
}

const CallTypesSlide: React.FC<SlideProps> = ({ stats }) => {
    const topContact = stats.topContacts[0];
    
    // Build stats items for numbered list (only 4 to fit better)
    const statsItems = [
        {
            number: '01',
            label: 'Total Calls',
            value: stats.totalCallsCount.toString(),
        },
        {
            number: '02',
            label: 'Talk Time',
            value: `${Math.round(stats.totalTalkTimeHours)}h`,
        },
        {
            number: '03',
            label: 'Long Calls',
            value: stats.longCallsCount.toString(),
        },
        {
            number: '04',
            label: 'Avg Duration',
            value: formatDuration(stats.averageCallDuration),
        },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.yearLabel}>2025</Text>
            <Text style={styles.headline}>The Breakdown</Text>

            {/* Cover Image */}
            <View style={styles.coverContainer}>
                <Image 
                    source={require('../../../../assets/designs/cover.png')}
                    style={styles.coverImage}
                    resizeMode="cover"
                />
            </View>

            {/* Stats List - Compact */}
            <View style={styles.statsList}>
                {statsItems.map((item) => (
                    <View key={item.number} style={styles.statRow}>
                        <Text style={styles.statNumber}>{item.number}</Text>
                        <Text style={styles.statLabel}>{item.label}</Text>
                        <Text style={styles.statValue}>{item.value}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 16,
    },
    yearLabel: {
        fontSize: 12,
        fontFamily: fonts.semiBold,
        color: '#8B7B6B',
        textAlign: 'center',
        letterSpacing: 2,
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    headline: {
        fontSize: 28,
        fontFamily: fonts.bold,
        color: '#3B2415',
        textAlign: 'center',
        marginBottom: 16,
    },
    coverContainer: {
        width: 120,
        height: 120,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    coverImage: {
        width: '100%',
        height: '100%',
    },
    statsList: {
        width: '100%',
        gap: 8,
    },
    statRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(245, 230, 211, 0.5)',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: 'rgba(139, 105, 20, 0.15)',
    },
    statNumber: {
        fontSize: 14,
        fontFamily: fonts.bold,
        color: '#8B6914',
        width: 32,
    },
    statLabel: {
        fontSize: 14,
        fontFamily: fonts.semiBold,
        color: '#3B2415',
        flex: 1,
    },
    statValue: {
        fontSize: 16,
        fontFamily: fonts.bold,
        color: '#8B6914',
    },
});

export default CallTypesSlide;

