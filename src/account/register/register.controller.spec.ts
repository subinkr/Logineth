import { Test, TestingModule } from '@nestjs/testing';
import { RegisterController } from './register.controller';
import { providers } from 'src/source-code/mock/providers/providers';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import { ReqLocalRegister } from './dto/req-local-register.dto';
import { RegisterService } from './register.service';
import { ReqOAuthRegister } from './dto/req-oauth-register.dto';
import { Provider } from 'src/source-code/enum/provider';

describe('RegisterController', () => {
  let controller: RegisterController;
  let registerService: RegisterService;
  const { user, notExistUser } = MockUserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterController],
      providers,
    }).compile();

    controller = module.get<RegisterController>(RegisterController);
    registerService = module.get<RegisterService>(RegisterService);
  });

  // LRTEST: - use
  describe('Local Register', () => {
    const reqLocalRegister: ReqLocalRegister = { ...notExistUser };

    it('Use | localRegister', async () => {
      registerService.localRegister = jest.fn();
      await controller.localRegister(reqLocalRegister);
      expect(registerService.localRegister).toHaveBeenCalled();
    });
  });

  // GRTEST: - use
  describe('OAuth Register', () => {
    const reqOAuthRegister: ReqOAuthRegister = { token: '' };

    it('Use | oAuthRegister', async () => {
      registerService.oAuthRegister = jest.fn();
      await controller.oAuthRegister(Provider.GITHUB, reqOAuthRegister);
      expect(registerService.oAuthRegister).toHaveBeenCalled();
    });
  });

  // WTEST: - use
  describe('Withdraw Register', () => {
    it('Use | withdrawRegister', async () => {
      registerService.withdrawRegister = jest.fn();
      await controller.withdrawRegister(user.id, user.id);
      expect(registerService.withdrawRegister).toHaveBeenCalled();
    });
  });
});
