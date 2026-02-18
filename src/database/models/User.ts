import {Model} from '@nozbe/watermelondb';
import {field, date, readonly} from '@nozbe/watermelondb/decorators';

export class User extends Model {
  static table = 'users';

  @field('name') name!: string;
  @field('email') email?: string;
  @field('avatar') avatar?: string;
  @field('target_language') targetLanguage!: string;
  @field('native_language') nativeLanguage!: string;
  @field('daily_goal_minutes') dailyGoalMinutes!: number;
  @field('xp') xp!: number;
  @field('level') level!: number;
  @field('streak') streak!: number;
  @field('last_active_date') lastActiveDate!: string;
  @field('longest_streak') longestStreak!: number;
  @field('total_minutes_learned') totalMinutesLearned!: number;
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
