import { Test, TestingModule } from '@nestjs/testing';
import { FriendService } from './friend.service';

describe('FriendService', () => {
  let service: FriendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FriendService],
    }).compile();

    service = module.get<FriendService>(FriendService);
  });

  describe('Follow', () => {
    it.todo('');
  });

  describe('Unfollow', () => {
    it.todo('');
  });

  describe('Find Friend', () => {
    it.todo('');
  });

  describe('Invite Friend', () => {
    it.todo('');
  });
});
