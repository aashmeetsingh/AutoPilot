import { Model } from '@nozbe/watermelondb';
import { field, json, relation, date } from '@nozbe/watermelondb/decorators';
import { ConversationSession } from './ConversationSession';

const sanitizeArray = (raw: any) =>
    Array.isArray(raw) ? raw : null;

export class Message extends Model {
    static table = 'messages';

    static associations = {
        conversation_sessions: { type: 'belongs_to', key: 'session_id' },
    } as const;

    @field('sender') sender!: 'user' | 'tutor' | 'system';
    @field('content') content!: string;
    @field('audio_url') audioUrl!: string;
    @date('timestamp') timestamp!: number;
    @json('corrections', sanitizeArray) corrections!: any[] | null;

    @relation('conversation_sessions', 'session_id') session!: any;
}
