import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { AuthModule } from './auth/auth.module';
import { NotiModule } from './noti/noti.module';

@Module({
  controllers: [CommonController],
  providers: [CommonService],
  imports: [AuthModule, NotiModule],
})
export class CommonModule {}
