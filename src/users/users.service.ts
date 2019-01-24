import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JSON } from 'src/graphql';
import { LeaderboardService } from 'src/leaderboard/leaderboard.service';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  // For now, we'll use JWT as our session monitors
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly leaderboardService: LeaderboardService,
  ) { }

  async setGameData(u: User, newData:any): Promise<User> {
    u.gameData = newData;
    return await this.userRepository.save(u);
  }

  async saveLevelResult(u: User, score: number): Promise<User> {
    // Increment the user's level and coins
    // Perhaps do some validation on the score 
    if (score > 100){
      u.coins += 10;
      u.level += 1;
      // Update our leaderboard service too!
      await this.leaderboardService.updateLeaderboardPosition(u);
      return await this.userRepository.save(u);
    }
    return await u;
  }

  async createUserByCustomId(customId: string): Promise<User> {
    const user = new User();
    user.name = customId.toLowerCase();
    user.gameData = JSON.stringify({});
    await this.userRepository.save(user);
    return user;
  }

  async getGameData(u: User): Promise<JSON> {
    return await u.gameData;
  }

  async hasUserById(id: number): Promise<boolean> {
    return (await this.userRepository.count({ id })) > 0;
  }

  async findOneByCustomLoginId(customId: string): Promise<User> {
    // query and return!
    customId = customId.toLowerCase();
    const user = await this.userRepository.findOne({ name: customId });
    return user;
  }

  async findOneById(id: number): Promise<User> {
    // query and return!
    const userArr = await this.userRepository.findByIds([id]);
    if (userArr.length > 0) {
      return userArr[0];
    }
    return null;
  }
}
