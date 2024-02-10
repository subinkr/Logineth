import { UserModel } from 'src/source-code/entities/user.entity';
import { Provider } from 'src/source-code/enum/provider';
import { Role } from 'src/source-code/enum/role';
import { lazyArray } from '../common/lazyArray';
import { RoomModel } from 'src/source-code/entities/room.entity';
import { ChatModel } from 'src/source-code/entities/chat.entity';
import { defaultRoom } from './room.mock';
import { RankModel } from 'src/source-code/entities/rank.entity';
import { MockRankModel } from './rank.mock';
import { BoardModel } from 'src/source-code/entities/board.entity';

export const defaultUser: UserModel = {
  id: 1,
  username: 'username',
  password: '$2b$10$G4R91NGJ3hXa4EFszIjDhumEY31yMwkvu9TSGVSb.iEfPNcdSYIu2',
  nickname: 'nickname',
  wallet: '0x437905275902384903174119407129048',
  image: null,
  bio: null,
  role: Role.USER,
  provider: Provider.LOCAL,
  screen: 0,
  language: 0,
  createdAt: new Date(1),
  updatedAt: new Date(1),
  followingUsers: lazyArray<UserModel>(),
  followerUsers: lazyArray<UserModel>(),
  rooms: lazyArray<RoomModel>(),
  chats: lazyArray<ChatModel>(),
  viewRooms: lazyArray<RoomModel>(),
  ranks: lazyArray<RankModel>(),
  postBoards: lazyArray<BoardModel>(),
  ownBoards: lazyArray<BoardModel>(),
};

export class MockUserModel {
  static influencer: UserModel = {
    ...defaultUser,
    id: 1004,
    username: 'influencer',
    nickname: 'influencer',
  };

  static followingUser: UserModel = {
    ...defaultUser,
    id: 100,
  };

  static unFollowingUser: UserModel = {
    ...defaultUser,
    id: 101,
  };

  static user: UserModel = {
    ...defaultUser,
    role: Role.ADMIN,
    rooms: lazyArray<RoomModel>([defaultRoom, defaultRoom]),
    followingUsers: lazyArray<UserModel>([
      MockUserModel.influencer,
      MockUserModel.unFollowingUser,
    ]),
    followerUsers: lazyArray<UserModel>([MockUserModel.influencer]),
    ranks: lazyArray<RankModel>([MockRankModel.rank]),
  };

  static otherUser: UserModel = {
    ...defaultUser,
    id: 2,
    username: 'otherUser',
    nickname: 'otherUser',
  };

  static addedUser: UserModel = {
    ...defaultUser,
    id: 3,
    username: 'addedUser',
    nickname: 'addedUser',
  };

  static notExistUser: UserModel = {
    ...defaultUser,
    id: 0,
    username: 'notExistUser',
    password: 'p@ssw0rd',
    nickname: '',
  };

  static notExistUser2: UserModel = {
    ...defaultUser,
    id: 0,
    username: 'notExistUser2',
    password: 'p@ssw0rd',
    nickname: '',
  };

  static swaggerUser = {
    id: 1,
    username: 'username',
    nickname: 'nickname',
    wallet: '0x201471290412905721905721094',
    image: null,
    bio: null,
    role: Role.ADMIN,
    provider: Provider.LOCAL,
    createdAt: new Date(1),
    updatedAt: new Date(1),
  };

  static users: UserModel[] = [
    MockUserModel.user,
    MockUserModel.otherUser,
    MockUserModel.influencer,
    MockUserModel.followingUser,
  ];

  static accessToken: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiaWF0IjoxNzAzNDA5OTA0LCJleHAiOjFlKzUwfQ.BBf7DDbpw-mopP6iPvu8pxc7PoTjCbt5p7h3RPWT_Cw';

  findOne({ where: { id, username } }) {
    const [user] = id
      ? MockUserModel.users.filter((user) => user.id === id)
      : MockUserModel.users.filter((user) => user.username === username);

    if (!user) return null;

    return user;
  }

  findAndCount() {
    return MockUserModel.users;
  }

  exist({ where: { id, username } }) {
    const [user] = id
      ? MockUserModel.users.filter((user) => user.id === id)
      : MockUserModel.users.filter((user) => user.username === username);

    if (user) return true;

    return false;
  }

  save() {
    MockUserModel.users.push(MockUserModel.addedUser);

    return MockUserModel.user;
  }

  update() {}

  delete() {
    return true;
  }
}
