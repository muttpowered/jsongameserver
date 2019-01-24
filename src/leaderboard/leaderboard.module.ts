import { Module } from '@nestjs/common';
import { DBCacheModule } from 'src/dbcache/dbcache.module';

import { LeaderboardResolver } from './leaderboard.resolver';
import { LeaderboardService } from './leaderboard.service';

@Module({
    imports: [DBCacheModule],
    providers: [LeaderboardService, LeaderboardResolver],
    exports: [LeaderboardService],
})
export class LeaderboardModule { }
