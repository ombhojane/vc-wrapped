// Wrapped Screen - Spotify-style swipeable stories for call stats
import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallData } from '../hooks/useCallData';
import { calculateWrappedStats } from '../services/statsProcessor';
import { WrappedStats } from '../types';
import { formatDuration } from '../utils/formatters';
import { fonts, wrappedGradients, glassEffect } from '../theme';

const { width } = Dimensions.get('window');

// Use theme gradients
const SLIDE_COLORS = wrappedGradients;

// Wisdom quotes for the quotes slide
const WISDOM_QUOTES = [
    "The people you call at night\nare the people you trust with your truth.",
    "Every call is a choice.\nYou chose connection.",
    "Your voice carried love, stress,\ngrowth, and hope this year.",
    "Some calls last minutes.\nSome last in memory forever.",
];

interface SlideProps {
    stats: WrappedStats;
    onNext: () => void;
    onPrev: () => void;
}

// Glass card style
const glassCard = {
    ...glassEffect,
    padding: 20,
    marginBottom: 12,
};

// Slide 1: Total Talk Time
const TotalTalkTimeSlide: React.FC<SlideProps> = ({ stats }) => (
    <View style={styles.slideContent}>
        <Text style={styles.emoji}>🎙️</Text>
        <Text style={styles.slideLabel}>Total Talk Time</Text>
        <Text style={styles.bigNumber}>{stats.totalTalkTimeHours}</Text>
        <Text style={styles.bigNumberUnit}>hours on calls this year</Text>
        <Text style={styles.subStat}>
            That's {stats.totalTalkTimeDays} full days of conversations.
        </Text>
        <View style={styles.subtextContainer}>
            <Text style={styles.subtext}>Some calls were short.</Text>
            <Text style={styles.subtext}>Some changed everything.</Text>
        </View>
    </View>
);

// Slide 2: Call Personality
const PersonalitySlide: React.FC<SlideProps> = ({ stats }) => {
    const personalityTitles: Record<string, string> = {
        'LISTENER_FIRST': 'Listener First',
        'CATCH_UP_KING': 'The Catch-Up King',
        'NIGHT_OWL': 'The Night Owl',
        'PROBLEM_SOLVER': 'The Problem Solver',
        'CHECK_IN_FRIEND': 'The Check-In Friend',
        'SILENT_SUPPORTER': 'The Silent Supporter',
    };

    return (
        <View style={styles.slideContent}>
            <Text style={styles.emoji}>🧠</Text>
            <Text style={styles.slideLabel}>Your Call Style</Text>
            <Text style={styles.personalityTitle}>
                You're a {personalityTitles[stats.personality]}
            </Text>
            <Text style={styles.personalityDesc}>{stats.personalityDescription}</Text>
            {stats.longCallsCount > 0 && (
                <Text style={styles.factText}>
                    {stats.longCallsCount} of your calls went beyond 10 minutes
                </Text>
            )}
        </View>
    );
};

// Slide 3: Top People
const TopPeopleSlide: React.FC<SlideProps> = ({ stats }) => (
    <View style={styles.slideContent}>
        <Text style={styles.emoji}>❤️</Text>
        <Text style={styles.slideLabel}>Your Inner Circle</Text>
        <Text style={styles.slideSubLabel}>These voices shaped your year.</Text>
        {stats.topContacts.map((contact, index) => (
            <View key={index} style={styles.contactCard}>
                <View style={styles.contactRank}>
                    <Text style={styles.rankNumber}>#{index + 1}</Text>
                </View>
                <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{contact.name}</Text>
                    <Text style={styles.contactStats}>
                        {contact.totalCalls} calls · {formatDuration(contact.totalDuration)}
                        {contact.mostlyAfter10PM && ' · Mostly after 10 PM'}
                    </Text>
                    <Text style={styles.contactQuote}>"{contact.quote}"</Text>
                </View>
            </View>
        ))}
    </View>
);

