// Contacts Screen - All your calling relationships
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from '../components/Icon';
import { colors, spacing, borderRadius, typography } from '../theme';
import { Avatar, LoadingView, EmptyState, Pill, CallTypeIcon } from '../components/common';
import { useCallData } from '../hooks/useCallData';
import { ContactStats, SortOption } from '../types';
import { formatDuration } from '../utils/formatters';

const ContactsScreen: React.FC = () => {
  const { contactStats, isLoading, hasPermission, requestPermissions } = useCallData();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('MOST_TIME');

  const filteredAndSorted = useMemo(() => {
    let result = [...contactStats];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.phoneNumber.includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case 'MOST_CALLED':
        result.sort((a, b) => b.totalCalls - a.totalCalls);
        break;
      case 'MOST_TIME':
        result.sort((a, b) => b.totalDuration - a.totalDuration);
        break;
      case 'RECENT':
        result.sort((a, b) => b.lastCalled - a.lastCalled);
        break;
    }

    return result;
  }, [contactStats, searchQuery, sortBy]);

  if (isLoading) {
    return <LoadingView message="Loading contacts..." />;
  }

  if (!hasPermission) {
    return (
      <EmptyState
        icon="account-lock"
        title="Permission Required"
        message="Grant access to view your contact call statistics."
        action={{ label: 'Grant Access', onPress: requestPermissions }}
      />
    );
  }

  const renderContact = ({ item }: { item: ContactStats }) => (
    <TouchableOpacity style={styles.contactCard} activeOpacity={0.7}>
      <Avatar name={item.name} size={48} />
      <View style={styles.contactInfo}>
        <Text style={styles.contactName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.contactStats}>
          {item.totalCalls} calls • {formatDuration(item.totalDuration)}
        </Text>
      </View>
      <View style={styles.callTypeCounts}>
        <View style={styles.callTypeItem}>
          <CallTypeIcon type="INCOMING" size={14} />
          <Text style={styles.callTypeCount}>{item.incomingCalls}</Text>
        </View>
        <View style={styles.callTypeItem}>
          <CallTypeIcon type="OUTGOING" size={14} />
          <Text style={styles.callTypeCount}>{item.outgoingCalls}</Text>
        </View>
        <View style={styles.callTypeItem}>
          <CallTypeIcon type="MISSED" size={14} />
          <Text style={styles.callTypeCount}>{item.missedCalls}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search contacts..."
          placeholderTextColor={colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="close-circle" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Sort Options */}
      <View style={styles.sortRow}>
        <Pill
          label="Most Time"
          active={sortBy === 'MOST_TIME'}
          onPress={() => setSortBy('MOST_TIME')}
        />
        <Pill
          label="Most Calls"
          active={sortBy === 'MOST_CALLED'}
          onPress={() => setSortBy('MOST_CALLED')}
        />
        <Pill
          label="Recent"
          active={sortBy === 'RECENT'}
          onPress={() => setSortBy('RECENT')}
        />
      </View>

      {/* Contacts List */}
      <FlatList
        data={filteredAndSorted}
        keyExtractor={(item) => item.phoneNumber}
        renderItem={renderContact}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="account-search"
            title="No Contacts Found"
            message={searchQuery ? 'Try a different search term' : 'No call history this year'}
          />
        }
        removeClippedSubviews={true}
        maxToRenderPerBatch={15}
        windowSize={10}
        initialNumToRender={10}
        getItemLayout={(_, index) => ({
          length: 80,
          offset: 80 * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    height: 48,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    ...typography.body,
  },
  sortRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    height: 80,
  },
  contactInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  contactName: {
    ...typography.body,
    fontWeight: '600',
  },
  contactStats: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
  callTypeCounts: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  callTypeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  callTypeCount: {
    ...typography.caption,
    fontSize: 11,
  },
});

export default ContactsScreen;
