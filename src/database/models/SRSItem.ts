import {Model} from '@nozbe/watermelondb';
import {field, date} from '@nozbe/watermelondb/decorators';

export class SRSItem extends Model {
  static table = 'srs_items';

  @field('user_id') userId!: string;
  @field('item_id') itemId!: string;
  @field('item_type') itemType!: string;
  @field('e_factor') eFactor!: number;
  @field('interval_days') intervalDays!: number;
  @field('repetition_count') repetitionCount!: number;
  @date('next_review') nextReview!: Date;
  @date('last_reviewed') lastReviewed!: Date;
}
