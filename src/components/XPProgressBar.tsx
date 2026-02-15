import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppColors } from '../theme';

interface XPProgressBarProps {
  current: number;
  max: number;
  level: number;
  showLabel?: boolean;
}

export const XPProgressBar: React.FC<XPProgressBarProps> = ({
  current,
  max,
  level,
  showLabel = true,
}) => {
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <View style={styles.container}>
      {showLabel && (
        <View style={styles.header}>
          <Text style={styles.levelText}>Level {level}</Text>
          <Text style={styles.xpText}>
            {current} / {max} XP
          </Text>
        </View>
      )}
      <View style={styles.barContainer}>
        <View
          style={[
            styles.barFill,
            {
              width: `${percentage}%`,
              backgroundColor: level >= 5 ? '#FFD700' : AppColors.accentCyan,
            },
          ]}
        />
      </View>
      {showLabel && (
        <Text style={styles.percentageText}>{Math.round(percentage)}%</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelText: {
    fontSize: 16,
    fontWeight: '700',
    color: AppColors.textPrimary,
  },
  xpText: {
    fontSize: 13,
    color: AppColors.textSecondary,
  },
  barContainer: {
    height: 8,
    backgroundColor: AppColors.surfaceElevated,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  percentageText: {
    fontSize: 11,
    color: AppColors.textMuted,
    textAlign: 'right',
  },
});
