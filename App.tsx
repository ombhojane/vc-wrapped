/**
 * VC Wrapped - Call Log Analytics App
 * Simple flow: Onboarding → Wrapped → Dashboard
 */

import React, { useState, useMemo } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import OnboardingScreen from './src/screens/OnboardingScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import { WrappedModal } from './src/screens/wrapped';
import { useCallData } from './src/hooks/useCallData';
import { calculateWrappedStats } from './src/services/statsProcessor';
import { wrappedColors } from './src/theme';

type AppScreen = 'onboarding' | 'dashboard';

function App(): React.JSX.Element {
    const [currentScreen, setCurrentScreen] = useState<AppScreen>('onboarding');
    const [showWrapped, setShowWrapped] = useState(false);

    const { callLogs, requestPermissions, hasPermission } = useCallData();

    const wrappedStats = useMemo(() => {
        if (callLogs.length === 0) return null;
        return calculateWrappedStats(callLogs);
    }, [callLogs]);

    // Handler for opening Wrapped from onboarding
    const handleOpenWrapped = async () => {
        // Request permissions if not granted
        if (!hasPermission) {
            const granted = await requestPermissions();
            if (!granted) {
                // Still show wrapped even without data (will show demo/empty state)
            }
        }
        setShowWrapped(true);
    };

    // Handler when Wrapped is closed
    const handleCloseWrapped = () => {
        setShowWrapped(false);
        // Move to dashboard after closing wrapped
        setCurrentScreen('dashboard');
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={wrappedColors.background}
                />

                {/* Main Screen */}
                {currentScreen === 'onboarding' && (
                    <OnboardingScreen onOpenWrapped={handleOpenWrapped} />
                )}

                {currentScreen === 'dashboard' && (
                    <DashboardScreen />
                )}

                {/* Wrapped Modal - overlays everything */}
                {wrappedStats && (
                    <WrappedModal
                        visible={showWrapped}
                        onClose={handleCloseWrapped}
                        stats={wrappedStats}
                    />
                )}
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}

export default App;

