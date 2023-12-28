import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProfileService } from 'src/account/profile/profile.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly profileService: ProfileService,
  ) {}

  async signToken(username: string) {
    await this.profileService.getUserByUsername(username);

    const accessToken = this.jwtService.sign(
      { username },
      {
        secret: process.env.JWT_SECRET || 'test',
        expiresIn: process.env.JWT_EXPIRE || 1234,
      },
    );
    return { accessToken };
  }

  verifyToken(accessToken: string) {
    const token = accessToken.split(' ')[1];
    const result = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET || 'test',
    });

    return result;
  }

  async hashPassword(password: string) {
    const hashPassword = await bcrypt.hash(
      password,
      parseInt(process.env.HASH_SALT) || 10,
    );
    return { hashPassword };
  }

  async verifyPassword(password: string, userPassword: string) {
    const result = await bcrypt.compare(password, userPassword);
    if (!result) {
      throw new BadRequestException('잘못된 비밀번호입니다.');
    }
    return result;
  }
}
