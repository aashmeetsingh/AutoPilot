import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  NativeModules,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RunAnywhere } from '@runanywhere/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppColors } from '../theme';
import { useModelService } from '../services/ModelService';
import { useUserProgress } from '../services/UserProgressService';
import { ModelLoaderWidget, AudioVisualizer, FeedbackModal } from '../components';
import { RootStackParamList } from '../navigation/types';

type PronunciationPracticeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'PronunciationPractice'>;
};

const { NativeAudioModule } = NativeModules;

const PRONUNCIATION_PHRASES = [
  { english: 'Hello, how are you?', difficulty: 'Beginner', xp: 25 },
  { english: 'Nice to meet you', difficulty: 'Beginner', xp: 25 },
  { english: 'Where is the bathroom?', difficulty: 'Beginner', xp: 25 },
  { english: 'Can I have a coffee, please?', difficulty: 'Beginner', xp: 25 },
  { english: 'What is your name?', difficulty: 'Beginner', xp: 25 },
  { english: 'I would like to make a reservation', difficulty: 'Intermediate', xp: 35 },
  { english: 'Could you please speak more slowly?', difficulty: 'Intermediate', xp: 35 },
  {
    english: 'I am interested in learning more about your products',
    difficulty: 'Advanced',
    xp: 50,
  },
];

