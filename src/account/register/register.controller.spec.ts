import { Test, TestingModule } from '@nestjs/testing';
import { RegisterController } from './register.controller';
import { providers } from 'src/source-code/mock/providers/providers';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import { ReqLocalRegister } from './dto/req-local-register.dto';
import { ResRegister } from './dto/res-register.dto';
import { RegisterService } from './register.service';

describe('RegisterController', () => {
  let controller: RegisterController;
  let registerService: RegisterService;
  const { user, notExistUser, notExistUser2, accessToken } = MockUserModel;

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

      const resLocalRegister: ResRegister = { accessToken, user };
      const keys = Object.keys(result);
      const required = Object.keys(resLocalRegister);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });

  describe('Github Register', () => {
    it.todo('Use | githubRegister');

    it.todo('Return | ResRegister');
  });
});
