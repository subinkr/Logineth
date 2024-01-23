import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MockUserModel } from '../mock/entities/user.mock';
import { UserModel } from './user.entity';
import { RankRowModel } from './rank-row.entity';

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

  @ApiProperty({ example: MockUserModel.user, required: false })
  @ManyToOne(() => UserModel, (user) => user.ranks, { eager: true })
  user: UserModel;
}
