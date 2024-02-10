import { BoardModel } from 'src/source-code/entities/board.entity';
import { defaultUser } from './user.mock';

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
  originalAuthor: defaultUser,
  owner: defaultUser,
};

export class MockBoardModel {
  static board: BoardModel = { ...defaultBoard };
}
