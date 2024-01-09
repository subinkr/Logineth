import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatModel } from 'src/source-code/entities/chat.entity';
import { Repository } from 'typeorm';
import { RoomGatewaySendMessage } from './dto/room-gateway-send-message.dto';
import { ProfileService } from 'src/account/profile/profile.service';

@Injectable()
export class WsService {
  constructor(
    @InjectRepository(ChatModel)
    private readonly chatRepo: Repository<ChatModel>,
    private readonly profileService: ProfileService,
  ) {}

  async sendMessage(data: RoomGatewaySendMessage, roomID: number) {
    const {
      user: { id: userID },
      content,
    } = data;

    if (!content) {
      throw new BadRequestException('내용이 없습니다.');
    }
    const { user } = await this.profileService.getUserByID(userID);

    const rooms = await user.rooms;
    const roomIdx = rooms.findIndex((room) => room.id === roomID);
    if (roomIdx === -1) {
      throw new UnauthorizedException('해당 방에 접근할 수 없습니다.');
    }
    const room = rooms[roomIdx];

    const chat = await this.chatRepo.save({ room, user, content });

    return { chat };
  }
}
