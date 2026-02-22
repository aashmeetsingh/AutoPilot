import { Model } from '@nozbe/watermelondb';
import { field, json, children } from '@nozbe/watermelondb/decorators';
import { ConversationSession } from './ConversationSession';

const sanitizeArray = (raw: any) =>
    Array.isArray(raw) ? raw : [];

export class TutorPersona extends Model {
    static table = 'tutor_personas';

    static associations = {
        conversation_sessions: { type: 'has_many', foreignKey: 'tutor_id' },
    } as const;

    @field('name') name!: string;
    @field('description') description!: string;
    @field('avatar_url') avatarUrl!: string;
    @field('voice_id') voiceId!: string;
    @json('traits', sanitizeArray) traits!: string[];
    @json('specialties', sanitizeArray) specialties!: string[];
    @json('languages', sanitizeArray) languages!: string[];

    @children('conversation_sessions') sessions!: any;
}
