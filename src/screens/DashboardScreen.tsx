// Dashboard Screen - Your call stats "Wrapped" style
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Icon from '../components/Icon';
import { colors, spacing, borderRadius, typography } from '../theme';
import {
  StatCard,
  HeroStat,
  LoadingView,
  EmptyState,
  Avatar,
  SectionHeader,
} from '../components/common';
import { useCallData } from '../hooks/useCallData';
import { formatDuration, formatDurationLong } from '../utils/formatters';

const DashboardScreen: React.FC = () => {
  const {
    dashboardStats,
    isLoading,
    hasPermission,
    error,
    refresh,
    requestPermissions,
  } = useCallData();

  if (isLoading) {
    return <LoadingView message="Loading your call stats..." />;
  }

  if (!hasPermission) {
    return (
      <EmptyState
        icon="phone-lock"
        title="Permission Required"
        message="VC Wrapped needs access to your call logs to show your stats for this year."
        action={{ label: 'Grant Access', onPress: requestPermissions }}
      />
    );
  }

  if (error) {
    return (
      <EmptyState
        icon="alert-circle-outline"
        title="Something went wrong"
        message={error}
        action={{ label: 'Try Again', onPress: refresh }}
      />
    );
  }

  if (!dashboardStats || dashboardStats.totalCalls === 0) {
    return (
      <EmptyState
        icon="phone-off"
        title="No Calls This Year"
        message="Start making calls to see your stats here!"
      />
    );
  }

  const { 
    totalContacts, 
    totalCalls, 
    totalDuration, 
    longestCall, 
    mostTalked,
    callsByType,
    peakHour,
    averageCallDuration,
  } = dashboardStats;

  const formatHour = (hour: number): string => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour} ${period}`;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={refresh}
          tintColor={colors.primary}
        />
      }
    >
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Your 2025</Text>
        <Text style={styles.heroSubtitle}>Call Wrapped</Text>
        <HeroStat
          value={formatDurationLong(totalDuration)}
          label="Total time on calls"
        />
      </View>

      {/* Quick Stats Grid */}
      <View style={styles.statsGrid}>
        <StatCard
          title="Total Calls"
          value={totalCalls}
          icon="phone"
          iconColor={colors.primary}
          style={styles.halfCard}
        />
        <StatCard
          title="Contacts"
          value={totalContacts}
          icon="account-group"
          iconColor={colors.primaryLight}
          style={styles.halfCard}
        />
      </View>

      {/* Call Type Breakdown */}
      <SectionHeader title="Call Breakdown" />
      <View style={styles.breakdownRow}>
        <View style={styles.breakdownItem}>
          <Icon name="phone-incoming" size={24} color={colors.success} />
          <Text style={styles.breakdownValue}>{callsByType.incoming}</Text>
          <Text style={styles.breakdownLabel}>Incoming</Text>
        </View>
        <View style={styles.breakdownItem}>
          <Icon name="phone-outgoing" size={24} color={colors.warning} />
          <Text style={styles.breakdownValue}>{callsByType.outgoing}</Text>
          <Text style={styles.breakdownLabel}>Outgoing</Text>
        </View>
        <View style={styles.breakdownItem}>
          <Icon name="phone-missed" size={24} color={colors.error} />
          <Text style={styles.breakdownValue}>{callsByType.missed}</Text>
          <Text style={styles.breakdownLabel}>Missed</Text>
        </View>
      </View>

      {/* Top Contact */}
      {mostTalked && (
        <>
          <SectionHeader title="Your #1 Person" />
          <View style={styles.topContact}>
            <Avatar name={mostTalked.name} size={64} />
            <View style={styles.topContactInfo}>
              <Text style={styles.topContactName}>{mostTalked.name}</Text>
              <Text style={styles.topContactStats}>
                {mostTalked.totalCalls} calls • {formatDurationLong(mostTalked.totalDuration)}
              </Text>
            </View>
            <Icon name="trophy" size={32} color={colors.warning} />
          </View>
        </>
      )}

      {/* More Stats */}
      <SectionHeader title="Insights" />
      <View style={styles.insightsRow}>
        <StatCard
          title="Longest Call"
          value={longestCall ? formatDuration(longestCall.duration) : '-'}
          subtitle={longestCall?.name || 'No calls yet'}
          icon="timer"
          iconColor={colors.success}
          style={styles.halfCard}
        />
        <StatCard
          title="Peak Hour"
          value={formatHour(peakHour)}
          subtitle="When you call most"
          icon="clock-outline"
          iconColor={colors.warning}
          style={styles.halfCard}
        />
      </View>

      <StatCard
        title="Average Call"
        value={formatDuration(averageCallDuration)}
        subtitle="Per conversation"
        icon="chart-line"
        iconColor={colors.primaryLight}
        style={styles.fullCard}
      />

      <View style={styles.footer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  heroTitle: {
    ...typography.h1,
    color: colors.primary,
  },
  heroSubtitle: {
    ...typography.h2,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  halfCard: {
    flex: 1,
  },
  fullCard: {
    marginTop: spacing.md,
  },
  breakdownRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  breakdownItem: {
    flex: 1,
    alignItems: 'center',
  },
  breakdownValue: {
    ...typography.h2,
    marginTop: spacing.sm,
  },
  breakdownLabel: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
  topContact: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  topContactInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  topContactName: {
    ...typography.h3,
  },
  topContactStats: {
    ...typography.bodySmall,
    marginTop: spacing.xs,
  },
  insightsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  footer: {
    height: spacing.xxl,
  },
});

export default DashboardScreen;
