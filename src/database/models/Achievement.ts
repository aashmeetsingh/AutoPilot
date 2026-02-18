import {Model} from '@nozbe/watermelondb';
import {field, json} from '@nozbe/watermelondb/decorators';

export class Achievement extends Model {
  static table = 'achievements';

  @field('title') title!: string;
  @field('description') description!: string;
  @field('icon') icon!: string;
  @field('type') type!: string;
  @json('requirement', (json: any) => json) requirement!: any;
  @field('xp_reward') xpReward!: number;
  @field('rarity') rarity!: string;
}
