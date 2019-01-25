import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { GQLJwtAuthGuard } from 'src/common/authguards/gqljwt.authguard';
import { UserDec } from 'src/common/decorators/user.decorator';
import { JSON, LevelSaveRequest, UserDataRequest } from 'src/graphql';

import { User } from './user.entity';
import { UsersService } from './users.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly usersService: UsersService) { }

  @Query('user')
  @UseGuards(GQLJwtAuthGuard)
  async getUser(@UserDec() user: User, @Args('id') id: number) {
    return await this.usersService.findOneById(id);
  }

  @Mutation()
  @UseGuards(GQLJwtAuthGuard)
  async updateUserGameData(@UserDec() currentUser: User, @Args('input') udr: UserDataRequest): Promise<User> {
    // Save free form data here.
    return await this.usersService.setGameData(currentUser, udr.newGameData);
  }

  @Mutation()
  @UseGuards(GQLJwtAuthGuard)
  async saveLevelResult(@UserDec() currentUser: User, @Args('input') input: LevelSaveRequest): Promise<User> {
    // Send it to the user service 
    return await this.usersService.saveLevelResult(currentUser, input.score);
  }

  @ResolveProperty('gameData')
  @UseGuards(GQLJwtAuthGuard)
  async getGameData(
    @UserDec() currentUser: User,
    @Parent() user
  ): Promise<JSON> {
    return await this.usersService.getGameData(user);
  }
}
