import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
import { ChatModel } from 'src/source-code/entities/chat.entity';

export class ResGetChats {
  @ApiProperty({ example: [], required: false })
  @IsArray()
  chats: ChatModel[];

  @ApiProperty({ example: 0, required: false })
  @IsNumber()
  chatsCount: number;

  @ApiProperty({ example: false, required: false })
  nextPage: number | boolean;
}
