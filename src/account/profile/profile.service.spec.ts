import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import { providers } from 'src/source-code/mock/providers/providers';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ReqEditUser } from './dto/req-edit-user.dto';
import { ResGetUser } from './dto/res-get-user.dto';
import { ResEditUser } from './dto/res-edit-user.dto';

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
    const resGetUser: ResGetUser = { user };

    it('Return | ResGetUser', async () => {
      const result = await service.getUserByID(user.id);
      const keys = Object.keys(result);
      const required = Object.keys(resGetUser);
      expect(keys).toEqual(expect.arrayContaining(required));
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

  // EUTEST: - use, return, error
  describe('Edit User', () => {
    const reqEditUser: ReqEditUser = {
      image: user.image,
      nickname: user.nickname,
      bio: user.bio,
    };
    const resEditUser: ResEditUser = { message: '수정되었습니다.' };
    let result = {};

    it('Use | getUserByID', async () => {
      service.getUserByID = jest.fn().mockReturnValue(user);
      result = await service.editUser(user.id, reqEditUser, user.id);
      expect(service.getUserByID).toHaveBeenCalled();
    });

    it('Return | ResEditUser', async () => {
      const keys = Object.keys(result);
      const required = Object.keys(resEditUser);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Error | Cannot edit other user.', async () => {
      const result = service.editUser(user.id, reqEditUser, otherUser.id);
      await expect(result).rejects.toThrow(ForbiddenException);
    });
  });
});
