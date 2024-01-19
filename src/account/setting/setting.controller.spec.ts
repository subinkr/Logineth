import { Test, TestingModule } from '@nestjs/testing';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
import { providers } from 'src/source-code/mock/providers/providers';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import { ReqSetting } from './dto/req-setting.dto';

describe('SettingController', () => {
  let controller: SettingController;
  let service: SettingService;
  const { user } = MockUserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SettingController],
      providers,
    }).compile();

    controller = module.get<SettingController>(SettingController);
    service = module.get<SettingService>(SettingService);
  });

  // LTEST: - use
  describe('Setting', () => {
    const reqSetting: ReqSetting = { setting: 0 };

    it('Use | setting', async () => {
      service.setting = jest.fn();
      controller.setting(user.id, reqSetting, 'screen');
      expect(service.setting).toHaveBeenCalled();
    });
  });
});
