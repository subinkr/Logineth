import { Test, TestingModule } from '@nestjs/testing';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { providers } from 'src/source-code/mock/providers/providers';

describe('BoardController', () => {
  let controller: BoardController;
  let boardService: BoardService;

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
    it.todo('Use | postBoard');
  });

  // GBTEST: - use
  describe('Get Board', () => {
    it.todo('Use | getBoard');
  });

  // DBTEST: - use
  describe('Delete Board', () => {
    it.todo('Use | deleteBoard');
  });

  // RBTEST: -use
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
