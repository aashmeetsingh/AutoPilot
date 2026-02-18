import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {schema} from './schemas';
import * as models from './models';

const adapter = new SQLiteAdapter({
  schema,
  // Optional: enables migrations for future schema updates
  // migrations,
  jsi: true, // Use JSI for better performance (RN 0.68+)
  onSetUpError: error => {
    // Handle database setup errors
    console.error('WatermelonDB Setup Error:', error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [
    models.User,
    models.Lesson,
    models.Session,
    models.SessionAnswer,
    models.Achievement,
    models.UserAchievement,
    models.SkillNode,
    models.UserSkillProgress,
    models.SRSItem,
    models.DailyActivity,
  ],
});
