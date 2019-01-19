import { createParamDecorator, Logger } from '@nestjs/common';
import { couldStartTrivia } from 'typescript';

export const UserDec = createParamDecorator(
  (data, [root, args, ctx, info]) => ctx.req.user,
);

export const TestTwoDec = createParamDecorator(
  (data, [root, args, ctx, info]) => {
    Logger.log(JSON.stringify(root));
    Logger.log(JSON.stringify(args));
    Logger.log(JSON.stringify(info));
    return ctx.req.user;
  },
);
