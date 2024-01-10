import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/source-code/entities/user.entity';
import { Repository } from 'typeorm';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepo: Repository<UserModel>,
    private readonly profileService: ProfileService,
  ) {}

  async following(targetUserID: number, loginUserID: number) {}

  async unFollowing(targetUserID: number, loginUserID: number) {}
}
