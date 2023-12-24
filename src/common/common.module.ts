import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [CommonController],
  providers: [CommonService],
  imports: [AuthModule],
})
export class CommonModule {}
