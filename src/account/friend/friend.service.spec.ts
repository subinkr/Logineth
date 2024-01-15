import { Test, TestingModule } from '@nestjs/testing';
import { FriendService } from './friend.service';
import { ProfileService } from '../profile/profile.service';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { providers } from 'src/source-code/mock/providers/providers';
import { ReqFindUsers } from './dto/req-find-users.dto';
import { ResFindUsers } from './dto/res-find-users.dto';

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

  // FTEST: - use, error
  describe('Following', () => {
    it('Use | getUserByID', async () => {
      profileService.getUserByID = jest.fn().mockReturnValue({ user });
      await service.following(otherUser.id, user.id);
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
  });

  // UFTEST: - use, error
  describe('UnFollowing', () => {
    it('Use | getUserByID', async () => {
      profileService.getUserByID = jest.fn().mockReturnValue({ user });
      await service.unFollowing(influencer.id, user.id);
      expect(profileService.getUserByID).toHaveBeenCalled();
    });

    it('Error | Cannot unfollowing self account', async () => {
      const result = service.unFollowing(user.id, user.id);
      await expect(result).rejects.toThrow(ForbiddenException);
    });

    it('Error | Cannot unfollowing already unfollow user', async () => {
      const result = service.unFollowing(otherUser.id, user.id);
      await expect(result).rejects.toThrow(BadRequestException);
    });
  });

  // FUTEST: - use
  describe('Following Users', () => {
    it('Use | getUserByID', async () => {
      profileService.getUserByID = jest.fn().mockReturnValue({ user });
      await service.getFollowingUsers(user.id);
      expect(profileService.getUserByID).toHaveBeenCalled();
    });
  });

  // FUTEST: - use
  describe('Follower Users', () => {
    it('Use | getUserByID', async () => {
      profileService.getUserByID = jest.fn().mockReturnValue({ user });
      await service.getFollowingUsers(user.id);
      expect(profileService.getUserByID).toHaveBeenCalled();
    });
  });

  // FUTEST: - return
  describe('Find Users', () => {
    const reqFindUsers: ReqFindUsers = {
      keyword: `${user.nickname}#${user.id}`,
    };
    const reqFindUsers2: ReqFindUsers = {
      keyword: `${notExistUser.nickname}`,
    };

    const resFindUsers: ResFindUsers = {
      findUsers: MockUserModel.users,
      findUsersCount: 3,
      nextPage: false,
    };

    it('Return | ResFindUser', async () => {
      const result = await service.findUsers(reqFindUsers, 1);
      const keys = Object.keys(result);
      const required = Object.keys(resFindUsers);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('Return | ResFindUser', async () => {
      const result = await service.findUsers(reqFindUsers2, 1);
      const keys = Object.keys(result);
      const required = Object.keys(resFindUsers);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });
});
