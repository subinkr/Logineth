import { Injectable, NotAcceptableException } from '@nestjs/common';
import { AuthService } from 'src/common/auth/auth.service';
import { ReqLocalRegister } from './dto/req-local-register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/source-code/entities/user.entity';
import { Repository } from 'typeorm';
import { ReqGithubRegister } from './dto/req-github-register.dto copy';
import { Provider } from 'src/source-code/enum/provider';
import { ReqGoogleRegister } from './dto/req-google-register.dto';

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

  async githubRegister(reqGithubRegister: ReqGithubRegister) {
    const { code } = reqGithubRegister;

    const { id, nickname, image } = await this.getGithubUserInfo(code);
    const username = `${Provider.GITHUB}-${id}`;

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

  async googleRegister(reqGoogleRegister: ReqGoogleRegister) {
    const { googleToken } = reqGoogleRegister;

    const { id, nickname, image } = await this.getGoogleUserInfo(googleToken);
    const username = `${Provider.GOOGLE}-${id}`;

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

    return { id, nickname, image };
  }
}
