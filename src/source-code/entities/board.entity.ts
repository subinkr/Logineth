import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { BaseModel } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MockBoardModel } from '../mock/entities/board.mock';
import { UserModel } from './user.entity';
import { MockUserModel } from '../mock/entities/user.mock';

@Entity()
export class BoardModel extends BaseModel {
  @ApiProperty({ example: MockBoardModel.board.name, required: false })
  @Column()
  name: string;

  @ApiProperty({ example: MockBoardModel.board.description, required: false })
  @Column()
  description: string;

  @ApiProperty({ example: MockBoardModel.board.image, required: false })
  @Column()
  image: string;

  @ApiProperty({ example: MockBoardModel.board.tokenID, required: false })
  @Column({ default: null })
  tokenID: number | null;

  @ApiProperty({ example: MockBoardModel.board.ad, required: false })
  @Column({ default: null })
  ad: string | null;

  @ApiProperty({ example: false, required: false })
  @Column({ default: false })
  banAd: boolean;

  @ApiProperty({ example: MockUserModel.user, required: false })
  @ManyToOne(() => UserModel, (user) => user.postBoards, { eager: true })
  originalAuthor: Promise<UserModel>;

  @ApiProperty({ example: MockUserModel.user, required: false })
  @ManyToOne(() => UserModel, (user) => user.ownBoards, { eager: true })
  owner: Promise<UserModel>;
}
