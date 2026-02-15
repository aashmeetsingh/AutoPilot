import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * User Progress & Gamification Data Structure
 * Persisted with AsyncStorage for offline support
 */

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: number; // timestamp
  progress?: number; // 0-100 for some achievements
}

export interface DailyStats {
  date: string; // YYYY-MM-DD
  activitiesCompleted: number;
  xpEarned: number;
  timeSpent: number; // milliseconds
  conversationCount: number;
  pronunciationCount: number;
  grammarCount: number;
}

export interface UserProgress {
  xp: number; // Total XP
  level: number; // Current level
  streak: number; // Consecutive days with activities
  lastActivityDate: string; // YYYY-MM-DD
  totalActivitiesCompleted: number;
  achievements: Achievement[];
  dailyStats: DailyStats[];
  skillsUnlocked: number; // 0-5
  accuracy: number; // Average accuracy percentage
}

interface UserProgressContextType {
  // State
  progress: UserProgress;
  isLoading: boolean;

  // User data
  currentLevel: number;
  currentXP: number;
  currentStreak: number;
  todayStats: DailyStats;

  // Actions
  addXP: (amount: number, source: string) => Promise<void>;
  completeActivity: (
    type: 'conversation' | 'pronunciation' | 'grammar' | 'typing',
    accuracy: number,
    timeSpent: number
  ) => Promise<void>;
  unlockAchievement: (achievementId: string) => Promise<void>;
  resetProgress: () => Promise<void>;
  loadProgress: () => Promise<void>;

  // Getters
  getNextLevelXP: () => number;
  getProgressToNextLevel: () => number;
  getTodayActivitiesRemaining: () => number;
}

const UserProgressContext = createContext<UserProgressContextType | null>(null);

// Default achievements
const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_conversation',
    name: 'First Steps',
    description: 'Complete your first conversation',
    icon: '🎤',
  },
  {
    id: 'streak_7',
    name: 'On Fire',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
  },
  {
    id: 'level_5',
    name: 'Scholar',
    description: 'Reach level 5',
    icon: '🎓',
  },
  {
    id: 'perfect_pronunciation',
    name: 'Perfect Pronunciation',
    description: 'Get 100% accuracy on pronunciation practice',
    icon: '🎯',
  },
  {
    id: 'grammar_master',
    name: 'Grammar Master',
    description: 'Complete 10 grammar exercises with 90%+ accuracy',
    icon: '📚',
  },
];

// XP requirements per level
const LEVEL_XP_REQUIREMENTS = [0, 500, 1000, 2000, 3500, 5000];

// Default initial progress
const DEFAULT_PROGRESS: UserProgress = {
  xp: 1247, // From HomeScreen
  level: 3,
  streak: 7,
  lastActivityDate: new Date().toISOString().split('T')[0],
  totalActivitiesCompleted: 12,
  achievements: DEFAULT_ACHIEVEMENTS,
  dailyStats: [
    {
      date: new Date().toISOString().split('T')[0],
      activitiesCompleted: 3,
      xpEarned: 150,
      timeSpent: 45 * 60 * 1000, // 45 minutes
      conversationCount: 1,
      pronunciationCount: 1,
      grammarCount: 1,
    },
  ],
  skillsUnlocked: 3, // 0-5
  accuracy: 82.5,
};

