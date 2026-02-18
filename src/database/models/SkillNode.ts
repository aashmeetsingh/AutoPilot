import {Model} from '@nozbe/watermelondb';
import {field, json} from '@nozbe/watermelondb/decorators';

export class SkillNode extends Model {
  static table = 'skill_nodes';

  @field('title') title!: string;
  @field('description') description!: string;
  @field('icon') icon!: string;
  @json('prerequisites', (json: any) => json) prerequisites!: string[];
  @json('lessons', (json: any) => json) lessons!: string[];
  @json('position', (json: any) => json) position!: {x: number; y: number};
  @field('category') category!: string;
}
