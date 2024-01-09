import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import { UserModel } from 'src/source-code/entities/user.entity';
import { providers } from 'src/source-code/mock/providers/providers';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ReqEditUser } from './dto/req-edit-user.dto';

describe('ProfileService', () => {
  let service: ProfileService;
  const { user, otherUser, notExistUser } = MockUserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers,
    }).compile();

    service = module.get<ProfileService>(ProfileService);
  });

  // GUBITEST: - return, error
  describe('Get User By ID', () => {
    it('Return | {user: UserModel}', async () => {
      const result = await service.getUserByID(user.id);
      expect(result.user).toStrictEqual(user);
    });

    it('Error | Cannot find user', async () => {
      const result = service.getUserByID(notExistUser.id);
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  // GUBUTEST: - return, error
  describe('Get User By Username', () => {
    it('Return | {user: UserModel}', async () => {
      const result = await service.getUserByUsername(user.username);
      expect(result.user).toStrictEqual(user);
    });

    it('Error | Cannot find user', async () => {
      const result = service.getUserByUsername(notExistUser.username);
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  // EUTEST: - use
  describe('Edit User', () => {
    const reqEditUser: ReqEditUser = {
      image: user.image,
      nickname: user.nickname,
      bio: user.bio,
    };

    it('Use | getUserByID', async () => {
      service.getUserByID = jest.fn().mockReturnValue(user);
      await service.editUser(user.id, reqEditUser, user.id);
      expect(service.getUserByID).toHaveBeenCalled();
    });

    it('Error | Cannot edit other user.', async () => {
      const result = service.editUser(user.id, reqEditUser, otherUser.id);
      await expect(result).rejects.toThrow(ForbiddenException);
    });
  });
});
