import { ApiProperty } from '@nestjs/swagger';
import { IsInstance } from 'class-validator';
import { RankRowModel } from 'src/source-code/entities/rank-row.entity';
import { MockRankRowModel } from 'src/source-code/mock/entities/rank-row.mock';

export class ResAddRow {
  @ApiProperty({ example: MockRankRowModel.rankRow })
  @IsInstance(RankRowModel)
  row: RankRowModel;
}
