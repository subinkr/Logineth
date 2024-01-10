import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { ProfileModule } from '../profile/profile.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/source-code/entities/user.entity';
import { RoomModel } from 'src/source-code/entities/room.entity';
import { AuthModule } from 'src/common/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel, RoomModel]),
    ProfileModule,
    AuthModule,
  ],
  controllers: [FriendController],
  providers: [FriendService],
  exports: [FriendService],
})
export class FriendModule {}
