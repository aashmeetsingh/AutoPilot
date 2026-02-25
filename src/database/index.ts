import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { schema } from './schemas';

// --- NEW DOMAIN MODELS ---
import { UserProfile } from './models/UserProfile';
import { UserSettings } from './models/UserSettings';
import { UserProgress } from './models/UserProgress';
import { TutorPersona } from './models/TutorPersona';
import { Scenario } from './models/Scenario';
import { KnowledgeBaseEntry } from './models/KnowledgeBaseEntry';
import { ConversationSession } from './models/ConversationSession';
import { Message } from './models/Message';
import { Achievement } from './models/Achievement';
import { Quest } from './models/Quest';
import { Leaderboard } from './models/Leaderboard';

const adapter = new SQLiteAdapter({
  schema,
  jsi: true, // Use JSI for better performance (RN 0.68+)
  onSetUpError: error => {
    console.error('WatermelonDB Setup Error:', error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [
    UserProfile,
    UserSettings,
    UserProgress,
    TutorPersona,
    Scenario,
    KnowledgeBaseEntry,
    ConversationSession,
    Message,
    Achievement,
    Quest,
    Leaderboard,
  ],
});