// Slide 4: Time & Mood
const TimeMoodSlide: React.FC<SlideProps> = ({ stats }) => {
    const formatPeakTime = () => {
        const hour = stats.peakHour;
        const minute = stats.peakMinute;
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
    };

    return (
        <View style={styles.slideContent}>
            <Text style={styles.emoji}>🌙</Text>
            <Text style={styles.slideLabel}>When You Spoke the Most</Text>
            <Text style={styles.bigNumber}>{formatPeakTime()}</Text>
            <Text style={styles.subtext}>Those weren't casual calls.</Text>
            <Text style={styles.subtext}>Those were real ones.</Text>
            
            <View style={styles.divider} />
            
            <Text style={styles.emoji}>📅</Text>
            <Text style={styles.slideLabel}>Your Busiest Day</Text>
            <Text style={styles.dayName}>{stats.busiestDay}</Text>
            <Text style={styles.subtext}>
                Something about {stats.busiestDay}s made people reach out to you.
            </Text>
        </View>
    );
};

// Slide 5: Call Types Breakdown
const CallTypesSlide: React.FC<SlideProps> = ({ stats }) => (
    <View style={styles.slideContent}>
        <Text style={styles.emoji}>📊</Text>
        <Text style={styles.slideLabel}>What You Used Your Voice For</Text>
        
        <View style={styles.breakdownContainer}>
            <View style={styles.breakdownItem}>
                <Text style={styles.breakdownEmoji}>💼</Text>
                <Text style={styles.breakdownPercent}>{stats.callTypePercentages.work}%</Text>
                <Text style={styles.breakdownLabel}>Work & Hustle</Text>
            </View>
            <View style={styles.breakdownItem}>
                <Text style={styles.breakdownEmoji}>❤️</Text>
                <Text style={styles.breakdownPercent}>{stats.callTypePercentages.personal}%</Text>
                <Text style={styles.breakdownLabel}>Personal</Text>
            </View>
            <View style={styles.breakdownItem}>
                <Text style={styles.breakdownEmoji}>🧠</Text>
                <Text style={styles.breakdownPercent}>{stats.callTypePercentages.problemSolving}%</Text>
                <Text style={styles.breakdownLabel}>Problem-Solving</Text>
            </View>
            <View style={styles.breakdownItem}>
                <Text style={styles.breakdownEmoji}>😂</Text>
                <Text style={styles.breakdownPercent}>{stats.callTypePercentages.fun}%</Text>
                <Text style={styles.breakdownLabel}>Random & Fun</Text>
            </View>
        </View>
        
        <Text style={styles.footerText}>You didn't just talk.</Text>
        <Text style={styles.footerText}>You balanced life.</Text>
    </View>
);

// Slide 6: Missed Calls
const MissedCallsSlide: React.FC<SlideProps> = ({ stats }) => (
    <View style={styles.slideContent}>
        <Text style={styles.emoji}>📵</Text>
        <Text style={styles.slideLabel}>The Calls That Didn't Happen</Text>
        <Text style={styles.bigNumber}>{stats.missedCallsCount}</Text>
        <Text style={styles.bigNumberUnit}>missed calls this year</Text>
        <View style={styles.subtextContainer}>
            <Text style={styles.subtext}>Most were busy moments.</Text>
            <Text style={styles.subtext}>A few… you wish you picked up.</Text>
        </View>
    </View>
);

// Slide 7: Growth Insight
const GrowthSlide: React.FC<SlideProps> = ({ stats }) => (
    <View style={styles.slideContent}>
        <Text style={styles.emoji}>🧭</Text>
        <Text style={styles.slideLabel}>What This Year Taught You</Text>
        <View style={styles.insightBox}>
            <Text style={styles.insightText}>
                You made {stats.totalCallsCount} calls this year.
            </Text>
            <Text style={styles.insightText}>
                Average call: {formatDuration(stats.averageCallDuration)}
            </Text>
        </View>
        <View style={styles.subtextContainer}>
            <Text style={styles.subtext}>You're choosing quality over noise.</Text>
            <Text style={styles.subtext}>Every connection had meaning.</Text>
        </View>
    </View>
);

// Slide 8: Voice Wisdom
const WisdomSlide: React.FC<SlideProps> = () => {
    const quote = WISDOM_QUOTES[Math.floor(Math.random() * WISDOM_QUOTES.length)];
    return (
        <View style={styles.slideContent}>
            <Text style={styles.quoteText}>{quote}</Text>
        </View>
    );
};

