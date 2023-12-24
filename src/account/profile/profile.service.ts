import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/source-code/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepo: Repository<UserModel>,
  ) {}

  async getUserByUsername(username: string) {
    const user = await this.userRepo.findOne({
      where: { username },
    });
    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }

    return { user };
  }
}
