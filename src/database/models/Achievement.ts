import { Model } from '@nozbe/watermelondb';
import { field, json } from '@nozbe/watermelondb/decorators';

const sanitizeObject = (raw: any) =>
  typeof raw === 'object' && raw !== null ? raw : {};

export class Achievement extends Model {
  static table = 'achievements';

  @field('title') title!: string;
  @field('description') description!: string;
  @field('icon_url') iconUrl!: string;
  @field('category') category!: string;
  @json('criteria', sanitizeObject) criteria!: any;
  @field('xp_reward') xpReward!: number;
}
