import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { RegisterModule } from '../register/register.module';
import { AuthModule } from 'src/common/auth/auth.module';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [RegisterModule, AuthModule, ProfileModule],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
