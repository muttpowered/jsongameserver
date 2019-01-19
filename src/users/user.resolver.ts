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
import { GameData } from 'src/graphql';

@Resolver('User')
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('user')
  // @UseGuards(GQLJwtAuthGuard)
  async getUser(@UserDec() user: User, @Args('id') id: number) {
    Logger.log(`trting to resolve for ${id}`);
    return await this.usersService.findOneById(id);
  }

  @ResolveProperty('gameData')
  async getGameData(
    @UserDec() currentUser: User,
    @Parent() user,
    @TestTwoDec() args,
  ): Promise<GameData> {
    Logger.log(`Current user ${currentUser}`);
    Logger.log(`Args are ${JSON.stringify(args)}`);
    return await this.usersService.getGameData(user);
  }
}
