import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { ReqLocalRegister } from './dto/req-local-register.dto';
import { plainToInstance } from 'class-transformer';
import { ResLocalRegister } from './dto/res-local-register.dto';
import {
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { notAcceptable } from 'src/source-code/error/swagger/not-acceptable';
import { notFound } from 'src/source-code/error/swagger/not-found';

@Controller('register')
@ApiTags('account | register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('local')
  @ApiOperation({ summary: 'Local register' })
  @ApiOkResponse({ type: ResLocalRegister })
  @ApiNotFoundResponse(notFound('유저를 찾을 수 없습니다.'))
  @ApiNotAcceptableResponse(notAcceptable('이미 사용중인 아이디입니다.'))
  async localRegister(@Body() reqLocalRegister: ReqLocalRegister) {
    const result = await this.registerService.localRegister(reqLocalRegister);
    return plainToInstance(ResLocalRegister, result);
  }
}
