import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDec } from 'src/common/decorators/user.decorator';
import { User } from './user.entity';

@Controller('user')
export class UsersController {

    // other login methods
    @Get('secret')
    @UseGuards(AuthGuard('jwt'))
    superSecret(@UserDec() user: User): string {
        Logger.log(user);
        return 'hullo';
    }

    @Get('pub')
    publicStuff(): string {
        return 'hullo world';
    }
}
