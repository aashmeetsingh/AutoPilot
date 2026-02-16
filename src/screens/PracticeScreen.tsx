import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import { BottomNav } from '../components/BottomNav';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

type PracticeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Practice'>;
};

export const PracticeScreen: React.FC<PracticeScreenProps> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Grammar', 'Vocabulary', 'Speaking', 'Listening'];

  const practiceActivities = [
    {
      id: 1,
      title: 'Present Tense Practice',
      category: 'Grammar',
      difficulty: 'Beginner',
      duration: '15 min',
      xp: 50,
      icon: '📝',
      color: '#E0EAFF',
      completed: false,
      progress: 0,
    },
    {
      id: 2,
      title: 'Airport Conversations',
      category: 'Speaking',
      difficulty: 'Intermediate',
      duration: '20 min',
      xp: 75,
      icon: '✈️',
      color: '#FEF3C7',
      completed: false,
      progress: 60,
    },
    {
      id: 3,
      title: 'Business Vocabulary',
      category: 'Vocabulary',
      difficulty: 'Advanced',
      duration: '25 min',
      xp: 100,
      icon: '💼',
      color: '#E8EDFA',
      completed: false,
      progress: 30,
    },
    {
      id: 4,
      title: 'Podcast Listening',
      category: 'Listening',
      difficulty: 'Intermediate',
      duration: '30 min',
      xp: 80,
      icon: '🎧',
      color: '#DCFCE7',
      completed: true,
      progress: 100,
    },
    {
      id: 5,
      title: 'Past Tense Exercises',
      category: 'Grammar',
      difficulty: 'Beginner',
      duration: '15 min',
      xp: 50,
      icon: '📚',
      color: '#FCE7F3',
      completed: false,
      progress: 0,
    },
    {
      id: 6,
      title: 'Daily Phrases',
      category: 'Vocabulary',
      difficulty: 'Beginner',
      duration: '10 min',
      xp: 40,
      icon: '💬',
      color: '#FEF3C7',
      completed: false,
      progress: 0,
    },
  ];

  const navItems = [
    { icon: '🏠', label: 'Home', isActive: false },
    { icon: '💬', label: 'Practice', isActive: true },
    { icon: '📈', label: 'Progress', isActive: false },
    { icon: '🏆', label: 'Ranking', isActive: false },
    { icon: '👤', label: 'Profile', isActive: false },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return '#10B981';
      case 'Intermediate':
        return '#F59E0B';
      case 'Advanced':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.blueDot} />
        </View>
        <View style={styles.headerRight}>
          <View style={styles.statContainer}>
            <Text style={styles.lightning}>⚡</Text>
            <Text style={styles.statText}>1,247</Text>
          </View>
          <View style={styles.statContainer}>
            <Text style={styles.flame}>🔥</Text>
            <Text style={styles.statText}>7</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.bell}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>Practice</Text>
          <Text style={styles.subtitleText}>
            Choose activities to improve your skills
          </Text>
        </View>

        {/* Daily Goal Progress */}
        <View style={styles.dailyGoalCard}>
          <View style={styles.dailyGoalHeader}>
            <View>
              <Text style={styles.dailyGoalTitle}>Daily Goal</Text>
              <Text style={styles.dailyGoalSubtitle}>3 of 5 activities completed</Text>
            </View>
            <View style={styles.goalPercentage}>
              <Text style={styles.goalPercentageText}>60%</Text>
            </View>
          </View>

          <View style={styles.dailyProgressBarContainer}>
            <View style={[styles.dailyProgressBarFill, { width: '60%' }]} />
          </View>

          <View style={styles.dailyGoalStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>150</Text>
              <Text style={styles.statLabel}>XP Earned</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>45</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Remaining</Text>
            </View>
          </View>
        </View>

        {/* Categories Filter */}
        <View style={styles.categoriesSection}>
          <Text style={styles.categoriesTitle}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
            contentContainerStyle={styles.categoriesContent}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.categoryChipActive,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === category && styles.categoryChipTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recommended for You */}
        <View style={styles.recommendedSection}>
          <View style={styles.recommendedHeader}>
            <Text style={styles.sectionTitle}>Recommended for You</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recommendedScroll}
          >
            <View style={styles.recommendedCard}>
              <View style={styles.recommendedIconContainer}>
                <Text style={styles.recommendedIcon}>🎯</Text>
              </View>
              <Text style={styles.recommendedCardTitle}>Focus on Tenses</Text>
              <Text style={styles.recommendedCardSubtitle}>
                Unlock Advanced level
              </Text>
              <View style={styles.recommendedBadge}>
                <Text style={styles.recommendedBadgeText}>AI Suggested</Text>
              </View>
            </View>

            <View style={styles.recommendedCard}>
              <View style={styles.recommendedIconContainer}>
                <Text style={styles.recommendedIcon}>💡</Text>
              </View>
              <Text style={styles.recommendedCardTitle}>Quick Review</Text>
              <Text style={styles.recommendedCardSubtitle}>
                5 min daily warmup
              </Text>
              <View style={styles.recommendedBadge}>
                <Text style={styles.recommendedBadgeText}>Popular</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Practice Activities */}
        <View style={styles.activitiesSection}>
          <Text style={styles.sectionTitle}>All Activities</Text>

          {practiceActivities.map((activity) => (
            <TouchableOpacity
              key={activity.id}
              style={styles.activityCard}
              activeOpacity={0.7}
            >
              <View style={[styles.activityIconBox, { backgroundColor: activity.color }]}>
                <Text style={styles.activityIcon}>{activity.icon}</Text>
              </View>

              <View style={styles.activityContent}>
                <View style={styles.activityHeader}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  {activity.completed && (
                    <View style={styles.completedBadge}>
                      <Text style={styles.completedCheckmark}>✓</Text>
                    </View>
                  )}
                </View>

                <View style={styles.activityMeta}>
                  <View
                    style={[
                      styles.difficultyBadge,
                      { backgroundColor: `${getDifficultyColor(activity.difficulty)}15` },
                    ]}
                  >
                    <Text
                      style={[
                        styles.difficultyText,
                        { color: getDifficultyColor(activity.difficulty) },
                      ]}
                    >
                      {activity.difficulty}
                    </Text>
                  </View>
                  <Text style={styles.metaText}>•</Text>
                  <Text style={styles.metaText}>{activity.duration}</Text>
                  <Text style={styles.metaText}>•</Text>
                  <View style={styles.xpContainer}>
                    <Text style={styles.xpIcon}>⚡</Text>
                    <Text style={styles.metaText}>{activity.xp} XP</Text>
                  </View>
                </View>

                {activity.progress > 0 && !activity.completed && (
                  <View style={styles.activityProgressContainer}>
                    <View style={styles.activityProgressBar}>
                      <View
                        style={[
                          styles.activityProgressFill,
                          { width: `${activity.progress}%` },
                        ]}
                      />
                    </View>
                    <Text style={styles.activityProgressText}>{activity.progress}%</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav navigation={navigation} active="Practice" />
    </SafeAreaView>
  );
};

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
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: '#F5F7FA',
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
    gap: 16,
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  lightning: {
    fontSize: 14,
  },
  flame: {
    fontSize: 14,
  },
  bell: {
    fontSize: 18,
  },
  statText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  scrollView: {
    flex: 1,
  },
  titleSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  titleText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 14,
    color: '#6B7280',
  },
  dailyGoalCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  dailyGoalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  dailyGoalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  dailyGoalSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  goalPercentage: {
    backgroundColor: '#E0EAFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  goalPercentageText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2F5FED',
  },
  dailyProgressBarContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 20,
    overflow: 'hidden',
  },
  dailyProgressBarFill: {
    height: '100%',
    backgroundColor: '#2F5FED',
    borderRadius: 4,
  },
  dailyGoalStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E5E7EB',
  },
  categoriesSection: {
    marginBottom: 24,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  categoriesScroll: {
    paddingLeft: 20,
  },
  categoriesContent: {
    paddingRight: 20,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#2F5FED',
    borderColor: '#2F5FED',
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  recommendedSection: {
    marginBottom: 24,
  },
  recommendedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  seeAllText: {
    fontSize: 14,
    color: '#2F5FED',
    fontWeight: '600',
  },
  recommendedScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  recommendedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: 160,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  recommendedIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#F5F7FA',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  recommendedIcon: {
    fontSize: 24,
  },
  recommendedCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  recommendedCardSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 16,
  },
  recommendedBadge: {
    backgroundColor: '#E0EAFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  recommendedBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2F5FED',
  },
  activitiesSection: {
    paddingHorizontal: 20,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  activityIconBox: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityIcon: {
    fontSize: 28,
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    flex: 1,
  },
  completedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedCheckmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  activityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: '600',
  },
  metaText: {
    fontSize: 13,
    color: '#6B7280',
  },
  xpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  xpIcon: {
    fontSize: 10,
  },
  activityProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  activityProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  activityProgressFill: {
    height: '100%',
    backgroundColor: '#2F5FED',
    borderRadius: 3,
  },
  activityProgressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2F5FED',
    width: 35,
  },
});