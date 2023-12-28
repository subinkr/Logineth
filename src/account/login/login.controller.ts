import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { ReqLocalLogin } from './dto/req-local-login.dto';
import { plainToInstance } from 'class-transformer';
import { ResLogin } from './dto/res-login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async localLogin(@Body() reqLocalLogin: ReqLocalLogin) {
    const result = await this.loginService.localLogin(reqLocalLogin);

    return plainToInstance(ResLogin, result);
  }
}
