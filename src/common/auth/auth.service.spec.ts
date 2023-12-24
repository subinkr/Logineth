import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { MockUserModel } from '../../source-code/mock/entities/user.mock';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  const user = MockUserModel.user;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  // SIGNTOKENTEST: - make, usex, return, errorx
  describe('Sign Token', () => {
    it('Make | signToken', () => {
      service.signToken = jest.fn();
      service.signToken(user.username);
      expect(service.signToken).toHaveBeenCalledWith(user.username);
    });

    it.todo('Use | getUserByUsername');

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

    it.todo('Error | Username is not valid');
  });
});
