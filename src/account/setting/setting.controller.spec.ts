import { Test, TestingModule } from '@nestjs/testing';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
import { providers } from 'src/source-code/mock/providers/providers';

describe('SettingController', () => {
  let controller: SettingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SettingController],
      providers,
    }).compile();

    controller = module.get<SettingController>(SettingController);
  });

  // LTEST: - use
  describe('Language', () => {
    it.todo('Use | language');
  });
});
