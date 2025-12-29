// TimeMoodSlide - Peak calling time and busiest day
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fonts } from '../../../theme';
import { WrappedStats } from '../../../types';

interface SlideProps {
    stats: WrappedStats;
}

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const TimeMoodSlide: React.FC<SlideProps> = ({ stats }) => {
    const formatPeakTime = () => {
        const hour = stats.peakHour;
        const minute = stats.peakMinute || 0;
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return { time: `${displayHour}:${minute.toString().padStart(2, '0')}`, period, hour };
    };

    // Get appropriate time-of-day description
    const getTimeDescription = (hour: number) => {
        if (hour >= 5 && hour < 12) {
            return 'You did your best talking in the morning.';
        } else if (hour >= 12 && hour < 17) {
            return 'You did your best talking in the afternoon.';
        } else if (hour >= 17 && hour < 21) {
            return 'You did your best talking in the evening.';
        } else {
            return 'You did your best talking late at night.';
        }
    };

    const { time, period, hour } = formatPeakTime();
    const busiestDayIndex = DAY_NAMES.indexOf(stats.busiestDay);

    // Generate bar heights - busiest day is always 100%
    const generateBarHeights = () => {
        const heights = [40, 55, 45, 60, 50, 70, 35]; // Base random heights
        if (busiestDayIndex >= 0) {
            heights[busiestDayIndex] = 100; // Busiest day is tallest
        }
        return heights;
    };
    const barHeights = generateBarHeights();

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.yearLabel}>2025 Wrapped</Text>
            <Text style={styles.headline}>Timing is Everything</Text>

            {/* Peak Time Card - No clock visual */}
            <View style={styles.timeCard}>
                <Text style={styles.timeText}>
                    {time} <Text style={styles.timePeriod}>{period}</Text>
                </Text>
                <Text style={styles.timeDescription}>
                    {getTimeDescription(hour)}
                </Text>
            </View>

            {/* Weekly Rhythm */}
            <Text style={styles.sectionLabel}>WEEKLY RHYTHM</Text>
            <View style={styles.chartCard}>
                <View style={styles.chartContainer}>
                    {barHeights.map((height, index) => (
                        <View key={index} style={styles.barColumn}>
                            <View 
                                style={[
                                    styles.bar,
                                    { height: `${height}%` },
                                    index === busiestDayIndex && styles.barActive,
                                ]}
                            />
                        </View>
                    ))}
                </View>
                
                <View style={styles.dayLabels}>
                    {DAYS.map((day, index) => (
                        <Text 
                            key={index}
                            style={[
                                styles.dayLabel,
                                index === busiestDayIndex && styles.dayLabelActive,
                            ]}
                        >
                            {day}
                        </Text>
                    ))}
                </View>

                <View style={styles.busiestDayInfo}>
                    <View>
                        <Text style={styles.busiestDayName}>{stats.busiestDay}</Text>
                        <Text style={styles.busiestDayDesc}>Your marathon day.</Text>
                    </View>
                    <View style={styles.calendarIcon}>
                        <Text style={styles.calendarIconText}>📅</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
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
        fontSize: 26,
        fontFamily: fonts.bold,
        color: '#3B2415',
        textAlign: 'center',
        marginBottom: 24,
    },
    timeCard: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(245, 230, 211, 0.5)', // Warm beige semi-transparent
        borderRadius: 20,
        padding: 24,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(139, 105, 20, 0.2)',
    },
    timeText: {
        fontSize: 42,
        fontFamily: fonts.bold,
        color: '#3B2415', // Dark brown for contrast
    },
    timePeriod: {
        fontSize: 20,
        color: '#8B6914', // Golden
    },
    timeDescription: {
        fontSize: 14,
        fontFamily: fonts.medium,
        color: '#5A4332', // Medium brown
        marginTop: 8,
    },
    sectionLabel: {
        fontSize: 11,
        fontFamily: fonts.semiBold,
        color: '#8B7B6B',
        letterSpacing: 2,
        marginBottom: 8,
        alignSelf: 'flex-start',
        marginLeft: 4,
    },
    chartCard: {
        width: '100%',
        backgroundColor: 'rgba(245, 230, 211, 0.5)', // Warm beige semi-transparent
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(139, 105, 20, 0.2)',
    },
    chartContainer: {
        flexDirection: 'row',
        height: 100,
        alignItems: 'flex-end',
        gap: 8,
        marginBottom: 8,
    },
    barColumn: {
        flex: 1,
        height: '100%',
        justifyContent: 'flex-end',
    },
    bar: {
        width: '100%',
        backgroundColor: 'rgba(139, 105, 20, 0.3)', // Muted golden
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    barActive: {
        backgroundColor: '#8B6914', // Golden brown for active
    },
    dayLabels: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    dayLabel: {
        fontSize: 12,
        fontFamily: fonts.medium,
        color: '#5A4332', // Medium brown
    },
    dayLabelActive: {
        color: '#8B6914', // Golden
        fontFamily: fonts.bold,
    },
    busiestDayInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    busiestDayName: {
        fontSize: 20,
        fontFamily: fonts.bold,
        color: '#3B2415', // Dark brown
    },
    busiestDayDesc: {
        fontSize: 14,
        fontFamily: fonts.regular,
        color: '#5A4332', // Medium brown
    },
    calendarIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(139, 105, 20, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendarIconText: {
        fontSize: 20,
    },
});

export default TimeMoodSlide;

