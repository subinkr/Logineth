import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { providers } from 'src/source-code/mock/providers/providers';
import { LoginService } from './login.service';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import { ReqLocalLogin } from './dto/req-local-login.dto';
import { ResLogin } from './dto/res-login.dto';

describe('LoginController', () => {
  let controller: LoginController;
  let loginService: LoginService;
  const { user, accessToken } = MockUserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers,
    }).compile();

    controller = module.get<LoginController>(LoginController);
    loginService = module.get<LoginService>(LoginService);
  });

  // LLTEST: - usex, returnx
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

  // OLTEST: - usex, returnx
  describe('OAuth Login', () => {
    it.todo('Use | oAuthLogin');

    it.todo('Return | ResLogin');
  });

  // LTEST: - usex, returnx
  describe('Logout', () => {
    it.todo('Use | logout');

    it.todo('Return | ResLogout');
  });
});
