import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RankService } from './rank.service';
import { ResGetRanks } from './dto/res-get-ranks.dto';
import { plainToInstance } from 'class-transformer';
import { ResCreateRank } from './dto/res-create-rank.dto';
import { ResEditRank } from './dto/res-edit-rank.dto';
import { ResDeleteRank } from './dto/res-delete-rank.dto';
import { ResAddRow } from './dto/res-add-row.dto';
import { ResSubtractRow } from './dto/res-subtract-row.dto';
import { AuthGuard } from 'src/common/auth/auth.guard';
import { AuthID } from 'src/common/auth/decorator/id.decorator';
import { ReqCreateRank } from './dto/req-create-rank.dto';
import { ReqEditRank } from './dto/req-edit-rank.dto';
import { ReqAddRow } from './dto/req-add-row.dto';
import { ResEditRow } from './dto/res-edit-row.dto';
import { ReqEditRow } from './dto/req-edit-row.dto';

@Controller('rank')
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Get(':targetUserID')
  async getRanks(
    @Param('targetUserID', ParseIntPipe) targetUserID: number,
  ): Promise<ResGetRanks> {
    const result = await this.rankService.getRanks(targetUserID);
    return plainToInstance(ResGetRanks, result);
  }

  @Post()
  @UseGuards(AuthGuard)
  async createRank(
    @Body() reqCreateRank: ReqCreateRank,
    @AuthID() loginUserID: number,
  ): Promise<ResCreateRank> {
    const result = await this.rankService.createRank(
      reqCreateRank,
      loginUserID,
    );
    return plainToInstance(ResCreateRank, result);
  }

  @Put(':rankID')
  @UseGuards(AuthGuard)
  async editRank(
    @Param('rankID', ParseIntPipe) rankID: number,
    @Body() reqEditRank: ReqEditRank,
    @AuthID() loginUserID: number,
  ): Promise<ResEditRank> {
    const result = await this.rankService.editRank(
      rankID,
      reqEditRank,
      loginUserID,
    );
    return plainToInstance(ResEditRank, result);
  }

  @Delete(':rankID')
  @UseGuards(AuthGuard)
  async deleteRank(
    @Param('rankID', ParseIntPipe) rankID: number,
    @AuthID() loginUserID: number,
  ): Promise<ResDeleteRank> {
    const result = await this.rankService.deleteRank(rankID, loginUserID);
    return plainToInstance(ResDeleteRank, result);
  }

  @Post(':rankID')
  @UseGuards(AuthGuard)
  async addRow(
    @Param('rankID', ParseIntPipe) rankID: number,
    @Body() reqAddRow: ReqAddRow,
    @AuthID() loginUserID: number,
  ): Promise<ResAddRow> {
    const result = await this.rankService.addRow(
      rankID,
      reqAddRow,
      loginUserID,
    );
    return plainToInstance(ResAddRow, result);
  }

  @Put(':rowID')
  @UseGuards(AuthGuard)
  async editRow(
    @Param('rowID', ParseIntPipe) rowID: number,
    @Body() reqEditRow: ReqEditRow,
    @AuthID() loginUserID: number,
  ): Promise<ResEditRow> {
    const result = await this.rankService.editRow(
      rowID,
      reqEditRow,
      loginUserID,
    );
    return plainToInstance(ResSubtractRow, result);
  }

  @Delete(':rowID')
  @UseGuards(AuthGuard)
  async subtractRow(
    @Param('rowID', ParseIntPipe) rowID: number,
    @AuthID() loginUserID: number,
  ): Promise<ResSubtractRow> {
    const result = await this.rankService.subtractRow(rowID, loginUserID);
    return plainToInstance(ResSubtractRow, result);
  }
}
