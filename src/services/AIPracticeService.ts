import { RunAnywhere } from '@runanywhere/core';
import { DailyExerciseType } from '../components/ExerciseModal';

export interface AIExercise {
  question: string;
  answer: string;
  type: DailyExerciseType;
  hint?: string;
  difficulty: number;
  category: string;
  options?: string[];
  wordBank?: string[];
  blankPosition?: number;
  context?: string;
}

export interface PracticeSession {
  id: string;
  exercises: AIExercise[];
  targetLanguage: string;
  createdAt: Date;
}

const EXERCISE_PROMPTS = {
  typing: (lang: string, difficulty: number) =>
    `Generate a language learning exercise for ${lang} at difficulty ${difficulty}/5. 
    Focus on vocabulary translation. Provide a JSON object with keys: question, answer, hint, category.
    - question: A clear instruction like "Translate to [language]: [English phrase]"
    - answer: The correct translation
    - hint: A helpful hint for beginners
    - category: One of "greetings", "numbers", "food", "travel", "daily-routines", "emotions"
    Respond with ONLY valid JSON, no other text.`,

  tts: (lang: string, difficulty: number) =>
    `Generate a language learning speaking exercise for ${lang} at difficulty ${difficulty}/5.
    Focus on pronunciation and speaking. Provide a JSON object with keys: question, answer, hint, category.
    - question: A phrase the user should speak aloud in ${lang}
    - answer: The phrase in ${lang} (for comparison)
    - hint: A brief tip about pronunciation
    - category: One of "greetings", "numbers", "food", "travel", "daily-routines", "emotions"
    Respond with ONLY valid JSON, no other text.`,

  stt: (lang: string, difficulty: number) =>
    `Generate a language learning listening exercise for ${lang} at difficulty ${difficulty}/5.
    Focus on comprehension and dictation. Provide a JSON object with keys: question, answer, hint, category.
    - question: Tell the user to listen and type what they hear (in English)
    - answer: A simple phrase in ${lang} they should transcribe
    - hint: A clue about what they'll hear
    - category: One of "greetings", "numbers", "food", "travel", "daily-routines", "emotions"
    Respond with ONLY valid JSON, no other text.`,

  written: (lang: string, difficulty: number) =>
    `Generate a language learning writing exercise for ${lang} at difficulty ${difficulty}/5.
    Focus on sentence construction. Provide a JSON object with keys: question, answer, hint, category.
    - question: A prompt asking the user to write something in ${lang}
    - answer: An example correct response
    - hint: Grammar structure hint
    - category: One of "greetings", "numbers", "food", "travel", "daily-routines", "emotions"
    Respond with ONLY valid JSON, no other text.`,
};

class AIPracticeService {
  private sessionHistory: PracticeSession[] = [];
  private currentDifficulty: number = 1;

  async generateExercise(
    type: DailyExerciseType,
    targetLanguage: string = 'Spanish',
    difficulty?: number
  ): Promise<AIExercise> {
    const diff = difficulty || this.currentDifficulty;

    // MVP: Use hardcoded exercises for French
    if (targetLanguage === 'French') {
      return this.getFallbackExercise(type, targetLanguage);
    }

    try {
      const prompt = EXERCISE_PROMPTS[type](targetLanguage, diff);

      const result = await RunAnywhere.generate(prompt, {
        maxTokens: 300,
        temperature: 0.7,
        systemPrompt: 'You are a language learning AI. Respond with VALID JSON only. Do not include thinking process or other text.',
      });

      const parsed = this.parseJSONResponse(result.text);

      if (parsed && parsed.question && parsed.answer) {
        return {
          question: parsed.question,
          answer: parsed.answer,
          type,
          hint: parsed.hint || undefined,
          difficulty: diff,
          category: parsed.category || 'general',
        };
      }
    } catch (error) {
      console.error('AI Exercise generation error:', error);
    }

    return this.getFallbackExercise(type, targetLanguage);
  }

  async generatePracticeSet(
    targetLanguage: string = 'Spanish',
    count: number = 4,
    includeTypes?: DailyExerciseType[]
  ): Promise<AIExercise[]> {
    const types: DailyExerciseType[] = includeTypes || ['typing', 'tts', 'stt', 'written'];
    const exercises: AIExercise[] = [];

    const difficulty = this.currentDifficulty;

    for (let i = 0; i < Math.min(count, types.length); i++) {
      const exercise = await this.generateExercise(types[i], targetLanguage, difficulty);
      exercises.push(exercise);
    }

    return exercises;
  }

  async generateDailyChallenge(
    targetLanguage: string = 'Spanish'
  ): Promise<AIExercise[]> {
    const types: DailyExerciseType[] = ['typing', 'tts', 'stt', 'written'];
    const exercises: AIExercise[] = [];

    const difficulty = this.currentDifficulty;

    for (const type of types) {
      const exercise = await this.generateExercise(type, targetLanguage, difficulty);
      exercises.push(exercise);
    }

    const session: PracticeSession = {
      id: Date.now().toString(),
      exercises,
      targetLanguage,
      createdAt: new Date(),
    };

    this.sessionHistory.push(session);

    if (this.sessionHistory.length > 30) {
      this.sessionHistory = this.sessionHistory.slice(-30);
    }

    return exercises;
  }

