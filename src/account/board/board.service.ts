import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { ProfileService } from '../profile/profile.service';
import { ReqPostBoard } from './dto/req-post-board.dto';
import { ResPostBoard } from './dto/res-post-board.dto';
import { ResGetBoards } from './dto/res-get-boards.dto';
import { ResGetBoardByID } from './dto/res-get-board-by-id.dto';
import { ResMakeBoardNFT } from './dto/res-make-board-nft.dto';
import { ResDeleteBoard } from './dto/res-delete-board.dto';
import { ResEditAd } from './dto/res-edit-ad.dto';
import { ReqEditAd } from './dto/req-edit-ad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardModel } from 'src/source-code/entities/board.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { DataService } from 'src/common/data/data.service';
import { ResCancelMakeBoardNFT } from './dto/res-cancel-make-board-nft.dto';
import { ResCompleteMakeBoardNFT } from './dto/res-complete-make-board-nft.dto';
import { ReqCompleteMakeBoardNFT } from './dto/req-complete-make-board-nft.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardModel)
    private readonly boardRepo: Repository<BoardModel>,
    private readonly profileService: ProfileService,
    private readonly dataService: DataService,
  ) {}

  async postBoard(
    reqPostBoard: ReqPostBoard,
    loginUserID: number,
  ): Promise<ResPostBoard> {
    const { user } = await this.profileService.getUserByID(loginUserID);
    const { name, description, image } = reqPostBoard;

    const board = this.boardRepo.create();
    board.name = name;
    board.description = description;
    board.image = image;
    board.originalAuthor = Promise.resolve(user);
    const newBoard = await this.boardRepo.save(board);

    return { board: newBoard };
  }

  async getBoards(
    targetUserID: string,
    isNFT: boolean,
    page: number,
  ): Promise<ResGetBoards> {
    const take = 5;
    const skip = (page - 1) * take;
    let findAndCount: [BoardModel[], number] = [[], 0];

    if (isNFT) {
      findAndCount = await this.boardRepo.findAndCount({
        where: {
          tokenID: Not(IsNull()),
          originalAuthor: {
            id: parseInt(targetUserID) || Not(IsNull()),
          },
        },
        order: { updatedAt: 'desc' },
        take,
        skip,
        relations: { originalAuthor: true },
      });
    } else {
      findAndCount = await this.boardRepo.findAndCount({
        where: {
          originalAuthor: {
            id: parseInt(targetUserID) || Not(IsNull()),
          },
        },
        order: { updatedAt: 'desc' },
        take,
        skip,
        relations: { originalAuthor: true },
      });
    }

    const {
      array: boards,
      arrayCount: boardsCount,
      nextPage,
    } = this.dataService.pagination(findAndCount, take, skip, page);

    return { boards, boardsCount, nextPage };
  }

  async getBoardByID(boardID: number): Promise<ResGetBoardByID> {
    const board = await this.boardRepo.findOne({ where: { id: boardID } });
    if (!board) {
      throw new NotFoundException('글을 찾을 수 없습니다.');
    }

    return { board };
  }

  async makeBoardNFT(
    boardID: number,
    loginUserID: number,
  ): Promise<ResMakeBoardNFT> {
    const { user } = await this.profileService.getUserByID(loginUserID);
    const { board } = await this.getBoardByID(boardID);

    if (await board.owner) {
      if (board.tokenID) {
        throw new BadRequestException('이미 NFT가 생성된 글입니다.');
      } else {
        throw new NotAcceptableException('이미 NFT를 생성중인 글업니다.');
      }
    }

    board.owner = Promise.resolve(user);
    await this.boardRepo.save(board);

    return { message: 'NFT 생성을 시작했습니다.' };
  }

  async cancelMakeBoardNFT(
    boardID: number,
    loginUserID: number,
  ): Promise<ResCancelMakeBoardNFT> {
    const { user } = await this.profileService.getUserByID(loginUserID);
    const { board } = await this.getBoardByID(boardID);
    const owner = await board.owner;

    if (!owner || owner.id !== user.id) {
      throw new ForbiddenException(
        '다른 유저의 NFT 생성을 취소할 수 없습니다.',
      );
    }

    board.owner = null;
    await this.boardRepo.save(board);

    return { message: 'NFT 생성이 취소되었습니다.' };
  }

  async completeMakeBoardNFT(
    boardID: number,
    reqCompleteMakeBoardNFT: ReqCompleteMakeBoardNFT,
    loginUserID: number,
  ): Promise<ResCompleteMakeBoardNFT> {
    const { user } = await this.profileService.getUserByID(loginUserID);
    const { board } = await this.getBoardByID(boardID);
    const owner = await board.owner;

    if (!owner || owner.id !== user.id) {
      throw new ForbiddenException(
        '다른 유저의 NFT tokenID를 수정할 수 없습니다.',
      );
    }

    const { tokenID } = reqCompleteMakeBoardNFT;
    board.tokenID = tokenID;
    await this.boardRepo.save(board);

    return { message: 'NFT 생성이 완료되었습니다.' };
  }

  async editAd(
    boardID: number,
    reqEditAd: ReqEditAd,
    loginUserID: number,
  ): Promise<ResEditAd> {
    const { user } = await this.profileService.getUserByID(loginUserID);
    const { board } = await this.getBoardByID(boardID);
    const owner = await board.owner;

    if (!owner || owner.id !== user.id) {
      throw new ForbiddenException('다른 유저의 광고를 수정할 수 없습니다.');
    }

    const { ad } = reqEditAd;

    await this.boardRepo.save({ ...board, ad });

    return { message: '광고가 수정되었습니다.' };
  }

  async deleteBoard(
    boardID: number,
    loginUserID: number,
  ): Promise<ResDeleteBoard> {
    const { user } = await this.profileService.getUserByID(loginUserID);
    const { board } = await this.getBoardByID(boardID);
    const originalAuthor = await board.originalAuthor;

    if (originalAuthor.id !== user.id) {
      throw new ForbiddenException('다른 유저의 글을 삭제할 수 없습니다.');
    }

    await this.boardRepo.delete(board.id);

    return { message: '글이 삭제되었습니다.' };
  }
}
