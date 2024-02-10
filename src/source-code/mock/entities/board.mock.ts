import { BoardModel } from 'src/source-code/entities/board.entity';
import { defaultUser } from './user.mock';

export const defaultBoard: BoardModel = {
  id: 1,
  createdAt: new Date(1),
  updatedAt: new Date(1),
  name: 'name',
  description: 'description',
  image: 'https://s3.amazonaws.com/fklajewioffdjsaiof',
  tokenID: null,
  ad: 'This is advertisement',
  banAd: false,
  originalAuthor: Promise.resolve(defaultUser),
  owner: Promise.resolve(defaultUser),
};

export class MockBoardModel {
  static board: BoardModel = {
    ...defaultBoard,
    owner: null,
  };

  static ownBoard: BoardModel = {
    ...defaultBoard,
    id: 2,
  };

  static existNFTBoard: BoardModel = {
    ...defaultBoard,
    id: 3,
    tokenID: 1,
  };

  static boards: BoardModel[] = [
    MockBoardModel.board,
    MockBoardModel.ownBoard,
    MockBoardModel.existNFTBoard,
  ];

  create() {
    return MockBoardModel.board;
  }

  findOne({ where: { id } }) {
    switch (id) {
      case 1:
        return { ...defaultBoard, owner: null };
      case 2:
        return { ...defaultBoard, id };
      case 3:
        return { ...defaultBoard, id, tokenID: 1 };
    }
  }

  find() {
    return [MockBoardModel.board];
  }

  findAndCount() {
    return MockBoardModel.boards;
  }

  save() {
    MockBoardModel.board = { ...defaultBoard, owner: null };
    MockBoardModel.ownBoard = { ...defaultBoard, id: 2 };
    MockBoardModel.existNFTBoard = { ...defaultBoard, id: 3, tokenID: 1 };

    return MockBoardModel.board;
  }

  delete() {}
}
