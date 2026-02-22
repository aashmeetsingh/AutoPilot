import { Model } from '@nozbe/watermelondb';
import { field, json, relation } from '@nozbe/watermelondb/decorators';

const sanitizeSettings = (raw: any) =>
    typeof raw === 'object' && raw !== null ? raw : {};

export class UserSettings extends Model {
    static table = 'user_settings';

    static associations = {
        user_profiles: { type: 'belongs_to', key: 'user_id' },
    } as const;

    @field('theme') theme!: string;
    @json('notifications', sanitizeSettings) notifications!: any;
    @json('audio_settings', sanitizeSettings) audioSettings!: any;

    @relation('user_profiles', 'user_id') user!: any;
}
