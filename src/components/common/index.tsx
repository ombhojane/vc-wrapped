// Common UI Components with Apple-style design and Poppins font
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import Icon from '../Icon';
import { colors, spacing, borderRadius, typography, shadow, fonts } from '../../theme';

// Stat Card Component
interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  iconColor?: string;
  style?: ViewStyle;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  iconColor = colors.primary,
  style,
}) => (
  <View style={[styles.statCard, style]}>
    {icon && (
      <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
        <Icon name={icon} size={24} color={iconColor} />
      </View>
    )}
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
    {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
  </View>
);

// Hero Stat - Large stat display
interface HeroStatProps {
  value: string | number;
  label: string;
}

export const HeroStat: React.FC<HeroStatProps> = ({ value, label }) => (
  <View style={styles.heroStat}>
    <Text style={styles.heroValue}>{value}</Text>
    <Text style={styles.heroLabel}>{label}</Text>
  </View>
);

// Contact Avatar
interface AvatarProps {
  name: string | null;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ name, size = 48 }) => {
  const initials = name
    ? name.split(' ').map((n) => n.charAt(0)).slice(0, 2).join('').toUpperCase()
    : '?';

  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.avatarText, { fontSize: size / 2.5 }]}>{initials}</Text>
    </View>
  );
};

// Call Type Icon
interface CallTypeIconProps {
  type: 'INCOMING' | 'OUTGOING' | 'MISSED' | 'UNKNOWN';
  size?: number;
}

export const CallTypeIcon: React.FC<CallTypeIconProps> = ({ type, size = 20 }) => {
  const config = {
    INCOMING: { icon: 'phone-incoming', color: colors.success },
    OUTGOING: { icon: 'phone-outgoing', color: colors.warning },
    MISSED: { icon: 'phone-missed', color: colors.error },
    UNKNOWN: { icon: 'phone', color: colors.textSecondary },
  };

  const { icon, color } = config[type];
  return <Icon name={icon} size={size} color={color} />;
};

// Loading Indicator
export const LoadingView: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={colors.primary} />
    <Text style={styles.loadingText}>{message}</Text>
  </View>
);

// Empty State
interface EmptyStateProps {
  icon: string;
  title: string;
  message: string;
  action?: { label: string; onPress: () => void };
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, message, action }) => (
  <View style={styles.emptyState}>
    <Icon name={icon} size={64} color={colors.textMuted} />
    <Text style={styles.emptyTitle}>{title}</Text>
    <Text style={styles.emptyMessage}>{message}</Text>
    {action && (
      <TouchableOpacity style={styles.emptyButton} onPress={action.onPress}>
        <Text style={styles.emptyButtonText}>{action.label}</Text>
      </TouchableOpacity>
    )}
  </View>
);

// Section Header
export const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

// Pill / Filter Button
interface PillProps {
  label: string;
  active?: boolean;
  onPress: () => void;
}

export const Pill: React.FC<PillProps> = ({ label, active, onPress }) => (
  <TouchableOpacity
    style={[styles.pill, active && styles.pillActive]}
    onPress={onPress}
  >
    <Text style={[styles.pillText, active && styles.pillTextActive]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  statCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadow,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: 24,
    fontFamily: fonts.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  statTitle: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
  },
  statSubtitle: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  heroStat: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  heroValue: {
    fontSize: 48,
    fontFamily: fonts.bold,
    color: colors.primary,
  },
  heroLabel: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  avatar: {
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: fonts.semiBold,
    color: colors.textPrimary,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.textPrimary,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  emptyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 4,
    borderRadius: borderRadius.full,
    marginTop: spacing.lg,
  },
  emptyButtonText: {
    fontFamily: fonts.semiBold,
    color: '#FFFFFF',
    fontSize: 15,
  },
  sectionHeader: {
    fontSize: 12,
    fontFamily: fonts.semiBold,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },
  pill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
  },
  pillActive: {
    backgroundColor: colors.primary,
  },
  pillText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.textSecondary,
  },
  pillTextActive: {
    color: '#FFFFFF',
  },
});
