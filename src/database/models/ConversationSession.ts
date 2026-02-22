import { Model } from '@nozbe/watermelondb';
import { field, relation, children, date } from '@nozbe/watermelondb/decorators';
import { Message } from './Message';
import { UserProfile } from './UserProfile';
import { TutorPersona } from './TutorPersona';
import { Scenario } from './Scenario';

export class ConversationSession extends Model {
    static table = 'conversation_sessions';

    static associations = {
        user_profiles: { type: 'belongs_to', key: 'user_id' },
        tutor_personas: { type: 'belongs_to', key: 'tutor_id' },
        scenarios: { type: 'belongs_to', key: 'scenario_id' },
        messages: { type: 'has_many', foreignKey: 'session_id' },
    } as const;

    @date('start_time') startTime!: number;
    @date('end_time') endTime!: number;
    @field('status') status!: string;
    @field('topic') topic!: string;
    @field('language_code') languageCode!: string;

    @relation('user_profiles', 'user_id') user!: any;
    @relation('tutor_personas', 'tutor_id') tutor!: any;
    @relation('scenarios', 'scenario_id') scenario!: any;
    @children('messages') messages!: any;
}
