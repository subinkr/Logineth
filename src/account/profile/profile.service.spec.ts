import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import { UserModel } from 'src/source-code/entities/user.entity';
import { providers } from 'src/source-code/mock/providers/providers';
import { NotFoundException } from '@nestjs/common';

describe('ProfileService', () => {
  let service: ProfileService;
  const user: UserModel = MockUserModel.user;
  const notExistUser: UserModel = MockUserModel.notExistUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers,
    }).compile();

    service = module.get<ProfileService>(ProfileService);
  });

  describe('Get User By Username', () => {
    it('Make | getUserByUsername', () => {
      service.getUserByUsername = jest.fn();
      service.getUserByUsername(user.username);
      expect(service.getUserByUsername).toHaveBeenCalledWith(user.username);
    });

    it('Return | {user: UserModel}', async () => {
      const result = await service.getUserByUsername(user.username);
      const keys = Object.keys(result);
      expect(keys).toEqual(expect.arrayContaining(['user']));
    });

    it('Error | Cannot find user', async () => {
      const result = service.getUserByUsername(notExistUser.username);
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });
});
