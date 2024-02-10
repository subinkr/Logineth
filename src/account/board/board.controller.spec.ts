import { Test, TestingModule } from '@nestjs/testing';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { providers } from 'src/source-code/mock/providers/providers';
import { ReqPostBoard } from './dto/req-post-board.dto';
import { MockBoardModel } from 'src/source-code/mock/entities/board.mock';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import { ReqEditAd } from './dto/req-edit-ad.dto';
import { ReqCompleteMakeBoardNFT } from './dto/req-complete-make-board-nft.dto';

describe('BoardController', () => {
  let controller: BoardController;
  let boardService: BoardService;
  const { board } = MockBoardModel;
  const { user } = MockUserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardController],
      providers,
    }).compile();

    controller = module.get<BoardController>(BoardController);
    boardService = module.get<BoardService>(BoardService);
  });

  // PBTEST: - use
  describe('Post Board', () => {
    const reqPostBoard: ReqPostBoard = { ...board };

    it('Use | postBoard', async () => {
      boardService.postBoard = jest.fn();
      await controller.postBoard(reqPostBoard, user.id);
      expect(boardService.postBoard).toHaveBeenCalled();
    });
  });

  // GBTEST: - use
  describe('Get Boards', () => {
    const isNFT = false;
    const page = 1;

    it('Use | getBoards', async () => {
      boardService.getBoards = jest.fn();
      await controller.getBoards(isNFT, page);
      expect(boardService.getBoards).toHaveBeenCalled();
    });
  });

  // GBBITEST: - use
  describe('Get Board By ID', () => {
    it('Use | getBoardByID', async () => {
      boardService.getBoardByID = jest.fn();
      await controller.getBoardByID(board.id);
      expect(boardService.getBoardByID).toHaveBeenCalled();
    });
  });

  // MBNTEST: - use
  describe('Make Board NFT', () => {
    it('Use | makeBoardNFT', async () => {
      boardService.makeBoardNFT = jest.fn();
      await controller.makeBoardNFT(board.id, user.id);
      expect(boardService.makeBoardNFT).toHaveBeenCalled();
    });
  });

  // CMBNTEST: - use
  describe('Cancel Make Board NFT', () => {
    it('Use | cancelMakeBoardNFT', async () => {
      boardService.cancelMakeBoardNFT = jest.fn();
      await controller.cancelMakeBoardNFT(board.id, user.id);
      expect(boardService.cancelMakeBoardNFT).toHaveBeenCalled();
    });
  });

  // CMBNTEST: - use
  describe('Complete Make Board NFT', () => {
    const reqCompleteMakeBoardNFT: ReqCompleteMakeBoardNFT = { tokenID: 1 };

    it('Use | completeMakeBoardNFT', async () => {
      boardService.completeMakeBoardNFT = jest.fn();
      await controller.completeMakeBoardNFT(
        board.id,
        reqCompleteMakeBoardNFT,
        user.id,
      );
      expect(boardService.completeMakeBoardNFT).toHaveBeenCalled();
    });
  });

  // AATEST: - use
  describe('Edit Ad', () => {
    const reqEditAd: ReqEditAd = { ad: '새로운 광고입니다.' };

    it('Use | editAd', async () => {
      boardService.editAd = jest.fn();
      await controller.editAd(board.id, reqEditAd, user.id);
      expect(boardService.editAd).toHaveBeenCalled();
    });
  });

  // DBTEST: - use
  describe('Delete Board', () => {
    it('Use | deleteBoard', async () => {
      boardService.deleteBoard = jest.fn();
      await controller.deleteBoard(board.id, user.id);
      expect(boardService.deleteBoard).toHaveBeenCalled();
    });
  });

  // RBTEST: - use
  describe('Report Board', () => {
    it.todo('Use | reportBoard');
  });

  // BATEST: - use
  describe('Ban Advertisement', () => {
    it.todo('Use | banAd');
  });

  // RATEST: - use
  describe('Report Advertisement', () => {
    it.todo('Use | reportAd');
  });
});
