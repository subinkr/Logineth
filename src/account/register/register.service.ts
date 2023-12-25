import { Injectable, NotAcceptableException } from '@nestjs/common';
import { AuthService } from 'src/common/auth/auth.service';
import { ReqLocalRegister } from './dto/req-local-register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/source-code/entities/user.entity';
import { Repository } from 'typeorm';

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
}
