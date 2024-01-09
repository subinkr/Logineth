import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthID } from '../auth/decorator/id.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { WsService } from './ws.service';
import { ResGetRoom } from './dto/res-get-room.dto';
import { plainToInstance } from 'class-transformer';

@Controller('')
export class WsController {
  constructor(private readonly wsService: WsService) {}

  @Get('room/:roomID/:page')
  @UseGuards(AuthGuard)
  async getRoom(
    @Param('roomID', ParseIntPipe) roomID: number,
    @Param('page', ParseIntPipe) page: number,
    @AuthID() loginUserID: number,
  ) {
    const result = await this.wsService.getRoom(roomID, page, loginUserID);
    return plainToInstance(ResGetRoom, result);
  }
}
