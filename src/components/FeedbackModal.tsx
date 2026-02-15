import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppColors } from '../theme';

export interface FeedbackItem {
  label: string;
  value: string | number;
  type?: 'positive' | 'neutral' | 'negative';
}

export interface FeedbackModalProps {
  visible: boolean;
  title: string;
  subtitle?: string;
  accuracy: number;
  xpEarned: number;
  feedback: FeedbackItem[];
  onClose: () => void;
  icon?: string;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  visible,
  title,
  subtitle,
  accuracy,
  xpEarned,
  feedback,
  onClose,
  icon = '🎉',
}) => {
  const getAccuracyColor = (acc: number) => {
    if (acc >= 90) return '#10B981'; // Green
    if (acc >= 70) return '#F59E0B'; // Amber
    return '#EF4444'; // Red
  };

  const getAccuracyText = (acc: number) => {
    if (acc >= 90) return 'Excellent!';
    if (acc >= 70) return 'Good!';
    if (acc >= 50) return 'Okay!';
    return 'Keep practicing!';
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerIcon}>{icon}</Text>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>

          {/* Accuracy Score */}
          <View style={styles.scoreContainer}>
            <View
              style={[
                styles.scoreCircle,
                { borderColor: getAccuracyColor(accuracy) },
              ]}
            >
              <Text style={[styles.scoreText, { color: getAccuracyColor(accuracy) }]}>
                {accuracy}%
              </Text>
              <Text style={styles.scoreLabel}>{getAccuracyText(accuracy)}</Text>
            </View>
          </View>

          {/* XP Earned */}
          <LinearGradient
            colors={[AppColors.accentCyan + '20', AppColors.accentViolet + '20']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.xpContainer}
          >
            <Text style={styles.xpLabel}>XP Earned</Text>
            <Text style={styles.xpValue}>+{xpEarned} 🚀</Text>
          </LinearGradient>

          {/* Feedback Items */}
          {feedback.length > 0 && (
            <ScrollView style={styles.feedbackContainer}>
              {feedback.map((item, index) => (
                <View key={index} style={styles.feedbackItem}>
                  <Text style={styles.feedbackLabel}>{item.label}</Text>
                  <Text
                    style={[
                      styles.feedbackValue,
                      item.type === 'positive' && styles.feedbackPositive,
                      item.type === 'negative' && styles.feedbackNegative,
                    ]}
                  >
                    {item.value}
                  </Text>
                </View>
              ))}
            </ScrollView>
          )}

          {/* Close Button */}
          <TouchableOpacity onPress={onClose} style={styles.buttonContainer}>
            <LinearGradient
              colors={[AppColors.accentCyan, '#06B6D4']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    backgroundColor: AppColors.primaryDark,
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerIcon: {
    fontSize: 56,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: AppColors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: AppColors.textSecondary,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.surfaceCard,
  },
  scoreText: {
    fontSize: 42,
    fontWeight: '700',
  },
  scoreLabel: {
    fontSize: 12,
    color: AppColors.textSecondary,
    marginTop: 4,
  },
  xpContainer: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: AppColors.accentCyan + '40',
  },
  xpLabel: {
    fontSize: 12,
    color: AppColors.textSecondary,
    fontWeight: '600',
    marginBottom: 4,
  },
  xpValue: {
    fontSize: 28,
    fontWeight: '700',
    color: AppColors.accentCyan,
  },
  feedbackContainer: {
    maxHeight: 150,
    marginBottom: 24,
  },
  feedbackItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.textMuted + '1A',
  },
  feedbackLabel: {
    fontSize: 14,
    color: AppColors.textSecondary,
    fontWeight: '600',
  },
  feedbackValue: {
    fontSize: 14,
    color: AppColors.textPrimary,
    fontWeight: '600',
  },
  feedbackPositive: {
    color: '#10B981',
  },
  feedbackNegative: {
    color: '#EF4444',
  },
  buttonContainer: {
    marginTop: 16,
  },
  button: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: AppColors.accentCyan,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
