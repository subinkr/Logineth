import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from './base.entity';
import { RankModel } from './rank.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MockRankModel } from '../mock/entities/rank.mock';

@Entity()
export class RankRowModel extends BaseModel {
  @ApiProperty({ example: 'Rank row', required: false })
  @Column()
  content: string;

  @ApiProperty({ example: MockRankModel.rank, required: false })
  @ManyToOne(() => RankModel, (rank) => rank.rows, { onDelete: 'CASCADE' })
  rank: Promise<RankModel>;
}
