import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { ProfileModule } from '../profile/profile.module';

@Module({
  controllers: [FriendController, ProfileModule],
  providers: [FriendService],
})
export class FriendModule {}
