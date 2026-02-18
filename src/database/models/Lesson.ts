import {Model} from '@nozbe/watermelondb';
import {field, date, readonly, json} from '@nozbe/watermelondb/decorators';

export class Lesson extends Model {
  static table = 'lessons';

  @field('title') title!: string;
  @field('description') description!: string;
  @field('difficulty') difficulty!: number;
  @field('skill_node') skillNode!: string;
  @field('estimated_minutes') estimatedMinutes!: number;
  @json('exercises', (json: any) => json) exercises!: any[];
  @json('learning_objectives', (json: any) => json) learningObjectives!: string[];
  @json('prerequisites', (json: any) => json) prerequisites!: string[];
  @json('tags', (json: any) => json) tags!: string[];
  @readonly @date('created_at') createdAt!: Date;
}
