import { Test, TestingModule } from '@nestjs/testing';
import { SettingService } from './setting.service';
import { providers } from 'src/source-code/mock/providers/providers';

describe('SettingService', () => {
  let service: SettingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers,
    }).compile();

    service = module.get<SettingService>(SettingService);
  });

  // LTEST: - use, return
  describe('Language', () => {
    it.todo('Use | getUserByID');
    it.todo('return | ResLanguage');
  });
});
