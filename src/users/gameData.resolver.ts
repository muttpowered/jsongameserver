import { HttpException, UseGuards, Logger } from '@nestjs/common';
import {
  Args,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { GQLJwtAuthGuard } from 'src/common/authguards/gqljwt.authguard';
import { UserDec, TestTwoDec } from 'src/common/decorators/user.decorator';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { GameData, LoginRequest } from 'src/graphql';

@Resolver('GameData')
export class GameDataResolver {
  // constructor(private readonly usersService: UsersService) {}

  @ResolveProperty('hello')
  // @UseGuards(GQLJwtAuthGuard)
  // we can get info.fieldname to determine what we're geetting here.
  getField(@Parent() gameData: GameData): string {
    Logger.log(`resolving for hello`);
    return gameData.hello;
  }
}
