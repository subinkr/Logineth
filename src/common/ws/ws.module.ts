import { Module } from '@nestjs/common';
import { WsService } from './ws.service';
import { WsGateway } from './ws.gateway';
import { WsController } from './ws.controller';

@Module({
  providers: [WsGateway, WsService],
  controllers: [WsController],
})
export class WsModule {}
