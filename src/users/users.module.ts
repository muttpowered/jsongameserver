import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaderboardModule } from 'src/leaderboard/leaderboard.module';

import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { UsersService } from './users.service';

// Setup app from here, add other modules as needed
@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule,
        LeaderboardModule,
    ],
    providers: [
        UsersService,
        UserResolver,
    ],
    exports: [
        UsersService,
    ],
})
export class UsersModule { }
