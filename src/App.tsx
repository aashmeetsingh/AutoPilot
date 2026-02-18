import 'react-native-gesture-handler'; // Must be at the top!
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// Note: react-native-screens is shimmed in index.js for iOS New Architecture compatibility
import { RunAnywhere, SDKEnvironment } from '@runanywhere/core';
import { ModelServiceProvider, registerDefaultModels, useModelService } from './services/ModelService';
import { UserProgressProvider } from './services/UserProgressService';
import { SessionServiceProvider } from './services/SessionService';
import { AppColors } from './theme';
import {
  HomeScreen,
  ChatScreen,
  ToolCallingScreen,
  SpeechToTextScreen,
  TextToSpeechScreen,
  VoicePipelineScreen,
  PracticeScreen,
  ConversationPracticeScreen,
  PronunciationPracticeScreen,
  GrammarPracticeScreen,
  ProgressScreen,
  RankingScreen,
  ProfileScreen,
} from './screens';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { TransitionScreen } from './screens/TransitionScreen';
import { RootStackParamList } from './navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Using JS-based stack navigator instead of native-stack
// to avoid react-native-screens setColor crash with New Architecture
const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [setupComplete, setSetupComplete] = useState(false);

  useEffect(() => {

    // Initialize SDK
    const initializeSDK = async () => {
      try {
        // Initialize RunAnywhere SDK (Development mode doesn't require API key)
        await RunAnywhere.initialize({
          environment: SDKEnvironment.Development,
        });

        // Register backends (per docs: https://docs.runanywhere.ai/react-native/quick-start)
        const { LlamaCPP } = await import('@runanywhere/llamacpp');
        const { ONNX } = await import('@runanywhere/onnx');

        LlamaCPP.register();
        ONNX.register();

        // Register default models
        await registerDefaultModels();

        console.log('RunAnywhere SDK initialized successfully');
      } catch (error) {
        console.error('Failed to initialize RunAnywhere SDK:', error);
      }
    };

    const init = async () => {
      await initializeSDK();
      await checkSetupStatus();
    };

    init();
  }, []);

  const checkSetupStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('@setup_complete');
      setSetupComplete(value === 'true');
    } catch (e) {
      console.error('Failed to read setup status:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const AutoModelLoader = () => {
    const { downloadAndLoadAllModels } = useModelService();

    useEffect(() => {
      console.log('Auto-loading all AI models on boot...');
      downloadAndLoadAllModels();
    }, []);

    return null;
  };

  if (isLoading) {
    return (
      <View style={styles.splash}>
        <ActivityIndicator size="large" color="#2F5FED" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ModelServiceProvider>
        <UserProgressProvider>
          <SessionServiceProvider>
            <AutoModelLoader />
            <StatusBar barStyle="light-content" backgroundColor={AppColors.primaryDark} />
            <NavigationContainer>

              <Stack.Navigator
                screenOptions={{
                  headerStyle: {
                    backgroundColor: AppColors.primaryDark,
                    elevation: 0,
                    shadowOpacity: 0,
                  },
                  headerTintColor: AppColors.textPrimary,
                  headerTitleStyle: {
                    fontWeight: '700',
                    fontSize: 18,
                  },
                  cardStyle: {
                    backgroundColor: AppColors.primaryDark,
                  },
                  // iOS-like animations
                  ...TransitionPresets.SlideFromRightIOS,
                }}
                initialRouteName={setupComplete ? 'Home' : 'Welcome'}
              >
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Chat"
                  component={ChatScreen}
                  options={{ title: 'Chat' }}
                />
                <Stack.Screen
                  name="ToolCalling"
                  component={ToolCallingScreen}
                  options={{ title: 'Tool Calling' }}
                />
                <Stack.Screen
                  name="Practice"
                  component={PracticeScreen}
                  options={{ title: 'Practice' }}
                />
                <Stack.Screen
                  name="ConversationPractice"
                  component={ConversationPracticeScreen}
                  options={{ title: 'Conversation Practice' }}
                />
                <Stack.Screen
                  name="PronunciationPractice"
                  component={PronunciationPracticeScreen}
                  options={{ title: 'Pronunciation Practice' }}
                />
                <Stack.Screen
                  name="GrammarPractice"
                  component={GrammarPracticeScreen}
                  options={{ title: 'Grammar Practice' }}
                />
                <Stack.Screen
                  name="SpeechToText"
                  component={SpeechToTextScreen}
                  options={{ title: 'Speech to Text' }}
                />
                <Stack.Screen
                  name="TextToSpeech"
                  component={TextToSpeechScreen}
                  options={{ title: 'Text to Speech' }}
                />
                <Stack.Screen
                  name="VoicePipeline"
                  component={VoicePipelineScreen}
                  options={{ title: 'Voice Pipeline' }}
                />
                <Stack.Screen
                  name="Progress"
                  component={ProgressScreen}
                  options={{ title: 'Progress' }}
                />
                <Stack.Screen
                  name="Ranking"
                  component={RankingScreen}
                  options={{ title: 'Ranking' }}
                />
                <Stack.Screen
                  name="Profile"
                  component={ProfileScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Welcome"
                  component={WelcomeScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Transition"
                  component={TransitionScreen}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SessionServiceProvider>
        </UserProgressProvider>
      </ModelServiceProvider>
    </GestureHandlerRootView>
  );
};

export default App;
const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: '#FAFBFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});