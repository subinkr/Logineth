import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

export const AuthID = createParamDecorator((_, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  const id = req.id;

  if (!id) {
    throw new UnauthorizedException('로그인이 필요합니다.');
  }

  return id;
});