export const PronunciationPracticeScreen: React.FC<PronunciationPracticeScreenProps> = ({
  navigation,
}) => {
  const modelService = useModelService();
  const userProgress = useUserProgress();

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isPlayingReference, setIsPlayingReference] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const recordingPathRef = useRef<string | null>(null);
  const audioLevelIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recordingStartRef = useRef<number>(0);

  const currentPhrase = PRONUNCIATION_PHRASES[currentPhraseIndex];

  useEffect(() => {
    return () => {
      if (audioLevelIntervalRef.current) {
        clearInterval(audioLevelIntervalRef.current);
      }
      if (isRecording && NativeAudioModule) {
        NativeAudioModule.cancelRecording().catch(() => {});
      }
    };
  }, [isRecording]);

  const startRecording = async () => {
    try {
      if (!NativeAudioModule) {
        Alert.alert('Error', 'Native audio module not available');
        return;
      }

      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'This app needs access to your microphone',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          return;
        }
      }

      const result = await NativeAudioModule.startRecording();
      recordingPathRef.current = result.path;
      recordingStartRef.current = Date.now();
      setIsRecording(true);
      setTranscription('');
      setAccuracy(null);

      audioLevelIntervalRef.current = setInterval(async () => {
        try {
          const levelResult = await NativeAudioModule.getAudioLevel();
          setAudioLevel(levelResult.level || 0);
        } catch (e) {
          // Ignore
        }
      }, 100);
    } catch (error) {
      Alert.alert('Recording Error', `Failed to start recording: ${error}`);
    }
  };

  const stopRecordingAndTranscribe = async () => {
    try {
      if (audioLevelIntervalRef.current) {
        clearInterval(audioLevelIntervalRef.current);
        audioLevelIntervalRef.current = null;
      }

      if (!NativeAudioModule) {
        throw new Error('NativeAudioModule not available');
      }

      const result = await NativeAudioModule.stopRecording();
      setIsRecording(false);
      setAudioLevel(0);
      setIsTranscribing(true);

      const audioBase64 = result.audioBase64;
      if (!audioBase64 || result.fileSize < 1000) {
        setTranscription('Recording too short. Please try again.');
        setIsTranscribing(false);
        return;
      }

      // Transcribe using STT
      const isModelLoaded = await RunAnywhere.isSTTModelLoaded();
      if (!isModelLoaded) {
        throw new Error('STT model not loaded');
      }

      const transcribeResult = await RunAnywhere.transcribe(audioBase64, {
        sampleRate: 16000,
        language: 'en',
      });

      setTranscription(transcribeResult.text || '(No speech detected)');

      // Calculate accuracy by comparing with target phrase
      if (transcribeResult.text) {
        const calculatedAccuracy = calculateAccuracy(
          transcribeResult.text.toLowerCase(),
          currentPhrase.english.toLowerCase()
        );
        setAccuracy(Math.round(calculatedAccuracy));

        // Show feedback
        setShowFeedback(true);

        // Award XP
        if (calculatedAccuracy > 0) {
          await userProgress.completeActivity('pronunciation', calculatedAccuracy, 30000);
        }
      }

      setIsTranscribing(false);
    } catch (error) {
      console.error('Transcription error:', error);
      setTranscription(`Error: ${error}`);
      setIsTranscribing(false);
    }
  };

  const calculateAccuracy = (transcribed: string, target: string): number => {
    // Simple word-based comparison
    const transcribedWords = transcribed.split(/\s+/).filter((w) => w.length > 0);
    const targetWords = target.split(/\s+/).filter((w) => w.length > 0);

    let matches = 0;
    for (let i = 0; i < Math.min(transcribedWords.length, targetWords.length); i++) {
      if (
        transcribedWords[i].toLowerCase() === targetWords[i].toLowerCase() ||
        transcribedWords[i].includes(targetWords[i]) ||
        targetWords[i].includes(transcribedWords[i])
      ) {
        matches += 1;
      }
    }

    const accuracy = (matches / targetWords.length) * 100;
    return Math.min(100, accuracy);
  };

  const playReferenceAudio = async () => {
    setIsPlayingReference(true);
    try {
      const result = await RunAnywhere.synthesize(currentPhrase.english, {
        rate: 0.9, // Slightly slower for learning
        pitch: 1.0,
        volume: 1.0,
      });

      const wavPath = await RunAnywhere.Audio.createWavFromPCMFloat32(
        result.audio,
        result.sampleRate || 22050
      );

      if (NativeAudioModule) {
        await NativeAudioModule.playAudio(wavPath);
      }

      // Approximate playback time
      setTimeout(() => setIsPlayingReference(false), result.duration * 1000 + 500);
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlayingReference(false);
    }
  };

  const handleFeedbackClose = () => {
    setShowFeedback(false);
    setCompletedCount(completedCount + 1);

    // Move to next phrase
    if (currentPhraseIndex < PRONUNCIATION_PHRASES.length - 1) {
      setCurrentPhraseIndex(currentPhraseIndex + 1);
    } else {
      // End session
      Alert.alert(
        'Session Complete!',
        `You completed ${completedCount + 1} pronunciation exercises. Great job!`
      );
      navigation.goBack();
    }
  };

  if (!modelService.isSTTLoaded || !modelService.isTTSLoaded) {
    return (
      <ModelLoaderWidget
        title="STT & TTS Models Required"
        subtitle="Download and load speech recognition and synthesis models"
        icon="mic"
        accentColor={AppColors.accentViolet}
        isDownloading={modelService.isSTTDownloading || modelService.isTTSDownloading}
        isLoading={modelService.isSTTLoading || modelService.isTTSLoading}
        progress={(modelService.sttDownloadProgress + modelService.ttsDownloadProgress) / 2}
        onLoad={async () => {
          await modelService.downloadAndLoadSTT();
          await modelService.downloadAndLoadTTS();
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Progress */}
        <View style={styles.progressSection}>
          <Text style={styles.progressText}>
            Phrase {currentPhraseIndex + 1} of {PRONUNCIATION_PHRASES.length}
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${((currentPhraseIndex + 1) / PRONUNCIATION_PHRASES.length) * 100}%`,
                },
              ]}
            />
          </View>
        </View>

        {/* Target Phrase */}
        <View style={styles.phraseCard}>
          <Text style={styles.phraseLabel}>Listen and Repeat:</Text>
          <Text style={styles.phraseText}>{currentPhrase.english}</Text>
          <View style={styles.difficultyBadge}>
            <Text style={styles.difficultyText}>{currentPhrase.difficulty}</Text>
          </View>
        </View>

        {/* Reference Audio Button */}
        <View style={styles.referenceSection}>
          <TouchableOpacity
            onPress={playReferenceAudio}
            disabled={isPlayingReference}
            style={styles.referenceButton}
          >
            <LinearGradient
              colors={
                isPlayingReference
                  ? [AppColors.accentPink + '80', AppColors.accentPink + '60']
                  : [AppColors.accentPink, '#DB2777']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.refButtonGradient}
            >
              <Text style={styles.refButtonIcon}>
                {isPlayingReference ? '⏸' : '🔊'}
              </Text>
              <Text style={styles.refButtonText}>
                {isPlayingReference ? 'Playing...' : 'Hear Pronunciation'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Recording Area */}
        <View style={[styles.recordingArea, isRecording && styles.recordingActive]}>
          {isRecording ? (
            <>
              <AudioVisualizer level={audioLevel} />
              <Text style={[styles.recordingStatus, { color: AppColors.accentViolet }]}>
                Recording...
              </Text>
            </>
          ) : isTranscribing ? (
            <>
              <Text style={styles.recordingIcon}>⏳</Text>
              <Text style={styles.recordingStatus}>Analyzing...</Text>
            </>
          ) : (
            <>
              <Text style={styles.recordingIcon}>🎤</Text>
              <Text style={styles.recordingStatus}>Ready to Record</Text>
            </>
          )}
        </View>

        {/* Transcription Result */}
        {transcription && (
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Your Recording:</Text>
            <Text style={styles.resultText}>{transcription}</Text>
            {accuracy !== null && (
              <View style={styles.accuracyContainer}>
                <Text
                  style={[
                    styles.accuracyText,
                    accuracy >= 80 && styles.accuracyGood,
                    accuracy < 50 && styles.accuracyPoor,
                  ]}
                >
                  Accuracy: {accuracy}%
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Record Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={isRecording ? stopRecordingAndTranscribe : startRecording}
          disabled={isTranscribing}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={
              isRecording
                ? [AppColors.error, '#DC2626']
                : [AppColors.accentViolet, '#7C3AED']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.recordButton}
          >
            <Text style={styles.recordIcon}>{isRecording ? '⏹' : '🎤'}</Text>
            <Text style={styles.recordButtonText}>
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Feedback Modal */}
      <FeedbackModal
        visible={showFeedback}
        title="Great Effort!"
        icon="🎯"
        accuracy={accuracy || 0}
        xpEarned={currentPhrase.xp}
        feedback={[
          { label: 'Target', value: currentPhrase.english },
          { label: 'You said', value: transcription || 'Not detected' },
          { label: 'Accuracy', value: `${accuracy}%`, type: accuracy! >= 80 ? 'positive' : 'neutral' },
        ]}
        onClose={handleFeedbackClose}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.primaryDark,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  progressSection: {
    marginBottom: 24,
  },
  progressText: {
    fontSize: 12,
    color: AppColors.textSecondary,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: AppColors.surfaceElevated,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: AppColors.accentViolet,
    borderRadius: 3,
  },
  phraseCard: {
    backgroundColor: AppColors.surfaceCard,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: AppColors.accentViolet + '33',
    alignItems: 'center',
  },
  phraseLabel: {
    fontSize: 12,
    color: AppColors.textSecondary,
    fontWeight: '600',
    marginBottom: 12,
  },
  phraseText: {
    fontSize: 24,
    fontWeight: '700',
    color: AppColors.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  difficultyBadge: {
    backgroundColor: AppColors.accentViolet + '20',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    color: AppColors.accentViolet,
  },
  referenceSection: {
    marginBottom: 24,
  },
  referenceButton: {
    width: '100%',
  },
  refButtonGradient: {
    flexDirection: 'row',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    elevation: 6,
    shadowColor: AppColors.accentPink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  refButtonIcon: {
    fontSize: 20,
  },
  refButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  recordingArea: {
    padding: 32,
    backgroundColor: AppColors.surfaceCard,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: AppColors.textMuted + '1A',
    alignItems: 'center',
    marginBottom: 24,
  },
  recordingActive: {
    borderColor: AppColors.accentViolet + '80',
    borderWidth: 2,
    shadowColor: AppColors.accentViolet,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  recordingIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  recordingStatus: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.textPrimary,
  },
  resultCard: {
    backgroundColor: AppColors.surfaceCard + '80',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: AppColors.accentViolet + '40',
    marginBottom: 24,
  },
  resultLabel: {
    fontSize: 12,
    color: AppColors.textSecondary,
    fontWeight: '600',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 14,
    color: AppColors.textPrimary,
    lineHeight: 20,
    marginBottom: 12,
  },
  accuracyContainer: {
    alignItems: 'flex-end',
  },
  accuracyText: {
    fontSize: 13,
    fontWeight: '700',
    color: AppColors.textSecondary,
  },
  accuracyGood: {
    color: '#10B981',
  },
  accuracyPoor: {
    color: '#EF4444',
  },
  buttonContainer: {
    padding: 24,
    backgroundColor: AppColors.surfaceCard + 'CC',
    borderTopWidth: 1,
    borderTopColor: AppColors.textMuted + '1A',
  },
  recordButton: {
    flexDirection: 'row',
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    elevation: 8,
    shadowColor: AppColors.accentViolet,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  recordIcon: {
    fontSize: 28,
  },
  recordButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
