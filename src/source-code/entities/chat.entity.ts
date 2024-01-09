import { Column, ManyToOne } from 'typeorm';
import { BaseModel } from './base.entity';
import { RoomModel } from './room.entity';
import { UserModel } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ChatModel extends BaseModel {
  @ApiProperty({ example: 'content', required: false })
  @Column()
  content: string;

  @ApiProperty({ example: [], required: false })
  @ManyToOne(() => RoomModel, (room) => room.chats, {
    onDelete: 'CASCADE',
  })
  room: RoomModel;

  @ApiProperty({ example: [], required: false })
  @ManyToOne(() => UserModel, (user) => user.chats, {
    onDelete: 'CASCADE',
  })
  user: UserModel;
}
