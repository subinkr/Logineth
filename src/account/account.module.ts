import { Module } from '@nestjs/common';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { ProfileModule } from './profile/profile.module';
import { FriendModule } from './friend/friend.module';
import { SettingModule } from './setting/setting.module';

@Module({
  imports: [RegisterModule, LoginModule, ProfileModule, FriendModule, SettingModule],
})
export class AccountModule {}
