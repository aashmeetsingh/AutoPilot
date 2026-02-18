import {Model} from '@nozbe/watermelondb';
import {field, date} from '@nozbe/watermelondb/decorators';

export class UserSkillProgress extends Model {
  static table = 'user_skill_progress';

  @field('user_id') userId!: string;
  @field('skill_node_id') skillNodeId!: string;
  @field('status') status!: 'locked' | 'in-progress' | 'mastered';
  @date('updated_at') updatedAt!: Date;
}
