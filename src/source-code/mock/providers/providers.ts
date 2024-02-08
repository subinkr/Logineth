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
import { SettingService } from 'src/account/setting/setting.service';
import { RankService } from 'src/account/rank/rank.service';
import { RankModel } from 'src/source-code/entities/rank.entity';
import { RankRowModel } from 'src/source-code/entities/rank-row.entity';
import { MockRankModel } from '../entities/rank.mock';
import { MockRankRowModel } from '../entities/rank-row.mock';
import { BoardService } from 'src/account/board/board.service';
import { BoardModel } from 'src/source-code/entities/board.entity';
import { MockBoardModel } from '../entities/board.mock';

export const providers = [
  AuthService,
  JwtService,
  ProfileService,
  RegisterService,
  LoginService,
  WsService,
  DataService,
  FriendService,
  SettingService,
  RankService,
  BoardService,
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
  {
    provide: getRepositoryToken(RankModel),
    useClass: MockRankModel,
  },
  {
    provide: getRepositoryToken(RankRowModel),
    useClass: MockRankRowModel,
  },
  {
    provide: getRepositoryToken(BoardModel),
    useClass: MockBoardModel,
  },
];
