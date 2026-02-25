import { Model } from '@nozbe/watermelondb';
import { field, json } from '@nozbe/watermelondb/decorators';

const sanitizeArray = (raw: any) =>
    Array.isArray(raw) ? raw : [];

export class KnowledgeBaseEntry extends Model {
    static table = 'knowledge_base_entries';

    @field('topic') topic!: string;
    @field('language_code') languageCode!: string;
    @field('content') content!: string;
    @field('difficulty_level') difficultyLevel!: string;
    @json('tags', sanitizeArray) tags!: string[];
}
