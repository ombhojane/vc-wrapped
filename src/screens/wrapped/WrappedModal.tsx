// WrappedModal - Fullscreen modal for story experience (without reanimated)
import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Dimensions,
    TouchableWithoutFeedback,
    Text,
    StatusBar,
    Animated,
    ImageBackground,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ViewShot from 'react-native-view-shot';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

import { StoryProgressBar } from '../../components/wrapped';
import { fonts } from '../../theme';
import { WrappedStats } from '../../types';

// Import slides
import OpeningSlide from './slides/OpeningSlide';
import TotalTalkTimeSlide from './slides/TotalTalkTimeSlide';
import PersonalitySlide from './slides/PersonalitySlide';
import InnerCircleSlide from './slides/InnerCircleSlide';
import TimeMoodSlide from './slides/TimeMoodSlide';
import CallTypesSlide from './slides/CallTypesSlide';
import MissedCallsSlide from './slides/MissedCallsSlide';
import GrowthSlide from './slides/GrowthSlide';
import WisdomSlide from './slides/WisdomSlide';
import FinalSlide from './slides/FinalSlide';

const { width } = Dimensions.get('window');

interface WrappedModalProps {
    visible: boolean;
    onClose: () => void;
    stats: WrappedStats;
}

const SLIDES = [
    OpeningSlide,
    TotalTalkTimeSlide,
    PersonalitySlide,
    InnerCircleSlide,
    TimeMoodSlide,
    CallTypesSlide,
    MissedCallsSlide,
    GrowthSlide,
    WisdomSlide,
    FinalSlide,
];

