import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secretOrPrivateKey: 'secretKeyYouCantGuessMe',
            signOptions: {
                expiresIn: 7200,
            },
        }),
        UsersModule,
    ],
    providers: [AuthService, JwtStrategy, AuthResolver],
})
export class AuthModule { }
