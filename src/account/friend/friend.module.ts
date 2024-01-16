import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { ProfileModule } from '../profile/profile.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/source-code/entities/user.entity';
import { AuthModule } from 'src/common/auth/auth.module';
import { WsModule } from 'src/common/ws/ws.module';
import { DataModule } from 'src/common/data/data.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel]),
    ProfileModule,
    AuthModule,
    WsModule,
    DataModule,
  ],
  controllers: [FriendController],
  providers: [FriendService],
  exports: [FriendService],
})
export class FriendModule {}
