// StoryProgressBar - Instagram-style story progress indicators (without reanimated)
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { wrappedColors, wrappedStoryConfig } from '../../theme';

interface StoryProgressBarProps {
    totalSlides: number;
    currentSlide: number;
    isPaused?: boolean;
    onSlideComplete?: () => void;
}

interface ProgressSegmentProps {
    index: number;
    currentSlide: number;
    isPaused: boolean;
    onComplete?: () => void;
}

const ProgressSegment: React.FC<ProgressSegmentProps> = ({
    index,
    currentSlide,
    isPaused,
    onComplete,
}) => {
    const progress = useRef(new Animated.Value(0)).current;
    const animationRef = useRef<Animated.CompositeAnimation | null>(null);

    useEffect(() => {
        // Stop any running animation
        if (animationRef.current) {
            animationRef.current.stop();
        }

        if (index < currentSlide) {
            // Already completed
            progress.setValue(1);
        } else if (index === currentSlide) {
            // Current slide - animate
            if (!isPaused) {
                progress.setValue(0);
                animationRef.current = Animated.timing(progress, {
                    toValue: 1,
                    duration: wrappedStoryConfig.autoAdvanceMs,
                    useNativeDriver: false,
                });
                animationRef.current.start(({ finished }) => {
                    if (finished && onComplete) {
                        onComplete();
                    }
                });
            }
        } else {
            // Future slide
            progress.setValue(0);
        }

        return () => {
            if (animationRef.current) {
                animationRef.current.stop();
            }
        };
    }, [index, currentSlide, isPaused, onComplete, progress]);

    const widthInterpolation = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <View style={styles.segment}>
            <Animated.View style={[styles.segmentFill, { width: widthInterpolation }]} />
        </View>
    );
};

const StoryProgressBar: React.FC<StoryProgressBarProps> = ({
    totalSlides,
    currentSlide,
    isPaused = false,
    onSlideComplete,
}) => {
    return (
        <View style={styles.container}>
            {Array.from({ length: totalSlides }).map((_, index) => (
                <ProgressSegment
                    key={index}
                    index={index}
                    currentSlide={currentSlide}
                    isPaused={isPaused}
                    onComplete={index === currentSlide ? onSlideComplete : undefined}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingTop: 12,
        gap: wrappedStoryConfig.progressGap,
    },
    segment: {
        flex: 1,
        height: wrappedStoryConfig.progressHeight,
        backgroundColor: wrappedColors.progressInactive,
        borderRadius: 2,
        overflow: 'hidden',
    },
    segmentFill: {
        height: '100%',
        backgroundColor: wrappedColors.progressActive,
        borderRadius: 2,
    },
});

export default StoryProgressBar;
