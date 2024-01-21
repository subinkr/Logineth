import { Module } from '@nestjs/common';
import { RankService } from './rank.service';
import { RankController } from './rank.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankModel } from 'src/source-code/entities/rank.entity';

@Module({
  controllers: [RankController],
  providers: [RankService],
})
export class RankModule {}
