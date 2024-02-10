import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { ReqPostBoard } from './dto/req-post-board.dto';
import { ResPostBoard } from './dto/res-post-board.dto';
import { AuthID } from 'src/common/auth/decorator/id.decorator';
import { AuthGuard } from 'src/common/auth/auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { notFound } from 'src/source-code/error/swagger/not-found';
import { plainToInstance } from 'class-transformer';
import { ResGetBoards } from './dto/res-get-boards.dto';
import { ResGetBoardByID } from './dto/res-get-board-by-id.dto';
import { ResMakeBoardNFT } from './dto/res-make-board-nft.dto';
import { ResDeleteBoard } from './dto/res-delete-board.dto';
import { notAcceptable } from 'src/source-code/error/swagger/not-acceptable';
import { badRequest } from 'src/source-code/error/swagger/bad-request';
import { forbidden } from 'src/source-code/error/swagger/forbidden';
import { ResEditAd } from './dto/res-edit-ad.dto';
import { ReqEditAd } from './dto/req-edit-ad.dto';
import { ResCancelMakeBoardNFT } from './dto/res-cancel-make-board-nft.dto';
import { ResCompleteMakeBoardNFT } from './dto/res-complete-make-board-nft.dto';
import { ReqCompleteMakeBoardNFT } from './dto/req-complete-make-board-nft.dto';

@Controller('board')
@ApiTags('account | board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Post Board' })
  @ApiCreatedResponse({ type: ResPostBoard })
  @ApiNotFoundResponse(notFound('유저를 찾을 수 없습니다'))
  @ApiBearerAuth()
  async postBoard(
    @Body() reqPostBoard: ReqPostBoard,
    @AuthID() loginUserID: number,
  ): Promise<ResPostBoard> {
    const result = await this.boardService.postBoard(reqPostBoard, loginUserID);
    return plainToInstance(ResPostBoard, result);
  }

  @Get()
  @ApiOperation({ summary: 'Get Boards' })
  @ApiOkResponse({ type: ResGetBoards })
  async getBoards(
    @Query('nft', ParseBoolPipe) isNFT: boolean,
    @Query('page', ParseIntPipe) page: number,
  ): Promise<ResGetBoards> {
    const result = await this.boardService.getBoards(isNFT, page);
    return plainToInstance(ResGetBoards, result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Board' })
  @ApiOkResponse({ type: ResGetBoardByID })
  @ApiNotFoundResponse(notFound('글을 찾을 수 없습니다'))
  async getBoardByID(
    @Param('id', ParseIntPipe) boardID: number,
  ): Promise<ResGetBoardByID> {
    const result = await this.boardService.getBoardByID(boardID);
    return plainToInstance(ResGetBoardByID, result);
  }

  @Put(':id/make')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Make Board NFT' })
  @ApiNoContentResponse({ type: ResMakeBoardNFT })
  @ApiNotFoundResponse(notFound('유저 / 글을 찾을 수 없습니다'))
  @ApiNotAcceptableResponse(notAcceptable('이미 NFT가 생성중인 글입니다.'))
  @ApiBadRequestResponse(badRequest('이미 NFT가 생성된 글입니다.'))
  @ApiBearerAuth()
  async makeBoardNFT(
    @Param('id', ParseIntPipe) boardID: number,
    @AuthID() loginUserID: number,
  ): Promise<ResMakeBoardNFT> {
    const result = await this.boardService.makeBoardNFT(boardID, loginUserID);
    return plainToInstance(ResMakeBoardNFT, result);
  }

  @Put(':id/cancel')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Cancel Make Board NFT' })
  @ApiNoContentResponse({ type: ResCancelMakeBoardNFT })
  @ApiNotFoundResponse(notFound('유저 / 글을 찾을 수 없습니다'))
  @ApiForbiddenResponse(forbidden('다른 유저의 NFT 생성을 취소할 수 없습니다.'))
  @ApiBearerAuth()
  async cancelMakeBoardNFT(
    @Param('id', ParseIntPipe) boardID: number,
    @AuthID() loginUserID: number,
  ): Promise<ResCancelMakeBoardNFT> {
    const result = await this.boardService.cancelMakeBoardNFT(
      boardID,
      loginUserID,
    );
    return plainToInstance(ResCancelMakeBoardNFT, result);
  }

  @Put(':id/complete')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Complete Make Board NFT' })
  @ApiNoContentResponse({ type: ResCompleteMakeBoardNFT })
  @ApiNotFoundResponse(notFound('유저 / 글을 찾을 수 없습니다'))
  @ApiForbiddenResponse(
    forbidden('다른 유저의 NFT tokenID를 수정할 수 없습니다.'),
  )
  @ApiBearerAuth()
  async completeMakeBoardNFT(
    @Param('id', ParseIntPipe) boardID: number,
    @Body() reqCompleteMakeBoardNFT: ReqCompleteMakeBoardNFT,
    @AuthID() loginUserID: number,
  ): Promise<ResCompleteMakeBoardNFT> {
    const result = await this.boardService.completeMakeBoardNFT(
      boardID,
      reqCompleteMakeBoardNFT,
      loginUserID,
    );
    return plainToInstance(ResCompleteMakeBoardNFT, result);
  }

  @Put(':id/ad')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Edit Ad' })
  @ApiNoContentResponse({ type: ResEditAd })
  @ApiNotFoundResponse(notFound('유저 / 글을 찾을 수 없습니다'))
  @ApiForbiddenResponse(forbidden('다른 유저의 광고를 수정할 수 없습니다.'))
  @ApiBearerAuth()
  async editAd(
    @Param('id', ParseIntPipe) boardID: number,
    @Body() reqEditAd: ReqEditAd,
    @AuthID() loginUserID: number,
  ): Promise<ResEditAd> {
    const result = await this.boardService.editAd(
      boardID,
      reqEditAd,
      loginUserID,
    );
    return plainToInstance(ResEditAd, result);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete Board' })
  @ApiNoContentResponse({ type: ResDeleteBoard })
  @ApiNotFoundResponse(notFound('유저 / 글을 찾을 수 없습니다'))
  @ApiForbiddenResponse(forbidden('다른 유저의 글은 삭제할 수 없습니다.'))
  @ApiBearerAuth()
  async deleteBoard(
    @Param('id', ParseIntPipe) boardID: number,
    @AuthID() loginUserID: number,
  ): Promise<ResDeleteBoard> {
    const result = await this.boardService.deleteBoard(boardID, loginUserID);
    return plainToInstance(ResDeleteBoard, result);
  }
}
