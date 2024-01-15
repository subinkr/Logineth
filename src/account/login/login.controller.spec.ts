import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { providers } from 'src/source-code/mock/providers/providers';
import { LoginService } from './login.service';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import { ReqLocalLogin } from './dto/req-local-login.dto';
import { ReqOAuthLogin } from './dto/req-oauth-login.dto';
import { Provider } from 'src/source-code/enum/provider';
import { RegisterService } from '../register/register.service';

describe('LoginController', () => {
  let controller: LoginController;
  let loginService: LoginService;
  let registerService: RegisterService;
  const { user } = MockUserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers,
    }).compile();

    controller = module.get<LoginController>(LoginController);
    loginService = module.get<LoginService>(LoginService);
    registerService = module.get<RegisterService>(RegisterService);
  });

  // LLTEST: - use
  describe('Local Login', () => {
    const reqLocalLogin: ReqLocalLogin = {
      username: user.username,
      password: 'p@ssw0rd',
    };

    it('Use | localLogin', async () => {
      loginService.localLogin = jest.fn();
      await controller.localLogin(reqLocalLogin);
      expect(loginService.localLogin).toHaveBeenCalled();
    });
  });

  // OLTEST: - use
  describe('OAuth Login', () => {
    const reqOAuthLogin: ReqOAuthLogin = { token: '' };

    it('Use | oAuthLogin', async () => {
      loginService.oAuthLogin = jest.fn();
      await controller.oAuthLogin(Provider.GITHUB, reqOAuthLogin);
      expect(loginService.oAuthLogin).toHaveBeenCalled();
    });
  });
});
