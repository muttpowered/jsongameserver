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
        return await this.authService.loginWithCustomId(lr.customId);
    }

}
