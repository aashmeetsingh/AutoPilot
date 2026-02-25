import { Model } from '@nozbe/watermelondb';
import { field, json, relation, date } from '@nozbe/watermelondb/decorators';

const sanitizeObject = (raw: any) =>
    typeof raw === 'object' && raw !== null ? raw : {};

export class Quest extends Model {
    static table = 'quests';

    static associations = {
        user_profiles: { type: 'belongs_to', key: 'user_id' },
    } as const;

    @field('title') title!: string;
    @field('description') description!: string;
    @field('type') type!: string;
    @field('status') status!: string;
    @field('progress') progress!: number;
    @field('goal') goal!: number;
    @json('rewards', sanitizeObject) rewards!: any;
    @date('expires_at') expiresAt!: number;

    @relation('user_profiles', 'user_id') user!: any;
}
