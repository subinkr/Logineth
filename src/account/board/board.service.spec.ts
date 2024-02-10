import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from './board.service';
import { providers } from 'src/source-code/mock/providers/providers';

describe('BoardService', () => {
  let service: BoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers,
    }).compile();

    service = module.get<BoardService>(BoardService);
  });

  // PBTEST: - use, return
  describe('Post Board', () => {
    it.todo('Use | getUserByID');
    it.todo('Return | ResPostBoard');
  });

  // GBTEST: - return
  describe('Get Board', () => {
    it.todo('Return | ResGetBoard');
  });

  // MBNTEST: - use, return, error
  describe('Make Board NFT', () => {
    it.todo('Use | getUserByID');
    it.todo('Return | ResMakeBoardNFT');
    it.todo('Error | Cannot make board NFT already exist board NFT.');
  });

  // DBTEST: - use, return, error
  describe('Delete Board', () => {
    it.todo('Use | getUserByID');
    it.todo('Return | ResDeleteBoard');
    it.todo('Error | Cannot delete other users board.');
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
