import { Test, TestingModule } from '@nestjs/testing';
import { RankService } from './rank.service';
import { providers } from 'src/source-code/mock/providers/providers';
import { ProfileService } from '../profile/profile.service';

describe('RankService', () => {
  let service: RankService;
  let profileService: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers,
    }).compile();

    service = module.get<RankService>(RankService);
    profileService = module.get<ProfileService>(ProfileService);
  });

  // GRTEST: - return
  describe('Get Rank', () => {
    it.todo('Return | ResGetRank');
  });

  // CRTEST: - use, return, error
  describe('Create Rank', () => {
    it.todo('Use | getUserByID');
    it.todo('Return | ResCreateRank');
    it.todo('Error | Cannot create rank in other user');
  });

  // ERTEST: - use, return, error
  describe('Edit Rank', () => {
    it.todo('Use | getUserByID');
    it.todo('Return | ResEditRank');
    it.todo('Error | Cannot edit other user rank');
  });

  // DRTEST: - use, return, error
  describe('Delete Rank', () => {
    it.todo('Use | getUserByID');
    it.todo('Return | ResDeleteRank');
    it.todo('Error | Cannot delete other user rank');
  });

  // ARTEST: - use, return, error
  describe('Add Row', () => {
    it.todo('Use | getUserByID');
    it.todo('Return | ResAddRow');
    it.todo('Error | Cannot add row in other user');
  });

  // SRTEST: - use, return, error
  describe('Subtract Row', () => {
    it.todo('Use | getUserByID');
    it.todo('Return | ResSubtractRow');
    it.todo('Error | Cannot subtract row in other user');
  });
});
