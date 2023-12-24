import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ProfileService } from 'src/account/profile/profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/source-code/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  providers: [AuthService, JwtService, ProfileService],
})
export class AuthModule {}
