import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/source-code/entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { ProfileService } from '../profile/profile.service';
import { ResFollowing } from './dto/res-following.dto';
import { ResUnFollowing } from './dto/res-un-following.dto';
import { WsService } from 'src/common/ws/ws.service';
import { ResFindUsers } from './dto/res-find-users.dto';
import { DataService } from 'src/common/data/data.service';
import { ResFollowingUsers } from './dto/res-following-users.dto';
import { ResFollowerUsers } from './dto/res-follower-users.dto';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepo: Repository<UserModel>,
    private readonly profileService: ProfileService,
    private readonly wsService: WsService,
    private readonly dataService: DataService,
  ) {}

  // FUSERVICE: - {followingUsers: UserModel[]}
  async followingUsers(loginUserID: number): Promise<ResFollowingUsers> {
    const { user: loginUser } =
      await this.profileService.getUserByID(loginUserID);
    const followingUsers = await loginUser.followingUsers;

    return { followingUsers };
  }

  // FUSERVICE: - {followerUsers: UserModel[]}
  async followerUsers(loginUserID: number): Promise<ResFollowerUsers> {
    const { user: loginUser } =
      await this.profileService.getUserByID(loginUserID);
    const followerUsers = await loginUser.followerUsers;

    return { followerUsers };
  }

  // FSERVICE: - {message: string}
  async following(
    targetUserID: number,
    loginUserID: number,
  ): Promise<ResFollowing> {
    if (targetUserID === loginUserID) {
      throw new ForbiddenException('자기 자신을 팔로우 할 수 없습니다.');
    }

    const { user: loginUser } =
      await this.profileService.getUserByID(loginUserID);
    const { user: targetUser } =
      await this.profileService.getUserByID(targetUserID);

    const followingUsers = await loginUser.followingUsers;
    const followingIdx = followingUsers.findIndex(
      (user) => user.id === targetUserID,
    );
    if (followingIdx !== -1) {
      throw new BadRequestException('이미 팔로우 중입니다.');
    }

    loginUser.followingUsers = Promise.resolve([...followingUsers, targetUser]);
    await this.userRepo.save(loginUser);

    const rooms = await loginUser.rooms;
    const [smallID, bigID] = [targetUserID, loginUserID].sort((a, b) => a - b);
    const roomName = `${smallID}-${bigID}`;

    const roomIdx = rooms.findIndex((room) => room.name === roomName);
    if (roomIdx === -1) {
      await this.wsService.createRoom(roomName, [loginUser, targetUser]);
    }

    return { message: '팔로우 성공' };
  }

  // UFSERVICE: - {message: string}
  async unFollowing(
    targetUserID: number,
    loginUserID: number,
  ): Promise<ResUnFollowing> {
    if (targetUserID === loginUserID) {
      throw new ForbiddenException('자기 자신을 언팔로우 할 수 없습니다.');
    }

    const { user: loginUser } =
      await this.profileService.getUserByID(loginUserID);

    const followingUsers = await loginUser.followingUsers;
    const followingIdx = followingUsers.findIndex(
      (user) => user.id === targetUserID,
    );
    if (followingIdx === -1) {
      throw new BadRequestException('이미 언팔로우 했습니다.');
    }

    followingUsers.splice(followingIdx, 1);
    loginUser.followingUsers = Promise.resolve(followingUsers);
    await this.userRepo.save(loginUser);

    const followerUsers = await loginUser.followerUsers;
    const [smallID, bigID] = [targetUserID, loginUserID].sort((a, b) => a - b);
    const roomName = `${smallID}-${bigID}`;

    const followerIdx = followerUsers.findIndex(
      (user) => user.id === targetUserID,
    );
    if (followerIdx === -1) {
      await this.wsService.deleteRoom(loginUser, roomName);
    }

    return { message: '언팔로우 성공' };
  }

  // FUSERVICE: - {findUsers: UserModel[]}
  async findUsers(keyword: string, page: number): Promise<ResFindUsers> {
    const [nickname, idStr] = keyword.split('@');
    const id = parseInt(idStr) || 0;
    let findUser = await this.userRepo.findOne({
      where: { id },
    });
    if (findUser) {
      return {
        findUsers: [findUser],
        findUsersCount: 1,
        nextPage: false,
      };
    }

    const take = 10;
    const skip = (page - 1) * take;
    const findAndCount = await this.userRepo.findAndCount({
      where: [{ id }, { nickname: ILike(`%${nickname}%`) }],
      order: { id: 'ASC' },
      take,
      skip,
    });

    const {
      array: findUsers,
      arrayCount: findUsersCount,
      nextPage,
    } = this.dataService.pagination(findAndCount, take, skip, page);

    return { findUsers, findUsersCount, nextPage };
  }
}
