import { Test, TestingModule } from '@nestjs/testing';
import { RegisterController } from './register.controller';
import { providers } from 'src/source-code/mock/providers/providers';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import { ReqLocalRegister } from './dto/req-local-register.dto';
import { ResLocalRegister } from './dto/res-local-register.dto';

describe('RegisterController', () => {
  let controller: RegisterController;
  const { user, accessToken } = MockUserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterController],
      providers,
    }).compile();

    controller = module.get<RegisterController>(RegisterController);
  });

  // LRTEST: - returnx
  describe('Local Register', () => {
    it('Return | ResLocalRegister', async () => {
      const reqLocalRegister: ReqLocalRegister = {};
      const result = await controller.localRegister(reqLocalRegister);
      expect(result).toBeInstanceOf(ResLocalRegister);

      const resLocalRegister: ResLocalRegister = { accessToken };
      const keys = Object.keys(result);
      const required = Object.keys(resLocalRegister);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });
});
