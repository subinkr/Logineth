import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/common/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/source-code/entities/user.entity';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel]), AuthModule, ProfileModule],
  controllers: [RegisterController],
  providers: [RegisterService, JwtService],
  exports: [RegisterModule, RegisterService],
})
export class RegisterModule {}
