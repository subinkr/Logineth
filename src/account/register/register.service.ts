import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { AuthService } from 'src/common/auth/auth.service';
import { ReqLocalRegister } from './dto/req-local-register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/source-code/entities/user.entity';
import { Repository } from 'typeorm';
import { Provider } from 'src/source-code/enum/provider';
import { ReqOAuthRegister } from './dto/req-oauth-register.dto';
import { ProfileService } from '../profile/profile.service';
import { Role } from 'src/source-code/enum/role';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepo: Repository<UserModel>,
    private readonly authService: AuthService,
    private readonly profileService: ProfileService,
  ) {}

  async localRegister(reqLocalRegister: ReqLocalRegister) {
    const { username, password } = reqLocalRegister;
    const existUser = await this.userRepo.exist({ where: { username } });
    if (existUser) {
      throw new ConflictException('이미 사용중인 아이디입니다.');
    }

    const { hashPassword } = await this.authService.hashPassword(password);

    const user = await this.userRepo.save({
      ...reqLocalRegister,
      password: hashPassword,
    });
    const { accessToken } = await this.authService.signToken(user.id);

    return { accessToken, user };
  }

  async oAuthRegister(reqOAuthRegister: ReqOAuthRegister, provider: Provider) {
    const { token } = reqOAuthRegister;

    let userInfo = { id: null, nickname: null, image: null };
    switch (provider) {
      case Provider.GITHUB:
        userInfo = await this.getGithubUserInfo(token);
        break;
      case Provider.GOOGLE:
        userInfo = await this.getGoogleUserInfo(token);
        break;
      case Provider.KAKAO:
        userInfo = await this.getKakaoUserInfo(token);
        break;
    }
    const { id, nickname, image } = userInfo;
    if (!id) {
      throw new NotAcceptableException('유저 정보를 가져오지 못했습니다.');
    }

    const username = `${provider}-${id}`;

    let user = await this.userRepo.findOne({ where: { username } });
    if (!user) {
      user = await this.userRepo.save({
        username,
        password: '',
        nickname,
        image,
        provider,
      });
    }

    const { accessToken } = await this.authService.signToken(user.id);

    return { accessToken, user };
  }

  async withdrawRegister(withdrawID: number, id: number) {
    const { user } = await this.profileService.getUserByID(id);
    if (withdrawID !== id && user.role !== Role.ADMIN) {
      throw new ForbiddenException('다른 유저를 탈퇴할 수 없습니다.');
    }

    await this.userRepo.delete(user.id);
    return { message: '탈퇴했습니다.' };
  }

  async getGithubUserInfo(token: string) {
    const response = await fetch('https://api.github.com/user', {
      method: 'get',
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await response.json();
    const { id, login: nickname, avatar_url: image } = result;

    return { id, nickname, image };
  }

  async getGoogleUserInfo(token: string) {
    const response = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        method: 'get',
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    const result = await response.json();
    result.nickname = result?.email?.split('@')[0];
    const { id, nickname, picture: image } = result;

    return { id, nickname, image };
  }

  async getKakaoUserInfo(token: string) {
    const response = await fetch('https://kapi.kakao.com/v2/user/me', {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    const result = await response.json();
    const { id } = result;
    const nickname = result?.properties?.nickname;
    const image = result?.properties?.profile_image;

    return { id, nickname, image };
  }
}
