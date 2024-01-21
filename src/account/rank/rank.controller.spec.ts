import { Test, TestingModule } from '@nestjs/testing';
import { RankController } from './rank.controller';
import { RankService } from './rank.service';
import { providers } from 'src/source-code/mock/providers/providers';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import { MockRankModel } from 'src/source-code/mock/entities/rank.mock';
import { MockRankRowModel } from 'src/source-code/mock/entities/rank-row.mock';
import { ReqCreateRank } from './dto/req-create-rank.dto';
import { ReqEditRank } from './dto/req-edit-rank.dto';
import { ReqAddRow } from './dto/req-add-row.dto';
import { ReqEditRow } from './dto/req-edit-row.dto';

describe('RankController', () => {
  let controller: RankController;
  let rankService: RankService;
  const { user, otherUser } = MockUserModel;
  const { rank } = MockRankModel;
  const { rankRow } = MockRankRowModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankController],
      providers,
    }).compile();

    controller = module.get<RankController>(RankController);
    rankService = module.get<RankService>(RankService);
  });

  // GRTEST: - use
  describe('Get Ranks', () => {
    it('Use | getRanks', async () => {
      rankService.getRanks = jest.fn();
      await controller.getRanks(user.id);
      expect(rankService.getRanks).toHaveBeenCalled();
    });
  });

  // CRTEST: - use
  describe('Create Rank', () => {
    const reqCreateRank: ReqCreateRank = { title: 'title' };
    it('Use | createRank', async () => {
      rankService.createRank = jest.fn();
      await controller.createRank(reqCreateRank, user.id);
      expect(rankService.createRank).toHaveBeenCalled();
    });
  });

  // ERTEST: - use
  describe('Edit Rank', () => {
    const reqEditRank: ReqEditRank = { title: '', ranking: '' };

    it('Use | editRank', async () => {
      rankService.editRank = jest.fn();
      await controller.editRank(rank.id, reqEditRank, user.id);
      expect(rankService.editRank).toHaveBeenCalled();
    });
  });

  // DRTEST: - use
  describe('Delete Rank', () => {
    it('Use | deleteRank', async () => {
      rankService.deleteRank = jest.fn();
      await controller.deleteRank(rank.id, user.id);
      expect(rankService.deleteRank).toHaveBeenCalled();
    });
  });

  // ARTEST: - use
  describe('Add Row', () => {
    const reqAddRow: ReqAddRow = { content: 'content' };

    it('Use | addRow', async () => {
      rankService.addRow = jest.fn();
      await controller.addRow(rank.id, reqAddRow, user.id);
      expect(rankService.addRow).toHaveBeenCalled();
    });
  });

  // ERTEST: - use
  describe('Edit Row', () => {
    const reqEditRow: ReqEditRow = { content: 'Edit content' };

    it('Use | editRow', async () => {
      rankService.editRow = jest.fn();
      await controller.editRow(rankRow.id, reqEditRow, user.id);
      expect(rankService.editRow).toHaveBeenCalled();
    });
  });

  // SRTEST: - use
  describe('Subtract Row', () => {
    it('Use | subtractRow', async () => {
      rankService.subtractRow = jest.fn();
      await controller.subtractRow(rankRow.id, user.id);
      expect(rankService.subtractRow).toHaveBeenCalled();
    });
  });
});
