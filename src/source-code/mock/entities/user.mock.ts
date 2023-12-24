import { UserModel } from 'src/source-code/entities/user.entity';
import { Provider } from 'src/source-code/enum/provider';
import { Role } from 'src/source-code/enum/role';

export class MockUserModel {
  static user: UserModel = {
    id: 1,
    username: 'username',
    password: 'p@ssw0rd',
    nickname: 'nickname',
    image: null,
    role: Role.ADMIN,
    provider: Provider.LOCAL,
    createdAt: new Date(1),
    updatedAt: new Date(1),
  };

  static notExistUser: UserModel = {
    id: 0,
    username: 'notExistUser',
    password: '',
    nickname: '',
    image: null,
    role: Role.USER,
    provider: Provider.LOCAL,
    createdAt: null,
    updatedAt: null,
  };

  static userList: UserModel[] = [MockUserModel.user];

  findOne({ where: { id, username } }) {
    const [user] = id
      ? MockUserModel.userList.filter((user) => user.id === id)
      : MockUserModel.userList.filter((user) => user.username === username);

    return user;
  }
}
