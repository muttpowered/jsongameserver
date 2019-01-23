import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from 'src/graphql';
import { UsersService } from '../users/users.service';
// import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async loginWithCustomId(customId: string): Promise<LoginResponse> {
    // see if there's a user here.
    let user = await this.usersService.findOneByCustomLoginId(customId);
    const lr: LoginResponse = {
      expiresAt: 0,
      isNew: false,
      token: ``,
      userId: 0,
    };
    if (!user) {
      // no user, make one!
      lr.isNew = true;
      user = await this.usersService.createUserByCustomId(customId);
    }
    const jwtSigningObject: any = { customId: user.name };
    const token = this.jwtService.sign(jwtSigningObject);
    lr.token = token;
    lr.expiresAt = Math.floor((Date.now() + 7200000) / 1000);
    lr.userId = user.id;

    return lr;
  }

  async createFakeUser(): Promise<any> {
    return await this.usersService.createFakeUser();
  }

  // Called by authguards
  async validateUser(payload: any): Promise<any> {
    return await this.usersService.findOneByCustomLoginId(payload.customId);
  }
}
