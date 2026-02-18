import {Model} from '@nozbe/watermelondb';
import {field, date, readonly} from '@nozbe/watermelondb/decorators';

export class UserAchievement extends Model {
  static table = 'user_achievements';

  @field('user_id') userId!: string;
  @field('achievement_id') achievementId!: string;
  @readonly @date('unlocked_at') unlockedAt!: Date;
}
