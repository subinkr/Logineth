import { Module } from '@nestjs/common';
import { RankService } from './rank.service';
import { RankController } from './rank.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankModel } from 'src/source-code/entities/rank.entity';
import { RankRowModel } from 'src/source-code/entities/rank-row.entity';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [TypeOrmModule.forFeature([RankModel, RankRowModel]), ProfileModule],
  controllers: [RankController],
  providers: [RankService],
  exports: [RankService],
})
export class RankModule {}
