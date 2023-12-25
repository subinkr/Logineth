import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/source-code/entities/user.entity';
import { ProfileModule } from 'src/account/profile/profile.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel]), ProfileModule],
  providers: [AuthService, JwtService],
  exports: [AuthModule, AuthService],
})
export class AuthModule {}
