import { RankModel } from 'src/source-code/entities/rank.entity';
import { defaultUser } from './user.mock';

export const defaultRank: RankModel = {
  id: 1,
  createdAt: new Date(1),
  updatedAt: new Date(1),
  title: 'Rank title',
  ranking: '1/2/3',
  rows: [],
  user: defaultUser,
};

export class MockRankModel {
  static rank: RankModel = {
    ...defaultRank,
  };
}