  async generateConversationTopic(
    targetLanguage: string = 'Spanish'
  ): Promise<{ topic: string; prompt: string; vocabulary: string[] }> {
    const prompt = `Generate a conversation practice topic for ${targetLanguage} language learners.
    Provide a JSON object with keys: topic, prompt, vocabulary.
    - topic: A short title for the conversation scenario
    - prompt: A prompt to start the conversation (in English)
    - vocabulary: Array of 5-8 useful words/phrases for this conversation
    Respond with ONLY valid JSON.`;

    try {
      const result = await RunAnywhere.generate(prompt, {
        maxTokens: 400,
        temperature: 0.8,
        systemPrompt: 'You are a language learning AI. Always respond with valid JSON only.',
      });

      const parsed = this.parseJSONResponse(result.text);

      if (parsed && parsed.topic && parsed.prompt) {
        return {
          topic: parsed.topic,
          prompt: parsed.prompt,
          vocabulary: parsed.vocabulary || [],
        };
      }
    } catch (error) {
      console.error('Conversation topic generation error:', error);
    }

    return {
      topic: 'At the Restaurant',
      prompt: 'Practice ordering food and making requests at a restaurant.',
      vocabulary: ['Menu', 'Bill', 'Water', 'Delicious', 'Thank you'],
    };
  }

  async generateGrammarExplanation(
    grammarPoint: string,
    targetLanguage: string = 'Spanish'
  ): Promise<{ explanation: string; examples: string[]; tips: string[] }> {
    const prompt = `Explain the grammar concept "${grammarPoint}" in ${targetLanguage} for beginners.
    Provide a JSON object with keys: explanation, examples, tips.
    - explanation: A simple 1-2 sentence explanation in English
    - examples: Array of 3-4 example sentences showing the grammar
    - tips: Array of 2-3 helpful tips for learners
    Respond with ONLY valid JSON.`;

    try {
      const result = await RunAnywhere.generate(prompt, {
        maxTokens: 500,
        temperature: 0.7,
        systemPrompt: 'You are a language learning AI. Always respond with valid JSON only.',
      });

      const parsed = this.parseJSONResponse(result.text);

      if (parsed && parsed.explanation) {
        return {
          explanation: parsed.explanation,
          examples: parsed.examples || [],
          tips: parsed.tips || [],
        };
      }
    } catch (error) {
      console.error('Grammar explanation error:', error);
    }

    return {
      explanation: `${grammarPoint} is an important grammar concept in ${targetLanguage}.`,
      examples: ['Example 1', 'Example 2', 'Example 3'],
      tips: ['Tip 1', 'Tip 2'],
    };
  }

  private parseJSONResponse(text: string): any | null {
    try {
      // 1. Remove <think> blocks if present
      let cleanText = text.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

      // 2. Remove markdown code fences (```json ... ```) 
      // This regex matches ```json (content) ``` or just ``` (content) ```
      const codeFenceMatch = cleanText.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (codeFenceMatch) {
        cleanText = codeFenceMatch[1];
      }

      // 3. Find the first valid JSON object
      // Using a regex to find the outermost curly braces
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      // Fallback: Try parsing the whole text if it looks like JSON
      return JSON.parse(cleanText);

    } catch (error) {
      console.error('JSON parsing error:', error);
      console.log('Raw text was:', text); // Debug log
    }
    return null;
  }

  private getFallbackExercise(type: DailyExerciseType, lang: string): AIExercise {
    // Hardcoded French exercises for MVP
    if (lang === 'French') {
      const frenchExercises: Record<DailyExerciseType, AIExercise> = {
        typing: {
          question: 'Translate to French: Good evening',
          answer: 'Bonsoir',
          type: 'typing',
          hint: 'Used after 6 PM',
          difficulty: 1,
          category: 'greetings',
        },
        tts: {
          question: 'Say in French: My name is...',
          answer: "Je m'appelle",
          type: 'tts',
          hint: 'Introduction phrase',
          difficulty: 1,
          category: 'greetings',
        },
        stt: {
          question: 'Listen and type what you hear (in English)',
          answer: 'Merci beaucoup',
          type: 'stt',
          hint: 'Means "Thank you very much"',
          difficulty: 1,
          category: 'greetings',
        },
        written: {
          question: 'Write in French: Where is the train station?',
          answer: 'Où est la gare ?',
          type: 'written',
          hint: 'Asking for directions',
          difficulty: 1,
          category: 'travel',
        },
      };
      return frenchExercises[type];
    }

    const fallbacks: Record<DailyExerciseType, AIExercise> = {
      typing: {
        question: `Translate to ${lang}: Hello`,
        answer: lang === 'Spanish' ? 'Hola' : 'Hello',
        type: 'typing',
        hint: "It's a common greeting",
        difficulty: 1,
        category: 'greetings',
      },
      tts: {
        question: `Say in ${lang}: Good morning`,
        answer: lang === 'Spanish' ? 'Buenos días' : 'Good morning',
        type: 'tts',
        hint: 'A morning greeting',
        difficulty: 1,
        category: 'greetings',
      },
      stt: {
        question: `Listen and type what you hear: Thank you`,
        answer: lang === 'Spanish' ? 'Gracias' : 'Thank you',
        type: 'stt',
        hint: 'A polite expression',
        difficulty: 1,
        category: 'greetings',
      },
      written: {
        question: `Write in ${lang}: How are you?`,
        answer: lang === 'Spanish' ? '¿Cómo estás?' : 'How are you?',
        type: 'written',
        hint: 'A common question',
        difficulty: 1,
        category: 'greetings',
      },
    };
    return fallbacks[type];
  }

  setDifficulty(level: number) {
    this.currentDifficulty = Math.max(1, Math.min(5, level));
  }

  getDifficulty(): number {
    return this.currentDifficulty;
  }

  getSessionHistory(): PracticeSession[] {
    return this.sessionHistory;
  }
}

export const aiPracticeService = new AIPracticeService();
