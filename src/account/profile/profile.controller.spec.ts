import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { providers } from 'src/source-code/mock/providers/providers';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import { ProfileService } from './profile.service';
import { ReqEditUser } from './dto/req-edit-user.dto';
import { ReqConnectWallet } from './dto/req-connect-wallet.dto';

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

  // GUBUTEST: - use
  describe('Get User By ID', () => {
    it('Use | getUserByID', async () => {
      profileService.getUserByID = jest.fn();
      await controller.getUserByID(user.id);
      expect(profileService.getUserByID).toHaveBeenCalled();
    });
  });

  // EUTEST: - use
  describe('Edit User', () => {
    const reqEditUser: ReqEditUser = {
      image: user.image,
      nickname: user.nickname,
      bio: user.bio,
    };

    it('Use | editUser', async () => {
      profileService.editUser = jest.fn();
      await controller.editUser(user.id, reqEditUser, user.id);
      expect(profileService.editUser).toHaveBeenCalled();
    });
  });

  // CWTEST: - use
  describe('Connect Wallet', () => {
    const reqConnectWallet: ReqConnectWallet = {
      wallet: user.wallet,
    };
    it('Use | connectWallet', async () => {
      profileService.connectWallet = jest.fn();
      await controller.connectWallet(user.id, reqConnectWallet, user.id);
      expect(profileService.connectWallet).toHaveBeenCalled();
    });
  });
});
