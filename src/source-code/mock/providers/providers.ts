import { getRepositoryToken } from '@nestjs/typeorm';
import { ProfileService } from 'src/account/profile/profile.service';
import { UserModel } from 'src/source-code/entities/user.entity';
import { MockUserModel } from '../entities/user.mock';
import { AuthService } from 'src/common/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterService } from 'src/account/register/register.service';
import { LoginService } from 'src/account/login/login.service';
import { WsService } from 'src/common/ws/ws.service';
import { RoomModel } from 'src/source-code/entities/room.entity';
import { ChatModel } from 'src/source-code/entities/chat.entity';
import { MockRoomModel } from '../entities/room.mock';
import { MockChatModel } from '../entities/chat.mock';
import { DataService } from 'src/common/data/data.service';
import { FriendService } from 'src/account/friend/friend.service';

export const providers = [
  AuthService,
  JwtService,
  ProfileService,
  RegisterService,
  LoginService,
  WsService,
  DataService,
  FriendService,
  {
    provide: getRepositoryToken(UserModel),
    useClass: MockUserModel,
  },
  {
    provide: getRepositoryToken(RoomModel),
    useClass: MockRoomModel,
  },
  {
    provide: getRepositoryToken(ChatModel),
    useClass: MockChatModel,
  },
];
