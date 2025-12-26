// Call History Screen - Timeline of all calls
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from '../components/Icon';
import { colors, spacing, borderRadius, typography } from '../theme';
import { Avatar, LoadingView, EmptyState, Pill, CallTypeIcon } from '../components/common';
import { useCallData } from '../hooks/useCallData';
import { CallLog, CallTypeFilter, DateGroup } from '../types';
import { groupLogsByDate, getUniqueMonths, filterLogsByMonth } from '../services/statsProcessor';
import { formatDuration, formatTime } from '../utils/formatters';

const CallHistoryScreen: React.FC = () => {
  const { callLogs, isLoading, hasPermission, requestPermissions } = useCallData();
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<CallTypeFilter>('ALL');

  const months = useMemo(() => getUniqueMonths(callLogs), [callLogs]);

  const filteredAndGrouped = useMemo(() => {
    let filtered = callLogs;

    // Filter by month
    if (selectedMonth) {
      filtered = filterLogsByMonth(filtered, selectedMonth);
    }

    // Filter by type
    if (typeFilter !== 'ALL') {
      filtered = filtered.filter((log) => log.type === typeFilter);
    }

    return groupLogsByDate(filtered);
  }, [callLogs, selectedMonth, typeFilter]);

  if (isLoading) {
    return <LoadingView message="Loading call history..." />;
  }

  if (!hasPermission) {
    return (
      <EmptyState
        icon="history"
        title="Permission Required"
        message="Grant access to view your call history."
        action={{ label: 'Grant Access', onPress: requestPermissions }}
      />
    );
  }

  const renderCallLog = ({ item }: { item: CallLog }) => (
    <View style={styles.callCard}>
      <Avatar name={item.name} size={40} />
      <View style={styles.callInfo}>
        <Text style={styles.callName} numberOfLines={1}>
          {item.name || item.phoneNumber}
        </Text>
        <View style={styles.callMeta}>
          <CallTypeIcon type={item.type} size={14} />
          <Text style={styles.callTime}>{formatTime(item.timestamp)}</Text>
          {item.duration > 0 && (
            <Text style={styles.callDuration}> • {formatDuration(item.duration)}</Text>
          )}
        </View>
      </View>
    </View>
  );

  const renderSectionHeader = ({ section }: { section: DateGroup }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <Text style={styles.sectionCount}>{section.data.length} calls</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Month Selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.monthSelector}
        contentContainerStyle={styles.monthSelectorContent}
      >
        <Pill
          label="All Time"
          active={selectedMonth === null}
          onPress={() => setSelectedMonth(null)}
        />
        {months.map((month) => (
          <Pill
            key={month}
            label={month}
            active={selectedMonth === month}
            onPress={() => setSelectedMonth(month)}
          />
        ))}
      </ScrollView>

      {/* Type Filter */}
      <View style={styles.typeFilter}>
        <TouchableOpacity
          style={[styles.typeButton, typeFilter === 'ALL' && styles.typeButtonActive]}
          onPress={() => setTypeFilter('ALL')}
        >
          <Icon name="phone" size={18} color={typeFilter === 'ALL' ? colors.primary : colors.textMuted} />
          <Text style={[styles.typeLabel, typeFilter === 'ALL' && styles.typeLabelActive]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, typeFilter === 'INCOMING' && styles.typeButtonActive]}
          onPress={() => setTypeFilter('INCOMING')}
        >
          <Icon name="phone-incoming" size={18} color={typeFilter === 'INCOMING' ? colors.success : colors.textMuted} />
          <Text style={[styles.typeLabel, typeFilter === 'INCOMING' && styles.typeLabelActive]}>In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, typeFilter === 'OUTGOING' && styles.typeButtonActive]}
          onPress={() => setTypeFilter('OUTGOING')}
        >
          <Icon name="phone-outgoing" size={18} color={typeFilter === 'OUTGOING' ? colors.warning : colors.textMuted} />
          <Text style={[styles.typeLabel, typeFilter === 'OUTGOING' && styles.typeLabelActive]}>Out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, typeFilter === 'MISSED' && styles.typeButtonActive]}
          onPress={() => setTypeFilter('MISSED')}
        >
          <Icon name="phone-missed" size={18} color={typeFilter === 'MISSED' ? colors.error : colors.textMuted} />
          <Text style={[styles.typeLabel, typeFilter === 'MISSED' && styles.typeLabelActive]}>Missed</Text>
        </TouchableOpacity>
      </View>

      {/* Call History List */}
      <SectionList
        sections={filteredAndGrouped}
        keyExtractor={(item) => item.id}
        renderItem={renderCallLog}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={true}
        ListEmptyComponent={
          <EmptyState
            icon="phone-off"
            title="No Calls Found"
            message={typeFilter !== 'ALL' ? 'Try a different filter' : 'No call history for this period'}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  monthSelector: {
    maxHeight: 56,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  monthSelectorContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  typeFilter: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    gap: spacing.xs,
  },
  typeButtonActive: {
    backgroundColor: colors.surfaceElevated,
  },
  typeLabel: {
    ...typography.bodySmall,
    color: colors.textMuted,
  },
  typeLabelActive: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingTop: spacing.md,
    backgroundColor: colors.background,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  sectionCount: {
    ...typography.caption,
  },
  callCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.xs,
  },
  callInfo: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  callName: {
    ...typography.body,
    fontWeight: '500',
  },
  callMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    gap: spacing.xs,
  },
  callTime: {
    ...typography.caption,
  },
  callDuration: {
    ...typography.caption,
  },
});

export default CallHistoryScreen;
