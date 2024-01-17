import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const cli = context.switchToWs().getClient();
    const accessToken =
      req.headers?.authorization ?? cli.handshake?.headers.authorization;
    if (!accessToken) {
      return true;
    }

    try {
      const { id } = this.authService.verifyToken(accessToken);
      req.id = id;

      return true;
    } catch (e) {}
  }
}
