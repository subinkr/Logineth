import { Test, TestingModule } from '@nestjs/testing';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { providers } from 'src/source-code/mock/providers/providers';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';

describe('FriendController', () => {
  let controller: FriendController;
  let friendService: FriendService;
  const { user, otherUser, influencer } = MockUserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FriendController],
      providers,
    }).compile();

    controller = module.get<FriendController>(FriendController);
    friendService = module.get<FriendService>(FriendService);
  });

  // GFUTEST: - use
  describe('Get Follower Users', () => {
    it('Use | getFollowerUsers', async () => {
      friendService.getFollowerUsers = jest.fn();
      await controller.getFollowerUsers(user.id);
      expect(friendService.getFollowerUsers).toHaveBeenCalled();
    });
  });

  // GFUTEST: - use
  describe('Get Following Users', () => {
    it('Use | getFollowingUsers', async () => {
      friendService.getFollowingUsers = jest.fn();
      await controller.getFollowingUsers(user.id);
      expect(friendService.getFollowingUsers).toHaveBeenCalled();
    });
  });

  // FTEST: - use, return
  describe('Following', () => {
    it('Use | following', async () => {
      friendService.following = jest.fn();
      await controller.following(otherUser.id, user.id);
      expect(friendService.following).toHaveBeenCalled();
    });
  });

  // UFTEST: - use, return
  describe('UnFollowing', () => {
    it('Use | unFollowing', async () => {
      friendService.unFollowing = jest.fn();
      await controller.unFollowing(influencer.id, user.id);
      expect(friendService.unFollowing).toHaveBeenCalled();
    });
  });

  // FUTEST: - use
  describe('Find Users', () => {
    const keyword = `${user.nickname}#${user.id}`;

    it('Use | findUsers', async () => {
      friendService.findUsers = jest.fn();
      await controller.findUsers(keyword, 1);
      expect(friendService.findUsers).toHaveBeenCalled();
    });
  });
});
