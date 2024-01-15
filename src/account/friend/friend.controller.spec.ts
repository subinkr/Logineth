import { Test, TestingModule } from '@nestjs/testing';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { providers } from 'src/source-code/mock/providers/providers';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import { ResFollowing } from './dto/res-following.dto';
import { ResUnFollowing } from './dto/res-un-following.dto';
import { ResGetFollowingUsers } from './dto/res-get-following-users.dto';
import { ResGetFollowerUsers } from './dto/res-get-follower-users.dto';
import { ResFindUsers } from './dto/res-find-users.dto';

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

  // FUTEST: - use, return
  describe('Get Follower Users', () => {
    const resGetFollowerUsers: ResGetFollowerUsers = {
      followerUsers: MockUserModel.users,
    };

    it('Use | getFollowerUsers', async () => {
      friendService.getFollowerUsers = jest.fn();
      await controller.getFollowerUsers(user.id);
      expect(friendService.getFollowerUsers).toHaveBeenCalled();
    });

    it('Return | ResGetFollowerUsers', async () => {
      const result = await controller.getFollowerUsers(user.id);
      expect(result).toBeInstanceOf(ResGetFollowerUsers);

      const keys = Object.keys(result);
      const required = Object.keys(resGetFollowerUsers);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });

  // FUTEST: - use, return
  describe('Get Following Users', () => {
    const resGetFollowingUsers: ResGetFollowingUsers = {
      followingUsers: MockUserModel.users,
    };

    it('Use | getFollowingUsers', async () => {
      friendService.getFollowingUsers = jest.fn();
      await controller.getFollowingUsers(user.id);
      expect(friendService.getFollowingUsers).toHaveBeenCalled();
    });

    it('Return | ResGetFollowingUsers', async () => {
      const result = await controller.getFollowingUsers(user.id);
      expect(result).toBeInstanceOf(ResGetFollowingUsers);

      const keys = Object.keys(result);
      const required = Object.keys(resGetFollowingUsers);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });

  // FTEST: - use, return
  describe('Following', () => {
    const resFollowing: ResFollowing = { message: '팔로우 성공' };

    it('Use | following', async () => {
      friendService.following = jest.fn();
      await controller.following(otherUser.id, user.id);
      expect(friendService.following).toHaveBeenCalled();
    });

    it('Return | ResFollowing', async () => {
      const result = await controller.following(otherUser.id, user.id);
      expect(result).toBeInstanceOf(ResFollowing);

      const keys = Object.keys(result);
      const required = Object.keys(resFollowing);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });

  // UFTEST: - use, return
  describe('UnFollowing', () => {
    const resUnFollowing: ResUnFollowing = { message: '언팔로우 성공' };
    it('Use | unFollowing', async () => {
      friendService.unFollowing = jest.fn();
      await controller.unFollowing(influencer.id, user.id);
      expect(friendService.unFollowing).toHaveBeenCalled();
    });

    it('Return | ResUnFollowing', async () => {
      const result = await controller.unFollowing(influencer.id, user.id);
      expect(result).toBeInstanceOf(ResUnFollowing);

      const keys = Object.keys(result);
      const required = Object.keys(resUnFollowing);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });

  // FUTEST: - use, return
  describe('Find Users', () => {
    const reqFindUsers = `${user.nickname}#${user.id}`;
    const resFindUsers: ResFindUsers = {
      findUsers: MockUserModel.users,
      findUsersLength: 3,
      nextPage: false,
    };

    it('Use | findUsers', async () => {
      friendService.findUsers = jest.fn();
      await controller.findUsers(reqFindUsers, 1);
      expect(friendService.findUsers).toHaveBeenCalled();
    });

    it('Return | ResFindUser', async () => {
      const result = await controller.findUsers(reqFindUsers, 1);
      expect(result).toBeInstanceOf(ResFindUsers);

      const keys = Object.keys(result);
      const required = Object.keys(resFindUsers);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });
});
