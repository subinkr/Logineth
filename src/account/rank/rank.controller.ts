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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { badRequest } from 'src/source-code/error/swagger/bad-request';
import { forbidden } from 'src/source-code/error/swagger/forbidden';

@ApiTags('account | rank')
@Controller('rank')
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Get(':targetUserID')
  @ApiOperation({ summary: 'Get Ranks' })
  @ApiOkResponse({ type: ResGetRanks })
  async getRanks(
    @Param('targetUserID', ParseIntPipe) targetUserID: number,
  ): Promise<ResGetRanks> {
    const result = await this.rankService.getRanks(targetUserID);
    return plainToInstance(ResGetRanks, result);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create Rank' })
  @ApiCreatedResponse({ type: ResCreateRank })
  @ApiBadRequestResponse(badRequest('유저를 찾을 수 없습니다.'))
  @ApiForbiddenResponse(forbidden('같은 이름의 랭킹이 있습니다.'))
  @ApiBearerAuth()
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
  @ApiOperation({ summary: 'Edit Rank' })
  @ApiOkResponse({ type: ResEditRank })
  @ApiBadRequestResponse(badRequest('존재하지 않는 랭킹입니다.'))
  @ApiForbiddenResponse(forbidden('다른 유저의 랭킹은 수정할 수 없습니다.'))
  @ApiBearerAuth()
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
  @ApiOperation({ summary: 'Delete Rank' })
  @ApiNoContentResponse({ type: ResDeleteRank })
  @ApiBadRequestResponse(badRequest('존재하지 않는 랭킹입니다.'))
  @ApiForbiddenResponse(forbidden('다른 유저의 랭킹은 삭제할 수 없습니다.'))
  @ApiBearerAuth()
  async deleteRank(
    @Param('rankID', ParseIntPipe) rankID: number,
    @AuthID() loginUserID: number,
  ): Promise<ResDeleteRank> {
    const result = await this.rankService.deleteRank(rankID, loginUserID);
    return plainToInstance(ResDeleteRank, result);
  }

  @Post(':rankID')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Add Row' })
  @ApiCreatedResponse({ type: ResAddRow })
  @ApiBadRequestResponse(badRequest('존재하지 않는 랭킹입니다.'))
  @ApiForbiddenResponse(
    forbidden('다른 유저의 랭킹에 행을 추가할 수 없습니다.'),
  )
  @ApiBearerAuth()
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

  @Put(':rankID/:rowID')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Edit Row' })
  @ApiOkResponse({ type: ResEditRow })
  @ApiBadRequestResponse(badRequest('존재하지 않는 랭킹입니다.'))
  @ApiForbiddenResponse(forbidden('다른 유저의 랭킹은 수정할 수 없습니다.'))
  @ApiBearerAuth()
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

  @Delete(':rankID/:rowID')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Subtract Row' })
  @ApiNoContentResponse({ type: ResSubtractRow })
  @ApiBadRequestResponse(badRequest('존재하지 않는 랭킹입니다.'))
  @ApiForbiddenResponse(forbidden('다른 유저의 랭킹은 삭제할 수 없습니다.'))
  @ApiBearerAuth()
  async subtractRow(
    @Param('rowID', ParseIntPipe) rowID: number,
    @AuthID() loginUserID: number,
  ): Promise<ResSubtractRow> {
    const result = await this.rankService.subtractRow(rowID, loginUserID);
    return plainToInstance(ResSubtractRow, result);
  }
}
