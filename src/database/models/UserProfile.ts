import { Model } from '@nozbe/watermelondb';
import { field, json, children, date } from '@nozbe/watermelondb/decorators';
import { UserSettings } from './UserSettings';
import { UserProgress } from './UserProgress';
import { Quest } from './Quest';
import { ConversationSession } from './ConversationSession';

const sanitizeLanguages = (languages: any) =>
    Array.isArray(languages) ? languages : [];

export class UserProfile extends Model {
    static table = 'user_profiles';

    static associations = {
        user_settings: { type: 'has_many', foreignKey: 'user_id' },
        user_progress: { type: 'has_many', foreignKey: 'user_id' },
        quests: { type: 'has_many', foreignKey: 'user_id' },
        conversation_sessions: { type: 'has_many', foreignKey: 'user_id' },
    } as const;

    @field('username') username!: string;
    @field('email') email!: string;
    @field('native_language') nativeLanguage!: string;
    @json('target_languages', sanitizeLanguages) targetLanguages!: any[];
    @date('last_active_at') lastActiveAt!: number;
    @date('created_at') createdAt!: number;

    @children('user_settings') settings!: any;
    @children('user_progress') progress!: any;
    @children('quests') quests!: any;
    @children('conversation_sessions') sessions!: any;
}
