import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { providers } from 'src/source-code/mock/providers/providers';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import { ProfileService } from './profile.service';
import { ResGetUserByUsername } from './dto/res-get-user-by-username.dto';

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
  describe('Get User By Username', () => {
    it('Use | getUserByUsername', async () => {
      jest.spyOn(profileService, 'getUserByUsername');
      await controller.getUserByUsername(user.username);
      expect(profileService.getUserByUsername).toHaveBeenCalled();
    });

    it('Return | ResGetUserByUsername', async () => {
      const result = await controller.getUserByUsername(user.username);
      expect(result).toBeInstanceOf(ResGetUserByUsername);

      const resGetUserByUsername: ResGetUserByUsername = { user: user };
      const keys = Object.keys(result);
      const required = Object.keys(resGetUserByUsername);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });
});
