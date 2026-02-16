import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

type ScreenProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

export const ProgressScreen: React.FC<ScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.blueDot} />
        </View>

        <View style={styles.headerRight}>
          <View style={styles.statContainer}>
            <Text style={styles.lightning}>⚡</Text>
            <Text style={styles.statText}>1247</Text>
          </View>

          <View style={styles.statContainer}>
            <Text style={styles.flame}>🔥</Text>
            <Text style={styles.statText}>7</Text>
          </View>

          <Text style={styles.bell}>🔔</Text>
        </View>
      </View>

      {/* CONTENT */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.title}>Your Progress</Text>
          <Text style={styles.subtitle}>Skill Tree Overview</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Overall Progress</Text>
            <Text style={styles.primaryText}>67%</Text>
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '67%' }]} />
          </View>

          <Text style={styles.smallText}>23 of 34 skills mastered</Text>
        </View>

        {/* SKILL TREE */}
        <View style={styles.tree}>
          <SkillNode label="Basics" />
          <Connector />
          <SkillNode label="Phrases" />
          <Connector />

          <View style={styles.branchRow}>
            <VerticalConnector />
            <SkillNode label="Greetings" />
            <SkillNode label="Questions" />
          </View>

          <Connector />
          <SkillNode label="Past Tense" locked xp={200} />
          <Connector />
          <SkillNode label="Future Tense" locked xp={300} />
        </View>

        {/* STATS */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.bigNumber}>23</Text>
            <Text style={styles.smallText}>Skills</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.bigNumber}>147</Text>
            <Text style={styles.smallText}>Hours</Text>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Practice')}
        >
          <Text style={styles.navIcon}>💬</Text>
          <Text style={styles.navLabel}>Practice</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIconActive}>📈</Text>
          <Text style={styles.navLabelActive}>Progress</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏆</Text>
          <Text style={styles.navLabel}>Ranking</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/* ---------- COMPONENTS ---------- */

const SkillNode = ({
  label,
  locked = false,
  xp = 0,
}: {
  label: string;
  locked?: boolean;
  xp?: number;
}) => (
  <View style={styles.skillNode}>
    <View
      style={[
        styles.skillCircle,
        { backgroundColor: locked ? '#E5E7EB' : '#2F5FED' },
      ]}
    >
      <Text style={{ fontSize: 24 }}>{locked ? '🔒' : '✓'}</Text>
    </View>

    <Text style={styles.skillLabel}>{label}</Text>
    {xp > 0 && <Text style={styles.smallText}>{xp} XP</Text>}
  </View>
);

const Connector = () => <View style={styles.connector} />;
const VerticalConnector = () => <View style={styles.branchConnector} />;

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
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

  lightning: { fontSize: 14 },
  flame: { fontSize: 14 },
  bell: { fontSize: 18 },

  statText: {
    fontSize: 14,
    fontWeight: '600',
  },

  section: {
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },

  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  label: {
    fontSize: 13,
    color: '#6B7280',
  },

  primaryText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2F5FED',
  },

  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginVertical: 12,
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#2F5FED',
    borderRadius: 4,
  },

  smallText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },

  tree: {
    alignItems: 'center',
    paddingVertical: 20,
  },

  skillNode: {
    alignItems: 'center',
  },

  skillCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },

  skillLabel: {
    fontSize: 13,
    fontWeight: '600',
  },

  connector: {
    width: 2,
    height: 32,
    backgroundColor: '#D1D5DB',
  },

  branchRow: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    marginVertical: 16,
  },

  branchConnector: {
    position: 'absolute',
    width: 2,
    height: 32,
    backgroundColor: '#D1D5DB',
    top: -32,
    left: '50%',
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    elevation: 2,
  },

  bigNumber: {
    fontSize: 32,
    fontWeight: '700',
  },

  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingTop: 12,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    elevation: 8,
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
  },

  navIcon: {
    fontSize: 20,
    opacity: 0.5,
  },

  navIconActive: {
    fontSize: 20,
  },

  navLabel: {
    fontSize: 11,
    color: '#6B7280',
  },

  navLabelActive: {
    fontSize: 11,
    color: '#2F5FED',
    fontWeight: '600',
  },
});
