import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { BottomNav } from '../components/BottomNav';

type RankingScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Ranking'>;
};

type Trend = 'up' | 'down' | 'same';

export const RankingScreen: React.FC<RankingScreenProps> = ({
  navigation,
}) => {
  const [activeTab, setActiveTab] = useState<'Global' | 'Friends' | 'AI'>(
    'Global',
  );

  const users = [
    { rank: 1, name: 'Alex Chen', xp: 3420, trend: 'up' },
    { rank: 2, name: 'Sarah Miller', xp: 3180, trend: 'up' },
    { rank: 3, name: 'Marcus Johnson', xp: 2910, trend: 'same' },
    { rank: 4, name: 'Emily Zhang', xp: 2875, trend: 'down' },
    { rank: 5, name: 'You', xp: 2850, trend: 'up', highlight: true },
    { rank: 6, name: 'David Park', xp: 2780, trend: 'same' },
    { rank: 7, name: 'Lisa Anderson', xp: 2650, trend: 'down' },
    { rank: 8, name: 'James Wilson', xp: 2540, trend: 'up' },
    { rank: 9, name: 'Maria Garcia', xp: 2420, trend: 'same' },
    { rank: 10, name: 'Chris Taylor', xp: 2350, trend: 'down' },
  ];

  const getTrendIcon = (trend: Trend) => {
    if (trend === 'up') return '⬆️';
    if (trend === 'down') return '⬇️';
    return '➖';
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.blueDot} />

        <View style={styles.headerRight}>
          <View style={styles.statContainer}>
            <Text>⚡</Text>
            <Text style={styles.statText}>2850</Text>
          </View>

          <View style={styles.statContainer}>
            <Text>🔥</Text>
            <Text style={styles.statText}>7</Text>
          </View>

          <Text style={styles.bell}>🔔</Text>
        </View>
      </View>

      {/* CONTENT */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* TITLE */}
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>Leaderboard</Text>
          <Text style={styles.subtitleText}>
            See how you rank against others
          </Text>
        </View>

        {/* SEGMENTED TABS */}
        <View style={styles.tabsRow}>
          {['Global', 'Friends', 'AI'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabChip,
                activeTab === tab && styles.tabChipActive,
              ]}
              onPress={() => setActiveTab(tab as any)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* RESET INFO */}
        <View style={styles.resetCard}>
          <Text style={styles.resetText}>
            ⏳ Weekly reset in 2 days 14 hours
          </Text>
        </View>

        {/* RANK LIST */}
        <View style={styles.listCard}>
          {users.map((user, index) => (
            <View
              key={index}
              style={[
                styles.rankRow,
                user.highlight && styles.highlightRow,
              ]}
            >
              <Text
                style={[
                  styles.rankNumber,
                  user.rank <= 3 && styles.topRank,
                ]}
              >
                #{user.rank}
              </Text>

              <View style={styles.avatar}>
                <Text style={{ fontSize: 18 }}>👤</Text>
              </View>

              <Text style={styles.username}>{user.name}</Text>

              <Text style={styles.trend}>
                {getTrendIcon(user.trend)}
              </Text>

              <View style={styles.xpBlock}>
                <Text style={styles.xpValue}>
                  {user.xp.toLocaleString()}
                </Text>
                <Text style={styles.xpLabel}>XP</Text>
              </View>
            </View>
          ))}
        </View>

        {/* LOAD MORE */}
        <TouchableOpacity style={styles.loadMoreButton}>
          <Text style={styles.loadMoreText}>Load More Rankings</Text>
        </TouchableOpacity>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* BOTTOM NAV */}
      <BottomNav navigation={navigation} active="Ranking" />
    </View>
  );
};

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#FFF',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  blueDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2F5FED',
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },

  statText: { fontWeight: '600', marginLeft: 4 },
  bell: { fontSize: 18 },

  titleSection: { padding: 20 },
  titleText: { fontSize: 32, fontWeight: '700' },
  subtitleText: { color: '#6B7280', marginTop: 4 },

  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },

  tabChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 8,
  },

  tabChipActive: {
    backgroundColor: '#2F5FED',
    borderColor: '#2F5FED',
  },

  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },

  tabTextActive: { color: '#FFF' },

  resetCard: {
    backgroundColor: '#EEF2FF',
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },

  resetText: {
    fontSize: 13,
    color: '#4338CA',
    fontWeight: '600',
  },

  listCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },

  rankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  highlightRow: {
    backgroundColor: '#F8FAFC',
  },

  rankNumber: {
    width: 36,
    fontWeight: '700',
    color: '#6B7280',
  },

  topRank: {
    color: '#2F5FED',
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  username: {
    flex: 1,
    fontWeight: '600',
  },

  trend: {
    width: 30,
    textAlign: 'center',
  },

  xpBlock: {
    alignItems: 'flex-end',
    width: 70,
  },

  xpValue: {
    fontWeight: '700',
  },

  xpLabel: {
    fontSize: 11,
    color: '#6B7280',
  },

  loadMoreButton: {
    margin: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
  },

  loadMoreText: {
    fontWeight: '600',
    color: '#1A1A1A',
  },
});
