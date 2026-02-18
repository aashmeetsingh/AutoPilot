import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export class DailyActivity extends Model {
  static table = 'daily_activity';

  @field('user_id') userId!: string;
  @field('date') date!: string;
  @field('minutes_practiced') minutesPracticed!: number;
  @field('xp_earned') xpEarned!: number;
  @field('exercises_completed') exercisesCompleted!: number;
}
