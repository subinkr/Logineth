import { Test, TestingModule } from '@nestjs/testing';
import { RankService } from './rank.service';
import { providers } from 'src/source-code/mock/providers/providers';
import { ProfileService } from '../profile/profile.service';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import { MockRankModel } from 'src/source-code/mock/entities/rank.mock';
import { MockRankRowModel } from 'src/source-code/mock/entities/rank-row.mock';
import { ResGetRanks } from './dto/res-get-ranks.dto';
import { ResCreateRank } from './dto/res-create-rank.dto';
import { ReqCreateRank } from './dto/req-create-rank.dto';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { ReqEditRank } from './dto/req-edit-rank.dto';
import { ResEditRank } from './dto/res-edit-rank.dto';
import { ResDeleteRank } from './dto/res-delete-rank.dto';
import { ResAddRow } from './dto/res-add-row.dto';
import { ReqAddRow } from './dto/req-add-row.dto';
import { ReqEditRow } from './dto/req-edit-row.dto';
import { ResEditRow } from './dto/res-edit-row.dto';
import { ResSubtractRow } from './dto/res-subtract-row.dto';

describe('RankService', () => {
  let service: RankService;
  let profileService: ProfileService;
  const { user, otherUser } = MockUserModel;
  const { rank, ranks } = MockRankModel;
  const { rankRow, otherRankRow } = MockRankRowModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers,
    }).compile();

    service = module.get<RankService>(RankService);
    profileService = module.get<ProfileService>(ProfileService);
  });

  // GRBITEST: - return, error
  describe('Get Rank By ID', () => {
    const resGetRankByID = { rank };
    let result = {};

    it('Return | {rank: RankModel}', async () => {
      result = await service.getRankByID(rank.id);

      const keys = Object.keys(result);
      const required = Object.keys(resGetRankByID);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Error | Cannot find rank', async () => {
      result = service.getRankByID(0);
      expect(result).rejects.toThrow(BadRequestException);
    });
  });

  // GRRBITEST: - return, error
  describe('Get Rank Row By ID', () => {
    const resGetRankRowByID = { rankRow };
    let result = {};

    it('Return | {row: RankRowModel}', async () => {
      result = await service.getRankRowByID(rankRow.id);

      const keys = Object.keys(result);
      const required = Object.keys(resGetRankRowByID);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Error | Cannot find rank', async () => {
      result = service.getRankRowByID(0);
      expect(result).rejects.toThrow(BadRequestException);
    });
  });

  // GRTEST: - return
  describe('Get Ranks', () => {
    const resGetRanks: ResGetRanks = { ranks };
    let result = {};

    it('Return | ResGetRanks', async () => {
      result = await service.getRanks(user.id);

      const keys = Object.keys(result);
      const required = Object.keys(resGetRanks);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });

  // CRTEST: - use, return, error
  describe('Create Rank', () => {
    const reqCreateRank1: ReqCreateRank = { title: 'New title' };
    const reqCreateRank2: ReqCreateRank = { title: 'title' };
    const resCreateRank: ResCreateRank = { rank };
    let result = {};

    it('Use | getUserByID', async () => {
      profileService.getUserByID = jest.fn().mockReturnValue({ user });
      result = await service.createRank(reqCreateRank1, user.id);
      expect(profileService.getUserByID).toHaveBeenCalled();
    });

    it('Return | ResCreateRank', async () => {
      const keys = Object.keys(result);
      const required = Object.keys(resCreateRank);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Error | Cannot create same title rank', async () => {
      result = service.createRank(reqCreateRank2, user.id);
      expect(result).rejects.toThrow(ForbiddenException);
    });
  });

  // ERTEST: - use, return, error
  describe('Edit Rank', () => {
    const reqEditRank: ReqEditRank = { title: 'New title', ranking: '1/2/3' };
    const resEditRank: ResEditRank = { message: '수정했습니다.' };
    let result = {};

    it('Use | getRankByID', async () => {
      service.getRankByID = jest.fn().mockReturnValue({ rank });
      result = await service.editRank(rank.id, reqEditRank, user.id);
      expect(service.getRankByID).toHaveBeenCalled();
    });

    it('Return | ResEditRank', async () => {
      const keys = Object.keys(result);
      const required = Object.keys(resEditRank);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Error | Cannot edit other user rank', async () => {
      result = service.editRank(rank.id, reqEditRank, otherUser.id);
      expect(result).rejects.toThrow(ForbiddenException);
    });
  });

  // DRTEST: - use, return, error
  describe('Delete Rank', () => {
    const resDeleteRank: ResDeleteRank = { message: '삭제했습니다.' };
    let result = {};

    it('Use | getRankByID', async () => {
      service.getRankByID = jest.fn().mockReturnValue({ rank });
      result = await service.deleteRank(rank.id, user.id);
      expect(service.getRankByID).toHaveBeenCalled();
    });

    it('Return | ResDeleteRank', async () => {
      const keys = Object.keys(result);
      const required = Object.keys(resDeleteRank);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Error | Cannot delete other user rank', async () => {
      result = service.deleteRank(rank.id, otherUser.id);
      expect(result).rejects.toThrow(ForbiddenException);
    });
  });

  // ARTEST: - use, return, error
  describe('Add Row', () => {
    const reqAddRow: ReqAddRow = { content: 'content' };
    const resAddRow: ResAddRow = { message: '추가했습니다.' };
    let result = {};

    it('Use | getRankByID', async () => {
      service.getRankByID = jest.fn().mockReturnValue({ rank });
      result = await service.addRow(rank.id, reqAddRow, user.id);
      expect(service.getRankByID).toHaveBeenCalled();
    });

    it('Return | ResAddRow', async () => {
      const keys = Object.keys(result);
      const required = Object.keys(resAddRow);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Error | Cannot add row in other user', async () => {
      result = service.addRow(rank.id, reqAddRow, otherUser.id);
      expect(result).rejects.toThrow(ForbiddenException);
    });
  });

  // ERTEST: - use, return, error
  describe('Edit Row', () => {
    const reqEditRow: ReqEditRow = { content: 'New content' };
    const resEditRow: ResEditRow = { message: '수정했습니다.' };
    let result = {};

    it('Use | getRankRowByID', async () => {
      service.getRankRowByID = jest.fn().mockReturnValue({ rankRow });
      result = await service.editRow(rankRow.id, reqEditRow, user.id);
      expect(service.getRankRowByID).toHaveBeenCalled();
    });

    it('Use | getUserByID', async () => {
      profileService.getUserByID = jest.fn().mockReturnValue({ user });
      result = await service.editRow(rankRow.id, reqEditRow, user.id);
      expect(profileService.getUserByID).toHaveBeenCalled();
    });

    it('Return | ResEditRow', async () => {
      const keys = Object.keys(result);
      const required = Object.keys(resEditRow);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Error | Cannot edit row in other user', async () => {
      result = service.editRow(otherRankRow.id, reqEditRow, user.id);
      expect(result).rejects.toThrow(ForbiddenException);
    });
  });

  // SRTEST: - use, return, error
  describe('Subtract Row', () => {
    const resSubtractRow: ResSubtractRow = { message: '삭제했습니다.' };
    let result = {};

    it('Use | getRankRowByID', async () => {
      service.getRankRowByID = jest.fn().mockReturnValue({ rankRow });
      result = await service.subtractRow(rankRow.id, user.id);
      expect(service.getRankRowByID).toHaveBeenCalled();
    });

    it('Use | getUserByID', async () => {
      profileService.getUserByID = jest.fn().mockReturnValue({ user });
      result = await service.subtractRow(rankRow.id, user.id);
      expect(profileService.getUserByID).toHaveBeenCalled();
    });

    it('Return | ResSubtractRow', async () => {
      const keys = Object.keys(result);
      const required = Object.keys(resSubtractRow);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Error | Cannot subtract row in other user', async () => {
      result = service.subtractRow(rankRow.id, otherUser.id);
      expect(result).rejects.toThrow(ForbiddenException);
    });
  });
});
