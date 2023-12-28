import { Injectable } from '@nestjs/common';
import { ReqLocalLogin } from './dto/req-local-login.dto';
import { AuthService } from 'src/common/auth/auth.service';
import { ProfileService } from '../profile/profile.service';
import { ReqOAuthLogin } from './dto/req-oauth-login.dto';
import { Provider } from 'src/source-code/enum/provider';
import { RegisterService } from '../register/register.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly authService: AuthService,
    private readonly profileService: ProfileService,
    private readonly registerService: RegisterService,
  ) {}

  async localLogin(reqLocalLogin: ReqLocalLogin) {
    const { username, password } = reqLocalLogin;

    const { user } = await this.profileService.getUserByUsername(username);

    await this.authService.verifyPassword(password, user.password);

    const { accessToken } = await this.authService.signToken(username);

    return { accessToken, user };
  }

  async oAuthLogin(reqOAuthLogin: ReqOAuthLogin, provider: Provider) {
    return await this.registerService.oAuthRegister(reqOAuthLogin, provider);
  }
}
