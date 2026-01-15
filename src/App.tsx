import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import RunAnywhere from '@runanywhere/core';
import { ModelServiceProvider, registerDefaultModels } from './services/ModelService';
import { AppColors } from './theme';
import {
  HomeScreen,
  ChatScreen,
  SpeechToTextScreen,
  TextToSpeechScreen,
  VoicePipelineScreen,
} from './screens';
import { RootStackParamList } from './navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  useEffect(() => {
    // Initialize SDK
    const initializeSDK = async () => {
      try {
        // Initialize RunAnywhere SDK
        await RunAnywhere.initialize();

        // Register backends
        const { LlamaCpp } = await import('@runanywhere/llamacpp');
        const { Onnx } = await import('@runanywhere/onnx');
        
        await LlamaCpp.register();
        await Onnx.register();

        // Register default models
        await registerDefaultModels();

        console.log('RunAnywhere SDK initialized successfully');
      } catch (error) {
        console.error('Failed to initialize RunAnywhere SDK:', error);
      }
    };

    initializeSDK();
  }, []);

  return (
    <ModelServiceProvider>
      <StatusBar barStyle="light-content" backgroundColor={AppColors.primaryDark} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: AppColors.primaryDark,
            },
            headerTintColor: AppColors.textPrimary,
            headerTitleStyle: {
              fontWeight: '700',
              fontSize: 18,
            },
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: AppColors.primaryDark,
            },
          }}
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
        </Stack.Navigator>
      </NavigationContainer>
    </ModelServiceProvider>
  );
};

export default App;
