import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { BottomNav } from '../components/BottomNav';

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.blueDot} />

        <View style={styles.headerRight}>
          <View style={styles.statContainer}>
            <Text>⚡</Text>
            <Text style={styles.statText}>1247</Text>
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
        {/* Welcome */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back</Text>
          <Text style={styles.userName}>Aashmeet Singh</Text>
        </View>

        {/* AI Recommendation */}
        <View style={styles.recommendationCard}>
          <View style={styles.row}>
            <View style={styles.aiIcon}>
              <Text style={{ fontSize: 20 }}>✨</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.recommendationTitle}>
                AI Recommendation
              </Text>
              <Text style={styles.recommendationSubtitle}>
                Practice Tenses to unlock Advanced level.
              </Text>
            </View>
          </View>
        </View>

        {/* Level Card */}
        <View style={styles.levelSection}>
          <Text style={styles.currentLevelLabel}>Current Level</Text>

          <View style={styles.row}>
            <Text style={styles.levelNumber}>Level 3</Text>
            <View style={styles.intermediateBadge}>
              <Text style={styles.intermediateBadgeText}>
                Intermediate
              </Text>
            </View>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.progressText}>
              Progress to Level 4
            </Text>
            <Text style={styles.xpText}>1247 / 2000 XP</Text>
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '62%' }]} />
          </View>

          <View style={styles.rowBetween}>
            <View style={styles.row}>
              <View style={styles.checkCircle}>
                <Text style={{ color: '#FFF', fontSize: 12 }}>✓</Text>
              </View>
              <Text style={styles.skillsText}>
                3 of 5 skills unlocked
              </Text>
            </View>
            <Text style={styles.percentageText}>60%</Text>
          </View>
        </View>

        {/* Continue */}
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>
            Continue Learning
          </Text>
        </TouchableOpacity>

        {/* Daily Exercises */}
        <View style={styles.dailyExercisesSection}>
          <Text style={styles.dailyExercisesTitle}>
            Daily Exercises
          </Text>

          <View style={styles.exerciseRow}>
            <ExerciseCard icon="🔥" label="Typing" />
            <ExerciseCard icon="🗣️" label="Text-to-Speech" />
          </View>

          <View style={styles.exerciseRow}>
            <ExerciseCard icon="🎤" label="Speech-to-Text" />
            <ExerciseCard icon="🔤" label="Written Practice" />
          </View>
        </View>

        {/* AI Buddy */}
        <View style={styles.aiLearningBuddySection}>
          <View style={styles.aiLearningBuddyCard}>
            <View style={styles.row}>
              <View style={styles.aiAvatarContainer}>
                <LinearGradient
                  colors={['#10B981', '#3B82F6']}
                  style={styles.aiAvatar}
                />
                <Text style={styles.botIcon}>🤖</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.aiLearningBuddyTitle}>
                  AI Learning Buddy
                </Text>
                <Text style={styles.aiLearningBuddySubtitle}>
                  "Let's practice airport conversations!"
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* BOTTOM NAV */}
      <BottomNav navigation={navigation} active="Home" />
    </View>
  );
};

/* ---------- Small Components ---------- */

const ExerciseCard = ({
  icon,
  label,
}: {
  icon: string;
  label: string;
}) => (
  <View style={styles.exerciseCard}>
    <Text style={{ fontSize: 32 }}>{icon}</Text>
    <Text style={styles.exerciseLabel}>{label}</Text>
    <View style={styles.xpBadge}>
      <Text style={{ fontSize: 10 }}>⚡</Text>
      <Text style={styles.xpValue}>+25</Text>
    </View>
  </View>
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

  welcomeSection: { padding: 20 },
  welcomeText: { color: '#6B7280' },
  userName: { fontSize: 28, fontWeight: '700' },

  recommendationCard: {
    backgroundColor: '#E8EDFA',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
  },

  aiIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  recommendationTitle: { fontWeight: '600' },
  recommendationSubtitle: { color: '#4B5563', fontSize: 13 },

  levelSection: {
    backgroundColor: '#FFF',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
  },

  currentLevelLabel: { color: '#6B7280', fontSize: 13 },
  levelNumber: { fontSize: 32, fontWeight: '700', marginRight: 12 },

  intermediateBadge: {
    backgroundColor: '#E0EAFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },

  intermediateBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2F5FED',
  },

  row: { flexDirection: 'row', alignItems: 'center' },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  progressText: { fontSize: 13, color: '#6B7280' },
  xpText: { fontWeight: '600' },

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

  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  skillsText: { fontSize: 13 },
  percentageText: { fontWeight: '600', color: '#10B981' },

  continueButton: {
    backgroundColor: '#2F5FED',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 28,
    alignItems: 'center',
  },

  continueButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },

  dailyExercisesSection: { padding: 20 },
  dailyExercisesTitle: { fontSize: 20, fontWeight: '700' },

  exerciseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  exerciseCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    elevation: 2,
  },

  exerciseLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginVertical: 8,
  },

  xpBadge: {
    flexDirection: 'row',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  xpValue: {
    fontSize: 11,
    fontWeight: '600',
    color: '#92400E',
    marginLeft: 4,
  },

  aiLearningBuddySection: { padding: 20 },

  aiLearningBuddyCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },

  aiAvatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  aiAvatar: { ...StyleSheet.absoluteFillObject },
  botIcon: { position: 'absolute', fontSize: 20 },

  aiLearningBuddyTitle: { fontWeight: '600' },
  aiLearningBuddySubtitle: { fontSize: 13, color: '#6B7280' },
});
