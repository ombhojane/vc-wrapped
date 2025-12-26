// Tab Navigator - Bottom navigation with 4 tabs
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DashboardScreen from '../screens/DashboardScreen';
import ContactsScreen from '../screens/ContactsScreen';
import CallHistoryScreen from '../screens/CallHistoryScreen';
import WrappedScreen from '../screens/WrappedScreen';
import { colors } from '../theme';

const Tab = createBottomTabNavigator();

// Simple tab icon using emoji
const TabIcon: React.FC<{ icon: string; focused: boolean }> = ({ icon, focused }) => (
  <Text style={[styles.tabIcon, focused && styles.tabIconActive]}>{icon}</Text>
);

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ focused }) => <TabIcon icon="📊" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Wrapped"
        component={WrappedScreen}
        options={{
          title: 'Wrapped',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon icon="🎁" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{
          title: 'Contacts',
          tabBarIcon: ({ focused }) => <TabIcon icon="👥" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="CallHistory"
        component={CallHistoryScreen}
        options={{
          title: 'History',
          tabBarIcon: ({ focused }) => <TabIcon icon="🕒" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    fontSize: 22,
    opacity: 0.6,
  },
  tabIconActive: {
    opacity: 1,
  },
});

export default TabNavigator;
