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
  const user = MockUserModel.user;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers,
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    profileService = module.get<ProfileService>(ProfileService);
  });

  // SIGNTOKENTEST: - make, use, return
  describe('Sign Token', () => {
    it('Make | signToken', () => {
      service.signToken = jest.fn();
      service.signToken(user.username);
      expect(service.signToken).toHaveBeenCalledWith(user.username);
    });

    it('Use | getUserByUsername', async () => {
      jest.spyOn(profileService, 'getUserByUsername');
      await service.signToken(user.username);
      expect(profileService.getUserByUsername).toHaveBeenCalled();
    });

    it('Return | accessToken: string', async () => {
      const result = await service.signToken(user.username);
      expect(typeof result).toEqual('string');

      const accessToken = jwtService.sign(
        { username: user.username },
        {
          secret: 'test',
          expiresIn: 1234,
        },
      );
      expect(result).toEqual(accessToken);
    });
  });
});
