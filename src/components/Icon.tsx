// Simple Icon component - no external dependencies
import React from 'react';
import { Text, StyleSheet } from 'react-native';

// Simple icon mappings using unicode/emoji
const iconMap: Record<string, string> = {
  // Phone icons
  'phone': '📞',
  'phone-incoming': '📲',
  'phone-outgoing': '📱',
  'phone-missed': '📵',
  'phone-lock': '🔒',
  'phone-off': '📴',
  
  // Navigation
  'view-dashboard': '📊',
  'account-group': '👥',
  'history': '🕒',
  
  // Stats
  'timer': '⏱️',
  'clock-outline': '🕐',
  'chart-line': '📈',
  'trophy': '🏆',
  
  // UI
  'magnify': '🔍',
  'close-circle': '✕',
  'alert-circle-outline': '⚠️',
  'account-search': '👤',
  'account-lock': '🔐',
};

interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, color }) => {
  const icon = iconMap[name] || '•';
  
  return (
    <Text style={[styles.icon, { fontSize: size * 0.8 }, color ? { color } : null]}>
      {icon}
    </Text>
  );
};

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
  },
});

export default Icon;
