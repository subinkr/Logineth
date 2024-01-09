import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { NotiModule } from './noti/noti.module';
import { DataModule } from './data/data.module';
import { WsModule } from './ws/ws.module';

@Module({
  imports: [AuthModule, NotiModule, DataModule, WsModule],
})
export class CommonModule {}