// Slide 9: Final Screen
const FinalSlide: React.FC<SlideProps> = () => (
    <View style={styles.slideContent}>
        <Text style={styles.finalText}>
            Your voice carried love, stress, growth, and hope this year.
        </Text>
        <Text style={styles.finalSubtext}>
            Wherever you're headed next —{'\n'}keep calling the people who matter.
        </Text>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.buttonText}>🔄 Replay Highlights</Text>
            </TouchableOpacity>
        </View>
    </View>
);

// Progress bar component
const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => (
    <View style={styles.progressContainer}>
        {Array.from({ length: total }).map((_, i) => (
            <View
                key={i}
                style={[
                    styles.progressSegment,
                    i < current && styles.progressFilled,
                    i === current && styles.progressActive,
                ]}
            />
        ))}
    </View>
);

const WrappedScreen: React.FC = () => {
    const { callLogs, isLoading, hasPermission } = useCallData();
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const stats = useMemo(() => {
        if (callLogs.length === 0) return null;
        return calculateWrappedStats(callLogs);
    }, [callLogs]);
    
    const SLIDES = [
        TotalTalkTimeSlide,
        PersonalitySlide,
        TopPeopleSlide,
        TimeMoodSlide,
        CallTypesSlide,
        MissedCallsSlide,
        GrowthSlide,
        WisdomSlide,
        FinalSlide,
    ];
    
    const totalSlides = SLIDES.length;
    
    const goNext = () => {
        if (currentSlide < totalSlides - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };
    
    const goPrev = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };
    
    const handleTap = (event: any) => {
        const tapX = event.nativeEvent.locationX;
        if (tapX < width / 3) {
            goPrev();
        } else {
            goNext();
        }
    };
    
    if (isLoading) {
        return (
            <View style={[styles.container, { backgroundColor: SLIDE_COLORS[0][0] }]}>
                <Text style={styles.loadingText}>Loading your wrapped...</Text>
            </View>
        );
    }
    
    if (!hasPermission || !stats || callLogs.length === 0) {
        return (
            <View style={[styles.container, { backgroundColor: SLIDE_COLORS[0][0] }]}>
                <Text style={styles.emoji}>📱</Text>
                <Text style={styles.loadingText}>No call data yet</Text>
                <Text style={styles.subtext}>Grant permissions to see your wrapped!</Text>
            </View>
        );
    }
    
    const CurrentSlideComponent = SLIDES[currentSlide];
    const slideColors = SLIDE_COLORS[currentSlide % SLIDE_COLORS.length];
    
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: slideColors[0] }]}>
            <ProgressBar current={currentSlide} total={totalSlides} />
            
            <TouchableOpacity
                style={styles.touchArea}
                activeOpacity={1}
                onPress={handleTap}
            >
                <ScrollView 
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <CurrentSlideComponent 
                        stats={stats} 
                        onNext={goNext} 
                        onPrev={goPrev} 
                    />
                </ScrollView>
            </TouchableOpacity>
            
            <View style={styles.navigationHint}>
                <Text style={styles.hintText}>
                    {currentSlide === 0 ? 'Tap to continue →' : '← Tap sides to navigate →'}
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    touchArea: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 40,
    },
    slideContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingTop: 12,
        gap: 4,
    },
    progressSegment: {
        flex: 1,
        height: 3,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 2,
    },
    progressFilled: {
        backgroundColor: 'rgba(255,255,255,0.9)',
    },
    progressActive: {
        backgroundColor: '#fff',
    },
    emoji: {
        fontSize: 48,
        marginBottom: 16,
    },
    slideLabel: {
        fontSize: 14,
        fontFamily: fonts.semiBold,
        color: 'rgba(255,255,255,0.8)',
        textTransform: 'uppercase',
        letterSpacing: 3,
        marginBottom: 16,
    },
    slideSubLabel: {
        fontSize: 18,
        fontFamily: fonts.regular,
        color: 'rgba(255,255,255,0.9)',
        marginBottom: 24,
        textAlign: 'center',
    },
    bigNumber: {
        fontSize: 72,
        fontFamily: fonts.bold,
        color: '#fff',
        textAlign: 'center',
    },
    bigNumberUnit: {
        fontSize: 18,
        fontFamily: fonts.medium,
        color: 'rgba(255,255,255,0.9)',
        marginTop: 8,
        textAlign: 'center',
    },
    subStat: {
        fontSize: 16,
        fontFamily: fonts.regular,
        color: 'rgba(255,255,255,0.9)',
        marginTop: 16,
        textAlign: 'center',
    },
    subtextContainer: {
        marginTop: 32,
    },
    subtext: {
        fontSize: 16,
        fontFamily: fonts.light,
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        fontStyle: 'italic',
        lineHeight: 26,
    },
    personalityTitle: {
        fontSize: 26,
        fontFamily: fonts.bold,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 16,
    },
    personalityDesc: {
        fontSize: 16,
        fontFamily: fonts.regular,
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
        lineHeight: 26,
        paddingHorizontal: 16,
    },
    factText: {
        fontSize: 14,
        fontFamily: fonts.regular,
        color: 'rgba(255,255,255,0.7)',
        textAlign: 'center',
        marginTop: 24,
    },
    contactCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        padding: 16,
        marginBottom: 12,
        width: '100%',
    },
    contactRank: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    rankNumber: {
        fontSize: 16,
        fontFamily: fonts.bold,
        color: '#fff',
    },
    contactInfo: {
        flex: 1,
    },
    contactName: {
        fontSize: 18,
        fontFamily: fonts.semiBold,
        color: '#fff',
        marginBottom: 4,
    },
    contactStats: {
        fontSize: 13,
        fontFamily: fonts.regular,
        color: 'rgba(255,255,255,0.8)',
        marginBottom: 8,
    },
    contactQuote: {
        fontSize: 13,
        fontFamily: fonts.light,
        color: 'rgba(255,255,255,0.7)',
        fontStyle: 'italic',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
        width: '60%',
        marginVertical: 32,
    },
    dayName: {
        fontSize: 42,
        fontFamily: fonts.bold,
        color: '#fff',
        marginBottom: 16,
    },
    breakdownContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 12,
        marginVertical: 24,
    },
    breakdownItem: {
        width: (width - 72) / 2,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        padding: 16,
        alignItems: 'center',
    },
    breakdownEmoji: {
        fontSize: 28,
        marginBottom: 8,
    },
    breakdownPercent: {
        fontSize: 28,
        fontFamily: fonts.bold,
        color: '#fff',
    },
    breakdownLabel: {
        fontSize: 12,
        fontFamily: fonts.medium,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 4,
        textAlign: 'center',
    },
    footerText: {
        fontSize: 16,
        fontFamily: fonts.regular,
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
        marginTop: 8,
    },
    insightBox: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        padding: 24,
        marginVertical: 24,
        width: '100%',
    },
    insightText: {
        fontSize: 18,
        fontFamily: fonts.medium,
        color: '#fff',
        textAlign: 'center',
        lineHeight: 30,
    },
    quoteText: {
        fontSize: 26,
        fontFamily: fonts.semiBold,
        color: '#fff',
        textAlign: 'center',
        lineHeight: 42,
        fontStyle: 'italic',
    },
    finalText: {
        fontSize: 22,
        fontFamily: fonts.semiBold,
        color: '#fff',
        textAlign: 'center',
        lineHeight: 34,
        marginBottom: 24,
    },
    finalSubtext: {
        fontSize: 16,
        fontFamily: fonts.regular,
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
        lineHeight: 26,
        marginBottom: 32,
    },
    buttonContainer: {
        gap: 12,
        width: '100%',
    },
    primaryButton: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: {
        fontSize: 16,
        fontFamily: fonts.semiBold,
        color: '#1D1D1F',
    },
    navigationHint: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    hintText: {
        fontSize: 13,
        fontFamily: fonts.regular,
        color: 'rgba(255,255,255,0.6)',
    },
    loadingText: {
        fontSize: 18,
        fontFamily: fonts.medium,
        color: '#fff',
        textAlign: 'center',
        marginTop: 16,
    },
});

export default WrappedScreen;
