import React from 'react';
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

type ProfileScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Profile'>;
};

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  navigation,
}) => {
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
        {/* PROFILE HEADER */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>

          <Text style={styles.userName}>Aashmeet Singh</Text>
          <Text style={styles.userSubtitle}>Intermediate Learner</Text>
        </View>

        {/* STATS */}
        <View style={styles.statsRow}>
          <StatBox label="XP" value="2,850" />
          <StatBox label="Streak" value="7 🔥" />
          <StatBox label="Rank" value="#5" />
        </View>

        {/* PROGRESS */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Learning Progress</Text>

          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Level 3</Text>
            <Text style={styles.progressValue}>1247 / 2000 XP</Text>
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '62%' }]} />
          </View>
        </View>

        {/* ACHIEVEMENTS */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Achievements</Text>

          <View style={styles.achievementRow}>
            <Achievement icon="🏆" label="Top 5 Rank" />
            <Achievement icon="🔥" label="7-Day Streak" />
            <Achievement icon="📚" label="Grammar Pro" />
          </View>
        </View>

        {/* SETTINGS */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Settings</Text>

          <ProfileOption label="Edit Profile" />
          <ProfileOption label="Notification Settings" />
          <ProfileOption label="Language Preferences" />
          <ProfileOption label="Logout" danger />
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* BOTTOM NAV */}
      <BottomNav navigation={navigation} active="Profile" />
    </View>
  );
};

/* ---------- Small Components ---------- */

const StatBox = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.statBox}>
    <Text style={styles.statBoxValue}>{value}</Text>
    <Text style={styles.statBoxLabel}>{label}</Text>
  </View>
);

const Achievement = ({ icon, label }: { icon: string; label: string }) => (
  <View style={styles.achievementItem}>
    <Text style={{ fontSize: 24 }}>{icon}</Text>
    <Text style={styles.achievementLabel}>{label}</Text>
  </View>
);

const ProfileOption = ({
  label,
  danger,
}: {
  label: string;
  danger?: boolean;
}) => (
  <TouchableOpacity style={styles.optionRow}>
    <Text
      style={[
        styles.optionText,
        danger && { color: '#EF4444' },
      ]}
    >
      {label}
    </Text>
    <Text style={{ color: '#9CA3AF' }}>›</Text>
  </TouchableOpacity>
);

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

  profileHeader: {
    alignItems: 'center',
    padding: 24,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  avatarText: { fontSize: 36 },

  userName: { fontSize: 22, fontWeight: '700' },
  userSubtitle: { color: '#6B7280', marginTop: 4 },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },

  statBox: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    width: '28%',
    alignItems: 'center',
    elevation: 2,
  },

  statBoxValue: { fontWeight: '700', fontSize: 16 },
  statBoxLabel: { fontSize: 12, color: '#6B7280' },

  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },

  cardTitle: {
    fontWeight: '700',
    marginBottom: 12,
    fontSize: 16,
  },

  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  progressLabel: { color: '#6B7280' },
  progressValue: { fontWeight: '600' },

  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginTop: 8,
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#2F5FED',
    borderRadius: 4,
  },

  achievementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  achievementItem: {
    alignItems: 'center',
    width: '30%',
  },

  achievementLabel: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },

  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  optionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
