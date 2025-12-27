// CallTypesSlide - Breakdown of call categories
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { wrappedColors, fonts, wrappedGlassPanel } from '../../../theme';
import { WrappedStats } from '../../../types';

interface SlideProps {
    stats: WrappedStats;
}

const CATEGORIES = [
    { key: 'work', label: 'Work & Hustle', sublabel: 'Professional', icon: '💼', color: wrappedColors.primary },
    { key: 'personal', label: 'Personal', sublabel: 'Family & Friends', icon: '❤️', color: wrappedColors.teal },
    { key: 'problemSolving', label: 'Problem-Solving', sublabel: 'Support & Logistics', icon: '🧠', color: wrappedColors.violet },
    { key: 'fun', label: 'Random & Fun', sublabel: 'Just because', icon: '🎉', color: wrappedColors.coral },
];

const CallTypesSlide: React.FC<SlideProps> = ({ stats }) => {
    const percentages = stats.callTypePercentages;
    const totalMinutes = Math.round(stats.totalTalkTimeHours * 60);

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.headline}>The Breakdown</Text>
            <Text style={styles.subheadline}>YOUR YEAR IN CALLS</Text>

            {/* Donut Chart Visual */}
            <View style={styles.chartSection}>
                <View style={styles.donutContainer}>
                    <View style={styles.donutRing} />
                    <View style={styles.donutCenter}>
                        <Text style={styles.centerValue}>{totalMinutes.toLocaleString()}</Text>
                        <Text style={styles.centerLabel}>TOTAL MINUTES</Text>
                    </View>
                </View>
                <View style={styles.floatingBadge}>
                    <Text style={styles.floatingBadgeText}>Top 1% Talker!</Text>
                </View>
            </View>

            {/* Category List */}
            <View style={styles.categoriesList}>
                {CATEGORIES.map((cat) => (
                    <View key={cat.key} style={styles.categoryCard}>
                        <View style={styles.categoryLeft}>
                            <View style={[styles.categoryIcon, { backgroundColor: `${cat.color}20` }]}>
                                <Text style={styles.categoryIconText}>{cat.icon}</Text>
                            </View>
                            <View>
                                <Text style={styles.categoryLabel}>{cat.label}</Text>
                                <View style={styles.categorySubRow}>
                                    <View style={[styles.categoryDot, { backgroundColor: cat.color }]} />
                                    <Text style={styles.categorySublabel}>{cat.sublabel}</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={styles.categoryValue}>
                            {percentages[cat.key as keyof typeof percentages]}%
                        </Text>
                    </View>
                ))}
            </View>

            {/* Footer */}
            <View style={styles.footerText}>
                <Text style={styles.footerLine1}>You didn't just talk.</Text>
                <Text style={styles.footerLine2}>You balanced life.</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    headline: {
        fontSize: 28,
        fontFamily: fonts.bold,
        color: wrappedColors.textPrimary,
        textAlign: 'center',
        marginBottom: 4,
    },
    subheadline: {
        fontSize: 11,
        fontFamily: fonts.medium,
        color: wrappedColors.textMuted,
        textAlign: 'center',
        letterSpacing: 2,
        marginBottom: 20,
    },
    chartSection: {
        position: 'relative',
        marginBottom: 20,
    },
    donutContainer: {
        width: 160,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
    },
    donutRing: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: wrappedColors.primary,
        position: 'absolute',
    },
    donutCenter: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: wrappedColors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerValue: {
        fontSize: 24,
        fontFamily: fonts.bold,
        color: wrappedColors.primary,
    },
    centerLabel: {
        fontSize: 9,
        fontFamily: fonts.medium,
        color: wrappedColors.textMuted,
        letterSpacing: 1,
        marginTop: 2,
    },
    floatingBadge: {
        position: 'absolute',
        top: -10,
        right: -30,
        backgroundColor: wrappedColors.surface,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        transform: [{ rotate: '6deg' }],
    },
    floatingBadgeText: {
        fontSize: 10,
        fontFamily: fonts.bold,
        color: wrappedColors.textPrimary,
    },
    categoriesList: {
        width: '100%',
        gap: 8,
    },
    categoryCard: {
        ...wrappedGlassPanel,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 14,
    },
    categoryLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    categoryIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryIconText: {
        fontSize: 18,
    },
    categoryLabel: {
        fontSize: 14,
        fontFamily: fonts.semiBold,
        color: wrappedColors.textPrimary,
    },
    categorySubRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 2,
    },
    categoryDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    categorySublabel: {
        fontSize: 11,
        fontFamily: fonts.regular,
        color: wrappedColors.textMuted,
    },
    categoryValue: {
        fontSize: 18,
        fontFamily: fonts.bold,
        color: wrappedColors.textPrimary,
    },
    footerText: {
        marginTop: 20,
        alignItems: 'center',
    },
    footerLine1: {
        fontSize: 20,
        fontFamily: fonts.semiBold,
        color: wrappedColors.textSecondary,
    },
    footerLine2: {
        fontSize: 20,
        fontFamily: fonts.bold,
        color: wrappedColors.textPrimary,
    },
});

export default CallTypesSlide;
