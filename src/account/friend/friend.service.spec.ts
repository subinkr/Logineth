import { Test, TestingModule } from '@nestjs/testing';
import { FriendService } from './friend.service';
import { ProfileService } from '../profile/profile.service';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { providers } from 'src/source-code/mock/providers/providers';

describe('FriendService', () => {
  let service: FriendService;
  let profileService: ProfileService;
  const { user, otherUser, influencer } = MockUserModel;

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

  describe('Find Friend', () => {
    it.todo('');
  });

  describe('Invite Friend', () => {
    it.todo('');
  });
});
