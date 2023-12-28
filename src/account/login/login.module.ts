import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { RegisterModule } from '../register/register.module';

@Module({
  imports: [RegisterModule],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginModule, LoginService],
})
export class LoginModule {}
