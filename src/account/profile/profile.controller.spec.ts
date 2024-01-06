import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { providers } from 'src/source-code/mock/providers/providers';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import { ProfileService } from './profile.service';
import { ResGetUserByID } from './dto/res-get-user-by-id.dto';

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

  // EUTEST: - usex, returnx
  describe('Edit User', () => {
    it.todo('Use | editUser');

    it.todo('Return | ResEditUser');
  });
});
