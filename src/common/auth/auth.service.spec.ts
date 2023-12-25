import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { MockUserModel } from '../../source-code/mock/entities/user.mock';
import { JwtService } from '@nestjs/jwt';
import { ProfileService } from 'src/account/profile/profile.service';
import { providers } from 'src/source-code/mock/providers/providers';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let profileService: ProfileService;
  const { user, accessToken } = MockUserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers,
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    profileService = module.get<ProfileService>(ProfileService);
  });

  // STTEST: - use
  describe('Sign Token', () => {
    it('Use | getUserByUsername', async () => {
      jest.spyOn(profileService, 'getUserByUsername');
      await service.signToken(user.username);
      expect(profileService.getUserByUsername).toHaveBeenCalled();
    });

    it('Use | sign', async () => {
      jest.spyOn(jwtService, 'sign');
      await service.signToken(user.username);
      expect(jwtService.sign).toHaveBeenCalled();
    });
  });

  // VTTEST: - use
  describe('Verify Token', () => {
    it('Use | verify', () => {
      jest.spyOn(jwtService, 'verify');
      service.verifyToken(accessToken);
      expect(jwtService.verify).toHaveBeenCalled();
    });
  });
});
