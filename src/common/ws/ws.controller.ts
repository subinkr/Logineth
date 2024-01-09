import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthID } from '../auth/decorator/id.decorator';
import { AuthGuard } from '../auth/auth.guard';

@Controller('')
export class WsController {
  @Get('room/:roomID')
  @UseGuards(AuthGuard)
  async getRoom(
    @Param('roomID', ParseIntPipe) roomID: number,
    @AuthID() userID: number,
  ) {}
}
