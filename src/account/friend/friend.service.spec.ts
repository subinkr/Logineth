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

  describe('Follow', () => {});

  describe('Unfollow', () => {});

  describe('Find Friend', () => {});

  describe('Invite Friend', () => {});
});
