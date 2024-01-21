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
    it('Use | getRank', async () => {
      rankService.getRank = jest.fn();
      await controller.getRank();
      expect(rankService.getRank).toHaveBeenCalled();
    });
  });

  // CRTEST: - use
  describe('Create Rank', () => {
    it('Use | createRank', async () => {
      rankService.createRank = jest.fn();
      await controller.createRank();
      expect(rankService.createRank).toHaveBeenCalled();
    });
  });

  // ERTEST: - use
  describe('Edit Rank', () => {
    it('Use | editRank', async () => {
      rankService.editRank = jest.fn();
      await controller.editRank();
      expect(rankService.editRank).toHaveBeenCalled();
    });
  });

  // DRTEST: - use
  describe('Delete Rank', () => {
    it('Use | deleteRank', async () => {
      rankService.deleteRank = jest.fn();
      await controller.deleteRank();
      expect(rankService.deleteRank).toHaveBeenCalled();
    });
  });

  // ARTEST: - use
  describe('Add Row', () => {
    it('Use | addRow', async () => {
      rankService.addRow = jest.fn();
      await controller.addRow();
      expect(rankService.addRow).toHaveBeenCalled();
    });
  });

  // SRTEST: - use
  describe('Subtract Row', () => {
    it('Use | subtractRow', async () => {
      rankService.subtractRow = jest.fn();
      await controller.subtractRow();
      expect(rankService.subtractRow).toHaveBeenCalled();
    });
  });
});
