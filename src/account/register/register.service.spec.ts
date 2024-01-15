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
import { ResRegister } from './dto/res-register.dto';
import { ResWithdrawRegister } from './dto/res-withdraw-register.dto';

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

  // LRTEST: - use, return, error
  describe('Local Register', () => {
    const resRegister: ResRegister = { accessToken, user };
    let result = {};

    it('Use | hashPassword', async () => {
      const reqLocalRegister: ReqLocalRegister = { ...notExistUser };
      authService.hashPassword = jest
        .fn()
        .mockReturnValue({ password: user.password });
      await service.localRegister(reqLocalRegister);
      expect(authService.hashPassword).toHaveBeenCalled();
    });

    it('Use | signToken', async () => {
      const reqLocalRegister: ReqLocalRegister = { ...notExistUser2 };
      authService.signToken = jest.fn().mockReturnValue({ accessToken });
      result = await service.localRegister(reqLocalRegister);
      expect(authService.signToken).toHaveBeenCalled();
    });

    it('Return | ResRegister', async () => {
      const keys = Object.keys(result);
      const required = Object.keys(resRegister);
      expect(keys).toEqual(expect.arrayContaining(required));
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

  // ORTEST: - use, return, error
  describe('OAuth Register', () => {
    const reqOAuthRegister: ReqOAuthRegister = { token: '' };
    const resRegister: ResRegister = { accessToken, user };
    let result = {};

    it('Use | getGithubUserInfo', async () => {
      service.getGithubUserInfo = jest
        .fn()
        .mockReturnValue({ id: 10, nickname: 'github', image: null });
      await service.oAuthRegister(reqOAuthRegister, Provider.GITHUB);
      expect(service.getGithubUserInfo).toHaveBeenCalled();
    });

    it('Use | getGoogleUserInfo', async () => {
      service.getGoogleUserInfo = jest
        .fn()
        .mockReturnValue({ id: 11, nickname: 'google', image: null });
      await service.oAuthRegister(reqOAuthRegister, Provider.GOOGLE);
      expect(service.getGoogleUserInfo).toHaveBeenCalled();
    });

    it('Use | getKakaoUserInfo', async () => {
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
      result = await service.oAuthRegister(reqOAuthRegister, Provider.GITHUB);
      expect(authService.signToken).toHaveBeenCalled();
    });

    it('Return | ResRegister', async () => {
      const keys = Object.keys(result);
      const required = Object.keys(resRegister);
      expect(keys).toEqual(expect.arrayContaining(required));
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

  // WRTEST: - use, return, error
  describe('Withdraw Register', () => {
    const resWithdraw: ResWithdrawRegister = { message: '탈퇴했습니다.' };
    let result = {};

    it('Use | getUserByID', async () => {
      profileService.getUserByID = jest.fn().mockReturnValue({ user });
      result = await service.withdrawRegister(user.id, user.id);
      expect(profileService.getUserByID).toHaveBeenCalled();
    });

    it('Return | ResWithdraw', async () => {
      const keys = Object.keys(result);
      const required = Object.keys(resWithdraw);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Error | Cannot delete other user', async () => {
      const result = service.withdrawRegister(user.id, otherUser.id);
      await expect(result).rejects.toThrow(ForbiddenException);
    });
  });
});
