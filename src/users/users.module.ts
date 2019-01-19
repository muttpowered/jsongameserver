import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { GameDataResolver } from './gameData.resolver';

// Setup app from here, add other modules as needed
@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule,
    ],
    controllers: [
        UsersController,
    ],
    providers: [
        UsersService,
        UserResolver,
        GameDataResolver,
    ],
    exports: [
        UsersService,
    ],
})
export class UsersModule { }
