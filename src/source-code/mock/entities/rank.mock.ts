import { RankModel } from 'src/source-code/entities/rank.entity';
import { defaultUser } from './user.mock';

export const defaultRank: RankModel = {
  id: 1,
  createdAt: new Date(1),
  updatedAt: new Date(1),
  title: 'title',
  ranking: '1/2/3',
  rows: [],
  user: defaultUser,
};

export class MockRankModel {
  static rank: RankModel = {
    ...defaultRank,
    user: { ...defaultUser, id: 1 },
  };

  static ranks: RankModel[] = [MockRankModel.rank];

  find() {
    return MockRankModel.ranks;
  }

  findOne({ where: { id } }) {
    return MockRankModel.ranks.filter((rank) => rank.id === id)[0];
  }

  save() {}

  delete() {}
}
