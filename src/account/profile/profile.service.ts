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

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepo: Repository<UserModel>,
  ) {}

  async getUserByID(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }

    return { user };
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepo.findOne({
      where: { username },
    });
    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }

    return { user };
  }

  async editUser(targetId: number, reqEditUser: ReqEditUser, id: number) {
    const { user } = await this.getUserByID(id);
    if (targetId !== id && user.role !== Role.ADMIN) {
      throw new ForbiddenException('다른 유저를 수정할 수 없습니다.');
    }

    await this.getUserByID(targetId);
    await this.userRepo.save({ id: targetId, ...reqEditUser });

    return { message: '수정되었습니다.' };
  }
}
