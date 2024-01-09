import { UserModel } from 'src/source-code/entities/user.entity';
import { Provider } from 'src/source-code/enum/provider';
import { Role } from 'src/source-code/enum/role';
import { lazyArray } from '../common/lazyArray';
import { RoomModel } from 'src/source-code/entities/room.entity';
import { ChatModel } from 'src/source-code/entities/chat.entity';
import { MockRoomModel } from './room.mock';

export class MockUserModel {
  static defaultUser: UserModel = {
    id: 1,
    username: 'username',
    password: '$2b$10$G4R91NGJ3hXa4EFszIjDhumEY31yMwkvu9TSGVSb.iEfPNcdSYIu2',
    nickname: 'nickname',
    image: null,
    bio: null,
    role: Role.USER,
    provider: Provider.LOCAL,
    createdAt: new Date(1),
    updatedAt: new Date(1),
    followingUsers: lazyArray<UserModel>(),
    followerUsers: lazyArray<UserModel>(),
    rooms: lazyArray<RoomModel>(),
    chats: lazyArray<ChatModel>(),
  };

  static user: UserModel = {
    ...this.defaultUser,
    role: Role.ADMIN,
    rooms: lazyArray<RoomModel>([MockRoomModel.room]),
  };

  static otherUser: UserModel = {
    ...this.defaultUser,
    id: 2,
    username: 'otherUser',
    nickname: 'otherUser',
  };

  static addedUser: UserModel = {
    ...this.defaultUser,
    id: 3,
    username: 'addedUser',
    nickname: 'addedUser',
  };

  static notExistUser: UserModel = {
    ...this.defaultUser,
    id: 0,
    username: 'notExistUser',
    password: 'p@ssw0rd',
    nickname: '',
  };

  static notExistUser2: UserModel = {
    ...this.defaultUser,
    id: 0,
    username: 'notExistUser2',
    password: 'p@ssw0rd',
    nickname: '',
  };

  static swaggerUser = {
    id: 1,
    username: 'username',
    nickname: 'nickname',
    image: null,
    bio: null,
    role: Role.ADMIN,
    provider: Provider.LOCAL,
    createdAt: new Date(1),
    updatedAt: new Date(1),
  };

  static userList: UserModel[] = [MockUserModel.user, MockUserModel.otherUser];

  static accessToken: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiaWF0IjoxNzAzNDA5OTA0LCJleHAiOjFlKzUwfQ.BBf7DDbpw-mopP6iPvu8pxc7PoTjCbt5p7h3RPWT_Cw';

  findOne({ where: { id, username } }) {
    const [user] = id
      ? MockUserModel.userList.filter((user) => user.id === id)
      : MockUserModel.userList.filter((user) => user.username === username);

    if (!user) return null;

    return user;
  }

  exist({ where: { id, username } }) {
    const [user] = id
      ? MockUserModel.userList.filter((user) => user.id === id)
      : MockUserModel.userList.filter((user) => user.username === username);

    if (user) return true;

    return false;
  }

  save() {
    MockUserModel.userList.push(MockUserModel.addedUser);

    return MockUserModel.addedUser;
  }

  update() {}

  delete() {
    return true;
  }
}
