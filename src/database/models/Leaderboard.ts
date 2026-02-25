import { Model } from '@nozbe/watermelondb';
import { field, json, date } from '@nozbe/watermelondb/decorators';

const sanitizeArray = (raw: any) =>
    Array.isArray(raw) ? raw : [];

export class Leaderboard extends Model {
    static table = 'leaderboards';

    @field('type') type!: string;
    @field('period') period!: string;
    @json('entries', sanitizeArray) entries!: any[];
    @date('updated_at') updatedAt!: number;
}
