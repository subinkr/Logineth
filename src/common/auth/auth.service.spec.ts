import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { MockUserModel } from '../mock/entities/user.mock';

describe('AuthService', () => {
  let service: AuthService;
  const user = MockUserModel.user;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  // SIGNTOKENTEST: - make, returnx, errorx
  describe('Sign Token', () => {
    it('Make | signToken', () => {
      service.signToken = jest.fn();
      service.signToken(user.username);
      expect(service.signToken).toHaveBeenCalledWith(user.username);
    });
  });
});
