import { Controller } from '@nestjs/common';
import { RankService } from './rank.service';
import { ResGetRank } from './dto/res-get-rank.dto';
import { plainToInstance } from 'class-transformer';
import { ResCreateRank } from './dto/res-create-rank.dto';
import { ResEditRank } from './dto/res-edit-rank.dto';
import { ResDeleteRank } from './dto/res-delete-rank.dto';
import { ResAddRow } from './dto/res-add-row.dto';
import { ResSubtractRow } from './dto/res-subtract-row.dto';

@Controller('rank')
export class RankController {
  constructor(private readonly rankService: RankService) {}

  async getRank(): Promise<ResGetRank> {
    const result = await this.rankService.getRank();
    return plainToInstance(ResGetRank, result);
  }

  async createRank(): Promise<ResCreateRank> {
    const result = await this.rankService.createRank();
    return plainToInstance(ResCreateRank, result);
  }

  async editRank(): Promise<ResEditRank> {
    const result = await this.rankService.editRank();
    return plainToInstance(ResEditRank, result);
  }

  async deleteRank(): Promise<ResDeleteRank> {
    const result = await this.rankService.deleteRank();
    return plainToInstance(ResDeleteRank, result);
  }

  async addRow(): Promise<ResAddRow> {
    const result = await this.rankService.addRow();
    return plainToInstance(ResAddRow, result);
  }

  async subtractRow(): Promise<ResSubtractRow> {
    const result = await this.rankService.subtractRow();
    return plainToInstance(ResSubtractRow, result);
  }
}
