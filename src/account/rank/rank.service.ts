import { Injectable } from '@nestjs/common';
import { ProfileService } from '../profile/profile.service';
import { InjectRepository } from '@nestjs/typeorm';
import { RankModel } from 'src/source-code/entities/rank.entity';
import { Repository } from 'typeorm';
import { RankRowModel } from 'src/source-code/entities/rank-row.entity';
import { ResGetRank } from './dto/res-get-rank.dto';
import { ResCreateRank } from './dto/res-create-rank.dto';
import { ResEditRank } from './dto/res-edit-rank.dto';
import { ResDeleteRank } from './dto/res-delete-rank.dto';
import { ResAddRow } from './dto/res-add-row.dto';
import { ResSubtractRow } from './dto/res-subtract-row.dto';

@Injectable()
export class RankService {
  constructor(
    @InjectRepository(RankModel)
    private readonly rankRepo: Repository<RankModel>,
    @InjectRepository(RankRowModel)
    private readonly rankRowRepo: Repository<RankRowModel>,
    private readonly profileService: ProfileService,
  ) {}

  async getRank(): Promise<ResGetRank> {
    return {};
  }

  async createRank(): Promise<ResCreateRank> {
    return {};
  }

  async editRank(): Promise<ResEditRank> {
    return {};
  }

  async deleteRank(): Promise<ResDeleteRank> {
    return {};
  }

  async addRow(): Promise<ResAddRow> {
    return {};
  }

  async subtractRow(): Promise<ResSubtractRow> {
    return {};
  }
}
