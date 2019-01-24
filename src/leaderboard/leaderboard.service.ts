import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { User } from 'src/users/user.entity';

@Injectable()
export class LeaderboardService {

  constructor(private readonly redisService: RedisService) { }

  // Save the users level to the leaderboard using redis sorted sets.
  async updateLeaderboardPosition(u: User): Promise<User> {
    // update the level for the user
    await this.redisService.getClient().zadd('leaderboard', `${u.level}`, u.name);
    // return the user to the call 
    return u;
  }

  // Return the users score in a map
  async getLeaderboard(): Promise<any> {
    let listing: Array<string> = await this.redisService.getClient().zrevrange('leaderboard', 0, 10, "WITHSCORES");
    // The scores come back from zrevrange in an array of name, score, name, score, etc.
    let scores = {};
    while(listing.length > 0){
      let key = listing.shift();
      let value = listing.shift();
      scores[key] = parseInt(value);
    }
    return await scores;
  }
}
