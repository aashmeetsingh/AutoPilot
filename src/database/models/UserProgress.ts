import { Model } from '@nozbe/watermelondb';
import { field, json, relation, date } from '@nozbe/watermelondb/decorators';

const sanitizeArray = (raw: any) =>
    Array.isArray(raw) ? raw : [];

export class UserProgress extends Model {
    static table = 'user_progress';

    static associations = {
        user_profiles: { type: 'belongs_to', key: 'user_id' },
    } as const;

    @field('language_code') languageCode!: string;
    @field('xp') xp!: number;
    @field('streak') streak!: number;
    @date('last_practice_date') lastPracticeDate!: number;
    @json('topics_mastered', sanitizeArray) topicsMastered!: string[];
    @field('vocabulary_count') vocabularyCount!: number;

    @relation('user_profiles', 'user_id') user!: any;
}
