import { Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/source-code/entities/user.entity';
import { ProfileModule } from '../profile/profile.module';
import { AuthModule } from 'src/common/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel]), AuthModule, ProfileModule],
  controllers: [SettingController],
  providers: [SettingService],
  exports: [SettingService],
})
export class SettingModule {}
