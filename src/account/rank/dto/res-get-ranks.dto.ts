import { ApiProperty } from '@nestjs/swagger';
import { RankModel } from 'src/source-code/entities/rank.entity';
import { MockRankModel } from 'src/source-code/mock/entities/rank.mock';

export class ResGetRanks {
  @ApiProperty({ example: MockRankModel.ranks })
  ranks: RankModel[];
}
