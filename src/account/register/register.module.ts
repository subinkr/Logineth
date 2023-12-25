import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { AuthService } from 'src/common/auth/auth.service';

@Module({
  controllers: [RegisterController],
  providers: [RegisterService, AuthService],
})
export class RegisterModule {}
