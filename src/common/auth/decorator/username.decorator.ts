import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

export const AuthUsername = createParamDecorator(
  (context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    const username = req.username;

    if (!username) {
      throw new UnauthorizedException('로그인이 필요합니다.');
    }

    return username;
  },
);