const WrappedModal: React.FC<WrappedModalProps> = ({ visible, onClose, stats }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const viewShotRef = useRef<ViewShot>(null);
    const totalSlides = SLIDES.length;

    // Reset when modal opens
    useEffect(() => {
        if (visible) {
            setCurrentSlide(0);
            setIsPaused(false);
        }
    }, [visible]);

    // Navigation with fade animation
    const animateTransition = useCallback((callback: () => void) => {
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start();
        setTimeout(callback, 150);
    }, [fadeAnim]);

    const goNext = useCallback(() => {
        if (currentSlide < totalSlides - 1) {
            animateTransition(() => setCurrentSlide(prev => prev + 1));
        } else {
            onClose();
        }
    }, [currentSlide, totalSlides, onClose, animateTransition]);

    const goPrev = useCallback(() => {
        if (currentSlide > 0) {
            animateTransition(() => setCurrentSlide(prev => prev - 1));
        }
    }, [currentSlide, animateTransition]);

    // Tap zones - left third goes back, rest goes forward
    const handleTap = useCallback((locationX: number) => {
        if (locationX < width / 3) {
            goPrev();
        } else {
            goNext();
        }
    }, [goPrev, goNext]);

    // Long press to pause
    const handleLongPressIn = useCallback(() => {
        setIsPaused(true);
    }, []);

    const handleLongPressOut = useCallback(() => {
        setIsPaused(false);
    }, []);

    // Close handler
    const handleClose = useCallback(() => {
        setCurrentSlide(0);
        setIsPaused(false);
        onClose();
    }, [onClose]);

    // Replay handler
    const handleReplay = useCallback(() => {
        setCurrentSlide(0);
    }, []);

    // Save wrapped handler - captures all slides
    const handleSaveWrapped = useCallback(async () => {
        if (isSaving) return;
        setIsSaving(true);
        setIsPaused(true);

        try {
            const savedSlides: string[] = [];
            const originalSlide = currentSlide;

            // Iterate through all slides except the final one (index 0 to 8)
            for (let i = 0; i < totalSlides - 1; i++) {
                setCurrentSlide(i);
                // Wait for slide to render properly
                await new Promise<void>(resolve => setTimeout(resolve, 600));

                if (viewShotRef.current && viewShotRef.current.capture) {
                    try {
                        const uri = await viewShotRef.current.capture();
                        await CameraRoll.save(uri, { type: 'photo', album: 'VC Wrapped 2025' });
                        savedSlides.push(uri);
                    } catch (err) {
                        console.error(`Error capturing slide ${i}:`, err);
                    }
                }
            }

            // Return to original slide
            setCurrentSlide(originalSlide);

            Alert.alert(
                '✅ Saved!',
                `${savedSlides.length} slides saved to your gallery in "VC Wrapped 2025" album.`,
                [{ text: 'OK' }]
            );
        } catch (error) {
            console.error('Error saving wrapped:', error);
            Alert.alert('Error', 'Failed to save wrapped. Please try again.');
        } finally {
            setIsSaving(false);
            setIsPaused(false);
        }
    }, [currentSlide, isSaving, totalSlides]);

    // Current slide component
    const CurrentSlideComponent = SLIDES[currentSlide];

    if (!visible) return null;

    // Get appropriate background based on current slide
    const getBackgroundSource = () => {
        if (currentSlide === 3) { // InnerCircleSlide
            return require('../../../assets/designs/back4.png');
        }
        if (currentSlide === 4) { // TimeMoodSlide
            return require('../../../assets/designs/back5.png');
        }
        if (currentSlide === 5) { // CallTypesSlide
            return require('../../../assets/designs/back1.png');
        }
        if (currentSlide === 6) { // MissedCallsSlide
            return require('../../../assets/designs/back7.png');
        }
        if (currentSlide === 9) { // FinalSlide
            return require('../../../assets/designs/back1.png');
        }
        return require('../../../assets/designs/back2.png');
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="fullScreen"
            onRequestClose={handleClose}
        >
            <StatusBar barStyle="dark-content" backgroundColor="#F5E6D3" />
            <ViewShot 
                ref={viewShotRef} 
                options={{ format: 'png', quality: 1 }}
                style={styles.container}
            >
                <ImageBackground
                    source={getBackgroundSource()}
                    style={styles.container}
                    resizeMode="cover"
                >
                    <TouchableWithoutFeedback
                        onPress={(e) => handleTap(e.nativeEvent.locationX)}
                        onLongPress={handleLongPressIn}
                        onPressOut={handleLongPressOut}
                        delayLongPress={150}
                    >
                        <View style={styles.touchArea}>
                            {/* Safe Area Content */}
                            <SafeAreaView style={styles.safeArea}>
                                {/* Progress Bar */}
                                <StoryProgressBar
                                    totalSlides={totalSlides}
                                    currentSlide={currentSlide}
                                    isPaused={isPaused}
                                    onSlideComplete={goNext}
                                />

                                {/* Header */}
                                <View style={styles.header}>
                                    <View style={styles.headerLeft}>
                                        <Text style={styles.logoText}>VC WRAPPED</Text>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={handleClose}
                                        style={styles.closeButton}
                                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                    >
                                        <Text style={styles.closeIcon}>✕</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Slide Content */}
                                <Animated.View style={[styles.slideContainer, { opacity: fadeAnim }]}>
                                    <CurrentSlideComponent 
                                        stats={stats} 
                                        onReplay={handleReplay}
                                        onSaveWrapped={handleSaveWrapped}
                                        isSaving={isSaving}
                                    />
                                </Animated.View>
                            </SafeAreaView>
                        </View>
                    </TouchableWithoutFeedback>
                </ImageBackground>
            </ViewShot>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    touchArea: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 8,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    logoIcon: {
        fontSize: 18,
    },
    logoText: {
        fontSize: 11,
        fontFamily: fonts.bold,
        color: 'rgba(255, 255, 255, 0.5)',
        letterSpacing: 2,
    },
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeIcon: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.7)',
    },
    slideContainer: {
        flex: 1,
        paddingHorizontal: 24,
    },
});

export default WrappedModal;
