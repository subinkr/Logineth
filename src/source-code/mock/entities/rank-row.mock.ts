import { RankRowModel } from 'src/source-code/entities/rank-row.entity';
import { defaultRank } from './rank.mock';

export const defaultRankRow: RankRowModel = {
  id: 1,
  createdAt: new Date(1),
  updatedAt: new Date(1),
  content: 'content',
  rank: defaultRank,
};

export class MockRankRowModel {
  static rankRow: RankRowModel = {
    ...defaultRankRow,
    rank: { ...defaultRank, id: 1 },
  };

  static otherRankRow: RankRowModel = {
    ...defaultRankRow,
    id: 2,
    rank: { ...defaultRank, id: 2 },
  };

  static rankRows: RankRowModel[] = [
    MockRankRowModel.rankRow,
    MockRankRowModel.otherRankRow,
  ];

  save() {}

  findOne({ where: { id } }) {
    return MockRankRowModel.rankRows.filter((row) => row.id === id)[0];
  }

  delete() {}
}
