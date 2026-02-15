import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppColors } from '../theme';

export interface AchievementBadgeProps {
  id: string;
  icon: string;
  name: string;
  description: string;
  isUnlocked: boolean;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  icon,
  name,
  description,
  isUnlocked,
}) => {
  return (
    <View style={[styles.container, !isUnlocked && styles.locked]}>
      <View
        style={[
          styles.iconContainer,
          isUnlocked && styles.iconUnlocked,
        ]}
      >
        <Text style={styles.icon}>{isUnlocked ? icon : '🔒'}</Text>
      </View>
      <View style={styles.content}>
        <Text style={[styles.name, !isUnlocked && styles.lockedText]}>
          {name}
        </Text>
        <Text style={[styles.description, !isUnlocked && styles.lockedText]}>
          {description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: AppColors.surfaceCard,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: AppColors.accentCyan + '40',
  },
  locked: {
    opacity: 0.5,
    borderColor: AppColors.textMuted + '20',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: AppColors.accentCyan + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconUnlocked: {
    backgroundColor: AppColors.accentCyan + '40',
  },
  icon: {
    fontSize: 28,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: AppColors.textPrimary,
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: AppColors.textSecondary,
  },
  lockedText: {
    color: AppColors.textMuted,
  },
});
