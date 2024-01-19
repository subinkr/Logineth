import { Test, TestingModule } from '@nestjs/testing';
import { SettingService } from './setting.service';
import { providers } from 'src/source-code/mock/providers/providers';
import { ProfileService } from '../profile/profile.service';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import { ReqSetting } from './dto/req-setting.dto';
import { ResSetting } from './dto/res-setting.dto';

describe('SettingService', () => {
  let service: SettingService;
  let profileService: ProfileService;
  const { user } = MockUserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers,
    }).compile();

    service = module.get<SettingService>(SettingService);
    profileService = module.get<ProfileService>(ProfileService);
  });

  // LTEST: - use, return
  describe('Setting', () => {
    const reqSetting: ReqSetting = { setting: 0 };
    const resSetting: ResSetting = { user };
    let result = {};

    it('Use | getUserByID', async () => {
      profileService.getUserByID = jest.fn().mockReturnValue({ user });
      result = await service.setting(user.id, reqSetting, 'screen');
      expect(profileService.getUserByID).toHaveBeenCalled();
    });

    it('return | ResSetting', async () => {
      const keys = Object.keys(result);
      const required = Object.keys(resSetting);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });
});
