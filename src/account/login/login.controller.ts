import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { ReqLocalLogin } from './dto/req-local-login.dto';
import { plainToInstance } from 'class-transformer';
import { ResLogin } from './dto/res-login.dto';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { badRequest } from 'src/source-code/error/swagger/bad-request';
import { notFound } from 'src/source-code/error/swagger/not-found';

@Controller('login')
@ApiTags('account | login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('local')
  @ApiOperation({ summary: 'Local login' })
  @ApiOkResponse({ type: ResLogin })
  @ApiBadRequestResponse(badRequest('잘못된 비밀번호입니다.'))
  @ApiNotFoundResponse(notFound('유저를 찾을 수 없습니다.'))
  async localLogin(@Body() reqLocalLogin: ReqLocalLogin) {
    const result = await this.loginService.localLogin(reqLocalLogin);

    return plainToInstance(ResLogin, result);
  }
}
