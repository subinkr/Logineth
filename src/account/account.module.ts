import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [RegisterModule, LoginModule, ProfileModule],
})
export class AccountModule {}
