import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 2, // Incremented version since schema changed completely
  tables: [
    // --- USERS DOMAIN ---

    tableSchema({
      name: 'user_profiles',
      columns: [
        { name: 'username', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'native_language', type: 'string' },
        { name: 'target_languages', type: 'string' }, // JSON array of {languageCode, proficiencyLevel}
        { name: 'last_active_at', type: 'number' },
        { name: 'created_at', type: 'number' },
      ],
    }),

    tableSchema({
      name: 'user_settings',
      columns: [
        { name: 'user_id', type: 'string', isIndexed: true }, // FK to user_profiles
        { name: 'theme', type: 'string' },
        { name: 'notifications', type: 'string' }, // JSON object
        { name: 'audio_settings', type: 'string' }, // JSON object
      ],
    }),

    tableSchema({
      name: 'user_progress',
      columns: [
        { name: 'user_id', type: 'string', isIndexed: true }, // FK
        { name: 'language_code', type: 'string' },
        { name: 'xp', type: 'number' },
        { name: 'streak', type: 'number' },
        { name: 'last_practice_date', type: 'number' },
        { name: 'topics_mastered', type: 'string' }, // JSON array of strings
        { name: 'vocabulary_count', type: 'number' },
      ],
    }),

    // --- CONVERSATIONS & TUTOR DOMAIN ---

    tableSchema({
      name: 'tutor_personas',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'avatar_url', type: 'string' },
        { name: 'voice_id', type: 'string' },
        { name: 'traits', type: 'string' }, // JSON array
        { name: 'specialties', type: 'string' }, // JSON array
        { name: 'languages', type: 'string' }, // JSON array
      ],
    }),

    tableSchema({
      name: 'scenarios',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'difficulty_level', type: 'string' },
        { name: 'roles', type: 'string' }, // JSON object
        { name: 'objectives', type: 'string' }, // JSON array
        { name: 'initial_message', type: 'string' },
      ],
    }),

    tableSchema({
      name: 'knowledge_base_entries',
      columns: [
        { name: 'topic', type: 'string' },
        { name: 'language_code', type: 'string' },
        { name: 'content', type: 'string' },
        { name: 'difficulty_level', type: 'string' },
        { name: 'tags', type: 'string' }, // JSON array
      ],
    }),

    tableSchema({
      name: 'conversation_sessions',
      columns: [
        { name: 'user_id', type: 'string', isIndexed: true }, // FK
        { name: 'tutor_id', type: 'string', isIndexed: true }, // FK
        { name: 'scenario_id', type: 'string', isIndexed: true }, // FK
        { name: 'start_time', type: 'number' },
        { name: 'end_time', type: 'number', isOptional: true },
        { name: 'status', type: 'string' },
        { name: 'topic', type: 'string' },
        { name: 'language_code', type: 'string' },
      ],
    }),

    tableSchema({
      name: 'messages',
      columns: [
        { name: 'session_id', type: 'string', isIndexed: true }, // FK
        { name: 'sender', type: 'string' }, // "user" | "tutor" | "system"
        { name: 'content', type: 'string' },
        { name: 'audio_url', type: 'string', isOptional: true },
        { name: 'timestamp', type: 'number' },
        { name: 'corrections', type: 'string', isOptional: true }, // JSON array of {original, corrected, explanation}
      ],
    }),

    // --- GAMIFICATION DOMAIN ---

    tableSchema({
      name: 'achievements',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'icon_url', type: 'string' },
        { name: 'category', type: 'string' },
        { name: 'criteria', type: 'string' }, // JSON object
        { name: 'xp_reward', type: 'number' },
      ],
    }),

    tableSchema({
      name: 'quests',
      columns: [
        { name: 'user_id', type: 'string', isIndexed: true }, // FK
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'type', type: 'string' }, // daily, weekly, special
        { name: 'status', type: 'string' }, // active, completed, expired
        { name: 'progress', type: 'number' },
        { name: 'goal', type: 'number' },
        { name: 'rewards', type: 'string' }, // JSON object {xp, currency}
        { name: 'expires_at', type: 'number' },
      ],
    }),

    tableSchema({
      name: 'leaderboards',
      columns: [
        { name: 'type', type: 'string' }, // global, friends, league
        { name: 'period', type: 'string' }, // daily, weekly, all-time
        { name: 'entries', type: 'string' }, // JSON array containing userId rankings
        { name: 'updated_at', type: 'number' },
      ],
    }),

  ],
});
