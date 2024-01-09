import { Module } from '@nestjs/common';
import { WsService } from './ws.service';
import { RoomGateway } from './ws.gateway';
import { WsController } from './ws.controller';

@Module({
  providers: [RoomGateway, WsService],
  controllers: [WsController],
})
export class WsModule {}
