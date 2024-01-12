import { Module } from '@nestjs/common';
import { WsService } from './ws.service';
import { RoomGateway } from './ws.gateway';
import { WsController } from './ws.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModel } from 'src/source-code/entities/chat.entity';
import { ProfileModule } from 'src/account/profile/profile.module';
import { AuthModule } from '../auth/auth.module';
import { DataModule } from '../data/data.module';
import { RoomModel } from 'src/source-code/entities/room.entity';
import { UserModel } from 'src/source-code/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatModel, RoomModel]),
    ProfileModule,
    AuthModule,
    DataModule,
  ],
  providers: [RoomGateway, WsService],
  controllers: [WsController],
  exports: [WsService],
})
export class WsModule {}
