// GlassCard - Glassmorphism card component for Wrapped
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { wrappedGlassPanel } from '../../theme';

interface GlassCardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    padding?: number;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
    children, 
    style,
    padding = 20,
}) => {
    return (
        <View style={[styles.card, { padding }, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        ...wrappedGlassPanel,
        overflow: 'hidden',
    },
});

export default GlassCard;
