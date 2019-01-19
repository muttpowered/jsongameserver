import { Logger } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginRequest, LoginResponse } from 'src/graphql';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Mutation()
    async login(@Args('input') lr: LoginRequest): Promise<LoginResponse> {
        Logger.log(`Logging in with ${JSON.stringify(lr.customId)}`);
        return await this.authService.loginWithCustomId(lr.customId);
    }

}
