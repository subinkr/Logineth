import { Test, TestingModule } from '@nestjs/testing';
import { FriendService } from './friend.service';
import { ProfileService } from '../profile/profile.service';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { providers } from 'src/source-code/mock/providers/providers';
import { ResFindUsers } from './dto/res-find-users.dto';
import { ResFollowing } from './dto/res-following.dto';
import { ResUnFollowing } from './dto/res-un-following.dto';
import { ResFollowingUsers } from './dto/res-following-users.dto';
import { ResFollowerUsers } from './dto/res-follower-users.dto';

describe('FriendService', () => {
  let service: FriendService;
  let profileService: ProfileService;
  const { user, otherUser, influencer, notExistUser } = MockUserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers,
    }).compile();

    service = module.get<FriendService>(FriendService);
    profileService = module.get<ProfileService>(ProfileService);
  });

  // FTEST: - use, error, return
  describe('Following', () => {
    const resFollowing: ResFollowing = { message: '팔로우 성공' };
    let result = {};

    it('Use | getUserByID', async () => {
      profileService.getUserByID = jest.fn().mockReturnValue({ user });
      result = await service.following(otherUser.id, user.id);
      expect(profileService.getUserByID).toHaveBeenCalled();
    });

    it('Error | Cannot following self account', async () => {
      const result = service.following(user.id, user.id);
      await expect(result).rejects.toThrow(ForbiddenException);
    });

    it('Error | Cannot following already follow user', async () => {
      const result = service.following(influencer.id, user.id);
      await expect(result).rejects.toThrow(BadRequestException);
    });

    it('Return | ResFollowing', async () => {
      const keys = Object.keys(result);
      const required = Object.keys(resFollowing);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });

  // UFTEST: - use, error
  describe('UnFollowing', () => {
    const resUnFollowing: ResUnFollowing = { message: '언팔로우 성공' };
    let result = {};

    it('Use | getUserByID', async () => {
      profileService.getUserByID = jest.fn().mockReturnValue({ user });
      result = await service.unFollowing(influencer.id, user.id);
      expect(profileService.getUserByID).toHaveBeenCalled();
    });

    it('Return | ResUnFollowing', async () => {
      const keys = Object.keys(result);
      const required = Object.keys(resUnFollowing);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Error | Cannot unfollowing self account', async () => {
      const result = service.unFollowing(user.id, user.id);
      await expect(result).rejects.toThrow(ForbiddenException);
    });

    it('Error | Cannot unfollowing already unfollow user', async () => {
      const result = service.unFollowing(influencer.id, user.id);
      await expect(result).rejects.toThrow(BadRequestException);
    });
  });

  // FUTEST: - use, return
  describe('Following Users', () => {
    const resGetFollowingUsers: ResFollowingUsers = {
      followingUsers: MockUserModel.users,
    };
    let result = {};

    it('Use | getUserByID', async () => {
      profileService.getUserByID = jest.fn().mockReturnValue({ user });
      result = await service.followingUsers(user.id);
      expect(profileService.getUserByID).toHaveBeenCalled();
    });

    it('Return | ResFollowingUsers', async () => {
      const keys = Object.keys(result);
      const required = Object.keys(resGetFollowingUsers);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });

  // FUTEST: - use
  describe('Follower Users', () => {
    const resGetFollowerUsers: ResFollowerUsers = {
      followerUsers: MockUserModel.users,
    };
    let result = {};

    it('Use | getUserByID', async () => {
      profileService.getUserByID = jest.fn().mockReturnValue({ user });
      result = await service.followerUsers(user.id);
      expect(profileService.getUserByID).toHaveBeenCalled();
    });

    it('Return | ResFollowerUsers', async () => {
      const keys = Object.keys(result);
      const required = Object.keys(resGetFollowerUsers);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });

  // FUTEST: - return
  describe('Find Users', () => {
    const keyword = `${user.nickname}@${user.id}`;
    const keyword2 = `${notExistUser.nickname}@${notExistUser.id}`;

    const resFindUsers: ResFindUsers = {
      findUsers: MockUserModel.users,
      findUsersCount: 3,
      nextPage: false,
    };
    let result = {};

    it('Return | ResFindUser', async () => {
      result = await service.findUsers(keyword, 1);
      const keys = Object.keys(result);
      const required = Object.keys(resFindUsers);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Return | ResFindUser', async () => {
      result = await service.findUsers(keyword2, 1);
      const keys = Object.keys(result);
      const required = Object.keys(resFindUsers);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });
});
