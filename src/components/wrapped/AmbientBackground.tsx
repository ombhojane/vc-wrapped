// AmbientBackground - Animated gradient orbs for Wrapped screens (without reanimated)
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { wrappedColors } from '../../theme';

const { width, height } = Dimensions.get('window');

interface AmbientOrbProps {
    size: number;
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
    color: string;
    delay?: number;
}

const AmbientOrb: React.FC<AmbientOrbProps> = ({
    size,
    top,
    left,
    bottom,
    right,
    color,
    delay = 0,
}) => {
    const scale = useRef(new Animated.Value(1)).current;
    const opacity = useRef(new Animated.Value(0.6)).current;

    useEffect(() => {
        const startAnimation = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.parallel([
                        Animated.timing(scale, {
                            toValue: 1.15,
                            duration: 4000,
                            easing: Easing.inOut(Easing.ease),
                            useNativeDriver: true,
                        }),
                        Animated.timing(opacity, {
                            toValue: 1,
                            duration: 4000,
                            easing: Easing.inOut(Easing.ease),
                            useNativeDriver: true,
                        }),
                    ]),
                    Animated.parallel([
                        Animated.timing(scale, {
                            toValue: 1,
                            duration: 4000,
                            easing: Easing.inOut(Easing.ease),
                            useNativeDriver: true,
                        }),
                        Animated.timing(opacity, {
                            toValue: 0.6,
                            duration: 4000,
                            easing: Easing.inOut(Easing.ease),
                            useNativeDriver: true,
                        }),
                    ]),
                ])
            ).start();
        };

        const timer = setTimeout(startAnimation, delay);
        return () => clearTimeout(timer);
    }, [delay, scale, opacity]);

    return (
        <Animated.View
            style={[
                styles.orb,
                {
                    width: size,
                    height: size,
                    backgroundColor: color,
                    top,
                    left,
                    bottom,
                    right,
                    transform: [{ scale }],
                    opacity,
                },
            ]}
        />
    );
};

const AmbientBackground: React.FC = () => {
    return (
        <View style={styles.container}>
            {/* Primary glow - top left */}
            <AmbientOrb
                size={width * 0.8}
                top={-height * 0.15}
                left={-width * 0.25}
                color={wrappedColors.ambientGlow1}
                delay={0}
            />
            {/* Secondary glow - bottom right */}
            <AmbientOrb
                size={width * 0.7}
                bottom={-height * 0.1}
                right={-width * 0.2}
                color={wrappedColors.ambientGlow2}
                delay={2000}
            />
            {/* Accent glow - center */}
            <AmbientOrb
                size={width * 0.5}
                top={height * 0.35}
                left={width * 0.25}
                color={wrappedColors.primaryGlow}
                delay={1000}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
        pointerEvents: 'none',
    },
    orb: {
        position: 'absolute',
        borderRadius: 9999,
    },
});

export default AmbientBackground;
