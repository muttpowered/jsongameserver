import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { GQLJwtAuthGuard } from 'src/common/authguards/gqljwt.authguard';

import { LeaderboardService } from './leaderboard.service';

@Resolver('Leaderboard')
export class LeaderboardResolver {
    constructor(
        private readonly leaderboardService: LeaderboardService
    ) { }

    @Query('leaderboard')
    @UseGuards(GQLJwtAuthGuard)
    async getLeaderboard(): Promise<JSON> {
        return await this.leaderboardService.getLeaderboard();
    }
}
