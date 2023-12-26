import { Injectable, NotAcceptableException } from '@nestjs/common';
import { AuthService } from 'src/common/auth/auth.service';
import { ReqLocalRegister } from './dto/req-local-register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/source-code/entities/user.entity';
import { Repository } from 'typeorm';
import { Provider } from 'src/source-code/enum/provider';
import { ReqOAuthRegister } from './dto/req-oauth-register.dto';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepo: Repository<UserModel>,
    private readonly authService: AuthService,
  ) {}

  async localRegister(reqLocalRegister: ReqLocalRegister) {
    const { username, password } = reqLocalRegister;
    const existUser = await this.userRepo.exist({ where: { username } });
    if (existUser) {
      throw new NotAcceptableException('이미 사용중인 아이디입니다.');
    }

    const { hashPassword } = await this.authService.hashPassword(password);

    const user = await this.userRepo.save({
      ...reqLocalRegister,
      password: hashPassword,
    });
    const { accessToken } = await this.authService.signToken(username);

    return { accessToken, user };
  }

  async oAuthRegister(reqOAuthRegister: ReqOAuthRegister, provider: Provider) {
    const { code } = reqOAuthRegister;

    let userInfo = { id: null, nickname: null, image: null };
    switch (provider) {
      case Provider.GITHUB:
        userInfo = await this.getGithubUserInfo(code);
        break;
      case Provider.GOOGLE:
        userInfo = await this.getGoogleUserInfo(code);
        break;
      case Provider.KAKAO:
        userInfo = await this.getKakaoUserInfo(code);
        break;
    }
    const { id, nickname, image } = userInfo;

    const username = `${provider}-${id}`;

    let user = await this.userRepo.findOne({ where: { username } });
    if (!user) {
      user = await this.userRepo.save({
        username,
        password: '',
        nickname,
        image,
      });
    }

    const { accessToken } = await this.authService.signToken(username);

    return { accessToken, user };
  }

  async getGithubUserInfo(code: string) {
    const tokenResponse = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: `client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`,
      },
    );
    const tokenResult = await tokenResponse.json();

    const accessToken = tokenResult.access_token;
    const response = await fetch('https://api.github.com/user', {
      method: 'get',
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const result = await response.json();
    const { id, login: nickname, avatar_url: image } = result;
    if (!id) {
      throw new NotAcceptableException('유저 정보를 가져오지 못했습니다.');
    }

    return { id, nickname, image };
  }

  async getGoogleUserInfo(googleToken: string) {
    const response = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        method: 'get',
        headers: { Authorization: `Bearer ${googleToken}` },
      },
    );
    const result = await response.json();
    const { id, email: nickname, picture: image } = result;
    if (!id) {
      throw new NotAcceptableException('유저 정보를 가져오지 못했습니다.');
    }

    return { id, nickname, image };
  }

  async getKakaoUserInfo(code: string) {
    const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT}&code=${code}`,
    });
    const tokenResult = await tokenResponse.json();

    const kakaoToken = tokenResult.access_token;
    const response = await fetch('https://kapi.kakao.com/v2/user/me', {
      method: 'get',
      headers: {
        Authorization: `Bearer ${kakaoToken}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    const result = await response.json();
    const { id } = result;
    const { nickname, profile_image: image } = result.properties;
    if (!id) {
      throw new NotAcceptableException('유저 정보를 가져오지 못했습니다.');
    }

    return { id, nickname, image };
  }
}
