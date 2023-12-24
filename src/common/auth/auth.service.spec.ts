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

  // SIGNTOKENTEST: - make, use, return
  describe('Sign Token', () => {
    it('Make | signToken', () => {
      service.signToken = jest.fn();
      service.signToken(typeof user.username);
      expect(service.signToken).toHaveBeenCalledWith('string');
    });

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

    it('Return | {accessToken: string}', async () => {
      const result = await service.signToken(user.username);
      expect(typeof result).toEqual('string');

      const accessToken = jwtService.sign(
        { username: user.username },
        {
          secret: 'test',
          expiresIn: 1234,
        },
      );
      expect(result.accessToken).toEqual(accessToken);
    });
  });

  // VERIFYTOKENTEST: - make, use, return
  describe('Verify Token', () => {
    it('Make | verifyToken', () => {
      service.verifyToken = jest.fn();
      service.verifyToken(typeof accessToken);
      expect(service.verifyToken).toHaveBeenCalledWith('string');
    });

    it('Use | verify', () => {
      jest.spyOn(jwtService, 'verify');
      service.verifyToken(accessToken);
      expect(jwtService.verify).toHaveBeenCalled();
    });

    it('Return | result: {username: string}', () => {
      const { username } = service.verifyToken(accessToken);
      expect(typeof username).toEqual('string');
    });
  });
});
