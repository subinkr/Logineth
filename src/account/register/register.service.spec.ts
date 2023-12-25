import { Test, TestingModule } from '@nestjs/testing';
import { RegisterService } from './register.service';
import { providers } from 'src/source-code/mock/providers/providers';
import { AuthService } from 'src/common/auth/auth.service';
import { ReqLocalRegister } from './dto/req-local-register.dto';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import { NotAcceptableException } from '@nestjs/common';

describe('RegisterService', () => {
  let service: RegisterService;
  let authService: AuthService;
  const { user } = MockUserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers,
    }).compile();

    service = module.get<RegisterService>(RegisterService);
    authService = module.get<AuthService>(AuthService);
  });

  // LRTEST: - use, error
  describe('Local Register', () => {
    const reqLocalRegister: ReqLocalRegister = { ...user };
    it('Use | hashPassword', async () => {
      jest.spyOn(authService, 'hashPassword');
      await service.localRegister(reqLocalRegister);
      expect(authService.hashPassword).toHaveBeenCalled();
    });

    it('Use | signToken', async () => {
      jest.spyOn(authService, 'signToken');
      await service.localRegister(reqLocalRegister);
      expect(authService.signToken).toHaveBeenCalled();
    });

    it('Error | Username already used', async () => {
      const result = service.localRegister(reqLocalRegister);
      await expect(result).rejects.toThrow(NotAcceptableException);
    });
  });
});
