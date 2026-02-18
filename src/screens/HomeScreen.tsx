import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { BottomNav } from '../components/BottomNav';
import { LevelCard } from '../components/LevelCard';
import { ExerciseCard } from '../components/ExerciseCard';
import { AIRecommendationCard } from '../components/AIRecommendationCard';
import { AILearningBuddyCard } from '../components/AILearningBuddyCard';
import { ExerciseModal, DailyExerciseType } from '../components/ExerciseModal';
import { useUserProgress } from '../services/UserProgressService';
import { calculateXP } from '../lib/engines/xpEngine';
import { AppColors } from '../theme';
import { aiPracticeService, AIExercise } from '../services/AIPracticeService';

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const DAILY_EXERCISES = [
  { type: 'typing' as DailyExerciseType, icon: '🔥', label: 'Typing', xp: 25 },
  { type: 'tts' as DailyExerciseType, icon: '🗣️', label: 'Text-to-Speech', xp: 25 },
  { type: 'stt' as DailyExerciseType, icon: '🎤', label: 'Speech-to-Text', xp: 25 },
  { type: 'written' as DailyExerciseType, icon: '🔤', label: 'Written Practice', xp: 25 },
];

const FALLBACK_EXERCISES: Record<DailyExerciseType, AIExercise> = {
  typing: {
    question: 'Translate to Spanish: Hello',
    answer: 'Hola',
    type: 'typing',
    hint: "It starts with 'H'",
    difficulty: 1,
    category: 'greetings',
  },
  tts: {
    question: 'Say in Spanish: Good morning',
    answer: 'Buenos días',
    type: 'tts',
    hint: 'A morning greeting',
    difficulty: 1,
    category: 'greetings',
  },
  stt: {
    question: 'Listen and type what you hear',
    answer: 'Gracias',
    type: 'stt',
    hint: 'A polite expression',
    difficulty: 1,
    category: 'greetings',
  },
  written: {
    question: 'Write in Spanish: Thank you',
    answer: 'Gracias',
    type: 'written',
    hint: 'A polite expression',
    difficulty: 1,
    category: 'greetings',
  },
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const userProgress = useUserProgress();
  const [exerciseModalOpen, setExerciseModalOpen] = useState(false);
  const [currentExerciseType, setCurrentExerciseType] = useState<DailyExerciseType>('typing');
  const [currentExercise, setCurrentExercise] = useState<AIExercise>(FALLBACK_EXERCISES.typing);
  const [loadingExercise, setLoadingExercise] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState('Spanish');

  useEffect(() => {
    userProgress.updateStreakStatus();
    if (userProgress.targetLanguage) {
      setTargetLanguage(userProgress.targetLanguage);
    }
  }, [userProgress.targetLanguage]);

  const generateExercise = useCallback(async (type: DailyExerciseType) => {
    setLoadingExercise(true);
    try {
      const exercise = await aiPracticeService.generateExercise(type, targetLanguage);
      setCurrentExercise(exercise);
    } catch (error) {
      console.error('Failed to generate exercise:', error);
      setCurrentExercise(FALLBACK_EXERCISES[type]);
    } finally {
      setLoadingExercise(false);
    }
  }, [targetLanguage]);

  const handleExercisePress = async (type: DailyExerciseType) => {
    setCurrentExerciseType(type);
    await generateExercise(type);
    setExerciseModalOpen(true);
  };

  const handleExerciseSubmit = async (answer: string, isCorrect: boolean, timeSpent: number) => {
    if (isCorrect) {
      const xpResult = calculateXP({
        difficulty: currentExercise.difficulty || 1,
        isCorrect: true,
        timeSpentMs: timeSpent,
        currentStreak: userProgress.streak,
      });
      await userProgress.updateXP(xpResult.totalXP);
    }
    setExerciseModalOpen(false);
  };

  const handleContinueLearning = () => {
    navigation.navigate('Practice');
  };

  const handleAIBuddyPress = () => {
    navigation.navigate('Chat');
  };

  const nextLevelXP = userProgress.getNextLevelXP();
  const currentXPInLevel = userProgress.xp % 100;
  const totalSkills = 5;
  const unlockedSkills = Object.values(userProgress.skillTreeProgress).filter(
    (status) => status === 'mastered' || status === 'in-progress'
  ).length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <View style={styles.blueDot} />

        <View style={styles.headerRight}>
          <View style={styles.statContainer}>
            <Text>⚡</Text>
            <Text style={styles.statText}>{userProgress.xp}</Text>
          </View>

          <View style={styles.statContainer}>
            <Text>🔥</Text>
            <Text style={styles.statText}>{userProgress.streak}</Text>
          </View>

          <Text style={styles.bell}>🔔</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back</Text>
          <Text style={styles.userName}>
            {userProgress.name || 'Language Learner'}
          </Text>
        </View>

        <AIRecommendationCard
          title="AI Recommendation"
          subtitle={`Practice ${userProgress.targetLanguage || 'Spanish'} to unlock the next skill level.`}
        />

        <View style={{ marginTop: 20 }}>
          <LevelCard
            level={userProgress.level}
            currentXP={currentXPInLevel}
            maxXP={100}
            skillsUnlocked={unlockedSkills}
            totalSkills={totalSkills}
          />
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinueLearning}
        >
          <Text style={styles.continueButtonText}>Continue Learning</Text>
        </TouchableOpacity>

        <View style={styles.dailyExercisesSection}>
          <Text style={styles.dailyExercisesTitle}>Daily Exercises</Text>

          <View style={styles.exerciseRow}>
            <ExerciseCard
              icon={DAILY_EXERCISES[0].icon}
              label={DAILY_EXERCISES[0].label}
              xp={DAILY_EXERCISES[0].xp}
              onPress={() => handleExercisePress(DAILY_EXERCISES[0].type)}
            />
            <ExerciseCard
              icon={DAILY_EXERCISES[1].icon}
              label={DAILY_EXERCISES[1].label}
              xp={DAILY_EXERCISES[1].xp}
              onPress={() => handleExercisePress(DAILY_EXERCISES[1].type)}
            />
          </View>

          <View style={styles.exerciseRow}>
            <ExerciseCard
              icon={DAILY_EXERCISES[2].icon}
              label={DAILY_EXERCISES[2].label}
              xp={DAILY_EXERCISES[2].xp}
              onPress={() => handleExercisePress(DAILY_EXERCISES[2].type)}
            />
            <ExerciseCard
              icon={DAILY_EXERCISES[3].icon}
              label={DAILY_EXERCISES[3].label}
              xp={DAILY_EXERCISES[3].xp}
              onPress={() => handleExercisePress(DAILY_EXERCISES[3].type)}
            />
          </View>
        </View>

        <View style={styles.aiLearningBuddySection}>
          <AILearningBuddyCard
            suggestion={`Let's practice ${(userProgress.targetLanguage || 'Spanish').toLowerCase()} together!`}
            onPress={handleAIBuddyPress}
          />
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <Modal
        visible={loadingExercise}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={AppColors.primary} />
            <Text style={styles.loadingText}>Generating Exercise...</Text>
          </View>
        </View>
      </Modal>

      <ExerciseModal
        isOpen={exerciseModalOpen}
        onClose={() => setExerciseModalOpen(false)}
        exerciseType={currentExerciseType}
        exercise={currentExercise}
        onSubmit={handleExerciseSubmit}
        targetLanguage={targetLanguage}
      />

      <BottomNav navigation={navigation} active="Home" />
    </View>
  );
};

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
    backgroundColor: AppColors.primary,
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
  welcomeText: { color: AppColors.textSecondary },
  userName: { fontSize: 28, fontWeight: '700', color: AppColors.primary },

  continueButton: {
    backgroundColor: AppColors.primary,
    marginHorizontal: 20,
    marginTop: 20,
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
  dailyExercisesTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: AppColors.primaryDark,
    marginBottom: 12,
  },

  exerciseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 12,
  },

  aiLearningBuddySection: { paddingHorizontal: 20 },

  loadingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingBox: {
    padding: 24,
    backgroundColor: 'white',
    borderRadius: 16,
    alignItems: 'center',
    elevation: 5,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.primary,
  },
});
