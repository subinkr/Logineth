import { Entity, ManyToMany, OneToMany } from 'typeorm';
import { BaseModel } from './base.entity';
import { ChatModel } from './chat.entity';
import { UserModel } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class RoomModel extends BaseModel {
  @ApiProperty({ example: [], required: false })
  @OneToMany(() => ChatModel, (chat) => chat.room)
  chats: Promise<ChatModel[]>;

  @ApiProperty({ example: [], required: false })
  @ManyToMany(() => UserModel, (user) => user.rooms)
  users: Promise<UserModel[]>;
}
