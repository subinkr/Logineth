import { Test, TestingModule } from '@nestjs/testing';
import { RankController } from './rank.controller';
import { RankService } from './rank.service';
import { providers } from 'src/source-code/mock/providers/providers';

describe('RankController', () => {
  let controller: RankController;
  let rankService: RankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankController],
      providers,
    }).compile();

    controller = module.get<RankController>(RankController);
    rankService = module.get<RankService>(RankService);
  });

  // GRTEST: - use
  describe('Get Rank', () => {
    it.todo('Use | getRank');
  });

  // CRTEST: - use
  describe('Create Rank', () => {
    it.todo('Use | createRank');
  });

  // ERTEST: - use
  describe('Edit Rank', () => {
    it.todo('Use | editRank');
  });

  // DRTEST: - use
  describe('Delete Rank', () => {
    it.todo('Use | deleteRank');
  });

  // ARTEST: - use
  describe('Add Row', () => {
    it.todo('Use | addRow');
  });

  // SRTEST: - use
  describe('Subtract Row', () => {
    it.todo('Use | subtractRow');
  });
});
