import { Test, TestingModule } from '@nestjs/testing';
import { RankController } from './rank.controller';
import { RankService } from './rank.service';
import { providers } from 'src/source-code/mock/providers/providers';

describe('RankController', () => {
  let controller: RankController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankController],
      providers,
    }).compile();

    controller = module.get<RankController>(RankController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
