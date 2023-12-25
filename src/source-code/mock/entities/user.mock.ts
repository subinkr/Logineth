import { UserModel } from 'src/source-code/entities/user.entity';
import { Provider } from 'src/source-code/enum/provider';
import { Role } from 'src/source-code/enum/role';

export class MockUserModel {
  static user: UserModel = {
    id: 1,
    username: 'username',
    password: '$2b$10$G4R91NGJ3hXa4EFszIjDhumEY31yMwkvu9TSGVSb.iEfPNcdSYIu2',
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

  static accessToken: string =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiaWF0IjoxNzAzNDA5OTA0LCJleHAiOjFlKzUwfQ.BBf7DDbpw-mopP6iPvu8pxc7PoTjCbt5p7h3RPWT_Cw';

  findOne({ where: { id, username } }) {
    const [user] = id
      ? MockUserModel.userList.filter((user) => user.id === id)
      : MockUserModel.userList.filter((user) => user.username === username);

    if (user.username === 'notExistUser') {
      MockUserModel.userList.pop();
    }

    return user;
  }

  exist({ where: { id, username } }) {
    const [user] = id
      ? MockUserModel.userList.filter((user) => user.id === id)
      : MockUserModel.userList.filter((user) => user.username === username);

    return !!user;
  }

  save(notExistUser: UserModel) {
    MockUserModel.userList.push(notExistUser);

    return notExistUser;
  }
}
