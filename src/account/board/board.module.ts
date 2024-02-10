import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { ProfileModule } from '../profile/profile.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModel } from 'src/source-code/entities/board.entity';
import { DataModule } from 'src/common/data/data.module';
import { AuthModule } from 'src/common/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardModel]),
    ProfileModule,
    DataModule,
    AuthModule,
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
