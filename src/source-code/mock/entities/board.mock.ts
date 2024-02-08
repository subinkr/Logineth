import { BoardModel } from 'src/source-code/entities/board.entity';
import { defaultUser } from './user.mock';
import { lazyArray } from '../common/lazyArray';
import { UserModel } from 'src/source-code/entities/user.entity';

const defaultBoard: BoardModel = {
  id: 0,
  createdAt: new Date(1),
  updatedAt: new Date(1),
  name: 'name',
  description: 'description',
  image: 'https://s3.amazonaws.com/fklajewioffdjsaiof',
  tokenID: 0,
  ad: 'This is advertisement',
  banAd: false,
  reportBoardUsers: lazyArray<UserModel>(),
  reportAdUsers: lazyArray<UserModel>(),
  originalAuthor: defaultUser,
  owner: defaultUser,
};

export class MockBoardModel {
  static board: BoardModel = { ...defaultBoard };
}
