import { ApiProperty } from '@nestjs/swagger';
import { IsInstance } from 'class-validator';
import { RankModel } from 'src/source-code/entities/rank.entity';
import { MockRankModel } from 'src/source-code/mock/entities/rank.mock';

export class ResCreateRank {
  @ApiProperty({ example: MockRankModel.rank })
  @IsInstance(RankModel)
  rank: RankModel;
}
