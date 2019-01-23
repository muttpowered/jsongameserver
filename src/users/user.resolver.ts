import { HttpException, UseGuards, Logger } from '@nestjs/common';
import {
  Args,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { GQLJwtAuthGuard } from 'src/common/authguards/gqljwt.authguard';
import { UserDec } from 'src/common/decorators/user.decorator';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { JSON } from 'src/graphql';

@Resolver('User')
export class UserResolver {
  constructor(private readonly usersService: UsersService) { }

  @Query('user')
  @UseGuards(GQLJwtAuthGuard)
  async getUser(@UserDec() user: User, @Args('id') id: number) {
    return await this.usersService.findOneById(id);
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
