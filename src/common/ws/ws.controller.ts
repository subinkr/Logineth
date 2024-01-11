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
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { forbidden } from 'src/source-code/error/swagger/forbidden';
import { notFound } from 'src/source-code/error/swagger/not-found';
import { ResGetRooms } from './dto/res-get-rooms.dto';

@Controller('')
@ApiTags('common | ws')
export class WsController {
  constructor(private readonly wsService: WsService) {}

  @Get('rooms')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: ResGetRooms })
  @ApiNotFoundResponse(notFound('유저를 찾을 수 없습니다.'))
  @ApiBearerAuth()
  async getRooms(@AuthID() loginUserID: number): Promise<ResGetRooms> {
    const result = await this.wsService.getRooms(loginUserID);
    return plainToInstance(ResGetRooms, result);
  }

  @Get('room/:roomID/:page')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get Room' })
  @ApiOkResponse({ type: ResGetRoom })
  @ApiForbiddenResponse(forbidden('해당 방에 접근할 수 없습니다.'))
  @ApiNotFoundResponse(notFound('유저를 찾을 수 없습니다.'))
  @ApiBearerAuth()
  async getRoom(
    @Param('roomID', ParseIntPipe) roomID: number,
    @Param('page', ParseIntPipe) page: number,
    @AuthID() loginUserID: number,
  ): Promise<ResGetRoom> {
    const result = await this.wsService.getRoom(roomID, page, loginUserID);
    return plainToInstance(ResGetRoom, result);
  }
}
