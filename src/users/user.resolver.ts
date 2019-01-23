import { HttpException, UseGuards, Logger } from '@nestjs/common';
import {
  Args,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
  Mutation,
} from '@nestjs/graphql';
import { GQLJwtAuthGuard } from 'src/common/authguards/gqljwt.authguard';
import { UserDec } from 'src/common/decorators/user.decorator';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { JSON, UserDataRequest } from 'src/graphql';

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
  async updateUserData(@UserDec() currentUser: User, @Args('input') udr: UserDataRequest): Promise<User> {
    // take the data, and save it
    Logger.log(`SAving with ${JSON.stringify(currentUser)}`);
    Logger.log(`Saving - ${JSON.stringify(udr.newGameData)}`);
    return await this.usersService.setGameData(currentUser, udr.newGameData);
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
