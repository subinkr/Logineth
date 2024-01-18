import { Injectable } from '@nestjs/common';
import { ReqSetting } from './dto/req-setting.dto';
import { ResSetting } from './dto/res-setting.dto';
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

  async setting(
    loginUserID: number,
    reqSetting: ReqSetting,
    option: string,
  ): Promise<ResSetting> {
    const { setting } = reqSetting;
    const { user: loginUser } =
      await this.profileService.getUserByID(loginUserID);

    const obj = {};
    obj[option] = setting;

    const user = await this.userRepo.save({
      ...loginUser,
      ...obj,
    });

    return { user };
  }
}
