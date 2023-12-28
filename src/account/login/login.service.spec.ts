import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { providers } from 'src/source-code/mock/providers/providers';
import { ProfileService } from '../profile/profile.service';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import { ReqLocalLogin } from './dto/req-local-login.dto';
import { AuthService } from 'src/common/auth/auth.service';
import { RegisterService } from '../register/register.service';
import { ResLogin } from './dto/res-login.dto';
import { ReqOAuthLogin } from './dto/req-oauth-login.dto';
import { Provider } from 'src/source-code/enum/provider';

describe('LoginService', () => {
  let service: LoginService;
  let profileService: ProfileService;
  let authService: AuthService;
  let registerService: RegisterService;
  const { user, accessToken } = MockUserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers,
    }).compile();

    service = module.get<LoginService>(LoginService);
    profileService = module.get<ProfileService>(ProfileService);
    authService = module.get<AuthService>(AuthService);
    registerService = module.get<RegisterService>(RegisterService);
  });

  // LLTEST: - use
  describe('Local Login', () => {
    const reqLocalLogin: ReqLocalLogin = {
      username: user.username,
      password: 'p@ssw0rd',
    };

    it('Use | getUserByUsername', async () => {
      profileService.getUserByUsername = jest.fn().mockReturnValue({ user });
      await service.localLogin(reqLocalLogin);
      expect(profileService.getUserByUsername).toHaveBeenCalled();
    });

    it('Use | verifyPassword', async () => {
      authService.verifyPassword = jest.fn().mockReturnValue(true);
      await service.localLogin(reqLocalLogin);
      expect(authService.verifyPassword).toHaveBeenCalled();
    });

    it('Use | signToken', async () => {
      authService.signToken = jest.fn().mockReturnValue({ accessToken });
      await service.localLogin(reqLocalLogin);
      expect(authService.signToken).toHaveBeenCalled();
    });
  });

  // OLTEST: - use
  describe('OAuth Login', () => {
    const reqOAuthLogin: ReqOAuthLogin = { token: '' };
    const resLogin: ResLogin = { accessToken, user };
    it('Use | oAuthRegister', async () => {
      registerService.oAuthRegister = jest.fn().mockReturnValue(resLogin);
      await service.oAuthLogin(reqOAuthLogin, Provider.GITHUB);
      expect(registerService.oAuthRegister).toHaveBeenCalled();
    });
  });

  // GLTEST: - usex
  describe('Logout', () => {
    it.todo('Use | signToken');
  });
});
