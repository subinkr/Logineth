import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { AuthModule } from 'src/common/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/source-code/entities/user.entity';
import { ProfileModule } from '../profile/profile.module';
import { RoomModel } from 'src/source-code/entities/room.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel, RoomModel]),
    AuthModule,
    ProfileModule,
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
  exports: [RegisterService],
})
export class RegisterModule {}
