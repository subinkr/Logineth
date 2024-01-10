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

@Injectable()
export class WsService {
  constructor(
    @InjectRepository(ChatModel)
    private readonly chatRepo: Repository<ChatModel>,
    private readonly profileService: ProfileService,
    private readonly dataService: DataService,
  ) {}

  async getRoom(roomID: number, page: number, loginUserID: number) {
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
