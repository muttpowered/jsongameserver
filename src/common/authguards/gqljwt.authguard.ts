import { ExecutionContext, Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context.host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

// General guard, makes sure the user is authenticated
@Injectable()
export class GQLJwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();
        return super.canActivate(new ExecutionContextHost([req]));
    }
    handleRequest(err, user, info) {
        Logger.log(err);
        Logger.log(user);
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}
