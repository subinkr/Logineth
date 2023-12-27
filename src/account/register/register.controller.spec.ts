import { Test, TestingModule } from '@nestjs/testing';
import { RegisterController } from './register.controller';
import { providers } from 'src/source-code/mock/providers/providers';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import { ReqLocalRegister } from './dto/req-local-register.dto';
import { ResRegister } from './dto/res-register.dto';
import { RegisterService } from './register.service';
import { ReqOAuthRegister } from './dto/req-oauth-register.dto';
import { Provider } from 'src/source-code/enum/provider';

describe('RegisterController', () => {
  let controller: RegisterController;
  let registerService: RegisterService;
  const { user, accessToken, notExistUser, notExistUser2 } = MockUserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterController],
      providers,
    }).compile();

    controller = module.get<RegisterController>(RegisterController);
    registerService = module.get<RegisterService>(RegisterService);
  });

  // LRTEST: - use, return
  describe('Local Register', () => {
    it('Use | localRegister', async () => {
      const reqLocalRegister: ReqLocalRegister = { ...notExistUser };
      jest.spyOn(registerService, 'localRegister');
      await controller.localRegister(reqLocalRegister);
      expect(registerService.localRegister).toHaveBeenCalled();
    });

    it('Return | ResRegister', async () => {
      const reqLocalRegister: ReqLocalRegister = { ...notExistUser2 };
      const result = await controller.localRegister(reqLocalRegister);
      expect(result).toBeInstanceOf(ResRegister);

      const resRegister: ResRegister = { accessToken, user };
      const keys = Object.keys(result);
      const required = Object.keys(resRegister);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });

  // GRTEST: - use, return
  describe('OAuth Register', () => {
    it('Use | oAuthRegister', async () => {
      const reqOAuthRegister: ReqOAuthRegister = { token: '' };
      jest.spyOn(registerService, 'oAuthRegister');
      registerService.oAuthRegister = jest
        .fn()
        .mockReturnValue({ accessToken, user });
      await controller.oAuthRegister(Provider.GITHUB, reqOAuthRegister);
      expect(registerService.oAuthRegister).toHaveBeenCalled();
    });

    it('Return | ResRegister', async () => {
      const reqOAuthRegister: ReqOAuthRegister = { token: '' };
      registerService.getGithubUserInfo = jest
        .fn()
        .mockReturnValue({ id: 10, nickname: 'github', image: null });
      const result = await controller.oAuthRegister(
        Provider.GITHUB,
        reqOAuthRegister,
      );
      expect(result).toBeInstanceOf(ResRegister);

      const resRegister: ResRegister = { accessToken, user };
      const keys = Object.keys(result);
      const required = Object.keys(resRegister);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });

  // WTEST: - usex, returnx
  describe('Withdraw', () => {
    it.todo('Use | withdraw');

    it.todo('Return | ResWithdraw');
  });
});
