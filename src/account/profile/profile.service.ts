import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/source-code/entities/user.entity';
import { Repository } from 'typeorm';
import { ReqEditUser } from './dto/req-edit-user.dto';
import { Role } from 'src/source-code/enum/role';
import { ResGetUser } from './dto/res-get-user.dto';
import { ResEditUser } from './dto/res-edit-user.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepo: Repository<UserModel>,
  ) {}

  async getUserByID(targetUserID: number): Promise<ResGetUser> {
    const user = await this.userRepo.findOne({
      where: { id: targetUserID },
    });
    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }

    return { user };
  }

  async getUserByUsername(username: string): Promise<ResGetUser> {
    const user = await this.userRepo.findOne({
      where: { username },
    });
    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }

    return { user };
  }

  async editUser(
    targetUserID: number,
    reqEditUser: ReqEditUser,
    loginUserID: number,
  ): Promise<ResEditUser> {
    const { user } = await this.getUserByID(loginUserID);
    if (targetUserID !== loginUserID && user.role !== Role.ADMIN) {
      throw new ForbiddenException('다른 유저를 수정할 수 없습니다.');
    }

    await this.getUserByID(targetUserID);
    await this.userRepo.update(targetUserID, { ...reqEditUser });

    return { message: '수정되었습니다.' };
  }
}
