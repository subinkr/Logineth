import { Test, TestingModule } from '@nestjs/testing';
import { RegisterController } from './register.controller';
import { providers } from 'src/source-code/mock/providers/providers';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import { ReqLocalRegister } from './dto/req-local-register.dto';
import { ResRegister } from './dto/res-register.dto';
import { RegisterService } from './register.service';
import { ReqOAuthRegister } from './dto/req-oauth-register.dto';
import { Provider } from 'src/source-code/enum/provider';
import { ResWithdrawRegister } from './dto/res-withdraw-register.dto';

describe('RegisterController', () => {
  let controller: RegisterController;
  let registerService: RegisterService;
  const { user, accessToken, notExistUser } = MockUserModel;

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
    const reqLocalRegister: ReqLocalRegister = { ...notExistUser };
    const resRegister: ResRegister = { accessToken, user };

    it('Use | localRegister', async () => {
      jest.spyOn(registerService, 'localRegister');
      registerService.localRegister = jest.fn().mockReturnValue(resRegister);
      await controller.localRegister(reqLocalRegister);
      expect(registerService.localRegister).toHaveBeenCalled();
    });

    it('Return | ResRegister', async () => {
      const result = await controller.localRegister(reqLocalRegister);
      expect(result).toBeInstanceOf(ResRegister);

      const keys = Object.keys(result);
      const required = Object.keys(resRegister);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });

  // GRTEST: - use, return
  describe('OAuth Register', () => {
    const reqOAuthRegister: ReqOAuthRegister = { token: '' };
    const resRegister: ResRegister = { accessToken, user };

    it('Use | oAuthRegister', async () => {
      jest.spyOn(registerService, 'oAuthRegister');
      registerService.oAuthRegister = jest.fn().mockReturnValue(resRegister);
      await controller.oAuthRegister(Provider.GITHUB, reqOAuthRegister);
      expect(registerService.oAuthRegister).toHaveBeenCalled();
    });

    it('Return | ResRegister', async () => {
      registerService.getGithubUserInfo = jest
        .fn()
        .mockReturnValue({ id: 10, nickname: 'github', image: null });
      const result = await controller.oAuthRegister(
        Provider.GITHUB,
        reqOAuthRegister,
      );
      expect(result).toBeInstanceOf(ResRegister);

      const keys = Object.keys(result);
      const required = Object.keys(resRegister);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });

  // WTEST: - use, return
  describe('Withdraw Register', () => {
    const resWithdraw: ResWithdrawRegister = { message: '탈퇴했습니다.' };

    it('Use | withdrawRegister', async () => {
      jest.spyOn(registerService, 'withdrawRegister');
      registerService.withdrawRegister = jest.fn().mockReturnValue(resWithdraw);
      await controller.withdrawRegister(user.username, user.username);
      expect(registerService.withdrawRegister).toHaveBeenCalled();
    });

    it('Return | ResWithdraw', async () => {
      const result = await controller.withdrawRegister(
        user.username,
        user.username,
      );
      expect(result).toBeInstanceOf(ResWithdrawRegister);

      const keys = Object.keys(result);
      const required = Object.keys(resWithdraw);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });
});
