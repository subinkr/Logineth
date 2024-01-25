import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from './user.entity';
import { RankRowModel } from './rank-row.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class RankModel extends BaseModel {
  @ApiProperty({ example: 'Rank title', required: false })
  @Column()
  title: string;

  @ApiProperty({ example: '10/7/3/8/67/52', required: false })
  @Column({ default: '' })
  ranking: string;

  @ApiProperty({ example: [], required: false })
  @OneToMany(() => RankRowModel, (row) => row.rank, { eager: true })
  rows?: RankRowModel[];

  @ManyToOne(() => UserModel, (user) => user.ranks, { eager: true })
  @Exclude({ toPlainOnly: true })
  user: UserModel;
}
