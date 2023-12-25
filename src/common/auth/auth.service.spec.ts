import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { MockUserModel } from '../../source-code/mock/entities/user.mock';
import { JwtService } from '@nestjs/jwt';
import { ProfileService } from 'src/account/profile/profile.service';
import { providers } from 'src/source-code/mock/providers/providers';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let profileService: ProfileService;
  const { user } = MockUserModel;

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
    it('Use | verify', async () => {
      jest.spyOn(jwtService, 'verify');
      const { accessToken } = await service.signToken(user.username);
      service.verifyToken(`Bearer ${accessToken}`);
      expect(jwtService.verify).toHaveBeenCalled();
    });
  });

  // HPTEST: - return
  describe('Hash Password', () => {
    it('Return | {hashPassword: string}', async () => {
      const { hashPassword } = await service.hashPassword('p@ssw0rd');
      const verify = await bcrypt.compare('p@ssw0rd', hashPassword);
      expect(verify).toBeTruthy();
    });
  });
});
