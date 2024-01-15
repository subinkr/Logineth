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
import { ResGetFollowingUsers } from './dto/res-get-following-users.dto';
import { ResGetFollowerUsers } from './dto/res-get-follower-users.dto';
import { WsService } from 'src/common/ws/ws.service';
import { ReqFindUsers } from './dto/req-find-users.dto';
import { ResFindUsers } from './dto/res-find-users.dto';
import { DataService } from 'src/common/data/data.service';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepo: Repository<UserModel>,
    private readonly profileService: ProfileService,
    private readonly wsService: WsService,
    private readonly dataService: DataService,
  ) {}

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
      (user) => user.id === loginUserID,
    );
    if (followerIdx === -1) {
      await this.wsService.deleteRoom(loginUser, roomName);
    }

    return { message: '언팔로우 성공' };
  }

  // FUSERVICE: - {followingUsers: UserModel[]}
  async getFollowingUsers(loginUserID: number): Promise<ResGetFollowingUsers> {
    const { user: loginUser } =
      await this.profileService.getUserByID(loginUserID);
    const followingUsers = await loginUser.followingUsers;

    return { followingUsers };
  }

  // FUSERVICE: - {followerUsers: UserModel[]}
  async getFollowerUsers(loginUserID: number): Promise<ResGetFollowerUsers> {
    const { user: loginUser } =
      await this.profileService.getUserByID(loginUserID);
    const followerUsers = await loginUser.followerUsers;

    return { followerUsers };
  }

  // FUSERVICE: - {findUsers: UserModel[]}
  async findUsers(
    reqFindUsers: ReqFindUsers,
    page: number,
  ): Promise<ResFindUsers> {
    const { keyword } = reqFindUsers;
    const [nickname, id] = keyword.split('#');
    let findUser = await this.userRepo.findOne({
      where: { id: parseInt(id), nickname },
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
      where: [{ id: ILike(parseInt(id)) }, { nickname: ILike(nickname) }],
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
