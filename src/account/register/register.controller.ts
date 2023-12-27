import { Body, Controller, Param, ParseEnumPipe, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { ReqLocalRegister } from './dto/req-local-register.dto';
import { plainToInstance } from 'class-transformer';
import { ResRegister } from './dto/res-register.dto';
import {
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { notAcceptable } from 'src/source-code/error/swagger/not-acceptable';
import { notFound } from 'src/source-code/error/swagger/not-found';
import { ReqOAuthRegister } from './dto/req-oauth-register.dto';
import { Provider } from 'src/source-code/enum/provider';

@Controller('register')
@ApiTags('account | register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('local')
  @ApiOperation({ summary: 'Local register' })
  @ApiOkResponse({ type: ResRegister })
  @ApiNotFoundResponse(notFound('유저를 찾을 수 없습니다.'))
  @ApiNotAcceptableResponse(notAcceptable('이미 사용중인 아이디입니다.'))
  async localRegister(@Body() reqLocalRegister: ReqLocalRegister) {
    const result = await this.registerService.localRegister(reqLocalRegister);
    return plainToInstance(ResRegister, result);
  }

  @Post('oauth/:provider')
  @ApiOperation({ summary: 'OAuth register' })
  @ApiOkResponse({ type: ResRegister })
  @ApiNotAcceptableResponse(notAcceptable('유저 정보를 가져오지 못했습니다.'))
  async oAuthRegister(
    @Param('provider', new ParseEnumPipe(Provider)) provider: Provider,
    @Body() reqOAuthRegister: ReqOAuthRegister,
  ) {
    const result = await this.registerService.oAuthRegister(
      reqOAuthRegister,
      provider,
    );
    return plainToInstance(ResRegister, result);
  }
}
