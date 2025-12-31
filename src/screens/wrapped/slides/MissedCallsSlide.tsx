// MissedCallsSlide - The calls that got away
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fonts } from '../../../theme';
import { WrappedStats } from '../../../types';

interface SlideProps {
    stats: WrappedStats;
}

const MissedCallsSlide: React.FC<SlideProps> = ({ stats }) => {
    return (
        <View style={styles.container}>
            {/* Main Content - Centered between illustrations */}
            <View style={styles.content}>
                {/* Pre-text */}

                {/* Big Number */}
                <Text style={styles.bigNumber}>{stats.missedCallsCount}</Text>

                {/* Post-text */}
                <Text style={styles.postText}>missed calls this year</Text>

                {/* Narrative */}
                <View style={styles.narrativeContainer}>
                    <Text style={styles.narrative}>
                        Most were busy moments.{'\n'}
                        A few… you wish you picked up.
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 120, // More space for top telephone illustration
        paddingBottom: 200, // Space for bottom mobile grid illustration
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    preText: {
        fontSize: 18,
        fontFamily: fonts.medium,
        color: '#5B4A3A',
        textAlign: 'center',
        marginBottom: 4,
    },
    bigNumber: {
        fontSize: 100,
        fontFamily: fonts.bold,
        color: '#3B2415',
        textAlign: 'center',
        lineHeight: 110,
    },
    postText: {
        fontSize: 18,
        fontFamily: fonts.medium,
        color: '#5B4A3A',
        textAlign: 'center',
        marginTop: -5,
    },
    narrativeContainer: {
        marginTop: 20,
        paddingHorizontal: 40,
    },
    narrative: {
        fontSize: 14,
        fontFamily: fonts.regular,
        color: '#8B7B6B',
        textAlign: 'center',
        lineHeight: 22,
    },
});

export default MissedCallsSlide;
