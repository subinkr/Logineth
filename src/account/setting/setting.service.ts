import { Injectable } from '@nestjs/common';
import { ReqLanguage } from './dto/req-language.dto';
import { ResLanguage } from './dto/res-language.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/source-code/entities/user.entity';
import { Repository } from 'typeorm';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepo: Repository<UserModel>,
    private readonly profileService: ProfileService,
  ) {}

  async language(
    loginUserID: number,
    reqLanguage: ReqLanguage,
  ): Promise<ResLanguage> {
    const { language } = reqLanguage;
    const { user: loginUser } =
      await this.profileService.getUserByID(loginUserID);
    const user = await this.userRepo.save({ ...loginUser, language });

    return { user };
  }
}
