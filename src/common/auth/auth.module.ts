import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ProfileService } from 'src/account/profile/profile.service';

@Module({
  providers: [AuthService, JwtService, ProfileService],
})
export class AuthModule {}
