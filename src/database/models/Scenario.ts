import { Model } from '@nozbe/watermelondb';
import { field, json, children } from '@nozbe/watermelondb/decorators';
import { ConversationSession } from './ConversationSession';

const sanitizeArray = (raw: any) =>
    Array.isArray(raw) ? raw : [];
const sanitizeObject = (raw: any) =>
    typeof raw === 'object' && raw !== null ? raw : {};

export class Scenario extends Model {
    static table = 'scenarios';

    static associations = {
        conversation_sessions: { type: 'has_many', foreignKey: 'scenario_id' },
    } as const;

    @field('title') title!: string;
    @field('description') description!: string;
    @field('difficulty_level') difficultyLevel!: string;
    @json('roles', sanitizeObject) roles!: any;
    @json('objectives', sanitizeArray) objectives!: string[];
    @field('initial_message') initialMessage!: string;

    @children('conversation_sessions') sessions!: any;
}
