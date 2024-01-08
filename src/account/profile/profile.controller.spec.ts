import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { providers } from 'src/source-code/mock/providers/providers';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import { ProfileService } from './profile.service';
import { ResGetUserByID } from './dto/res-get-user-by-id.dto';
import { ReqEditUser } from './dto/req-edit-user.dto';
import { ResEditUser } from './dto/res-edit-user.dto';

describe('ProfileController', () => {
  let controller: ProfileController;
  let profileService: ProfileService;
  const { user } = MockUserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers,
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
    profileService = module.get<ProfileService>(ProfileService);
  });

  // GUBUTEST: - use, return
  describe('Get User By ID', () => {
    const resGetUserByID: ResGetUserByID = { user };

    it('Use | getUserByID', async () => {
      jest.spyOn(profileService, 'getUserByID');
      profileService.getUserByID = jest.fn().mockReturnValue(resGetUserByID);
      await controller.getUserByID(user.id);
      expect(profileService.getUserByID).toHaveBeenCalled();
    });

    it('Return | ResGetUserByID', async () => {
      const result = await controller.getUserByID(user.id);
      expect(result).toBeInstanceOf(ResGetUserByID);

      const keys = Object.keys(result);
      const required = Object.keys(resGetUserByID);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });

  // EUTEST: - use, return
  describe('Edit User', () => {
    const reqEditUser: ReqEditUser = {
      image: user.image,
      nickname: user.nickname,
      bio: user.bio,
    };
    const resEditUser: ResEditUser = { message: '수정되었습니다.' };

    it('Use | editUser', async () => {
      jest.spyOn(profileService, 'editUser');
      profileService.editUser = jest.fn().mockReturnValue(resEditUser);
      await controller.editUser(user.id, reqEditUser, user.id);
      expect(profileService.editUser).toHaveBeenCalled();
    });

    it('Return | ResEditUser', async () => {
      const result = await controller.editUser(user.id, reqEditUser, user.id);
      expect(result).toBeInstanceOf(ResEditUser);

      const keys = Object.keys(result);
      const required = Object.keys(resEditUser);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });
});
