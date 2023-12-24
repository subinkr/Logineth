import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProfileService } from 'src/account/profile/profile.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly profileService: ProfileService,
  ) {}

  async signToken(username: string) {
    await this.profileService.getUserByUsername(username);

    const result = this.jwtService.sign(
      { username },
      {
        secret: process.env.JWT_SECRET || 'test',
        expiresIn: process.env.JWT_EXPIRE || 1234,
      },
    );
    return result;
  }

  async verifyToken(accessToken: string) {
    const result = this.jwtService.verify(accessToken, {
      secret: process.env.JWT_SECRET || 'test',
    });

    return result;
  }
}
