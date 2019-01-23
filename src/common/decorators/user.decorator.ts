import { createParamDecorator, Logger } from '@nestjs/common';
import { couldStartTrivia } from 'typescript';

export const UserDec = createParamDecorator(
  (data, [root, args, ctx, info]) => ctx.req.user,
);

