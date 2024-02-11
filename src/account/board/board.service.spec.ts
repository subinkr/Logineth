import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from './board.service';
import { providers } from 'src/source-code/mock/providers/providers';
import { ProfileService } from '../profile/profile.service';
import { ResPostBoard } from './dto/res-post-board.dto';
import {
  MockBoardModel,
  defaultBoard,
} from 'src/source-code/mock/entities/board.mock';
import { ResGetBoards } from './dto/res-get-boards.dto';
import { ResGetBoardByID } from './dto/res-get-board-by-id.dto';
import { ResMakeBoardNFT } from './dto/res-make-board-nft.dto';
import { ResDeleteBoard } from './dto/res-delete-board.dto';
import { ReqPostBoard } from './dto/req-post-board.dto';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import {
  BadRequestException,
  ForbiddenException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { ResEditAd } from './dto/res-edit-ad.dto';
import { ReqEditAd } from './dto/req-edit-ad.dto';
import { ResCancelMakeBoardNFT } from './dto/res-cancel-make-board-nft.dto';
import { ResCompleteMakeBoardNFT } from './dto/res-complete-make-board-nft.dto';
import { ReqCompleteMakeBoardNFT } from './dto/req-complete-make-board-nft.dto';

describe('BoardService', () => {
  let service: BoardService;
  let profileService: ProfileService;
  const { board, ownBoard, existNFTBoard } = MockBoardModel;
  const { user, otherUser } = MockUserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers,
    }).compile();

    service = module.get<BoardService>(BoardService);
    profileService = module.get<ProfileService>(ProfileService);
  });

  // PBTEST: - use, return
  describe('Post Board', () => {
    const reqPostBoard: ReqPostBoard = { ...board };
    const resPostBoard: ResPostBoard = { board };
    let result = {};

    it('Use | getUserByID', async () => {
      profileService.getUserByID = jest.fn().mockReturnValue({ user });
      result = await service.postBoard(reqPostBoard, user.id);
      expect(profileService.getUserByID).toHaveBeenCalled();
    });

    it('Return | ResPostBoard', async () => {
      const keys = Object.keys(result);
      console.log(result);
      const required = Object.keys(resPostBoard);
      console.log(keys, required);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });

  // GBTEST: - return
  describe('Get Boards', () => {
    let isNFT = true;
    const page = 1;
    const resGetBoards: ResGetBoards = {
      boards: [board],
      boardsCount: 1,
      nextPage: false,
    };
    let result = {};

    it('Return | ResGetBoards', async () => {
      result = await service.getBoards(isNFT, page);
      const keys = Object.keys(result);
      const required = Object.keys(resGetBoards);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Return | ResGetBoards', async () => {
      isNFT = false;
      result = await service.getBoards(isNFT, page);
      const keys = Object.keys(result);
      const required = Object.keys(resGetBoards);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });

  // GBTEST: - return, error
  describe('Get Board By ID', () => {
    const resGetBoardByID: ResGetBoardByID = { board };
    let result = {};

    it('Return | ResGetBoardByID', async () => {
      result = await service.getBoardByID(board.id);
      const keys = Object.keys(result);
      const required = Object.keys(resGetBoardByID);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Error | Cannot find board', async () => {
      result = service.getBoardByID(1000);
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  // MBNTEST: - use, return, error
  describe('Make Board NFT', () => {
    const resMakeBoardNFT: ResMakeBoardNFT = {
      message: 'NFT 생성을 시작했습니다.',
    };
    let result = {};

    it('Use | getUserByID', async () => {
      profileService.getUserByID = jest.fn().mockReturnValue({ user });
      result = await service.makeBoardNFT(board.id, user.id);
      expect(profileService.getUserByID).toHaveBeenCalled();
    });

    it('Return | ResMakeBoardNFT', async () => {
      const keys = Object.keys(result);
      const required = Object.keys(resMakeBoardNFT);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Error | Cannot make board NFT already processing make board NFT.', async () => {
      result = service.makeBoardNFT(ownBoard.id, user.id);
      await expect(result).rejects.toThrow(NotAcceptableException);
    });

    it('Error | Cannot make board NFT already exist board NFT.', async () => {
      result = service.makeBoardNFT(existNFTBoard.id, user.id);
      await expect(result).rejects.toThrow(BadRequestException);
    });
  });

  // CMBNTEST: - use, return, error
  describe('Cancel Make Board NFT', () => {
    const resCancelMakeBoardNFT: ResCancelMakeBoardNFT = {
      message: 'NFT 생성이 취소되었습니다.',
    };
    let result = {};

    it('Use | getUserByID', async () => {
      profileService.getUserByID = jest.fn().mockReturnValue({ user });
      result = await service.cancelMakeBoardNFT(existNFTBoard.id, user.id);
      expect(profileService.getUserByID).toHaveBeenCalled();
    });

    it('Use | getBoardByID', async () => {
      service.getBoardByID = jest.fn().mockReturnValue({ board: ownBoard });
      result = await service.cancelMakeBoardNFT(ownBoard.id, user.id);
      expect(service.getBoardByID).toHaveBeenCalled();
    });

    it('Return | ResCancelMakeBoardNFT', async () => {
      const keys = Object.keys(result);
      const required = Object.keys(resCancelMakeBoardNFT);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Error | Cannot cancel other users make NFT.', async () => {
      result = service.cancelMakeBoardNFT(ownBoard.id, otherUser.id);
      await expect(result).rejects.toThrow(ForbiddenException);
    });
  });

  // CMBNTEST: - use, return, error
  describe('Complete Make Board NFT', () => {
    const reqCompleteMakeBoardNFT: ReqCompleteMakeBoardNFT = { tokenID: 1 };
    const resCompleteMakeBoardNFT: ResCompleteMakeBoardNFT = {
      message: 'NFT 생성이 완료되었습니다.',
    };
    let result = {};

    it('Use | getUserByID', async () => {
      profileService.getUserByID = jest.fn().mockReturnValue({ user });
      result = await service.completeMakeBoardNFT(
        existNFTBoard.id,
        reqCompleteMakeBoardNFT,
        user.id,
      );
      expect(profileService.getUserByID).toHaveBeenCalled();
    });

    it('Use | getBoardByID', async () => {
      service.getBoardByID = jest
        .fn()
        .mockReturnValue({ board: { ...defaultBoard, id: 2 } });
      result = await service.completeMakeBoardNFT(
        ownBoard.id,
        reqCompleteMakeBoardNFT,
        user.id,
      );
      expect(service.getBoardByID).toHaveBeenCalled();
    });

    it('Return | ResCompleteMakeBoardNFT', async () => {
      const keys = Object.keys(result);
      const required = Object.keys(resCompleteMakeBoardNFT);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Error | Cannot edit other users NFT tokenID.', async () => {
      result = service.completeMakeBoardNFT(
        ownBoard.id,
        reqCompleteMakeBoardNFT,
        otherUser.id,
      );
      await expect(result).rejects.toThrow(ForbiddenException);
    });
  });

  // EATEST: - use, return, error
  describe('Edit Ad', () => {
    const reqEditAd: ReqEditAd = { ad: '새로운 광고입니다.' };
    const resEditAd: ResEditAd = { message: '광고를 수정했습니다.' };
    let result = {};

    it('Use | getUserByID', async () => {
      profileService.getUserByID = jest.fn().mockReturnValue({ user });
      result = await service.editAd(existNFTBoard.id, reqEditAd, user.id);
      expect(profileService.getUserByID).toHaveBeenCalled();
    });

    it('Use | getBoardByID', async () => {
      service.getBoardByID = jest
        .fn()
        .mockReturnValue({ board: existNFTBoard });
      result = await service.editAd(existNFTBoard.id, reqEditAd, user.id);
      expect(service.getBoardByID).toHaveBeenCalled();
    });

    it('Return | ResEditAd', async () => {
      const keys = Object.keys(result);
      const required = Object.keys(resEditAd);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Error | Cannot edit other users ad', async () => {
      result = service.editAd(existNFTBoard.id, reqEditAd, otherUser.id);
      await expect(result).rejects.toThrow(ForbiddenException);
    });
  });

  // DBTEST: - use, return, error
  describe('Delete Board', () => {
    const resDeleteBoard: ResDeleteBoard = { message: '글을 삭제했습니다.' };
    let result = {};

    it('Use | getUserByID', async () => {
      profileService.getUserByID = jest.fn().mockReturnValue({ user });
      result = await service.deleteBoard(board.id, user.id);
      expect(profileService.getUserByID).toHaveBeenCalled();
    });

    it('Use | getBoardByID', async () => {
      service.getBoardByID = jest
        .fn()
        .mockReturnValue({ board: existNFTBoard });
      result = await service.deleteBoard(existNFTBoard.id, user.id);
      expect(service.getBoardByID).toHaveBeenCalled();
    });

    it('Return | ResDeleteBoard', async () => {
      const keys = Object.keys(result);
      const required = Object.keys(resDeleteBoard);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Error | Cannot delete other users board.', async () => {
      result = service.deleteBoard(board.id, otherUser.id);
      await expect(result).rejects.toThrow(ForbiddenException);
    });
  });

  // RBTEST: - use, return, error
  describe('Report Board', () => {
    it.todo('Use | getUserByID');
    it.todo('Return | ResReportBoard');
    it.todo('Error | Cannot report already reported board.');
  });

  // BATEST: - use, return, error
  describe('Ban Advertisement', () => {
    it.todo('Use | getUserByID');
    it.todo('Return | ResBanAd');
    it.todo('Error | Cannot ban if user is not admin.');
  });

  // RATEST: - use, return, error
  describe('Report Advertisement', () => {
    it.todo('Use | getUserByID');
    it.todo('Return | ResReportAd');
    it.todo('Error | Cannot report already reported advertisement.');
  });
});
