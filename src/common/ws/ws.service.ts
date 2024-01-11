import {
  BadRequestException,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatModel } from 'src/source-code/entities/chat.entity';
import { Repository } from 'typeorm';
import { RoomGatewaySendMessage } from './dto/room-gateway-send-message.dto';
import { ProfileService } from 'src/account/profile/profile.service';
import { DataService } from '../data/data.service';
import { ReqPagination } from '../data/dto/req-pagination.dto';
import { UserModel } from 'src/source-code/entities/user.entity';
import { RoomModel } from 'src/source-code/entities/room.entity';

@Injectable()
export class WsService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepo: Repository<UserModel>,
    @InjectRepository(RoomModel)
    private readonly roomRepo: Repository<RoomModel>,
    @InjectRepository(ChatModel)
    private readonly chatRepo: Repository<ChatModel>,
    private readonly profileService: ProfileService,
    private readonly dataService: DataService,
  ) {}

  // GRSERVICE: - {rooms: RoomModel[]}
  async getRooms(loginUserID: number) {
    const { user: loginUser } =
      await this.profileService.getUserByID(loginUserID);
    const rooms = await loginUser.rooms;

    return { rooms };
  }

  // GRSERVICE: - {chats: ChatModel[], chatsCount: number, nextPage: number | boolean}
  async getChats(roomID: number, page: number, loginUserID: number) {
    const { user } = await this.profileService.getUserByID(loginUserID);

    const rooms = await user.rooms;
    const roomIdx = rooms.findIndex((room) => room.id === roomID);
    if (roomIdx === -1) {
      throw new ForbiddenException('해당 방에 접근할 수 없습니다.');
    }

    const take = 30;
    const skip = (page - 1) * 30;
    const findAndCount = await this.chatRepo.findAndCount({
      where: { room: { id: roomID } },
      order: { id: 'DESC' },
      skip,
      take,
    });

    const reqPagination: ReqPagination<ChatModel> = {
      findAndCount,
      skip,
      take,
      page,
    };

    const {
      array: chats,
      arrayCount: chatsCount,
      nextPage,
    } = this.dataService.pagination(reqPagination);

    return { chats, chatsCount, nextPage };
  }

  // CRSERVICE: - {room: RoomModel}
  async createRoom(name: string, users: UserModel[]) {
    const room = this.roomRepo.create();
    room.name = name;
    room.users = Promise.resolve(users);
    await this.roomRepo.save(room);
    return { room };
  }

  // DRSERVICE: - {message: string}
  async deleteRoom(user: UserModel, roomName: string) {
    const rooms = await user.rooms;

    const roomIdx = rooms.findIndex((room) => room.name === roomName);
    if (roomIdx !== -1) {
      rooms.splice(roomIdx, 1);
      user.rooms = Promise.resolve(rooms);
      await this.userRepo.save(user);
    }

    return { message: '삭제되었습니다.' };
  }

  // SMSERVICE: - {chat: ChatModel}
  async sendMessage(
    data: RoomGatewaySendMessage,
    roomID: number,
    loginUserID: number,
  ) {
    const { content } = data;

    if (!content) {
      throw new BadRequestException('내용이 없습니다.');
    }
    const { user } = await this.profileService.getUserByID(loginUserID);

    const rooms = await user.rooms;
    const roomIdx = rooms.findIndex((room) => room.id === roomID);
    if (roomIdx === -1) {
      throw new ForbiddenException('해당 방에 접근할 수 없습니다.');
    }
    const room = rooms[roomIdx];

    const chat = await this.chatRepo.save({ room, user, content });

    return { chat };
  }
}
