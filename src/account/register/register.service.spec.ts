import { Test, TestingModule } from '@nestjs/testing';
import { RegisterService } from './register.service';
import { providers } from 'src/source-code/mock/providers/providers';
import { AuthService } from 'src/common/auth/auth.service';
import { ReqLocalRegister } from './dto/req-local-register.dto';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import { NotAcceptableException } from '@nestjs/common';
import { ReqGithubRegister } from './dto/req-github-register.dto copy';

describe('RegisterService', () => {
  let service: RegisterService;
  let authService: AuthService;
  const { user, notExistUser, notExistUser2 } = MockUserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers,
    }).compile();

    service = module.get<RegisterService>(RegisterService);
    authService = module.get<AuthService>(AuthService);
  });

  // LRTEST: - use, error
  describe('Local Register', () => {
    it('Use | hashPassword', async () => {
      const reqLocalRegister: ReqLocalRegister = { ...notExistUser };
      jest.spyOn(authService, 'hashPassword');
      await service.localRegister(reqLocalRegister);
      expect(authService.hashPassword).toHaveBeenCalled();
    });

    it('Use | signToken', async () => {
      const reqLocalRegister: ReqLocalRegister = { ...notExistUser2 };
      jest.spyOn(authService, 'signToken');
      await service.localRegister(reqLocalRegister);
      expect(authService.signToken).toHaveBeenCalled();
    });

    it('Error | Username already used', async () => {
      const reqLocalRegister: ReqLocalRegister = { ...user };
      const result = service.localRegister({
        ...reqLocalRegister,
        username: user.username,
      });
      await expect(result).rejects.toThrow(NotAcceptableException);
    });
  });

  describe('Github Register', () => {
    it('Use | getGithubUserInfo', async () => {
      const reqGithubRegister: ReqGithubRegister = { code: '' };
      jest.spyOn(service, 'getGithubUserInfo');
      await service.githubRegister(reqGithubRegister);
      expect(service.getGithubUserInfo).toHaveBeenCalled();
    });

    it('Use | signToken', async () => {
      const reqGithubRegister: ReqGithubRegister = { code: '' };
      jest.spyOn(authService, 'signToken');
      await service.githubRegister(reqGithubRegister);
      expect(authService.signToken).toHaveBeenCalled();
    });
  });

  describe('Google Register', () => {
    it.todo('Use | getGoogleUserInfo');

    it.todo('Use | signToken');
  });

  describe('Kakao Register', () => {
    it.todo('Use | getKakaoUserInfo');

    it.todo('Use | signToken');
  });

  describe('Withdraw', () => {
    it.todo('Use | hashPassword');

    it.todo('Use | signToken');
  });
});
