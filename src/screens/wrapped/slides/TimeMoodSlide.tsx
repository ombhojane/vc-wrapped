// TimeMoodSlide - Peak calling time and busiest day
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { wrappedColors, fonts, wrappedGlassPanel } from '../../../theme';
import { WrappedStats } from '../../../types';
import { GlassCard } from '../../../components/wrapped';

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
        return { time: `${displayHour}:${minute.toString().padStart(2, '0')}`, period };
    };

    const { time, period } = formatPeakTime();
    const dayData = [30, 45, 60, 90, 70, 85, 40];
    const busiestDayIndex = DAY_NAMES.indexOf(stats.busiestDay);

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.yearLabel}>2025 Wrapped</Text>
            <Text style={styles.headline}>Timing is Everything</Text>

            {/* Peak Time Card */}
            <GlassCard style={styles.timeCard}>
                <View style={styles.clockContainer}>
                    <View style={styles.clockOuter}>
                        <View style={styles.clockCenter} />
                    </View>
                </View>
                <Text style={styles.timeText}>
                    {time} <Text style={styles.timePeriod}>{period}</Text>
                </Text>
                <Text style={styles.timeDescription}>
                    You did your best talking late at night.
                </Text>
            </GlassCard>

            {/* Weekly Rhythm */}
            <Text style={styles.sectionLabel}>WEEKLY RHYTHM</Text>
            <GlassCard style={styles.chartCard}>
                <View style={styles.chartContainer}>
                    {dayData.map((height, index) => (
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
            </GlassCard>
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
        color: wrappedColors.textMuted,
        textAlign: 'center',
        letterSpacing: 2,
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    headline: {
        fontSize: 26,
        fontFamily: fonts.bold,
        color: wrappedColors.textPrimary,
        textAlign: 'center',
        marginBottom: 24,
    },
    timeCard: {
        width: '100%',
        alignItems: 'center',
        padding: 24,
        marginBottom: 16,
    },
    clockContainer: {
        marginBottom: 16,
    },
    clockOuter: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    clockCenter: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: wrappedColors.primary,
    },
    timeText: {
        fontSize: 42,
        fontFamily: fonts.bold,
        color: wrappedColors.textPrimary,
    },
    timePeriod: {
        fontSize: 20,
        color: wrappedColors.textMuted,
    },
    timeDescription: {
        fontSize: 14,
        fontFamily: fonts.medium,
        color: wrappedColors.textMuted,
        marginTop: 8,
    },
    sectionLabel: {
        fontSize: 11,
        fontFamily: fonts.semiBold,
        color: wrappedColors.textMuted,
        letterSpacing: 2,
        marginBottom: 8,
        alignSelf: 'flex-start',
        marginLeft: 4,
    },
    chartCard: {
        width: '100%',
        padding: 20,
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
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    barActive: {
        backgroundColor: wrappedColors.primary,
    },
    dayLabels: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    dayLabel: {
        fontSize: 12,
        fontFamily: fonts.medium,
        color: wrappedColors.textMuted,
    },
    dayLabelActive: {
        color: wrappedColors.primary,
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
        color: wrappedColors.textPrimary,
    },
    busiestDayDesc: {
        fontSize: 14,
        fontFamily: fonts.regular,
        color: wrappedColors.textMuted,
    },
    calendarIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(75, 43, 238, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendarIconText: {
        fontSize: 20,
    },
});

export default TimeMoodSlide;
