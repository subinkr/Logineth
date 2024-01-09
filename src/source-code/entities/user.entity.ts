import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseModel } from './base.entity';
import { Exclude } from 'class-transformer';
import { Role } from '../enum/role';
import { Provider } from '../enum/provider';
import { ApiProperty } from '@nestjs/swagger';
import { MockUserModel } from '../mock/entities/user.mock';
import { ChatModel } from './chat.entity';
import { RoomModel } from './room.entity';

@Entity()
export class UserModel extends BaseModel {
  @ApiProperty({ example: MockUserModel.user.username, required: false })
  @Column()
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @ApiProperty({ example: MockUserModel.user.nickname, required: false })
  @Column()
  nickname: string;

  @ApiProperty({ example: MockUserModel.user.image, required: false })
  @Column({ nullable: true })
  image?: string;

  @ApiProperty({ example: MockUserModel.user.bio, required: false })
  @Column({ nullable: true })
  bio?: string;

  @ApiProperty({
    example: MockUserModel.user.role,
    required: false,
    default: Role.USER,
  })
  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: string;

  @ApiProperty({
    example: MockUserModel.user.provider,
    required: false,
    default: Provider.LOCAL,
  })
  @Column({ type: 'enum', enum: Provider, default: Provider.LOCAL })
  provider: string;

  @ApiProperty({ example: [], required: false })
  @ManyToMany(() => UserModel, (user) => user.followingUsers)
  followerUsers: Promise<UserModel[]>;

  @ApiProperty({ example: [], required: false })
  @ManyToMany(() => UserModel, (user) => user.followerUsers)
  @JoinTable({ name: 'follow_model' })
  followingUsers: Promise<UserModel[]>;

  @ApiProperty({ example: [], required: false })
  @OneToMany(() => ChatModel, (chat) => chat.user)
  chats: Promise<ChatModel[]>;

  @ApiProperty({ example: [], required: false })
  @ManyToMany(() => RoomModel, (room) => room.users)
  @JoinTable({ name: 'user_room_model' })
  rooms: Promise<RoomModel[]>;
}
