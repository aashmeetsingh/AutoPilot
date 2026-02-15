  import React from 'react';
  import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
  } from 'react-native';
  import  FeatureCard  from '../components';
  import LinearGradient from 'react-native-linear-gradient';
  import { StackNavigationProp } from '@react-navigation/stack';
  import { RootStackParamList } from '../navigation/types';
  type HomeScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  };

  export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    return (
      <View style={styles.container}>
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
          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Welcome back</Text>
            <Text style={styles.userName}>Aashmeet Singh</Text>
          </View>

          {/* AI Recommendation Card */}
          <View style={styles.recommendationCard}>
            <View style={styles.recommendationHeader}>
              <View style={styles.aiIcon}>
                <Text style={styles.aiIconText}>✨</Text>
              </View>
              <View style={styles.recommendationTextContainer}>
                <Text style={styles.recommendationTitle}>AI Recommendation</Text>
                <Text style={styles.recommendationSubtitle}>
                  Today you should practice Tenses to unlock Advanced level.
                </Text>
              </View>
            </View>
          </View>

          {/* Current Level Section */}
          <View style={styles.levelSection}>
            <Text style={styles.currentLevelLabel}>Current Level</Text>
            <View style={styles.levelHeader}>
              <Text style={styles.levelNumber}>Level 3</Text>
              <View style={styles.intermediateBadge}>
                <Text style={styles.intermediateBadgeText}>Intermediate</Text>
              </View>
            </View>

            {/* Progress Info */}
            <View style={styles.progressInfo}>
              <Text style={styles.progressText}>Progress to Level 4</Text>
              <Text style={styles.xpText}>1247 / 2,000 XP</Text>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBarFill, { width: '62.35%' }]} />
            </View>

            {/* Skills Unlocked */}
            <View style={styles.skillsUnlocked}>
              <View style={styles.skillsRow}>
                <View style={styles.checkCircle}>
                  <Text style={styles.checkMark}>✓</Text>
                </View>
                <Text style={styles.skillsText}>3 of 5 skills unlocked</Text>
              </View>
              <Text style={styles.percentageText}>60%</Text>
            </View>
          </View>

          {/* Continue Learning Button */}
          <TouchableOpacity style={styles.continueButton} activeOpacity={0.8}>
            <Text style={styles.continueButtonText}>Continue Learning</Text>
          </TouchableOpacity>

          {/* Daily Exercises Section */}
          <View style={styles.dailyExercisesSection}>
            <Text style={styles.dailyExercisesTitle}>Daily Exercises</Text>
            
            <View style={styles.exercisesGrid}>
              {/* Row 1 */}
              <View style={styles.exerciseRow}>
                <View style={styles.exerciseCard}>
                  <View style={styles.exerciseIconContainer}>
                    <Text style={styles.exerciseIcon}>🔥</Text>
                  </View>
                  <Text style={styles.exerciseLabel}>Typing</Text>
                  <View style={styles.xpBadge}>
                    <Text style={styles.xpIcon}>⚡</Text>
                    <Text style={styles.xpValue}>+25</Text>
                  </View>
                </View>

                <View style={styles.exerciseCard}>
                  <View style={styles.exerciseIconContainer}>
                    <Text style={styles.exerciseIcon}>🗣️</Text>
                  </View>
                  <Text style={styles.exerciseLabel}>Text-to-Speech</Text>
                  <View style={styles.xpBadge}>
                    <Text style={styles.xpIcon}>⚡</Text>
                    <Text style={styles.xpValue}>+25</Text>
                  </View>
                </View>
              </View>

              {/* Row 2 */}
              <View style={styles.exerciseRow}>
                <View style={styles.exerciseCard}>
                  <View style={styles.exerciseIconContainer}>
                    <Text style={styles.exerciseIcon}>🎤</Text>
                  </View>
                  <Text style={styles.exerciseLabel}>Speech-to-Text</Text>
                  <View style={styles.xpBadge}>
                    <Text style={styles.xpIcon}>⚡</Text>
                    <Text style={styles.xpValue}>+25</Text>
                  </View>
                </View>

                <View style={styles.exerciseCard}>
                  <View style={styles.exerciseIconContainer}>
                    <View style={styles.abcBox}>
                      <Text style={styles.abcText}>🔤</Text>
                    </View>
                    <Text style={styles.exerciseLabel}>Written Practice</Text>
                  <View style={styles.xpBadge}>
                    <Text style={styles.xpIcon}>⚡</Text>
                    <Text style={styles.xpValue}>+25</Text>
                  </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Bottom Spacing */}
          <View style={{ height: 20 }} />
          <View style={styles.aiLearningBuddySection}>
            <View style={styles.aiLearningBuddyCard}>
              <View style={styles.aiLearningBuddyHeader}>
                <View style={styles.aiAvatarContainer}>
                  <LinearGradient
                    colors={['#10B981', '#3B82F6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.aiAvatar}
                  />
                  <Text style={styles.aiIconText}>🤖</Text>
                </View>
        </View>
              <View style={styles.aiLearningBuddyTextContainer}>
                  <Text style={styles.aiLearningBuddyTitle}>AI Learning Buddy</Text>
                  <Text style={styles.aiLearningBuddySubtitle}>
                    "Let's practice airport conversations together!"
                  </Text>
                </View>
              </View>
            </View>


              <View style={styles.achievementsSection}>
            <View style={styles.achievementsHeader}>
              <Text style={styles.achievementsTitle}>Achievements</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllButton}>View All</Text>
              </TouchableOpacity>
            </View>
              <View style={styles.achievementsGrid}>
              {[1, 2, 3, 4].map((item, index) => (
                <View key={index} style={styles.achievementCard}>
                  <View style={styles.achievementIconContainer}>
                    <Text style={styles.achievementIcon}>🏆</Text>
                    
                    <View style={styles.achievementPodium}>
                      <View style={styles.podiumBlock} />
                      <Text style={styles.achievementLabel}> {item}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
            <View style={{ height: 20 }} />
            <View style={styles.weeklyRankingSection}>
            <View style={styles.weeklyRankingCard}>
              <View style={styles.weeklyRankingHeader}>
                <Text style={styles.weeklyRankingTitle}>Weekly Ranking</Text>
                <Text style={styles.trendingIcon}>📈</Text>
              </View>

              <View style={styles.rankingItem}>
                <Text style={styles.rankNumber}>#5</Text>
                <View style={styles.blueDotSmall} />
                <Text style={styles.rankLabel}>You</Text>
                <Text style={styles.rankXP}>2,850 XP</Text>
              </View>

              <TouchableOpacity style={styles.viewFullRankingsButton}>
                <Text style={styles.viewFullRankingsText}>View Full Rankings</Text>
              </TouchableOpacity>
            </View>
          </View>
          </View>
            </ScrollView>

        {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIconActive}>🏠</Text>
            <Text style={styles.navLabelActive}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Practice')}>
            <Text style={styles.navIcon}>💬</Text>
            <Text style={styles.navLabel}>Practice</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>📈</Text>
            <Text style={styles.navLabel}>Progress</Text>
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
      backgroundColor: '#ffffff',
      marginTop: StatusBar.currentHeight || 0,
      marginBottom: 10,
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
    welcomeSection: {
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    welcomeText: {
      fontSize: 14,
      color: '#6B7280',
      marginBottom: 4,
    },
    userName: {
      fontSize: 28,
      fontWeight: '700',
      color: '#1A1A1A',
    },
    recommendationCard: {
      backgroundColor: '#E8EDFA',
      marginHorizontal: 20,
      borderRadius: 16,
      padding: 16,
      marginBottom: 24,
    },
    recommendationHeader: {
      flexDirection: 'row',
      gap: 12,
    },
    aiIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
    },
    aiIconText: {
      fontSize: 20,
    },
    recommendationTextContainer: {
      flex: 1,
    },
    recommendationTitle: {
      fontSize: 15,
      fontWeight: '600',
      color: '#1A1A1A',
      marginBottom: 4,
    },
    recommendationSubtitle: {
      fontSize: 13,
      color: '#4B5563',
      lineHeight: 18,
    },
    levelSection: {
      backgroundColor: '#FFFFFF',
      marginHorizontal: 20,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    currentLevelLabel: {
      fontSize: 13,
      color: '#6B7280',
      marginBottom: 8,
    },
    levelHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      gap: 12,
    },
    levelNumber: {
      fontSize: 32,
      fontWeight: '700',
      color: '#1A1A1A',
    },
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
    progressInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    progressText: {
      fontSize: 13,
      color: '#6B7280',
    },
    xpText: {
      fontSize: 13,
      fontWeight: '600',
      color: '#1A1A1A',
    },
    progressBarContainer: {
      height: 8,
      backgroundColor: '#E5E7EB',
      borderRadius: 4,
      marginBottom: 16,
      overflow: 'hidden',
    },
    progressBarFill: {
      height: '100%',
      backgroundColor: '#2F5FED',
      borderRadius: 4,
    },
    skillsUnlocked: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    skillsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    checkCircle: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: '#10B981',
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkMark: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '700',
    },
    skillsText: {
      fontSize: 13,
      color: '#1A1A1A',
    },
    percentageText: {
      fontSize: 13,
      fontWeight: '600',
      color: '#10B981',
    },
    continueButton: {
      backgroundColor: '#2F5FED',
      marginHorizontal: 20,
      borderRadius: 28,
      paddingVertical: 16,
      alignItems: 'center',
      marginBottom: 24,
      shadowColor: '#2F5FED',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    continueButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '700',
    },
    aiLearningBuddySection: {
      paddingHorizontal: 20,
      marginBottom: 24,
    },
    aiLearningBuddyCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    aiLearningBuddyHeader: {
      flexDirection: 'row',
      gap: 12,
      alignItems: 'center',
    },
    aiAvatarContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      overflow: 'hidden',
    },
    aiAvatar: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    aiLearningBuddyTextContainer: {
      flex: 1,
    },
    aiLearningBuddyTitle: {
      fontSize: 15,
      fontWeight: '600',
      color: '#1A1A1A',
      marginBottom: 4,
    },
    aiLearningBuddySubtitle: {
      fontSize: 13,
      color: '#6B7280',
      lineHeight: 18,
    },
    achievementsSection: {
      paddingHorizontal: 20,
      marginBottom: 24,
    },
    achievementsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    achievementsTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: '#1A1A1A',
    },
    achievementLabel: {
      fontSize: 12,
      color: '#1A1A1A',
      marginTop: 2,
    },
    viewAllButton: {
      fontSize: 14,
      color: '#2F5FED',
      fontWeight: '600',
    },
    achievementsGrid: {
      flexDirection: 'row',
      gap: 12,
    },
    achievementCard: {
      flex: 1,
      backgroundColor: '#FFFBEB',
      borderWidth: 2,
      borderColor: '#FCD34D',
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 80,
    },
    achievementIconContainer: {
      alignItems: 'center',
    },
    achievementIcon: {
      fontSize: 28,
      marginBottom: 4,
    },
    achievementPodium: {
      alignItems: 'center',
    },
    podiumBlock: {
      width: 24,
      height: 12,
      backgroundColor: '#D97706',
      borderRadius: 2,
    },
    weeklyRankingSection: {
      paddingHorizontal: 20,
      marginBottom: 24,
    },
    weeklyRankingCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    weeklyRankingHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
      marginTop: 8,
    },
    weeklyRankingTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: '#1A1A1A',
    },
    trendingIcon: {
      fontSize: 20,
    },
    rankingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      gap: 12,
    },
    rankNumber: {
      fontSize: 16,
      fontWeight: '700',
      color: '#2F5FED',
      width: 30,
    },
    blueDotSmall: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#2F5FED',
    },
    rankLabel: {
      fontSize: 15,
      color: '#1A1A1A',
      flex: 1,
    },
    rankXP: {
      fontSize: 14,
      fontWeight: '600',
      color: '#6B7280',
    },
    viewFullRankingsButton: {
      alignItems: 'center',
      paddingVertical: 12,
      marginTop: 4,
    },
    viewFullRankingsText: {
      fontSize: 14,
      color: '#2F5FED',
      fontWeight: '600',
    },
    dailyExercisesSection: {
      paddingHorizontal: 20,
    },
    dailyExercisesTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: '#1A1A1A',
      marginBottom: 16,
    },
    exercisesGrid: {
      gap: 12,
    },
    exerciseRow: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 12,
    },
    exerciseCard: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 20,
      alignItems: 'center',
      minHeight: 120,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    exerciseIconContainer: {
      marginBottom: 8,
    },
    exerciseIcon: {
      fontSize: 32,
    },
    exerciseLabel: {
      fontSize: 13,
      fontWeight: '600',
      color: '#1A1A1A',
      marginBottom: 8,
      textAlign: 'center',
    },
    xpBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FEF3C7',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      gap: 2,
    },
    xpIcon: {
      fontSize: 10,
    },
    xpValue: {
      fontSize: 11,
      fontWeight: '600',
      color: '#92400E',
    },
    abcBox: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
    },
    abcText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    bottomNav: {
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      paddingTop: 12,
      paddingBottom: 8,
      borderTopWidth: 1,
      borderTopColor: '#E5E7EB',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 8,
      marginBottom: StatusBar.currentHeight || 0,
    },
    navItem: {
      flex: 1,
      alignItems: 'center',
      gap: 4,
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

    },
    navLabelActive: {
      fontSize: 11,
      color: '#2F5FED',
      fontWeight: '600',
    },
  });
