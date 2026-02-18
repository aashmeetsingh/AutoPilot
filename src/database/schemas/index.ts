import {appSchema, tableSchema} from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 1,
  tables: [
    // User table
    tableSchema({
      name: 'users',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'email', type: 'string', isOptional: true},
        {name: 'avatar', type: 'string', isOptional: true},
        {name: 'target_language', type: 'string'},
        {name: 'native_language', type: 'string'},
        {name: 'daily_goal_minutes', type: 'number'},
        {name: 'xp', type: 'number'},
        {name: 'level', type: 'number'},
        {name: 'streak', type: 'number'},
        {name: 'last_active_date', type: 'string'},
        {name: 'longest_streak', type: 'number'},
        {name: 'total_minutes_learned', type: 'number'},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ],
    }),

    // Lessons table
    tableSchema({
      name: 'lessons',
      columns: [
        {name: 'title', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'difficulty', type: 'number'},
        {name: 'skill_node', type: 'string'},
        {name: 'estimated_minutes', type: 'number'},
        {name: 'exercises', type: 'string'}, // JSON
        {name: 'learning_objectives', type: 'string'}, // JSON
        {name: 'prerequisites', type: 'string'}, // JSON
        {name: 'tags', type: 'string'}, // JSON
        {name: 'created_at', type: 'number'},
      ],
    }),

    // Sessions table
    tableSchema({
      name: 'sessions',
      columns: [
        {name: 'user_id', type: 'string', isIndexed: true},
        {name: 'lesson_id', type: 'string', isIndexed: true},
        {name: 'started_at', type: 'number'},
        {name: 'completed_at', type: 'number', isOptional: true},
        {name: 'total_xp', type: 'number'},
        {name: 'accuracy', type: 'number'},
        {name: 'time_spent_minutes', type: 'number'},
        {name: 'exercises_completed', type: 'number'},
        {name: 'session_data', type: 'string'}, // JSON for detailed stats
      ],
    }),

    // Session Answers table
    tableSchema({
      name: 'session_answers',
      columns: [
        {name: 'session_id', type: 'string', isIndexed: true},
        {name: 'exercise_id', type: 'string'},
        {name: 'user_answer', type: 'string'},
        {name: 'correct_answer', type: 'string'},
        {name: 'is_correct', type: 'boolean'},
        {name: 'time_spent_ms', type: 'number'},
        {name: 'xp_earned', type: 'number'},
        {name: 'created_at', type: 'number'},
      ],
    }),

    // Achievements table
    tableSchema({
      name: 'achievements',
      columns: [
        {name: 'title', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'icon', type: 'string'},
        {name: 'type', type: 'string'},
        {name: 'requirement', type: 'string'}, // JSON
        {name: 'xp_reward', type: 'number'},
        {name: 'rarity', type: 'string'},
      ],
    }),

    // User Achievements table (many-to-many)
    tableSchema({
      name: 'user_achievements',
      columns: [
        {name: 'user_id', type: 'string', isIndexed: true},
        {name: 'achievement_id', type: 'string', isIndexed: true},
        {name: 'unlocked_at', type: 'number'},
      ],
    }),

    // Skill Nodes table
    tableSchema({
      name: 'skill_nodes',
      columns: [
        {name: 'title', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'icon', type: 'string'},
        {name: 'prerequisites', type: 'string'}, // JSON
        {name: 'lessons', type: 'string'}, // JSON
        {name: 'position', type: 'string'}, // JSON {x, y}
        {name: 'category', type: 'string'},
      ],
    }),

    // User Skill Progress table
    tableSchema({
      name: 'user_skill_progress',
      columns: [
        {name: 'user_id', type: 'string', isIndexed: true},
        {name: 'skill_node_id', type: 'string', isIndexed: true},
        {name: 'status', type: 'string'}, // locked, in-progress, mastered
        {name: 'updated_at', type: 'number'},
      ],
    }),

    // SRS Items table (Spaced Repetition System)
    tableSchema({
      name: 'srs_items',
      columns: [
        {name: 'user_id', type: 'string', isIndexed: true},
        {name: 'item_id', type: 'string'},
        {name: 'item_type', type: 'string'},
        {name: 'e_factor', type: 'number'},
        {name: 'interval_days', type: 'number'},
        {name: 'repetition_count', type: 'number'},
        {name: 'next_review', type: 'number'},
        {name: 'last_reviewed', type: 'number'},
      ],
    }),

    // Daily Activity table (for analytics)
    tableSchema({
      name: 'daily_activity',
      columns: [
        {name: 'user_id', type: 'string', isIndexed: true},
        {name: 'date', type: 'string', isIndexed: true},
        {name: 'minutes_practiced', type: 'number'},
        {name: 'xp_earned', type: 'number'},
        {name: 'exercises_completed', type: 'number'},
      ],
    }),
  ],
});
