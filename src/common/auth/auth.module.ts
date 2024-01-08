import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/source-code/entities/user.entity';
import { ProfileService } from 'src/account/profile/profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  providers: [AuthService, JwtService, ProfileService],
  exports: [AuthModule, AuthService],
})
export class AuthModule {}
