import { ApiProperty } from '@nestjs/swagger';
import { ChatModel } from 'src/source-code/entities/chat.entity';

export class ResGetRoom {
  @ApiProperty({ example: [], required: false })
  chats: ChatModel[];
}
