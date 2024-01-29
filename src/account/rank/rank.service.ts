import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ProfileService } from '../profile/profile.service';
import { InjectRepository } from '@nestjs/typeorm';
import { RankModel } from 'src/source-code/entities/rank.entity';
import { Repository } from 'typeorm';
import { RankRowModel } from 'src/source-code/entities/rank-row.entity';
import { ResGetRanks } from './dto/res-get-ranks.dto';
import { ResCreateRank } from './dto/res-create-rank.dto';
import { ResEditRank } from './dto/res-edit-rank.dto';
import { ResDeleteRank } from './dto/res-delete-rank.dto';
import { ResAddRow } from './dto/res-add-row.dto';
import { ResSubtractRow } from './dto/res-subtract-row.dto';
import { ReqCreateRank } from './dto/req-create-rank.dto';
import { ReqEditRank } from './dto/req-edit-rank.dto';
import { ReqAddRow } from './dto/req-add-row.dto';
import { ResEditRow } from './dto/res-edit-row.dto';
import { ReqEditRow } from './dto/req-edit-row.dto';

@Injectable()
export class RankService {
  constructor(
    @InjectRepository(RankModel)
    private readonly rankRepo: Repository<RankModel>,
    @InjectRepository(RankRowModel)
    private readonly rankRowRepo: Repository<RankRowModel>,
    private readonly profileService: ProfileService,
  ) {}

  // GRBISERVICE: - {rank: RankModel}
  async getRankByID(id: number): Promise<{ rank: RankModel }> {
    const rank = await this.rankRepo.findOne({ where: { id } });
    if (!rank) {
      throw new BadRequestException('존재하지 않는 랭킹입니다.');
    }

    return { rank };
  }

  async getRankRowByID(id: number): Promise<{ rankRow: RankRowModel }> {
    const rankRow = await this.rankRowRepo.findOne({
      where: { id },
      relations: { rank: true },
    });
    if (!rankRow) {
      throw new BadRequestException('존재하지 않는 랭킹입니다.');
    }

    return { rankRow };
  }

  // GRSERVICE: - {ranks: RankModel[]}
  async getRanks(targetUserID: number): Promise<ResGetRanks> {
    const ranks = await this.rankRepo.find({
      where: { user: { id: targetUserID } },
      order: { updatedAt: 'DESC' },
    });

    return { ranks };
  }

  // CRSERVICE: - {message: string}
  async createRank(
    reqCreateRank: ReqCreateRank,
    loginUserID: number,
  ): Promise<ResCreateRank> {
    const { user } = await this.profileService.getUserByID(loginUserID);
    const { title } = reqCreateRank;
    const ranks = await user.ranks;

    const rankIdx = ranks.findIndex((rank) => rank.title === title);
    if (rankIdx !== -1) {
      throw new ForbiddenException('같은 이름의 랭킹이 있습니다.');
    }

    const result = await this.rankRepo.save({ title, user });
    const rank = { ...result, user: null };

    return { rank };
  }

  // ERSERVICE: - {message: string}
  async editRank(
    rankID: number,
    reqEditRank: ReqEditRank,
    loginUserID: number,
  ): Promise<ResEditRank> {
    const { title, ranking } = reqEditRank;
    const { rank } = await this.getRankByID(rankID);
    if (rank.user.id !== loginUserID) {
      throw new ForbiddenException('다른 유저의 랭킹은 수정할 수 없습니다.');
    }

    await this.rankRepo.save({ id: rank.id, title, ranking });

    return { message: '수정했습니다.' };
  }

  // DRSERVICE: - {message: string}
  async deleteRank(
    rankID: number,
    loginUserID: number,
  ): Promise<ResDeleteRank> {
    const { rank } = await this.getRankByID(rankID);
    if (rank.user.id !== loginUserID) {
      throw new ForbiddenException('다른 유저의 랭킹은 삭제할 수 없습니다.');
    }

    await this.rankRepo.delete(rank.id);

    return { message: '삭제했습니다.' };
  }

  // ARSERVICE: - {message: string}
  async addRow(
    rankID: number,
    reqAddRow: ReqAddRow,
    loginUserID: number,
  ): Promise<ResAddRow> {
    const { rank } = await this.getRankByID(rankID);
    if (rank.user.id !== loginUserID) {
      throw new ForbiddenException(
        '다른 유저의 랭킹에 행을 추가할 수 없습니다.',
      );
    }
    const { content } = reqAddRow;

    const row = this.rankRowRepo.create();
    row.rank = Promise.resolve(rank);
    row.content = content;
    await this.rankRowRepo.save(row);

    return { row };
  }

  // ERSERVICE: - {message: string}
  async editRow(
    rowID: number,
    reqEditRow: ReqEditRow,
    loginUserID: number,
  ): Promise<ResEditRow> {
    const { rankRow } = await this.getRankRowByID(rowID);
    const { user } = await this.profileService.getUserByID(loginUserID);
    const ranks = await user.ranks;
    const rank = await rankRow.rank;
    const ranksIdx = ranks.findIndex((item) => item.id === rank.id);
    if (ranksIdx === -1) {
      throw new ForbiddenException('다른 유저의 랭킹은 수정할 수 없습니다.');
    }

    const { content } = reqEditRow;
    await this.rankRowRepo.save({ id: rankRow.id, content });

    return { message: '수정했습니다.' };
  }

  // SRSERVICE: - {message: string}
  async subtractRow(
    rowID: number,
    loginUserID: number,
  ): Promise<ResSubtractRow> {
    const { rankRow } = await this.getRankRowByID(rowID);
    const { user } = await this.profileService.getUserByID(loginUserID);
    const ranks = await user.ranks;
    const rank = await rankRow.rank;
    const ranksIdx = ranks.findIndex((item) => item.id === rank.id);
    if (ranksIdx === -1) {
      throw new ForbiddenException('다른 유저의 랭킹은 삭제할 수 없습니다.');
    }

    await this.rankRowRepo.delete(rankRow.id);

    return { message: '삭제했습니다.' };
  }
}
