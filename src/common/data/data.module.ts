import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { ProfileModule } from 'src/account/profile/profile.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/source-code/entities/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel]), ProfileModule, AuthModule],
  controllers: [DataController],
  providers: [DataService],
  exports: [DataService],
})
export class DataModule {}
