import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MockUserModel } from '../mock/entities/user.mock';

@Entity()
export class BaseModel {
  @ApiProperty({ example: MockUserModel.user.id, required: false })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: MockUserModel.user.createdAt, required: false })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: MockUserModel.user.updatedAt, required: false })
  @UpdateDateColumn()
  updatedAt: Date;
}
