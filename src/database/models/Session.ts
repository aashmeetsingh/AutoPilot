import {Model} from '@nozbe/watermelondb';
import {field, date, json} from '@nozbe/watermelondb/decorators';

export class Session extends Model {
  static table = 'sessions';

  @field('user_id') userId!: string;
  @field('lesson_id') lessonId!: string;
  @date('started_at') startedAt!: Date;
  @date('completed_at') completedAt?: Date;
  @field('total_xp') totalXp!: number;
  @field('accuracy') accuracy!: number;
  @field('time_spent_minutes') timeSpentMinutes!: number;
  @field('exercises_completed') exercisesCompleted!: number;
  @json('session_data', (json: any) => json) sessionData!: any;
}
