import { Test, TestingModule } from '@nestjs/testing';
import { RankService } from './rank.service';
import { providers } from 'src/source-code/mock/providers/providers';

describe('RankService', () => {
  let service: RankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers,
    }).compile();

    service = module.get<RankService>(RankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