export const UserProgressProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [isLoading, setIsLoading] = useState(true);

  const saveProgress = useCallback(async (newProgress: UserProgress) => {
    try {
      await AsyncStorage.setItem('userProgress', JSON.stringify(newProgress));
      setProgress(newProgress);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }, []);

  const loadProgress = useCallback(async () => {
    try {
      setIsLoading(true);
      const stored = await AsyncStorage.getItem('userProgress');
      if (stored) {
        const parsed = JSON.parse(stored);
        setProgress(parsed);
      }
    } catch (error) {
      console.error('Error loading progress:', error);
      setProgress(DEFAULT_PROGRESS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load progress from AsyncStorage on mount
  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const getTodayDate = (): string => {
    return new Date().toISOString().split('T')[0];
  };

  const getTodayStats = (): DailyStats => {
    const today = getTodayDate();
    const existing = progress.dailyStats.find((s) => s.date === today);
    return (
      existing || {
        date: today,
        activitiesCompleted: 0,
        xpEarned: 0,
        timeSpent: 0,
        conversationCount: 0,
        pronunciationCount: 0,
        grammarCount: 0,
      }
    );
  };

  const unlockAchievement = useCallback(
    async (achievementId: string) => {
      const newProgress = { ...progress };
      const achievement = newProgress.achievements.find((a) => a.id === achievementId);

      if (achievement && !achievement.unlockedAt) {
        achievement.unlockedAt = Date.now();
        console.log(`[ACHIEVEMENT] Unlocked: ${achievement.name}`);

        // Bonus XP for achievement
        newProgress.xp += 50;

        await saveProgress(newProgress);
      }
    },
    [progress, saveProgress]
  );

  const addXP = useCallback(
    async (amount: number, source: string) => {
      console.log(`[XP] Adding ${amount} XP from ${source}`);

      const newProgress = { ...progress };
      newProgress.xp += amount;

      // Check for level up
      const nextLevelThreshold = LEVEL_XP_REQUIREMENTS[newProgress.level + 1] || 10000;
      if (newProgress.xp >= nextLevelThreshold && newProgress.level < LEVEL_XP_REQUIREMENTS.length - 1) {
        newProgress.level += 1;
        console.log(`[LEVEL UP] Now level ${newProgress.level}!`);
      }

      // Update today's stats
      const today = getTodayDate();
      const todayIndex = newProgress.dailyStats.findIndex((s) => s.date === today);
      if (todayIndex >= 0) {
        newProgress.dailyStats[todayIndex].xpEarned += amount;
      }

      await saveProgress(newProgress);
    },
    [progress, saveProgress]
  );

  const completeActivity = useCallback(
    async (
      type: 'conversation' | 'pronunciation' | 'grammar' | 'typing',
      accuracy: number,
      timeSpent: number
    ) => {
      console.log(`[ACTIVITY] Completed ${type}: ${accuracy}% accuracy, ${timeSpent}ms`);

      const newProgress = { ...progress };
      const today = getTodayDate();

      // Update or create today's stats
      let todayStats = newProgress.dailyStats.find((s) => s.date === today);
      if (!todayStats) {
        todayStats = {
          date: today,
          activitiesCompleted: 0,
          xpEarned: 0,
          timeSpent: 0,
          conversationCount: 0,
          pronunciationCount: 0,
          grammarCount: 0,
        };
        newProgress.dailyStats.push(todayStats);
      }

      // Increment activity counts
      todayStats.activitiesCompleted += 1;
      todayStats.timeSpent += timeSpent;

      if (type === 'conversation') todayStats.conversationCount += 1;
      if (type === 'pronunciation') todayStats.pronunciationCount += 1;
      if (type === 'grammar') todayStats.grammarCount += 1;

      // Update overall stats
      newProgress.totalActivitiesCompleted += 1;

      // Calculate XP reward
      let xpReward = 25; // Base XP
      if (accuracy === 100) xpReward += 10; // Perfect score bonus
      if (newProgress.streak > 0) xpReward += 5; // Streak bonus

      newProgress.xp += xpReward;
      todayStats.xpEarned += xpReward;

      // Update accuracy (rolling average)
      const totalAccuracy = (newProgress.accuracy * (newProgress.totalActivitiesCompleted - 1) + accuracy) / newProgress.totalActivitiesCompleted;
      newProgress.accuracy = Math.round(totalAccuracy * 100) / 100;

      // Check for level up
      const nextLevelThreshold = LEVEL_XP_REQUIREMENTS[newProgress.level + 1] || 10000;
      if (newProgress.xp >= nextLevelThreshold && newProgress.level < LEVEL_XP_REQUIREMENTS.length - 1) {
        newProgress.level += 1;
      }

      // Check for achievements
      if (newProgress.totalActivitiesCompleted === 1) {
        await unlockAchievement('first_conversation');
      }
      if (accuracy === 100) {
        await unlockAchievement('perfect_pronunciation');
      }

      // Update streak
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (newProgress.lastActivityDate === yesterdayStr) {
        newProgress.streak += 1;
        if (newProgress.streak === 7) {
          await unlockAchievement('streak_7');
        }
      } else if (newProgress.lastActivityDate !== today) {
        newProgress.streak = 1;
      }

      newProgress.lastActivityDate = today;

      await saveProgress(newProgress);
    },
    [progress, saveProgress, unlockAchievement]
  );

  const resetProgress = useCallback(async () => {
    await saveProgress(DEFAULT_PROGRESS);
  }, [saveProgress]);

  const getNextLevelXP = useCallback((): number => {
    return LEVEL_XP_REQUIREMENTS[Math.min(progress.level + 1, LEVEL_XP_REQUIREMENTS.length - 1)] || 5000;
  }, [progress.level]);

  const getProgressToNextLevel = useCallback((): number => {
    const currentLevelXP = LEVEL_XP_REQUIREMENTS[progress.level];
    const nextLevelXP = getNextLevelXP();
    const progressInLevel = progress.xp - currentLevelXP;
    const xpNeededForLevel = nextLevelXP - currentLevelXP;
    return Math.round((progressInLevel / xpNeededForLevel) * 100);
  }, [progress, getNextLevelXP]);

  const getTodayActivitiesRemaining = useCallback((): number => {
    const today = getTodayDate();
    const todayStats = progress.dailyStats.find((s) => s.date === today);
    const completed = todayStats?.activitiesCompleted || 0;
    return Math.max(0, 5 - completed);
  }, [progress]);

  const value: UserProgressContextType = {
    progress,
    isLoading,
    currentLevel: progress.level,
    currentXP: progress.xp,
    currentStreak: progress.streak,
    todayStats: getTodayStats(),
    addXP,
    completeActivity,
    unlockAchievement,
    resetProgress,
    loadProgress,
    getNextLevelXP,
    getProgressToNextLevel,
    getTodayActivitiesRemaining,
  };

  return (
    <UserProgressContext.Provider value={value}>
      {children}
    </UserProgressContext.Provider>
  );
};

export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (!context) {
    throw new Error('useUserProgress must be used within UserProgressProvider');
  }
  return context;
};
