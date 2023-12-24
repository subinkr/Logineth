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
}
