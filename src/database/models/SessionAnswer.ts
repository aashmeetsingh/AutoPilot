import {Model} from '@nozbe/watermelondb';
import {field, date, readonly} from '@nozbe/watermelondb/decorators';

export class SessionAnswer extends Model {
  static table = 'session_answers';

  @field('session_id') sessionId!: string;
  @field('exercise_id') exerciseId!: string;
  @field('user_answer') userAnswer!: string;
  @field('correct_answer') correctAnswer!: string;
  @field('is_correct') isCorrect!: boolean;
  @field('time_spent_ms') timeSpentMs!: number;
  @field('xp_earned') xpEarned!: number;
  @readonly @date('created_at') createdAt!: Date;
}
