# AutoPilot MVP - Local Database Backend

## Summary

I've successfully set up **WatermelonDB** as your offline-first local database backend! Your app now has a robust SQLite-based data layer that works 100% offline.

---

## What's Been Implemented

### 1. **Database Infrastructure**
- Installed WatermelonDB with SQLite adapter
- Configured Babel for decorators support
- Updated TypeScript config for experimental decorators
- Set up JSI mode for maximum performance

### 2. **Database Schema** (`src/database/schemas/index.ts`)
Created 10 tables to support all app features:

**Core Tables:**
- `users` - User profiles, XP, levels, streaks
- `lessons` - Lesson content with exercises (JSON)
- `sessions` - Learning session tracking
- `session_answers` - Individual exercise answers
- `achievements` - Achievement definitions
- `user_achievements` - Unlocked achievements per user
- `skill_nodes` - Skill tree structure
- `user_skill_progress` - User progress on skill tree
- `srs_items` - Spaced repetition system data
- `daily_activity` - Daily practice analytics

### 3. **Data Models** (`src/database/models/`)
Created 10 WatermelonDB model classes with decorators:
- `User.ts`
- `Lesson.ts`
- `Session.ts`
- `SessionAnswer.ts`
- `Achievement.ts`
- `UserAchievement.ts`
- `SkillNode.ts`
- `UserSkillProgress.ts`
- `SRSItem.ts`
- `DailyActivity.ts`

### 4. **Database Instance** (`src/database/index.ts`)
- Configured SQLite adapter with JSI
- Registered all model classes
- Exported database instance for app-wide use

---

## Next Steps to Complete MVP

### Step 1: Seed Initial Data
Create a seed script to populate the database with:
- Initial lessons from `src/data/lessons.json`
- Skill tree from `src/data/skillTree.json`
- Achievements from `src/data/achievements.json`

### Step 2: Update Services
Refactor existing services to use WatermelonDB:
- **UserProgressService**: Replace AsyncStorage with User model queries
- **SessionService**: Use Session and SessionAnswer models
- Add reactive queries (observables) for real-time UI updates

### Step 3: Native Setup (Required!)
**iOS:**
```bash
cd ios && pod install && cd ..
```

**Android:**
No additional setup needed (auto-linked)

### Step 4: Test the Database
Run the app and verify:
```bash
# Start Metro
npx react-native start

# Run on device/simulator
npx react-native run-ios
# or
npx react-native run-android
```

---

## Usage Example

### Creating a User
```typescript
import {database} from './database';
import {User} from './database/models';

// Create
await database.write(async () => {
  const user = await database.collections.get<User>('users').create(user => {
    user.name = 'John Doe';
    user.targetLanguage = 'Spanish';
    user.nativeLanguage = 'English';
    user.dailyGoalMinutes = 10;
    user.xp = 0;
    user.level = 1;
    user.streak = 0;
    user.lastActiveDate = new Date().toISOString();
    user.longestStreak = 0;
    user.totalMinutesLearned = 0;
  });
});
```

### Querying Data (Observable)
```typescript
import {database} from './database';
import {Q} from '@nozbe/watermelondb';

// Get user and observe changes
const user$ = database.collections.get<User>('users')
  .query(Q.where('id', 'user123'))
  .observe();

// In React component
import {useObservable} from '@nozbe/with-observables';

const MyComponent = () => {
  const user = useObservable(user$);
  return <Text>{user?.name}</Text>;
};
```

### Updating XP
```typescript
await database.write(async () => {
  await user.update(user => {
    user.xp += 50;
    user.level = Math.floor(user.xp / 100) + 1;
  });
});
```

---

## Key Features

### Offline-First
- All data stored locally in SQLite
- No internet required after initial setup
- Fast queries with indexing

### Reactive/Observable
- Data changes automatically update UI
- Use `withObservables` HOC or `useObservable` hook
- No manual re-fetching needed

### Performance
- JSI mode (native module calls without bridge)
- Lazy loading (only load data when needed)
- Efficient queries with Q matchers

### Future: Optional Sync
When you're ready to add cloud backup:
- WatermelonDB has built-in sync support
- Implement sync endpoints for push/pull
- Conflict resolution strategies available

---

## File Structure

```
src/
└── database/
    ├── index.ts                 # Database instance
    ├── schemas/
    │   └── index.ts            # Table schemas
    └── models/
        ├── index.ts            # Model exports
        ├── User.ts
        ├── Lesson.ts
        ├── Session.ts
        ├── SessionAnswer.ts
        ├── Achievement.ts
        ├── UserAchievement.ts
        ├── SkillNode.ts
        ├── UserSkillProgress.ts
        ├── SRSItem.ts
        └── DailyActivity.ts
```

---

## Benefits for Your MVP

1. **100% Offline**: Works without any internet connection
2. **Fast Performance**: Native SQLite queries
3. **Scalable**: Can handle thousands of records
4. **Maintainable**: Clear schema and model definitions
5. **Future-proof**: Easy to add cloud sync later

---

## What's Different from AsyncStorage?

| Feature | AsyncStorage | WatermelonDB |
|---------|--------------|--------------|
| Storage Type | Key-value | Relational (SQLite) |
| Query Capability | None | Complex queries with indexes |
| Performance | Slow for large data | Fast, optimized |
| Relationships | Manual | Built-in relations |
| Observables | No | Yes (reactive) |
| Migrations | Manual | Built-in |

---

## Ready to Use!

Your backend is ready for the MVP. The database will be created automatically on first app launch. Next, you just need to:

1. Run `cd ios && pod install && cd ..` (iOS only)
2. Create a seed data script
3. Update your services to use the database
4. Test on a physical device

Your app will work completely offline with a robust local database!
