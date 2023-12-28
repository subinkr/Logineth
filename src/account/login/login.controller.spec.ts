import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { providers } from 'src/source-code/mock/providers/providers';
import { LoginService } from './login.service';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import { ReqLocalLogin } from './dto/req-local-login.dto';
import { ResLogin } from './dto/res-login.dto';
import { ReqOAuthLogin } from './dto/req-oauth-login.dto';
import { Provider } from 'src/source-code/enum/provider';
import { RegisterService } from '../register/register.service';

describe('LoginController', () => {
  let controller: LoginController;
  let loginService: LoginService;
  let registerService: RegisterService;
  const { user, accessToken } = MockUserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers,
    }).compile();

    controller = module.get<LoginController>(LoginController);
    loginService = module.get<LoginService>(LoginService);
    registerService = module.get<RegisterService>(RegisterService);
  });

  // LLTEST: - use, return
  describe('Local Login', () => {
    const reqLocalLogin: ReqLocalLogin = {
      username: user.username,
      password: 'p@ssw0rd',
    };

    const resLogin: ResLogin = { accessToken, user };

    it('Use | localLogin', async () => {
      jest.spyOn(loginService, 'localLogin');
      loginService.localLogin = jest.fn().mockReturnValue(resLogin);
      await controller.localLogin(reqLocalLogin);
      expect(loginService.localLogin).toHaveBeenCalled();
    });

    it('Return | ResLogin', async () => {
      const result = await controller.localLogin(reqLocalLogin);
      expect(result).toBeInstanceOf(ResLogin);

      const resLogin: ResLogin = { accessToken, user };
      const keys = Object.keys(result);
      const required = Object.keys(resLogin);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });

  // OLTEST: - use, return
  describe('OAuth Login', () => {
    const reqOAuthLogin: ReqOAuthLogin = { token: '' };
    const resLogin: ResLogin = { accessToken, user };

    it('Use | oAuthLogin', async () => {
      loginService.oAuthLogin = jest.fn().mockReturnValue(resLogin);
      await controller.oAuthLogin(Provider.GITHUB, reqOAuthLogin);
      expect(loginService.oAuthLogin).toHaveBeenCalled();
    });

    it('Return | ResLogin', async () => {
      registerService.getGithubUserInfo = jest
        .fn()
        .mockReturnValue({ id: 11, nickname: 'github', image: null });

      const result = await controller.oAuthLogin(
        Provider.GITHUB,
        reqOAuthLogin,
      );
      expect(result).toBeInstanceOf(ResLogin);

      const keys = Object.keys(result);
      const required = Object.keys(resLogin);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });
});
