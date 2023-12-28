import { Test, TestingModule } from '@nestjs/testing';
import { RegisterService } from './register.service';
import { providers } from 'src/source-code/mock/providers/providers';
import { AuthService } from 'src/common/auth/auth.service';
import { ReqLocalRegister } from './dto/req-local-register.dto';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import {
  ConflictException,
  ForbiddenException,
  NotAcceptableException,
} from '@nestjs/common';
import { ReqOAuthRegister } from './dto/req-oauth-register.dto';
import { Provider } from 'src/source-code/enum/provider';
import { ProfileService } from '../profile/profile.service';

describe('RegisterService', () => {
  let service: RegisterService;
  let authService: AuthService;
  let profileService: ProfileService;
  const { user, otherUser, notExistUser, notExistUser2, accessToken } =
    MockUserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers,
    }).compile();

    service = module.get<RegisterService>(RegisterService);
    authService = module.get<AuthService>(AuthService);
    profileService = module.get<ProfileService>(ProfileService);
  });

  // LRTEST: - use, error
  describe('Local Register', () => {
    it('Use | hashPassword', async () => {
      const reqLocalRegister: ReqLocalRegister = { ...notExistUser };
      jest.spyOn(authService, 'hashPassword');
      authService.hashPassword = jest
        .fn()
        .mockReturnValue({ password: user.password });
      await service.localRegister(reqLocalRegister);
      expect(authService.hashPassword).toHaveBeenCalled();
    });

    it('Use | signToken', async () => {
      const reqLocalRegister: ReqLocalRegister = { ...notExistUser2 };
      jest.spyOn(authService, 'signToken');
      authService.signToken = jest.fn().mockReturnValue({ accessToken });
      await service.localRegister(reqLocalRegister);
      expect(authService.signToken).toHaveBeenCalled();
    });

    it('Error | Username already used', async () => {
      const reqLocalRegister: ReqLocalRegister = { ...user };
      const result = service.localRegister({
        ...reqLocalRegister,
        username: user.username,
      });
      await expect(result).rejects.toThrow(ConflictException);
    });
  });

  // ORTEST: - use, error
  describe('OAuth Register', () => {
    const reqOAuthRegister: ReqOAuthRegister = { token: '' };

    it('Use | getGithubUserInfo', async () => {
      jest.spyOn(service, 'getGithubUserInfo');
      service.getGithubUserInfo = jest
        .fn()
        .mockReturnValue({ id: 10, nickname: 'github', image: null });
      await service.oAuthRegister(reqOAuthRegister, Provider.GITHUB);
      expect(service.getGithubUserInfo).toHaveBeenCalled();
    });

    it('Use | getGoogleUserInfo', async () => {
      jest.spyOn(service, 'getGoogleUserInfo');
      service.getGoogleUserInfo = jest
        .fn()
        .mockReturnValue({ id: 11, nickname: 'google', image: null });
      await service.oAuthRegister(reqOAuthRegister, Provider.GOOGLE);
      expect(service.getGoogleUserInfo).toHaveBeenCalled();
    });

    it('Use | getKakaoUserInfo', async () => {
      jest.spyOn(service, 'getKakaoUserInfo');
      service.getKakaoUserInfo = jest
        .fn()
        .mockReturnValue({ id: 12, nickname: 'kakao', image: null });
      await service.oAuthRegister(reqOAuthRegister, Provider.KAKAO);
      expect(service.getKakaoUserInfo).toHaveBeenCalled();
    });

    it('Use | signToken', async () => {
      jest.spyOn(authService, 'signToken');
      service.getGithubUserInfo = jest
        .fn()
        .mockReturnValue({ id: 11, nickname: 'github', image: null });
      await service.oAuthRegister(reqOAuthRegister, Provider.GITHUB);
      expect(authService.signToken).toHaveBeenCalled();
    });

    it('Error | Cannot get user info', async () => {
      await expect(
        service.oAuthRegister(reqOAuthRegister, Provider.GITHUB),
      ).rejects.toThrow(NotAcceptableException);
      await expect(
        service.oAuthRegister(reqOAuthRegister, Provider.GOOGLE),
      ).rejects.toThrow(NotAcceptableException);
      await expect(
        service.oAuthRegister(reqOAuthRegister, Provider.KAKAO),
      ).rejects.toThrow(NotAcceptableException);
    });
  });

  describe('Withdraw Register', () => {
    it('Use | getUserByUsername', async () => {
      jest.spyOn(profileService, 'getUserByUsername');
      profileService.getUserByUsername = jest.fn().mockReturnValue({ user });
      await service.withdrawRegister(user.username, user.username);
      expect(profileService.getUserByUsername).toHaveBeenCalled();
    });

    it('Error | Cannot delete other user', async () => {
      const result = service.withdrawRegister(
        user.username,
        otherUser.username,
      );
      await expect(result).rejects.toThrow(ForbiddenException);
    });
  });
});
